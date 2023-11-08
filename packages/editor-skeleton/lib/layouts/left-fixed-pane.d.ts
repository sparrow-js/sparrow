import { Component } from 'react';
import Area from '../area';
import { PanelConfig } from '../types';
import Panel from '../widget/panel';
export default class LeftFixedPane extends Component<{
    area: Area<PanelConfig, Panel>;
}> {
    componentDidUpdate(): void;
    render(): import("react").JSX.Element;
}
