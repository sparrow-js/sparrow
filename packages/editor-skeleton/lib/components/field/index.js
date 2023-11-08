"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.createField = createField;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
require("./index.less");
var _fields = require("./fields");
exports.Field = _fields.Field;
exports.PopupField = _fields.PopupField;
exports.EntryField = _fields.EntryField;
exports.PlainField = _fields.PlainField;
function createField(props, children, type) {
  if (type === 'popup') {
    return /*#__PURE__*/(0, _react.createElement)(_fields.PopupField, props, children);
  }
  if (type === 'entry') {
    return /*#__PURE__*/(0, _react.createElement)(_fields.EntryField, props, children);
  }
  if (type === 'plain' || !props.title) {
    return /*#__PURE__*/(0, _react.createElement)(_fields.PlainField, props, children);
  }
  return /*#__PURE__*/(0, _react.createElement)(_fields.Field, (0, _extends2["default"])({}, props, {
    defaultDisplay: type
  }), children);
}