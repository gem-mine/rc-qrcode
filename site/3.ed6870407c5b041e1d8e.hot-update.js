webpackHotUpdate(3,{

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.setPrototypeOf = __webpack_require__(285);
__webpack_require__(286);
__webpack_require__(488);

/* eslint-disable no-unused-vars */
var React = __webpack_require__(15);
if (!React.PropTypes) {
  React.PropTypes = __webpack_require__(560);
}
if (!React.createClass) {
  React.createClass = __webpack_require__(566);
}
/* eslint-enable no-unused-vars */
var ReactDOM = __webpack_require__(174);
var ReactRouter = __webpack_require__(162);
var history = __webpack_require__(568);
var data = __webpack_require__(580);
var routes = __webpack_require__(586)(data);

var _window$location = window.location,
    pathname = _window$location.pathname,
    search = _window$location.search,
    hash = _window$location.hash;

var location = '' + pathname + search + hash;
var basename = '/rc-qrcode/site/';
/* eslint-enable no-unused-vars */
var NProgress = __webpack_require__(256);

function createElement(Component, props) {
  NProgress.done();
  var dynamicPropsKey = props.location.pathname;
  return React.createElement(Component, _extends({}, props, Component[dynamicPropsKey]));
};

ReactRouter.match({ routes: routes, location: location, basename: basename }, function () {
  var router = React.createElement(ReactRouter.Router, {
    history: ReactRouter.useRouterHistory(history.createHistory)({ basename: basename }),
    routes: routes,
    createElement: createElement
  });
  ReactDOM.render(router, document.getElementById('engine-content'));
});

/***/ })

})
//# sourceMappingURL=3.ed6870407c5b041e1d8e.hot-update.js.map