import { LocationProvider } from './locationContext';
export default function ContextWrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LocationProvider, null, children));
}