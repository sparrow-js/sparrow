import { ReactFlowJsonObject, XYPosition } from 'reactflow';
import { APIClassType } from '../api/index';

export type FlowType = {
    name: string;
    id: string;
    data: ReactFlowJsonObject;
    description: string;
};
export type NodeType = {
    id: string;
    type?: string;
    position: XYPosition;
    data: NodeDataType;
  };
  export type NodeDataType = {
    type: string;
    node?: APIClassType;
    id: string;
    value: any;
};
