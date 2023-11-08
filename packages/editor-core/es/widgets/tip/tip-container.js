import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Component } from 'react';
import { TipItem } from './tip-item';
import { tipHandler } from './tip-handler';
export var TipContainer = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TipContainer, _Component);
  function TipContainer() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.dispose = void 0;
    return _this;
  }
  var _proto = TipContainer.prototype;
  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };
  _proto.componentDidMount = function componentDidMount() {
    var over = function over(e) {
      return tipHandler.setTarget(e.target);
    };
    var down = function down() {
      return tipHandler.hideImmediately();
    };
    document.addEventListener('mouseover', over, false);
    document.addEventListener('mousedown', down, true);
    this.dispose = function () {
      document.removeEventListener('mouseover', over, false);
      document.removeEventListener('mousedown', down, true);
    };
  };
  _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    if (this.dispose) {
      this.dispose();
    }
  };
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "lc-tips-container"
    }, /*#__PURE__*/React.createElement(TipItem, null));
  };
  return TipContainer;
}(Component);