import { Component } from 'react';
import { Editor } from '@alilc/lowcode-editor-core';
export declare class SettingsPrimaryPane extends Component<{
    editor: Editor;
    config: any;
}, {
    shouldIgnoreRoot: boolean;
}> {
    state: {
        shouldIgnoreRoot: boolean;
    };
    private main;
    private _activeKey?;
    constructor(props: any);
    componentDidMount(): void;
    setShouldIgnoreRoot(): Promise<void>;
    componentWillUnmount(): void;
    renderBreadcrumb(): JSX.Element;
    render(): JSX.Element;
}
