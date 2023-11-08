"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _class;
var MainArea = (0, _lowcodeEditorCore.observer)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MainArea, _Component);
  function MainArea() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = MainArea.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-main-area engine-workspacepane')
    }, area.container.items.map(function (item) {
      return item.content;
    }));
  };
  return MainArea;
}(_react.Component)) || _class;
exports["default"] = MainArea;