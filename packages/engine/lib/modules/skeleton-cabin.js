"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = getSkeletonCabin;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _autoEditorSkeleton = require("@firefly/auto-editor-skeleton");
function getSkeletonCabin(skeleton) {
  return {
    Workbench: function Workbench(props) {
      return /*#__PURE__*/React.createElement(_autoEditorSkeleton.Workbench, (0, _extends2["default"])({}, props, {
        skeleton: skeleton
      }));
    } // hijack skeleton
  };
}