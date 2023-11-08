import { Component } from 'react';
import Area from '../area';
import Panel from '../widget/panel';
export default class LeftFloatPane extends Component<{
    area: Area<any, Panel>;
}> {
    private dispose?;
    private focusing?;
    private shell;
    componentDidMount(): void;
    onEffect(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): import("react").JSX.Element;
}
