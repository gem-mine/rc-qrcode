import QRBitBuffer from './util/QRBitBuffer'
import QRPolynomial from './util/QRPolynomial'
import QRUtil from './util/QRUtil'
import {QRErrorCorrectLevel, RSBlockTable} from './util/data'

/**
 * 获取单个字符的utf8编码
 * unicode BMP平面约65535个字符
 * @param {num} code
 * return {array}
 */
function unicodeFormat8(code) {
  // 1 byte
  var c0, c1, c2
  if (code < 128) {
    return [code]
    // 2 bytes
  } else if (code < 2048) {
    c0 = 192 + (code >> 6)
    c1 = 128 + (code & 63)
    return [c0, c1]
    // 3 bytes
  } else {
    c0 = 224 + (code >> 12)
    c1 = 128 + ((code >> 6) & 63)
    c2 = 128 + (code & 63)
    return [c0, c1, c2]
  }
}

/**
 * 获取字符串的utf8编码字节串
 * @param {string} string
 * @return {array}
 */
function getUTF8Bytes(string) {
  var utf8codes = []
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i)
    var utf8 = unicodeFormat8(code)
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j])
    }
  }
  return utf8codes
}

/**
 * 二维码算法实现
 * @param {string} data              要编码的信息字符串
 * @param {num} errorCorrectLevel 纠错等级
 */

export default class QRCodeAlg {
  constructor(data, errorCorrectLevel) {
    this.typeNumber = -1 // 版本
    this.errorCorrectLevel = errorCorrectLevel
    this.modules = null // 二维矩阵，存放最终结果
    this.moduleCount = 0 // 矩阵大小
    this.dataCache = null // 数据缓存
    this.rsBlocks = null // 版本数据信息
    this.totalDataCount = -1 // 可使用的数据量
    this.data = data
    this.utf8bytes = getUTF8Bytes(data)
    this.make()
  }

  /**
   * 获取二维码矩阵大小
   * @return {num} 矩阵大小
   */
  getModuleCount () {
    return this.moduleCount;
  }

  /**
   * 编码
   */
  make () {
    this.getRightType();
    this.dataCache = this.createData();
    this.createQrcode();
  }

  /**
   * 设置二位矩阵功能图形
   * @param  {bool} test 表示是否在寻找最好掩膜阶段
   * @param  {num} maskPattern 掩膜的版本
   */
  makeImpl (maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(true, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(true);
    }
    this.mapData(this.dataCache, maskPattern);
  }

  /**
   * 设置二维码的位置探测图形
   * @param  {num} row 探测图形的中心横坐标
   * @param  {num} col 探测图形的中心纵坐标
   */
  setupPositionProbePattern (row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        if (
          (0 <= r && r <= 6 && (c == 0 || c == 6)) ||
          (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
          (2 <= r && r <= 4 && 2 <= c && c <= 4)
        ) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  }
  /**
   * 创建二维码
   * @return {[type]} [description]
   */
  createQrcode () {
    var minLostPoint = 0;
    var pattern = 0;
    var bestModules = null;

    for (var i = 0; i < 8; i++) {
      this.makeImpl(i);

      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
        bestModules = this.modules;
      }
    }
    this.modules = bestModules;
    this.setupTypeInfo(false, pattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }
  }

  /**
   * 设置定位图形
   * @return {[type]} [description]
   */
  setupTimingPattern () {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;

      if (this.modules[6][r] != null) {
        continue;
      }
      this.modules[6][r] = r % 2 == 0;
    }
  }

  /**
   * 设置矫正图形
   * @return {[type]} [description]
   */
  setupPositionAdjustPattern () {
    var pos = QRUtil.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  }

  /**
   * 设置版本信息（7以上版本才有）
   * @param  {bool} test 是否处于判断最佳掩膜阶段
   * @return {[type]}      [description]
   */
  setupTypeNumber (test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
      var mod = !test && ((bits >> i) & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  }

  /**
   * 设置格式信息（纠错等级和掩膜版本）
   * @param  {bool} test
   * @param  {num} maskPattern 掩膜版本
   * @return {}
   */
  setupTypeInfo (test, maskPattern) {
    var data = (QRErrorCorrectLevel[this.errorCorrectLevel] << 3) | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);

    // vertical
    for (var i = 0; i < 15; i++) {
      var mod = !test && ((bits >> i) & 1) == 1;

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }

      // horizontal
      var mod = !test && ((bits >> i) & 1) == 1;

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }

    // fixed module
    this.modules[this.moduleCount - 8][8] = !test;
  }

  /**
   * 数据编码
   * @return {[type]} [description]
   */
  createData () {
    var buffer = new QRBitBuffer();
    var lengthBits = this.typeNumber > 9 ? 16 : 8;
    buffer.put(4, 4); //添加模式
    buffer.put(this.utf8bytes.length, lengthBits);
    for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
      buffer.put(this.utf8bytes[i], 8);
    }
    if (buffer.length + 4 <= this.totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.length % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {
      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(this.PAD0, 8);

      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(this.PAD1, 8);
    }
    return this.createBytes(buffer);
  }

  /**
   * 纠错码编码
   * @param  {buffer} buffer 数据编码
   * @return {[type]}
   */
  createBytes (buffer) {
    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var length = this.rsBlock.length / 3;

    var rsBlocks = new Array();

    for (var i = 0; i < length; i++) {
      var count = this.rsBlock[i * 3 + 0];
      var totalCount = this.rsBlock[i * 3 + 1];
      var dataCount = this.rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        rsBlocks.push([dataCount, totalCount]);
      }
    }

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r][0];
      var ecCount = rsBlocks[r][1] - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }

    var data = new Array(this.totalDataCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;
  }

  /**
   * 布置模块，构建最终信息
   * @param  {} data
   * @param  {} maskPattern
   * @return {}
   */
  mapData (data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >>> bitIndex) & 1) == 1;
            }

            var mask = QRUtil.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

  PAD0 = 0xec
  PAD1 = 0x11

  /**
  * 根据数据获取对应版本
  * @return {[type]} [description]
  */
  getRightType () {
    for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
      var rsBlock = RSBlockTable[(typeNumber - 1) * 4 + this.errorCorrectLevel];
      if (rsBlock == undefined) {
        throw new Error(
          'bad rs block @ typeNumber:' +
            typeNumber +
            '/errorCorrectLevel:' +
            this.errorCorrectLevel
        );
      }
      var length = rsBlock.length / 3;
      var totalDataCount = 0;
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var dataCount = rsBlock[i * 3 + 2];
        totalDataCount += dataCount * count;
      }

      var lengthBytes = typeNumber > 9 ? 2 : 1;
      if (
        this.utf8bytes.length + lengthBytes < totalDataCount ||
        typeNumber == 40
      ) {
        this.typeNumber = typeNumber;
        this.rsBlock = rsBlock;
        this.totalDataCount = totalDataCount;
        break;
      }
    }
  }
}
