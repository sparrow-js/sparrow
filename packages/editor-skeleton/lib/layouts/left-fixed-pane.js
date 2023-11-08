"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _classnames = _interopRequireDefault(require("classnames"));
var _autoEditorCore = require("@firefly/auto-editor-core");
var _class, _class2;
var LeftFixedPane = (0, _autoEditorCore.observer)(_class2 = /*#__PURE__*/function (_Component2) {
  (0, _inheritsLoose2["default"])(LeftFixedPane, _Component2);
  function LeftFixedPane() {
    return _Component2.apply(this, arguments) || this;
  }
  var _proto2 = LeftFixedPane.prototype;
  _proto2.componentDidUpdate = function componentDidUpdate() {
    var _this$props$area$skel;
    // FIXME: dirty fix, need deep think
    (_this$props$area$skel = this.props.area.skeleton.editor.get('designer')) === null || _this$props$area$skel === void 0 ? void 0 : _this$props$area$skel.touchOffsetObserver();
  };
  _proto2.render = function render() {
    var _area$current, _area$current$config$;
    var area = this.props.area;
    var width = (_area$current = area.current) === null || _area$current === void 0 ? void 0 : (_area$current$config$ = _area$current.config.props) === null || _area$current$config$ === void 0 ? void 0 : _area$current$config$.width;
    var style = width ? {
      width: width
    } : undefined;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-left-fixed-pane', {
        'lc-area-visible': area.visible
      }),
      style: style
    }, /*#__PURE__*/React.createElement(Contents, {
      area: area
    }));
  };
  return LeftFixedPane;
}(_react.Component)) || _class2;
exports["default"] = LeftFixedPane;
var Contents = (0, _autoEditorCore.observer)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Contents, _Component);
  function Contents() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = Contents.prototype;
  _proto.render = function render() {
    var area = this.props.area;
    return /*#__PURE__*/React.createElement(_react.Fragment, null, area.container.items.map(function (panel) {
      return panel.content;
    }));
  };
  return Contents;
}(_react.Component)) || _class;