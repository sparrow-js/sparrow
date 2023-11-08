import { ReactFlowInstance } from 'reactflow';
import { FlowType } from '../flow';

export interface ChatType { flow: FlowType; reactFlowInstance: ReactFlowInstance }
export interface ChatMessageType {
  message: string;
  isSend: boolean;
  thought?: string;
  files?: Array<{ data: string; type: string; data_type: string }>;
}
