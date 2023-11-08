import { Component } from 'react';
import { Skeleton } from '../skeleton';
import './workbench.less';
import { EditorConfig, PluginClassSet } from '@alilc/lowcode-types';
export declare class Workbench extends Component<{
    skeleton: Skeleton;
    config?: EditorConfig;
    components?: PluginClassSet;
    className?: string;
    topAreaItemClassName?: string;
}> {
    constructor(props: any);
    render(): import("react").JSX.Element;
}
