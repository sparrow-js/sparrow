"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = App;
var _reactErrorBoundary = require("react-error-boundary");
var _CrashErrorComponent = _interopRequireDefault(require("./components/CrashErrorComponent"));
var _ExtraSidebarComponent = _interopRequireDefault(require("./components/ExtraSidebarComponent"));
var _tabsManagerComponent = _interopRequireDefault(require("./FlowPage/components/tabsManagerComponent"));
require("reactflow/dist/style.css");
function App() {
  return (
    /*#__PURE__*/
    // need parent component with width and height
    React.createElement("div", {
      className: "h-full flex flex-col"
    }, "test", /*#__PURE__*/React.createElement(_reactErrorBoundary.ErrorBoundary, {
      onReset: function onReset() {
        window.localStorage.removeItem('tabsData');
        window.localStorage.clear();
      },
      FallbackComponent: _CrashErrorComponent["default"]
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex grow shrink basis-auto min-h-0 flex-1 overflow-hidden"
    }, /*#__PURE__*/React.createElement(_ExtraSidebarComponent["default"], null), /*#__PURE__*/React.createElement("main", {
      className: "min-w-0 flex-1 border-t border-gray-200 dark:border-gray-700 flex"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full"
    }, /*#__PURE__*/React.createElement(_tabsManagerComponent["default"], null))))))
  );
}