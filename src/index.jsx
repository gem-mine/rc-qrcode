import React from 'react';
import qrcode from './QRinit';
import classNames from 'classnames';

class Qrcode extends React.Component {
  static defaultProps = {
    prefixCls: 'fish-qrcode',
    className: '',
    text: '',
    size: 256,
    correctLevel: 3,
    background: '#fff',
    foreground: '#000',
    image: '',
    imageSize: 30
  }
  constructor(props) {
    super(props);
  }

  spanDom = null

  componentDidUpdate() {
    this.innerHTML();
  }

  innerHTML = () => {
    if (this.spanDom) {
      this.spanDom.innerHTML = '';
      this.spanDom.appendChild(new qrcode({ ...this.props })) 
    }
  }

  getQrnode = (_dom) => {
    if( _dom ){
      this.spanDom = _dom;
      this.innerHTML(); 
    }
  }

  render() {
    const { prefixCls, className } = this.props
    const boxClass = classNames(className, { [prefixCls]: true });

    return (
      <span className={boxClass} ref={this.getQrnode}></span>
    );
  }
}

Qrcode.getCanvas = function (props) {
   var canvas = document.createElement('canvas')
    if (canvas.getContext) {
      return new qrcode({ ...props })
    }
    return undefined
}

export default Qrcode;
