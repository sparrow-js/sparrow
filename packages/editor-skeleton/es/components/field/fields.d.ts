import { Component, MouseEvent } from 'react';
import { IEditor, TitleContent } from '@alilc/lowcode-types';
import './index.less';
export interface FieldProps {
    className?: string;
    meta?: {
        package: string;
        componentName: string;
    } | string;
    title?: TitleContent | null;
    editor?: IEditor;
    defaultDisplay?: 'accordion' | 'inline' | 'block' | 'plain' | 'popup' | 'entry';
    collapsed?: boolean;
    valueState?: number;
    name?: string;
    tip?: any;
    onExpandChange?: (expandState: boolean) => void;
    onClear?: () => void;
}
export declare class Field extends Component<FieldProps> {
    state: {
        collapsed: boolean;
        display: "block" | "inline" | "popup" | "accordion" | "plain" | "entry";
        hasError: boolean;
    };
    constructor(props: any);
    private toggleExpand;
    private body;
    private dispose?;
    private deployBlockTesting;
    private handleClear;
    componentDidMount(): void;
    componentWillUnmount(): void;
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    getTipContent(propName: string, tip?: any): any;
    clickHandler(event?: MouseEvent): void;
    render(): import("react").JSX.Element;
}
export interface PopupFieldProps extends FieldProps {
    width?: number;
}
export declare class PopupField extends Component<PopupFieldProps> {
    static contextType: any;
    private pipe;
    static defaultProps: PopupFieldProps;
    render(): import("react").JSX.Element;
}
export interface EntryFieldProps extends FieldProps {
    stageName?: string;
}
export declare class EntryField extends Component<EntryFieldProps> {
    render(): import("react").JSX.Element;
}
export declare class PlainField extends Component<FieldProps> {
    render(): import("react").JSX.Element;
}
