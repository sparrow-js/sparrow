"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _class, _class2;
var Toolbar = (0, _lowcodeEditorCore.observer)(_class2 = /*#__PURE__*/function (_Component2) {
  (0, _inheritsLoose2["default"])(Toolbar, _Component2);
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
      className: (0, _classnames["default"])('lc-toolbar', {
        'lc-area-visible': area.visible
      })
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return Toolbar;
}(_react.Component)) || _class2;
exports["default"] = Toolbar;
var Contents = (0, _lowcodeEditorCore.observer)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Contents, _Component);
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
    return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "lc-toolbar-left"
    }, left), /*#__PURE__*/React.createElement("div", {
      className: "lc-toolbar-center"
    }, center), /*#__PURE__*/React.createElement("div", {
      className: "lc-toolbar-right"
    }, right));
  };
  return Contents;
}(_react.Component)) || _class;