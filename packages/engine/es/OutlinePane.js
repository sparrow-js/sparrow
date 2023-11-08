import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import './OutlinePane.less';
export var OutlinePane = /*#__PURE__*/function (_Component) {
  _inheritsLoose(OutlinePane, _Component);
  function OutlinePane() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = OutlinePane.prototype;
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "test-outline"
    }, /*#__PURE__*/React.createElement("div", {
      className: "component-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "component-icon"
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://img.alicdn.com/imgextra/i3/O1CN01tnhXhk1GUIFhsXwzA_!!6000000000625-55-tps-56-56.svg"
    }))));
  };
  return OutlinePane;
}(Component);