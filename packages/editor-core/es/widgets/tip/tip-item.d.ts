import { Component } from 'react';
export declare class TipItem extends Component {
    private dispose?;
    constructor(props: any);
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    private timer;
    clearTimer(): void;
    private shell;
    private originClassName;
    updateTip(): void;
    render(): import("react").JSX.Element;
}
