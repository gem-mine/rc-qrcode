import extend from 'extend'
import QRCodeAlg from './QRCodealg'

let qrcodeAlgObjCache = []

/**
 * 计算矩阵点的前景色
 * @param {Obj} config
 * @param {Number} config.row 点x坐标
 * @param {Number} config.col 点y坐标
 * @param {Number} config.count 矩阵大小
 * @param {Number} config.options 组件的options
 * @return {String}
 */
var getForeGround = function (config) {
  var options = config.options
  if (
    options.pdground &&
    ((config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5) ||
      (config.row > config.count - 6 &&
        config.row < config.count - 2 &&
        config.col > 1 &&
        config.col < 5) ||
      (config.row > 1 &&
        config.row < 5 &&
        config.col > config.count - 6 &&
        config.col < config.count - 2))
  ) {
    return options.pdground
  }
  return options.foreground
}

/**
 * 点是否在Position Detection
 * @param  {row} 矩阵行
 * @param  {col} 矩阵列
 * @param  {count} 矩阵大小
 * @return {Boolean}
 */
var inPositionDetection = function (row, col, count) {
  if (
    (row < 7 && col < 7) ||
    (row > count - 8 && col < 7) ||
    (row < 7 && col > count - 8)
  ) {
    return true
  }
  return false
}

/**
 * 获取当前屏幕的设备像素比 devicePixelRatio/backingStore
 * @param {context} 当前 canvas 上下文，可以为 window
 */
var getPixelRatio = function (context) {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1

  return (window.devicePixelRatio || 1) / backingStore
}

/**
 * 二维码构造函数，主要用于绘制
 * @param  {参数列表} opt 传递参数
 * @return {}
 */

