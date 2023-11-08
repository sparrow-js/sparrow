import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import * as React from 'react';
var InlineTip = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(InlineTip, _React$Component);
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
InlineTip.displayName = 'InlineTip';
InlineTip.defaultProps = {
  position: 'auto',
  theme: 'black'
};
export { InlineTip as default };