// ---------------------------------------------------------------------
// QRPolynomial 多项式
// ---------------------------------------------------------------------
import _QRMath from './QRMath'
const QRMath = new _QRMath()
export default class QRPolynomial {
  constructor(num, shift) {
    if (num.length === undefined) {
      throw new Error(num.length + '/' + shift)
    }

    var offset = 0

    while (offset < num.length && num[offset] === 0) {
      offset++
    }

    this.num = new Array(num.length - offset + shift)
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset]
    }
  }

  get(index) {
    return this.num[index]
  }

  getLength() {
    return this.num.length
  }
  /**
   * 多项式乘法
   * @param  {QRPolynomial} e 被乘多项式
   * @return {[type]}   [description]
   */
  multiply(e) {
    var num = new Array(this.getLength() + e.getLength() - 1)

    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(
          QRMath.glog(this.get(i)) + QRMath.glog(e.get(j))
        )
      }
    }

    return new QRPolynomial(num, 0)
  }
  /**
   * 多项式模运算
   * @param  {QRPolynomial} e 模多项式
   * @return {}
   */
  mod(e) {
    let tl = this.getLength()
    let el = e.getLength()
    if (tl - el < 0) {
      return this
    }
    var num = new Array(tl)
    for (var i = 0; i < tl; i++) {
      num[i] = this.get(i)
    }
    while (num.length >= el) {
      var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0))

      for (let i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio)
      }
      while (num[0] === 0) {
        num.shift()
      }
    }
    return new QRPolynomial(num, 0)
  }
}
