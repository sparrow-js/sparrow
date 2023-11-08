"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _popover = _interopRequireDefault(require("antd/lib/popover"));
var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));
var _list = _interopRequireDefault(require("antd/lib/list"));
var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));
var _select = _interopRequireDefault(require("antd/lib/select"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _autoEditorCore = require("@firefly/auto-editor-core");
var _icon = require("../icon");
var _api = require("../../../api");
var _types = require("../../../types");
var _class;
var CodeAuto = (0, _autoEditorCore.observer)(_class = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(CodeAuto, _React$Component);
  function CodeAuto() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      open: false,
      promptOpen: false
    };
    _this.hide = function () {
      _this.setState({
        open: false
      });
    };
    _this.promptHide = function () {
      _this.setState({
        promptOpen: false
      });
    };
    _this.handleOpenChange = function () {
      _this.setState({
        open: true
      });
    };
    _this.handlePromptOpenChange = function () {
      _this.setState({
        promptOpen: true
      });
    };
    _this.onChange = function (value) {
      var chatgpt = _this.props.chatgpt;
      chatgpt.setSelectedFiles(value);
      console.log('***', value);
    };
    _this.handlerCode = function (value) {
      return function () {
        var chatgpt = _this.props.chatgpt;
        chatgpt.setOperateType(value);
        chatgpt.getWatchChangeFiles();
      };
    };
    _this.syncToCode = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _designer$currentDocu;
      var editor, designer, selection, nodes, node, instance, unique, interval, res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            editor = _autoEditorCore.globalContext.get('editor');
            designer = editor.get('designer');
            selection = (_designer$currentDocu = designer.currentDocument) === null || _designer$currentDocu === void 0 ? void 0 : _designer$currentDocu.selection;
            if (!selection) {
              _context.next = 14;
              break;
            }
            nodes = selection.getNodes();
            node = nodes[0];
            if (!node) {
              _context.next = 14;
              break;
            }
            instance = node.instance;
            unique = instance.dataset['unique'];
            interval = unique.split('::');
            _context.next = 12;
            return (0, _api.editInsertNode)({
              path: node.id.split('::')[0],
              start: interval[0],
              end: interval[1],
              position: 0,
              content: _this.props.chatgpt.selection
            });
          case 12:
            res = _context.sent;
            console.log('********000', res);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    _this.sureOperateCode = function () {
      var chatgpt = _this.props.chatgpt;
      chatgpt.startPrompt();
    };
    _this.handlePromptChange = function (value) {
      var chatgpt = _this.props.chatgpt;
      chatgpt.setPrompt(value);
      _this.props.scrollBottom();
    };
    _this.promptContent = function () {
      var chatgpt = _this.props.chatgpt;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "prompt-box"
      }, /*#__PURE__*/_react["default"].createElement(_select["default"], {
        defaultValue: "react",
        onChange: _this.handlePromptChange,
        style: {
          width: 200
        },
        options: chatgpt.promptList
      }));
    };
    return _this;
  }
  var _proto = CodeAuto.prototype;
  _proto.content = function content() {
    var chatgpt = this.props.chatgpt;
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_checkbox["default"].Group, {
      style: {
        width: '100%'
      },
      onChange: this.onChange,
      value: chatgpt.selectedFiles
    }, /*#__PURE__*/_react["default"].createElement(_list["default"], {
      className: "demo-loadmore-list",
      itemLayout: "horizontal",
      dataSource: chatgpt.changeFiles,
      renderItem: function renderItem(item) {
        return /*#__PURE__*/_react["default"].createElement(_list["default"].Item, {
          actions: [/*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
            value: item.value
          })]
        }, /*#__PURE__*/_react["default"].createElement("div", null, item.value));
      }
    })));
  };
  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "\u540C\u6B65"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-6 red-5",
      onClick: this.syncToCode
    }, (0, _icon.IconSync)({}))), /*#__PURE__*/_react["default"].createElement(_popover["default"], {
      content: this.promptContent(),
      placement: "bottom",
      title: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.promptHide,
        className: "mr-6"
      }, (0, _icon.IconClose)({}))),
      trigger: "click",
      open: this.state.promptOpen,
      onOpenChange: this.handlePromptOpenChange
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-6"
    }, (0, _icon.IconPrompt)({}))), /*#__PURE__*/_react["default"].createElement(_popover["default"], {
      content: this.content(),
      placement: "bottom",
      title: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.hide,
        className: "mr-6"
      }, (0, _icon.IconClose)({})), /*#__PURE__*/_react["default"].createElement("a", {
        className: "mr-6",
        onClick: this.sureOperateCode
      }, (0, _icon.IconSure)({})), /*#__PURE__*/_react["default"].createElement("a", {
        className: "mr-6"
      }, (0, _icon.IconClear)({}))),
      trigger: "click",
      open: this.state.open,
      onOpenChange: this.handleOpenChange
    }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "code review"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-6",
      onClick: this.handlerCode(_types.OperateType.codeReview)
    }, (0, _icon.IconReview)({}))), /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "\u4EE3\u7801\u6CE8\u91CA"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-6",
      onClick: this.handlerCode(_types.OperateType.note)
    }, (0, _icon.IconNote)({}))), /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "\u4EE3\u7801\u91CD\u6784"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-6",
      onClick: this.handlerCode(_types.OperateType.reconfiguration)
    }, (0, _icon.IconRefactor)({})))));
  };
  return CodeAuto;
}(_react["default"].Component)) || _class;
exports["default"] = CodeAuto;