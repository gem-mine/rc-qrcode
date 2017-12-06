import React from 'react';
import qrcode from './QRinit';
import classNames from 'classnames';

export default class Qrcode extends React.Component {
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

  qrnode = (_dom) => {
    const props = this.props
    let qrnode = new qrcode({ ...props })
    _dom.appendChild(qrnode)
  }

  render() {
    const { prefixCls, className } = this.props
    const boxClass = classNames(className, { [prefixCls]: true });

    return (
      <span className={boxClass} ref={this.qrnode}></span>
    );
  }
}
