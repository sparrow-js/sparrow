"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.OutlinePane = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireWildcard(require("react"));
require("./OutlinePane.less");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var OutlinePane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(OutlinePane, _Component);
  function OutlinePane() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = OutlinePane.prototype;
  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "test-outline"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "component-card"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "component-icon"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: "https://img.alicdn.com/imgextra/i3/O1CN01tnhXhk1GUIFhsXwzA_!!6000000000625-55-tps-56-56.svg"
    }))));
  };
  return OutlinePane;
}(_react.Component);
exports.OutlinePane = OutlinePane;