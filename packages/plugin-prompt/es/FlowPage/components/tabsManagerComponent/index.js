import FlowPage from '../..';
import { ReactFlowProvider } from 'reactflow';
export default function TabsManagerComponent() {
  var nodes = [{
    id: 'edges-1',
    type: 'input',
    data: {
      label: 'Input 1'
    },
    position: {
      x: 250,
      y: 0
    }
  }, {
    id: 'edges-2',
    data: {
      label: 'Node 2'
    },
    position: {
      x: 150,
      y: 100
    }
  }];
  var edges = [{
    id: 'edges-e1-2',
    source: 'edges-1',
    target: 'edges-2',
    label: 'bezier edge (default)',
    className: 'normal-edge'
  }, {
    id: 'edges-e2-2a',
    source: 'edges-2',
    target: 'edges-2a',
    type: 'smoothstep',
    label: 'smoothstep edge'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "h-full w-full flex flex-col"
  }, /*#__PURE__*/React.createElement(ReactFlowProvider, null, /*#__PURE__*/React.createElement(FlowPage, {
    flow: {
      name: '',
      id: '',
      data: {
        nodes: nodes,
        edges: edges,
        viewport: {
          x: 0,
          y: 0,
          zoom: 1
        }
      },
      description: ''
    }
  })));
}