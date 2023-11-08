import { Component } from 'react';
import { DockProps } from '../../types';
import PanelDock from '../../widget/panel-dock';
import WidgetContainer from '../../widget/widget-container';
import Panel from '../../widget/panel';
import { IWidget } from '../../widget/widget';
import './index.less';
export declare function DockView({ title, icon, description, size, className, onClick }: DockProps): import("react").JSX.Element;
export declare class PanelDockView extends Component<DockProps & {
    dock: PanelDock;
}> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    private lastActived;
    checkActived(): void;
    render(): import("react").JSX.Element;
}
export declare class DialogDockView extends Component {
}
export declare class DraggableLineView extends Component<{
    panel: Panel;
}> {
    private shell;
    private defaultWidth;
    private getDefaultWidth;
    onDrag(value: number): void;
    onDragChange(type: 'start' | 'end'): void;
    render(): import("react").JSX.Element;
}
export declare class TitledPanelView extends Component<{
    panel: Panel;
    area?: string;
}> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    private lastVisible;
    checkVisible(): void;
    render(): import("react").JSX.Element;
}
export declare class PanelView extends Component<{
    panel: Panel;
    area?: string;
    hideOperationRow?: boolean;
    hideDragLine?: boolean;
}> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    private lastVisible;
    checkVisible(): void;
    render(): import("react").JSX.Element;
}
export declare class TabsPanelView extends Component<{
    container: WidgetContainer<Panel>;
}> {
    render(): import("react").JSX.Element;
}
export declare class WidgetView extends Component<{
    widget: IWidget;
}> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    private lastVisible;
    private lastDisabled;
    checkVisible(): void;
    checkDisabled(): void;
    render(): {};
}
