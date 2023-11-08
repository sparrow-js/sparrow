import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2;
import { Component, Fragment } from 'react';
import classNames from 'classnames';
import { observer } from '@alilc/lowcode-editor-core';
var Toolbar = observer(_class2 = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(Toolbar, _Component2);
  function Toolbar() {
    return _Component2.apply(this, arguments) || this;
  }
  var _proto2 = Toolbar.prototype;
  _proto2.render = function render() {
    var area = this.props.area;
    if (area.isEmpty()) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('lc-toolbar', {
        'lc-area-visible': area.visible
      })
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return Toolbar;
}(Component)) || _class2;
export { Toolbar as default };
var Contents = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Contents, _Component);
  function Contents() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = Contents.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    var left = [];
    var center = [];
    var right = [];
    area.container.items.forEach(function (item) {
      if (item.align === 'center') {
        center.push(item.content);
      } else if (item.align === 'right') {
        right.push(item.content);
      } else {
        left.push(item.content);
      }
    });
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "lc-toolbar-left"
    }, left), /*#__PURE__*/React.createElement("div", {
      className: "lc-toolbar-center"
    }, center), /*#__PURE__*/React.createElement("div", {
      className: "lc-toolbar-right"
    }, right));
  };
  return Contents;
}(Component)) || _class;