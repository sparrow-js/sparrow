import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2;
import { Component, Fragment } from 'react';
import classNames from 'classnames';
import { observer } from '@firefly/auto-editor-core';
var LeftArea = observer(_class2 = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(LeftArea, _Component2);
  function LeftArea() {
    return _Component2.apply(this, arguments) || this;
  }
  var _proto2 = LeftArea.prototype;
  _proto2.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-left-area', {
        'lc-area-visible': area.visible
      })
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return LeftArea;
}(Component)) || _class2;
export { LeftArea as default };
var Contents = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Contents, _Component);
  function Contents() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = Contents.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    var top = [];
    var bottom = [];
    area.container.items.slice().sort(function (a, b) {
      var _a$config, _b$config;
      var index1 = ((_a$config = a.config) === null || _a$config === void 0 ? void 0 : _a$config.index) || 0;
      var index2 = ((_b$config = b.config) === null || _b$config === void 0 ? void 0 : _b$config.index) || 0;
      return index1 === index2 ? 0 : index1 > index2 ? 1 : -1;
    }).forEach(function (item) {
      var content = /*#__PURE__*/React.createElement("div", {
        key: "left-area-" + item.name
      }, item.content);
      if (item.align === 'bottom') {
        bottom.push(content);
      } else {
        top.push(content);
      }
    });
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "lc-left-area-top"
    }, top), /*#__PURE__*/React.createElement("div", {
      className: "lc-left-area-bottom"
    }, bottom));
  };
  return Contents;
}(Component)) || _class;