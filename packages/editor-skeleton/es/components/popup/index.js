import _Drawer from "@alifd/next/lib/drawer";
import _ConfigProvider from "@alifd/next/lib/config-provider";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _extends from "@babel/runtime/helpers/extends";
import { createContext, Component, PureComponent } from 'react';
import { EventEmitter } from 'events';
import { uniqueId } from '@alilc/lowcode-utils';
import './style.less';
export var PopupContext = /*#__PURE__*/createContext({});
export var PopupPipe = /*#__PURE__*/function () {
  function PopupPipe() {
    this.emitter = new EventEmitter();
    this.currentId = void 0;
  }
  var _proto = PopupPipe.prototype;
  _proto.create = function create(props) {
    var _this = this;
    var sendContent = null;
    var sendTitle = null;
    var id = uniqueId('popup');
    return {
      send: function send(content, title) {
        sendContent = content;
        sendTitle = title;
        if (_this.currentId === id) {
          _this.popup(_extends({}, props, {
            content: content,
            title: title
          }));
        }
      },
      show: function show(target, actionKey) {
        _this.currentId = id;
        _this.popup(_extends({}, props, {
          actionKey: actionKey,
          content: sendContent,
          title: sendTitle
        }), target);
      }
    };
  };
  _proto.popup = function popup(props, target) {
    var _this2 = this;
    Promise.resolve().then(function () {
      _this2.emitter.emit('popupchange', props, target);
    });
  };
  _proto.onPopupChange = function onPopupChange(fn) {
    var _this3 = this;
    this.emitter.on('popupchange', fn);
    return function () {
      _this3.emitter.removeListener('popupchange', fn);
    };
  };
  _proto.purge = function purge() {
    this.emitter.removeAllListeners();
  };
  return PopupPipe;
}();
var PopupService = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PopupService, _Component);
  function PopupService() {
    var _this4;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this4 = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this4.popupPipe = _this4.props.popupPipe || new PopupPipe();
    return _this4;
  }
  var _proto2 = PopupService.prototype;
  _proto2.componentWillUnmount = function componentWillUnmount() {
    this.popupPipe.purge();
  };
  _proto2.render = function render() {
    var _this$props = this.props,
      children = _this$props.children,
      actionKey = _this$props.actionKey,
      safeId = _this$props.safeId;
    return /*#__PURE__*/React.createElement(PopupContext.Provider, {
      value: this.popupPipe
    }, children, /*#__PURE__*/React.createElement(PopupContent, {
      key: "pop" + actionKey,
      safeId: safeId
    }));
  };
  return PopupService;
}(Component);
export { PopupService as default };
export var PopupContent = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(PopupContent, _PureComponent);
  function PopupContent() {
    var _this5;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this5 = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this5.popupContainerId = uniqueId('popupContainer');
    _this5.state = {
      visible: false,
      offsetX: -300
    };
    _this5.dispose = _this5.context.onPopupChange(function (props, target) {
      var state = _extends({}, props, {
        visible: true
      });
      if (target) {
        var rect = target.getBoundingClientRect();
        state.pos = {
          top: rect.top,
          height: rect.height
        };
        // todo: compute the align method
      }

      _this5.setState(state);
    });
    _this5.onClose = function () {
      _this5.setState({
        visible: false
      });
    };
    return _this5;
  }
  var _proto3 = PopupContent.prototype;
  _proto3.componentDidMount = function componentDidMount() {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth >= 1860) {
      this.setState({
        offsetX: -400
      });
    }
  };
  _proto3.componentWillUnmount = function componentWillUnmount() {
    this.dispose();
  };
  _proto3.render = function render() {
    var _this6 = this;
    var _this$state = this.state,
      content = _this$state.content,
      visible = _this$state.visible,
      title = _this$state.title,
      actionKey = _this$state.actionKey,
      pos = _this$state.pos,
      offsetX = _this$state.offsetX;
    if (!visible) {
      return null;
    }
    var avoidLaterHidden = true;
    setTimeout(function () {
      avoidLaterHidden = false;
    }, 10);
    var id = uniqueId('ball');
    return /*#__PURE__*/React.createElement(_Drawer, {
      width: 360,
      visible: visible,
      offset: [offsetX, 0],
      hasMask: false,
      onVisibleChange: function onVisibleChange(visible, type) {
        if (avoidLaterHidden) {
          return;
        }
        if (!visible && type === 'closeClick') {
          _this6.setState({
            visible: false
          });
        }
      },
      trigger: /*#__PURE__*/React.createElement("div", {
        className: "lc-popup-placeholder",
        style: pos
      }),
      triggerType: "click",
      canCloseByOutSideClick: true,
      animation: false,
      onClose: this.onClose,
      id: this.props.safeId,
      safeNode: id,
      closeable: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-ballon-title"
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "lc-ballon-content"
    }, /*#__PURE__*/React.createElement(PopupService, {
      actionKey: actionKey,
      safeId: id
    }, /*#__PURE__*/React.createElement(_ConfigProvider, {
      popupContainer: this.popupContainerId
    }, content))), /*#__PURE__*/React.createElement("div", {
      id: this.popupContainerId
    }), /*#__PURE__*/React.createElement("div", {
      id: "engine-variable-setter-dialog"
    }));
  };
  return PopupContent;
}(PureComponent);
PopupContent.contextType = PopupContext;