import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Component } from 'react';
import { uniqueId } from '@alilc/lowcode-utils';
import { postTip } from './tip-handler';
export var Tip = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Tip, _Component);
  function Tip() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.id = uniqueId('tips$');
    return _this;
  }
  var _proto = Tip.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    postTip(this.id, null);
  };
  _proto.render = function render() {
    postTip(this.id, this.props);
    return /*#__PURE__*/React.createElement("meta", {
      "data-role": "tip",
      "data-tip-id": this.id
    });
  };
  return Tip;
}(Component);