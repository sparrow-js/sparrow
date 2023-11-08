"use strict";

exports.__esModule = true;
exports["default"] = ExtraSidebar;
var _locationContext = require("../../contexts/locationContext");
var _react = require("react");
function ExtraSidebar() {
  var _useContext = (0, _react.useContext)(_locationContext.locationContext),
    extraComponent = _useContext.extraComponent;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("aside", null, "aside", extraComponent));
}