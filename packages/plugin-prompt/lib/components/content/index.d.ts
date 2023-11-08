import React from 'react';
import { Chatgpt } from '../../chatgpt';
interface ComponentPaneProps {
    content: string;
    chatgpt: Chatgpt;
}
interface ComponentPaneState {
    html: string;
}
export default class ContentMessage extends React.Component<ComponentPaneProps, ComponentPaneState> {
    constructor(props: any);
    getSelection(): string;
    render(): JSX.Element;
}
export {};