export default class qrcode {
  constructor(opt) {
    if (typeof opt === 'string') {
      // 只编码ASCII字符串
      opt = {
        text: opt
      }
    }
    // 设置默认参数
    this.options = extend(
      {},
      {
        text: '',
        render: '',
        size: 256,
        correctLevel: 3,
        background: '#fff',
        foreground: '#000',
        image: '',
        imageSize: 30
      },
      opt
    )

    // 使用QRCodeAlg创建二维码结构
    var qrCodeAlg = null
    for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (
        qrcodeAlgObjCache[i].text == this.options.text &&
        qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel
      ) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj
        break
      }
    }

    if (i == l) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel)
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: qrCodeAlg
      })
    }

    if (this.options.render) {
      switch (this.options.render) {
        case 'canvas':
          return this.createCanvas(qrCodeAlg)
        case 'table':
          return this.createTable(qrCodeAlg)
        case 'svg':
          return this.createSVG(qrCodeAlg)
        default:
          return this.createDefault(qrCodeAlg)
      }
    }
    return this.createDefault(qrCodeAlg)
  }
  // default create  canvas -> svg -> table
  createDefault(qrCodeAlg) {
    var canvas = document.createElement('canvas')
    if (canvas.getContext) {
      return this.createCanvas(qrCodeAlg)
    }
    var SVG_NS = 'http://www.w3.org/2000/svg'
    if (
      !!document.createElementNS &&
      !!document.createElementNS(SVG_NS, 'svg').createSVGRect
    ) {
      return this.createSVG(qrCodeAlg)
    }
    return this.createTable(qrCodeAlg)
  }

  // canvas create
  createCanvas(qrCodeAlg) {
    var options = this.options
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var count = qrCodeAlg.getModuleCount()
    var ratio = getPixelRatio(ctx)
    var size = options.size
    var ratioSize = size * ratio
    var ratioImgSize = options.imageSize * ratio
    // preload img
    var loadImage = function (url, callback) {
      var img = new Image()
      img.onload = function () {
        callback(this)
        img.onload = null
      }
      img.src = url
    }

    // 计算每个点的长宽
    var tileW = (ratioSize / count).toPrecision(4)
    var tileH = (ratioSize / count).toPrecision(4)

    canvas.width = ratioSize
    canvas.height = ratioSize

    // 绘制
    for (var row = 0; row < count; row++) {
      for (var col = 0; col < count; col++) {
        var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW)
        var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW)
        var foreground = getForeGround({
          row: row,
          col: col,
          count: count,
          options: options
        })
        ctx.fillStyle = qrCodeAlg.modules[row][col]
          ? foreground
          : options.background
        ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h)
      }
    }
    if (options.image) {
      loadImage(options.image, function (img) {
        var x = ((ratioSize - ratioImgSize) / 2).toFixed(2)
        var y = ((ratioSize - ratioImgSize) / 2).toFixed(2)
        ctx.drawImage(img, x, y, ratioImgSize, ratioImgSize)
      })
    }
    canvas.style.width = size + 'px'
    canvas.style.height = size + 'px'
    return canvas
  }

  // table create
  createTable(qrCodeAlg) {
    var options = this.options
    var count = qrCodeAlg.getModuleCount()

    // 计算每个节点的长宽；取整，防止点之间出现分离
    var tileW = Math.floor(options.size / count)
    var tileH = Math.floor(options.size / count)
    if (tileW <= 0) {
      tileW = count < 80 ? 2 : 1
    }
    if (tileH <= 0) {
      tileH = count < 80 ? 2 : 1
    }

    // 创建table节点
    // 重算码大小
    var s = []
    s.push(
      `<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color:${
      options.background
      };">`
    )

    // 绘制二维码
    for (var row = 0; row < count; row++) {
      s.push(
        `<tr style="border:0px; margin:0px; padding:0px; height:${tileH}px">`
      )
      for (var col = 0; col < count; col++) {
        var foreground = getForeGround({
          row: row,
          col: col,
          count: count,
          options: options
        })
        if (qrCodeAlg.modules[row][col]) {
          s.push(
            `<td style="border:0px; margin:0px; padding:0px; width:${
            tileW
            }px; background-color:${foreground}"></td>`
          )
        } else {
          s.push(
            `<td style="border:0px; margin:0px; padding:0px; width:${
            tileW
            }px; background-color:${options.background}"></td>`
          )
        }
      }
      s.push('</tr>')
    }
    s.push('</table>')

    if (options.image) {
      // 计算表格的总大小
      var width = tileW * count
      var height = tileH * count
      var x = ((width - options.imageSize) / 2).toFixed(2)
      var y = ((height - options.imageSize) / 2).toFixed(2)
      s.unshift(`<div style='position:relative;
                        width:${width}px;
                        height:${height}px;'>`)
      s.push(`<img src='${options.image}'
                        width='${options.imageSize}'
                        height='${options.imageSize}'
                        style='position:absolute;left:${x}px; top:${y}px;'>`)
      s.push('</div>')
    }

    var span = document.createElement('span')
    span.innerHTML = s.join('')

    return span.firstChild
  }

  // create svg
  createSVG(qrCodeAlg) {
    let options = this.options
    let count = qrCodeAlg.getModuleCount()
    let scale = count / options.size

    // create svg
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', options.size)
    svg.setAttribute('height', options.size)
    svg.setAttribute('viewBox', `0 0 ${count} ${count}`)

    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        let rect = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        )
        let foreground = getForeGround({
          row: row,
          col: col,
          count: count,
          options: options
        })
        rect.setAttribute('x', col)
        rect.setAttribute('y', row)
        rect.setAttribute('width', 1)
        rect.setAttribute('height', 1)
        rect.setAttribute('stroke-width', 0)
        if (qrCodeAlg.modules[row][col]) {
          rect.setAttribute('fill', foreground)
        } else {
          rect.setAttribute('fill', options.background)
        }
        svg.appendChild(rect)
      }
    }

    // create image
    if (options.image) {
      let img = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.image)
      img.setAttribute(
        'x',
        ((count - options.imageSize * scale) / 2).toFixed(2)
      )
      img.setAttribute(
        'y',
        ((count - options.imageSize * scale) / 2).toFixed(2)
      )
      img.setAttribute('width', options.imageSize * scale)
      img.setAttribute('height', options.imageSize * scale)
      svg.appendChild(img)
    }

    return svg
  }
}
