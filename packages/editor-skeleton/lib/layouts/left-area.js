"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _autoEditorCore = require("@firefly/auto-editor-core");
var _class, _class2;
var LeftArea = (0, _autoEditorCore.observer)(_class2 = /*#__PURE__*/function (_Component2) {
  (0, _inheritsLoose2["default"])(LeftArea, _Component2);
  function LeftArea() {
    return _Component2.apply(this, arguments) || this;
  }
  var _proto2 = LeftArea.prototype;
  _proto2.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-left-area', {
        'lc-area-visible': area.visible
      })
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return LeftArea;
}(_react.Component)) || _class2;
exports["default"] = LeftArea;
var Contents = (0, _autoEditorCore.observer)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Contents, _Component);
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
    return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "lc-left-area-top"
    }, top), /*#__PURE__*/React.createElement("div", {
      className: "lc-left-area-bottom"
    }, bottom));
  };
  return Contents;
}(_react.Component)) || _class;