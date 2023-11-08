import { createContext, useState } from 'react';
var initialValue = {
  extraComponent: /*#__PURE__*/React.createElement(React.Fragment, null),
  setExtraComponent: function setExtraComponent() {}
};
export var locationContext = /*#__PURE__*/createContext(initialValue);
export function LocationProvider(_ref) {
  var children = _ref.children;
  var _useState = useState( /*#__PURE__*/React.createElement(React.Fragment, null)),
    extraComponent = _useState[0],
    setExtraComponent = _useState[1];
  return /*#__PURE__*/React.createElement(locationContext.Provider, {
    value: {
      extraComponent: extraComponent,
      setExtraComponent: setExtraComponent
    }
  }, children);
}