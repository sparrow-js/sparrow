"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var InlineTip = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(InlineTip, _React$Component);
  function InlineTip() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = InlineTip.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      position = _this$props.position,
      theme = _this$props.theme,
      children = _this$props.children;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'none'
      },
      "data-role": "tip",
      "data-position": position,
      "data-theme": theme
    }, children);
  };
  return InlineTip;
}(React.Component);
exports["default"] = InlineTip;
InlineTip.displayName = 'InlineTip';
InlineTip.defaultProps = {
  position: 'auto',
  theme: 'black'
};