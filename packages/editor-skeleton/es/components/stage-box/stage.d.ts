import { Component } from 'react';
import { Stage as StageWidget } from '../../widget/stage';
export declare const StageDefaultProps: {
    current: boolean;
};
export declare type StageProps = typeof StageDefaultProps & {
    stage?: StageWidget;
    current: boolean;
    direction?: string;
};
export default class Stage extends Component<StageProps> {
    static defaultProps: {
        current: boolean;
    };
    private timer;
    private additionClassName;
    private shell;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    doSkate(): void;
    render(): JSX.Element;
}
