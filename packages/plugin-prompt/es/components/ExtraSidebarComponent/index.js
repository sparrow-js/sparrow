import { locationContext } from '../../contexts/locationContext';
import { useContext } from 'react';
export default function ExtraSidebar() {
  var _useContext = useContext(locationContext),
    extraComponent = _useContext.extraComponent;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("aside", null, "aside", extraComponent));
}