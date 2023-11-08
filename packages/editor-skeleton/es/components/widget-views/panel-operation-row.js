import _Icon from "@alifd/next/lib/icon";
import _Button from "@alifd/next/lib/button";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
var _class;
import { Component, Fragment } from 'react';
import { action, makeObservable } from '@firefly/auto-editor-core';
import { IconFix } from '../../icons/fix';
import { IconFloat } from '../../icons/float';
var PanelOperationRow = (_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PanelOperationRow, _Component);
  function PanelOperationRow(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    makeObservable(_assertThisInitialized(_this));
    return _this;
  }
  // fix or float
  var _proto = PanelOperationRow.prototype;
  _proto.setDisplay = function setDisplay() {
    var panel = this.props.panel;
    var current = panel;
    if (!current) {
      return;
    }
    panel.skeleton.toggleFloatStatus(panel);
  };
  _proto.render = function render() {
    var _this$props$panel$con, _panel$config$props, _panel$config$props2, _panel$parent;
    var panel = this.props.panel;
    var isRightArea = ((_this$props$panel$con = this.props.panel.config) === null || _this$props$panel$con === void 0 ? void 0 : _this$props$panel$con.area) === 'rightArea';
    if (isRightArea) {
      return null;
    }
    // can be set fixed by default
    var canSetFixed = true;
    if ((panel === null || panel === void 0 ? void 0 : (_panel$config$props = panel.config.props) === null || _panel$config$props === void 0 ? void 0 : _panel$config$props.canSetFixed) === false) {
      canSetFixed = false;
    }
    var hideTitleBar = panel === null || panel === void 0 ? void 0 : (_panel$config$props2 = panel.config.props) === null || _panel$config$props2 === void 0 ? void 0 : _panel$config$props2.hideTitleBar;
    var areaName = panel === null || panel === void 0 ? void 0 : (_panel$parent = panel.parent) === null || _panel$parent === void 0 ? void 0 : _panel$parent.name;
    var area = panel.skeleton[areaName];
    return /*#__PURE__*/React.createElement(Fragment, null, !hideTitleBar && /*#__PURE__*/React.createElement(Fragment, null, canSetFixed &&
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-bind
    React.createElement(_Button, {
      text: true,
      className: "lc-pane-icon-fix",
      onClick: this.setDisplay.bind(this)
    }, areaName === 'leftFloatArea' ? /*#__PURE__*/React.createElement(IconFix, null) : /*#__PURE__*/React.createElement(IconFloat, null)), /*#__PURE__*/React.createElement(_Button, {
      text: true,
      className: "lc-pane-icon-close",
      onClick: function onClick() {
        area && area.setVisible(false);
      }
    }, /*#__PURE__*/React.createElement(_Icon, {
      type: "close"
    }))));
  };
  return PanelOperationRow;
}(Component), (_applyDecoratedDescriptor(_class.prototype, "setDisplay", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setDisplay"), _class.prototype)), _class);
export { PanelOperationRow as default };