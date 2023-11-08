"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = FlowPage;
var _react = require("react");
var _locationContext = require("../contexts/locationContext");
var _extraSidebarComponent = _interopRequireDefault(require("./components/extraSidebarComponent"));
var _reactflow = _interopRequireWildcard(require("reactflow"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function FlowPage(_ref) {
  var _flow$data$nodes, _flow$data, _flow$data$edges, _flow$data2;
  var flow = _ref.flow;
  var reactFlowWrapper = (0, _react.useRef)(null);
  var _useContext = (0, _react.useContext)(_locationContext.locationContext),
    setExtraComponent = _useContext.setExtraComponent;
  var _useNodesState = (0, _reactflow.useNodesState)((_flow$data$nodes = (_flow$data = flow.data) === null || _flow$data === void 0 ? void 0 : _flow$data.nodes) !== null && _flow$data$nodes !== void 0 ? _flow$data$nodes : []),
    nodes = _useNodesState[0],
    setNodes = _useNodesState[1],
    onNodesChange = _useNodesState[2];
  var _useEdgesState = (0, _reactflow.useEdgesState)((_flow$data$edges = (_flow$data2 = flow.data) === null || _flow$data2 === void 0 ? void 0 : _flow$data2.edges) !== null && _flow$data$edges !== void 0 ? _flow$data$edges : []),
    edges = _useEdgesState[0],
    setEdges = _useEdgesState[1],
    onEdgesChange = _useEdgesState[2];
  (0, _react.useEffect)(function () {
    setExtraComponent( /*#__PURE__*/React.createElement(_extraSidebarComponent["default"], null));
  }, [setExtraComponent]);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full",
    ref: reactFlowWrapper
  }, /*#__PURE__*/React.createElement(_reactflow["default"], {
    nodes: nodes,
    edges: edges
  }, /*#__PURE__*/React.createElement(_reactflow.Background, null)));
}