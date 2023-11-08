import { Component } from 'react';
import Area from '../area';
import Panel from '../widget/panel';
import Widget from '../widget/widget';
export default class MainArea extends Component<{
    area: Area<any, Panel | Widget>;
}> {
    render(): import("react").JSX.Element;
}
