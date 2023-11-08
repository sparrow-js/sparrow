import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _excluded = ["node", "inline", "className", "children"];
var _class;
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { debounce } from 'lodash';
import * as parser from '@babel/parser';
import { observer } from '@firefly/auto-editor-core';
var ContentMessage = observer(_class = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContentMessage, _React$Component);
  function ContentMessage(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.getSelection = debounce(_this.getSelection, 500, {
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReactMarkdown, {
      components: {
        code: function code(_ref) {
          var node = _ref.node,
            inline = _ref.inline,
            className = _ref.className,
            children = _ref.children,
            props = _objectWithoutPropertiesLoose(_ref, _excluded);
          var match = /language-(\w+)/.exec(className || '');
          return !inline && match ? /*#__PURE__*/React.createElement(SyntaxHighlighter, _extends({}, props, {
            style: dark,
            language: match[1],
            PreTag: "div"
          }), String(children).replace(/\n$/, '')) : /*#__PURE__*/React.createElement("code", _extends({}, props, {
            className: className
          }), children);
        }
      }
    }, this.props.content));
  };
  return ContentMessage;
}(React.Component)) || _class;
export { ContentMessage as default };