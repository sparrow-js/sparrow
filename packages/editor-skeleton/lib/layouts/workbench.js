"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Workbench = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = require("react");
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _classnames = _interopRequireDefault(require("classnames"));
var _leftArea = _interopRequireDefault(require("./left-area"));
var _leftFixedPane = _interopRequireDefault(require("./left-fixed-pane"));
var _leftFloatPane = _interopRequireDefault(require("./left-float-pane"));
var _mainArea = _interopRequireDefault(require("./main-area"));
require("./workbench.less");
var _context = require("../context");
var _class;
var Workbench = (0, _lowcodeEditorCore.observer)(_class = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Workbench, _Component);
  function Workbench(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    var _this$props = _this.props,
      config = _this$props.config,
      components = _this$props.components,
      skeleton = _this$props.skeleton;
    skeleton.buildFromConfig(config, components);
    return _this;
  }

  // componentDidCatch(error: any) {
  //   globalContext.get(Editor).emit('editor.skeleton.workbench.error', error);
  // }
  var _proto = Workbench.prototype;
  _proto.render = function render() {
    var _this$props2 = this.props,
      skeleton = _this$props2.skeleton,
      className = _this$props2.className,
      topAreaItemClassName = _this$props2.topAreaItemClassName;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])('lc-workbench', className)
    }, /*#__PURE__*/React.createElement(_context.SkeletonContext.Provider, {
      value: this.props.skeleton
    }, /*#__PURE__*/React.createElement("div", {
      className: "lc-workbench-body"
    }, /*#__PURE__*/React.createElement(_leftArea["default"], {
      area: skeleton.leftArea
    }), /*#__PURE__*/React.createElement(_leftFloatPane["default"], {
      area: skeleton.leftFloatArea
    }), /*#__PURE__*/React.createElement(_leftFixedPane["default"], {
      area: skeleton.leftFixedArea
    }), /*#__PURE__*/React.createElement("div", {
      className: "lc-workbench-center"
    }, /*#__PURE__*/React.createElement(_mainArea["default"], {
      area: skeleton.mainArea
    }))), /*#__PURE__*/React.createElement(_lowcodeEditorCore.TipContainer, null)));
  };
  return Workbench;
}(_react.Component)) || _class;
exports.Workbench = Workbench;