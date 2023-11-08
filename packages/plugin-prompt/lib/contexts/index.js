"use strict";

exports.__esModule = true;
exports["default"] = ContextWrapper;
var _locationContext = require("./locationContext");
function ContextWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_locationContext.LocationProvider, null, children));
}