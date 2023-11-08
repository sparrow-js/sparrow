import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class, _class2;
import { Component, Fragment } from 'react';
import classNames from 'classnames';
import { observer, focusTracker } from '@firefly/auto-editor-core';
var LeftFloatPane = observer(_class2 = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(LeftFloatPane, _Component2);
  function LeftFloatPane() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component2.call.apply(_Component2, [this].concat(args)) || this;
    _this.dispose = void 0;
    _this.focusing = void 0;
    _this.shell = null;
    return _this;
  }
  var _proto2 = LeftFloatPane.prototype;
  _proto2.componentDidMount = function componentDidMount() {
    var _this2 = this;
    var area = this.props.area;
    var triggerClose = function triggerClose(e) {
      var _e$originalEvent, _e$originalEvent$targ, _e$originalEvent2;
      if (!area.visible) return;
      // 当 MouseEvent 的 target 为「插入占位符」时，不关闭当前 panel
      if ((_e$originalEvent = e.originalEvent) !== null && _e$originalEvent !== void 0 && (_e$originalEvent$targ = _e$originalEvent.target) !== null && _e$originalEvent$targ !== void 0 && _e$originalEvent$targ.classList.contains('insertion')) return;
      // 假如当前操作 target 祖先节点中有属性 data-keep-visible-while-dragging="true" 代表该 target 所属 panel
      // 不希望 target 在 panel 范围内拖拽时关闭 panel
      var panelElem = (_e$originalEvent2 = e.originalEvent) === null || _e$originalEvent2 === void 0 ? void 0 : _e$originalEvent2.target.closest('div[data-keep-visible-while-dragging="true"]');
      if (panelElem) return;
      area.setVisible(false);
    };
    area.skeleton.editor.on('designer.drag', triggerClose);
    this.dispose = function () {
      area.skeleton.editor.removeListener('designer.drag', triggerClose);
    };
    this.focusing = focusTracker.create({
      range: function range(e) {
        var _this2$shell, _document$querySelect, _document$querySelect2, _document$querySelect3, _area$current;
        var target = e.target;
        if (!target) {
          return false;
        }
        if ((_this2$shell = _this2.shell) !== null && _this2$shell !== void 0 && _this2$shell.contains(target)) {
          return true;
        }
        // 点击了 iframe 内容，算失焦
        if (document.querySelector('.lc-simulator-content-frame').contentWindow.document.documentElement.contains(target)) {
          return false;
        }
        // 点击设置区
        if ((_document$querySelect = document.querySelector('.lc-right-area')) !== null && _document$querySelect !== void 0 && _document$querySelect.contains(target)) {
          return false;
        }
        // 点击非编辑区域的popup/dialog,插件栏左侧等不触发失焦
        if (!((_document$querySelect2 = document.querySelector('.lc-workbench')) !== null && _document$querySelect2 !== void 0 && _document$querySelect2.contains(target))) {
          return true;
        }
        // 排除设置区，iframe 之后，都不算失焦
        if ((_document$querySelect3 = document.querySelector('.lc-workbench-body')) !== null && _document$querySelect3 !== void 0 && _document$querySelect3.contains(target)) {
          return true;
        }
        var docks = (_area$current = area.current) === null || _area$current === void 0 ? void 0 : _area$current.getAssocDocks();
        if (docks && docks !== null && docks !== void 0 && docks.length) {
          return docks.some(function (dock) {
            var _dock$getDOMNode;
            return (_dock$getDOMNode = dock.getDOMNode()) === null || _dock$getDOMNode === void 0 ? void 0 : _dock$getDOMNode.contains(target);
          });
        }
        return false;
      },
      onEsc: function onEsc() {
        _this2.props.area.setVisible(false);
      },
      onBlur: function onBlur() {
        // debugger
        _this2.props.area.setVisible(false);
      }
    });
    this.onEffect();
  };
  _proto2.onEffect = function onEffect() {
    var area = this.props.area;
    if (area.visible) {
      var _this$focusing, _area$skeleton, _area$skeleton$leftFi;
      (_this$focusing = this.focusing) === null || _this$focusing === void 0 ? void 0 : _this$focusing.active();
      // 关闭当前fixed区域的面板
      // TODO: 看看有没有更合适的地方
      var fixedContainer = area === null || area === void 0 ? void 0 : (_area$skeleton = area.skeleton) === null || _area$skeleton === void 0 ? void 0 : (_area$skeleton$leftFi = _area$skeleton.leftFixedArea) === null || _area$skeleton$leftFi === void 0 ? void 0 : _area$skeleton$leftFi.container;
      var currentFixed = fixedContainer === null || fixedContainer === void 0 ? void 0 : fixedContainer.current;
      if (currentFixed) {
        fixedContainer.unactive(currentFixed);
      }
    } else {
      var _this$focusing2;
      (_this$focusing2 = this.focusing) === null || _this$focusing2 === void 0 ? void 0 : _this$focusing2.suspense();
    }
  };
  _proto2.componentDidUpdate = function componentDidUpdate() {
    this.onEffect();
  };
  _proto2.componentWillUnmount = function componentWillUnmount() {
    var _this$focusing3, _this$dispose;
    (_this$focusing3 = this.focusing) === null || _this$focusing3 === void 0 ? void 0 : _this$focusing3.purge();
    (_this$dispose = this.dispose) === null || _this$dispose === void 0 ? void 0 : _this$dispose.call(this);
  };
  _proto2.render = function render() {
    var _area$current2,
      _area$current2$config,
      _this3 = this;
    var area = this.props.area;
    var width = (_area$current2 = area.current) === null || _area$current2 === void 0 ? void 0 : (_area$current2$config = _area$current2.config.props) === null || _area$current2$config === void 0 ? void 0 : _area$current2$config.width;
    var style = width ? {
      width: width
    } : undefined;
    return /*#__PURE__*/React.createElement("div", {
      ref: function ref(_ref) {
        _this3.shell = _ref;
      },
      className: classNames('lc-left-float-pane', {
        'lc-area-visible': area.visible
      }),
      style: style
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return LeftFloatPane;
}(Component)) || _class2;
export { LeftFloatPane as default };
var Contents = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Contents, _Component);
  function Contents() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = Contents.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement(Fragment, null, area.container.items.map(function (panel) {
      return panel.content;
    }));
  };
  return Contents;
}(Component)) || _class;