import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2;
import React from 'react';
import classNames from 'classnames';
import { observer } from '@firefly/auto-editor-core';
import './index.less';
import App from './App';
import ContextWrapper from './contexts';
// import '../output.css';
var ChatgptPane = observer(_class = (_class2 = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ChatgptPane, _React$Component);
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
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('auto-component-panel')
    }, "plugin-prompt", /*#__PURE__*/React.createElement(ContextWrapper, null, /*#__PURE__*/React.createElement(App, null)));
  };
  return ChatgptPane;
}(React.Component), _class2.displayName = 'AutoChatgptPane', _class2)) || _class;
export { ChatgptPane as default };