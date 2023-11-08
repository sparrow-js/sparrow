import { ReactFlowJsonObject, XYPosition } from 'reactflow';
import { APIClassType } from '../api/index';
export declare type FlowType = {
    name: string;
    id: string;
    data: ReactFlowJsonObject;
    description: string;
};
export declare type NodeType = {
    id: string;
    type?: string;
    position: XYPosition;
    data: NodeDataType;
};
export declare type NodeDataType = {
    type: string;
    node?: APIClassType;
    id: string;
    value: any;
};
