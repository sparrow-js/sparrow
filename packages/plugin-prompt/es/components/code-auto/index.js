import _Popover from "antd/es/popover";
import _Tooltip from "antd/es/tooltip";
import _List from "antd/es/list";
import _Checkbox from "antd/es/checkbox";
import _Select from "antd/es/select";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class;
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React from 'react';
import { observer, globalContext } from '@firefly/auto-editor-core';
import { IconReview, IconNote, IconRefactor, IconSync, IconClear, IconClose, IconSure, IconPrompt } from '../icon';
import { editInsertNode } from '../../../api';
import { OperateType } from '../../../types';
var CodeAuto = observer(_class = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CodeAuto, _React$Component);
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
    _this.syncToCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _designer$currentDocu;
      var editor, designer, selection, nodes, node, instance, unique, interval, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            editor = globalContext.get('editor');
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
            return editInsertNode({
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
      return /*#__PURE__*/React.createElement("div", {
        className: "prompt-box"
      }, /*#__PURE__*/React.createElement(_Select, {
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Checkbox.Group, {
      style: {
        width: '100%'
      },
      onChange: this.onChange,
      value: chatgpt.selectedFiles
    }, /*#__PURE__*/React.createElement(_List, {
      className: "demo-loadmore-list",
      itemLayout: "horizontal",
      dataSource: chatgpt.changeFiles,
      renderItem: function renderItem(item) {
        return /*#__PURE__*/React.createElement(_List.Item, {
          actions: [/*#__PURE__*/React.createElement(_Checkbox, {
            value: item.value
          })]
        }, /*#__PURE__*/React.createElement("div", null, item.value));
      }
    })));
  };
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Tooltip, {
      title: "\u540C\u6B65"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mr-6 red-5",
      onClick: this.syncToCode
    }, IconSync({}))), /*#__PURE__*/React.createElement(_Popover, {
      content: this.promptContent(),
      placement: "bottom",
      title: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
        onClick: this.promptHide,
        className: "mr-6"
      }, IconClose({}))),
      trigger: "click",
      open: this.state.promptOpen,
      onOpenChange: this.handlePromptOpenChange
    }, /*#__PURE__*/React.createElement("span", {
      className: "mr-6"
    }, IconPrompt({}))), /*#__PURE__*/React.createElement(_Popover, {
      content: this.content(),
      placement: "bottom",
      title: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
        onClick: this.hide,
        className: "mr-6"
      }, IconClose({})), /*#__PURE__*/React.createElement("a", {
        className: "mr-6",
        onClick: this.sureOperateCode
      }, IconSure({})), /*#__PURE__*/React.createElement("a", {
        className: "mr-6"
      }, IconClear({}))),
      trigger: "click",
      open: this.state.open,
      onOpenChange: this.handleOpenChange
    }, /*#__PURE__*/React.createElement(_Tooltip, {
      title: "code review"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mr-6",
      onClick: this.handlerCode(OperateType.codeReview)
    }, IconReview({}))), /*#__PURE__*/React.createElement(_Tooltip, {
      title: "\u4EE3\u7801\u6CE8\u91CA"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mr-6",
      onClick: this.handlerCode(OperateType.note)
    }, IconNote({}))), /*#__PURE__*/React.createElement(_Tooltip, {
      title: "\u4EE3\u7801\u91CD\u6784"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mr-6",
      onClick: this.handlerCode(OperateType.reconfiguration)
    }, IconRefactor({})))));
  };
  return CodeAuto;
}(React.Component)) || _class;
export { CodeAuto as default };