import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Component } from 'react';
import classNames from 'classnames';
import { intl } from '../../intl';
import { resolvePosition } from './utils';
import { tipHandler } from './tip-handler';
export var TipItem = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TipItem, _Component);
  function TipItem(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.dispose = void 0;
    _this.timer = null;
    _this.shell = null;
    _this.originClassName = '';
    _this.dispose = tipHandler.onChange(function () {
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
    var tip = tipHandler.tip;
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
    var _resolvePosition = resolvePosition(shellRect, targetRect, arrowRect, bounds, direction),
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
    var tip = tipHandler.tip || {};
    var className = classNames('lc-tip', tip.className, tip && tip.theme ? "lc-theme-" + tip.theme : null);
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
    }, intl(tip.children)));
  };
  return TipItem;
}(Component);