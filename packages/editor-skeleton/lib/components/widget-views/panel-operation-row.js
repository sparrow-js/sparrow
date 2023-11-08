"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _icon = _interopRequireDefault(require("@alifd/next/lib/icon"));
var _button = _interopRequireDefault(require("@alifd/next/lib/button"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _react = require("react");
var _autoEditorCore = require("@firefly/auto-editor-core");
var _fix = require("../../icons/fix");
var _float = require("../../icons/float");
var _class;
var PanelOperationRow = (_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(PanelOperationRow, _Component);
  function PanelOperationRow(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    (0, _autoEditorCore.makeObservable)((0, _assertThisInitialized2["default"])(_this));
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
    return /*#__PURE__*/React.createElement(_react.Fragment, null, !hideTitleBar && /*#__PURE__*/React.createElement(_react.Fragment, null, canSetFixed &&
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-bind
    React.createElement(_button["default"], {
      text: true,
      className: "lc-pane-icon-fix",
      onClick: this.setDisplay.bind(this)
    }, areaName === 'leftFloatArea' ? /*#__PURE__*/React.createElement(_fix.IconFix, null) : /*#__PURE__*/React.createElement(_float.IconFloat, null)), /*#__PURE__*/React.createElement(_button["default"], {
      text: true,
      className: "lc-pane-icon-close",
      onClick: function onClick() {
        area && area.setVisible(false);
      }
    }, /*#__PURE__*/React.createElement(_icon["default"], {
      type: "close"
    }))));
  };
  return PanelOperationRow;
}(_react.Component), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "setDisplay", [_autoEditorCore.action], Object.getOwnPropertyDescriptor(_class.prototype, "setDisplay"), _class.prototype)), _class);
exports["default"] = PanelOperationRow;