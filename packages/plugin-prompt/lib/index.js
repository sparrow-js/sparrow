"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _autoEditorCore = require("@firefly/auto-editor-core");
require("./index.less");
var _App = _interopRequireDefault(require("./App"));
var _contexts = _interopRequireDefault(require("./contexts"));
var _class, _class2;
// import '../output.css';
var ChatgptPane = (0, _autoEditorCore.observer)(_class = (_class2 = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(ChatgptPane, _React$Component);
  function ChatgptPane() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.messageBox = null;
    return _this;
  }
  var _proto = ChatgptPane.prototype;
  // constructor(props: ComponentPaneProps) {
  //     super(props);
  // }
  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])('auto-component-panel')
    }, "plugin-prompt", /*#__PURE__*/_react["default"].createElement(_contexts["default"], null, /*#__PURE__*/_react["default"].createElement(_App["default"], null)));
  };
  return ChatgptPane;
}(_react["default"].Component), _class2.displayName = 'AutoChatgptPane', _class2)) || _class;
exports["default"] = ChatgptPane;