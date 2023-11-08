import React from 'react';
import { Chatgpt } from '../../chatgpt';
import { OperateType } from '../../../types';
interface ComponentPaneProps {
    chatgpt: Chatgpt;
    scrollBottom: () => void;
}
interface ComponentPaneState {
    open: boolean;
    promptOpen: boolean;
}
export default class CodeAuto extends React.Component<ComponentPaneProps, ComponentPaneState> {
    state: ComponentPaneState;
    hide: () => void;
    promptHide: () => void;
    handleOpenChange: () => void;
    handlePromptOpenChange: () => void;
    onChange: (value: string[]) => void;
    content(): JSX.Element;
    handlerCode: (value: OperateType) => () => void;
    syncToCode: () => Promise<void>;
    sureOperateCode: () => void;
    handlePromptChange: (value: any) => void;
    promptContent: () => JSX.Element;
    render(): JSX.Element;
}
export {};
