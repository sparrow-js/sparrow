"use strict";

exports.__esModule = true;
exports.LocationProvider = LocationProvider;
exports.locationContext = void 0;
var _react = require("react");
var initialValue = {
  extraComponent: /*#__PURE__*/React.createElement(React.Fragment, null),
  setExtraComponent: function setExtraComponent() {}
};
var locationContext = /*#__PURE__*/(0, _react.createContext)(initialValue);
exports.locationContext = locationContext;
function LocationProvider(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)( /*#__PURE__*/React.createElement(React.Fragment, null)),
    extraComponent = _useState[0],
    setExtraComponent = _useState[1];
  return /*#__PURE__*/React.createElement(locationContext.Provider, {
    value: {
      extraComponent: extraComponent,
      setExtraComponent: setExtraComponent
    }
  }, children);
}