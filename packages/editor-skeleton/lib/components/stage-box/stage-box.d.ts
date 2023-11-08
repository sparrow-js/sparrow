import React, { Component } from 'react';
import { SettingTopEntry, SettingField } from '@alilc/lowcode-designer';
import StageChain from './stage-chain';
import { Skeleton } from '../../skeleton';
export declare const StageBoxDefaultProps: {};
export declare type StageBoxProps = typeof StageBoxDefaultProps & {
    stageChain?: StageChain;
    className?: string;
    children: React.ReactNode;
    skeleton: Skeleton;
    target?: SettingTopEntry | SettingField;
};
export default class StageBox extends Component<StageBoxProps> {
    static defaultProps: {};
    static displayName: string;
    private stageChain;
    private willDetach;
    private shell;
    private popupPipe;
    private pipe;
    constructor(props: StageBoxProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
