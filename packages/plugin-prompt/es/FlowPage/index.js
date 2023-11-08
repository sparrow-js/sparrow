import { useContext, useEffect, useRef } from 'react';
import { locationContext } from '../contexts/locationContext';
import ExtraSidebar from './components/extraSidebarComponent';
import ReactFlow, { Background, useEdgesState, useNodesState } from 'reactflow';
export default function FlowPage(_ref) {
  var _flow$data$nodes, _flow$data, _flow$data$edges, _flow$data2;
  var flow = _ref.flow;
  var reactFlowWrapper = useRef(null);
  var _useContext = useContext(locationContext),
    setExtraComponent = _useContext.setExtraComponent;
  var _useNodesState = useNodesState((_flow$data$nodes = (_flow$data = flow.data) === null || _flow$data === void 0 ? void 0 : _flow$data.nodes) !== null && _flow$data$nodes !== void 0 ? _flow$data$nodes : []),
    nodes = _useNodesState[0],
    setNodes = _useNodesState[1],
    onNodesChange = _useNodesState[2];
  var _useEdgesState = useEdgesState((_flow$data$edges = (_flow$data2 = flow.data) === null || _flow$data2 === void 0 ? void 0 : _flow$data2.edges) !== null && _flow$data$edges !== void 0 ? _flow$data$edges : []),
    edges = _useEdgesState[0],
    setEdges = _useEdgesState[1],
    onEdgesChange = _useEdgesState[2];
  useEffect(function () {
    setExtraComponent( /*#__PURE__*/React.createElement(ExtraSidebar, null));
  }, [setExtraComponent]);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full",
    ref: reactFlowWrapper
  }, /*#__PURE__*/React.createElement(ReactFlow, {
    nodes: nodes,
    edges: edges
  }, /*#__PURE__*/React.createElement(Background, null)));
}