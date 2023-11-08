"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
var _reactSyntaxHighlighter = require("react-syntax-highlighter");
var _prism = require("react-syntax-highlighter/dist/esm/styles/prism");
var _lodash = require("lodash");
var parser = _interopRequireWildcard(require("@babel/parser"));
var _autoEditorCore = require("@firefly/auto-editor-core");
var _excluded = ["node", "inline", "className", "children"];
var _class;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ContentMessage = (0, _autoEditorCore.observer)(_class = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(ContentMessage, _React$Component);
  function ContentMessage(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.getSelection = (0, _lodash.debounce)(_this.getSelection, 500, {
      trailing: true
    });
    document.addEventListener('selectionchange', function () {
      _this.getSelection();
    });
    return _this;
  }
  var _proto = ContentMessage.prototype;
  _proto.getSelection = function getSelection() {
    var selection = document.getSelection();
    var content = (selection === null || selection === void 0 ? void 0 : selection.toString()) || '';
    try {
      parser.parse(content, {
        sourceType: 'module',
        plugins: ['jsx']
      });
    } catch (e) {
      // console.error(e);
      content = '';
    }
    this.props.chatgpt.selection = content;
    return content;
  };
  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactMarkdown["default"], {
      components: {
        code: function code(_ref) {
          var node = _ref.node,
            inline = _ref.inline,
            className = _ref.className,
            children = _ref.children,
            props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
          var match = /language-(\w+)/.exec(className || '');
          return !inline && match ? /*#__PURE__*/_react["default"].createElement(_reactSyntaxHighlighter.Prism, (0, _extends2["default"])({}, props, {
            style: _prism.dark,
            language: match[1],
            PreTag: "div"
          }), String(children).replace(/\n$/, '')) : /*#__PURE__*/_react["default"].createElement("code", (0, _extends2["default"])({}, props, {
            className: className
          }), children);
        }
      }
    }, this.props.content));
  };
  return ContentMessage;
}(_react["default"].Component)) || _class;
exports["default"] = ContentMessage;