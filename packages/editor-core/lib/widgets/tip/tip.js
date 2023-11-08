"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Tip = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _tipHandler = require("./tip-handler");
var Tip = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Tip, _Component);
  function Tip() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.id = (0, _lowcodeUtils.uniqueId)('tips$');
    return _this;
  }
  var _proto = Tip.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    (0, _tipHandler.postTip)(this.id, null);
  };
  _proto.render = function render() {
    (0, _tipHandler.postTip)(this.id, this.props);
    return /*#__PURE__*/React.createElement("meta", {
      "data-role": "tip",
      "data-tip-id": this.id
    });
  };
  return Tip;
}(_react.Component);
exports.Tip = Tip;