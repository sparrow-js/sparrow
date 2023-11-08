import { ErrorBoundary } from 'react-error-boundary';
import CrashErrorComponent from './components/CrashErrorComponent';
import ExtraSidebar from './components/ExtraSidebarComponent';
import TabsManagerComponent from './FlowPage/components/tabsManagerComponent';
import 'reactflow/dist/style.css';
export default function App() {
  return (
    /*#__PURE__*/
    // need parent component with width and height
    React.createElement("div", {
      className: "h-full flex flex-col"
    }, "test", /*#__PURE__*/React.createElement(ErrorBoundary, {
      onReset: function onReset() {
        window.localStorage.removeItem('tabsData');
        window.localStorage.clear();
      },
      FallbackComponent: CrashErrorComponent
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex grow shrink basis-auto min-h-0 flex-1 overflow-hidden"
    }, /*#__PURE__*/React.createElement(ExtraSidebar, null), /*#__PURE__*/React.createElement("main", {
      className: "min-w-0 flex-1 border-t border-gray-200 dark:border-gray-700 flex"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full"
    }, /*#__PURE__*/React.createElement(TabsManagerComponent, null))))))
  );
}