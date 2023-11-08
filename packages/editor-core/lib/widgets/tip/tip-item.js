"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.TipItem = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _intl = require("../../intl");
var _utils = require("./utils");
var _tipHandler = require("./tip-handler");
var TipItem = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(TipItem, _Component);
  function TipItem(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.dispose = void 0;
    _this.timer = null;
    _this.shell = null;
    _this.originClassName = '';
    _this.dispose = _tipHandler.tipHandler.onChange(function () {
      return _this.forceUpdate();
    });
    return _this;
  }
  var _proto = TipItem.prototype;
  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };
  _proto.componentDidMount = function componentDidMount() {
    this.updateTip();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateTip();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.dispose) {
      this.dispose();
    }
    this.clearTimer();
  };
  _proto.clearTimer = function clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
  _proto.updateTip = function updateTip() {
    if (!this.shell) {
      return;
    }
    var shell = this.shell;
    var arrow = shell.querySelector('.lc-arrow');

    // reset
    shell.className = this.originClassName;
    shell.style.cssText = '';
    arrow.style.cssText = '';
    this.clearTimer();
    var tip = _tipHandler.tipHandler.tip;
    if (!tip) {
      return;
    }
    var target = tip.target,
      direction = tip.direction;
    var targetRect = target.getBoundingClientRect();
    if (targetRect.width === 0 || targetRect.height === 0) {
      return;
    }
    var shellRect = shell.getBoundingClientRect();
    var bounds = {
      left: 1,
      top: 1,
      right: document.documentElement.clientWidth - 1,
      bottom: document.documentElement.clientHeight - 1
    };
    var arrowRect = arrow.getBoundingClientRect();
    var _resolvePosition = (0, _utils.resolvePosition)(shellRect, targetRect, arrowRect, bounds, direction),
      dir = _resolvePosition.dir,
      left = _resolvePosition.left,
      top = _resolvePosition.top,
      arrowLeft = _resolvePosition.arrowLeft,
      arrowTop = _resolvePosition.arrowTop;
    shell.classList.add("lc-align-" + dir);
    shell.style.top = top + "px";
    shell.style.left = left + "px";
    shell.style.width = shellRect.width + "px";
    shell.style.height = shellRect.height + "px";
    if (dir === 'top' || dir === 'bottom') {
      arrow.style.left = arrowLeft + "px";
    } else {
      arrow.style.top = arrowTop + "px";
    }
    this.timer = window.setTimeout(function () {
      shell.classList.add('lc-visible-animate');
      shell.style.transform = 'none';
    }, 10); /**/
  };
  _proto.render = function render() {
    var _this2 = this;
    var tip = _tipHandler.tipHandler.tip || {};
    var className = (0, _classnames["default"])('lc-tip', tip.className, tip && tip.theme ? "lc-theme-" + tip.theme : null);
    this.originClassName = className;
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      ref: function ref(_ref) {
        _this2.shell = _ref;
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "lc-arrow"
    }), /*#__PURE__*/React.createElement("div", {
      className: "lc-tip-content"
    }, (0, _intl.intl)(tip.children)));
  };
  return TipItem;
}(_react.Component);
exports.TipItem = TipItem;