import { Component } from 'react';
import './index.less';
export interface DraggableLineProps {
    onDrag: (l: number, e: any) => any;
    onDragStart?: () => any;
    onDragEnd?: () => any;
    position?: 'right' | 'left' | 'top';
    className?: string;
    maxIncrement?: number;
    maxDecrement?: number;
}
export default class DraggableLine extends Component<DraggableLineProps> {
    static displayName: string;
    static defaultProps: {
        onDrag(): void;
        position: string;
        className: string;
        maxIncrement: number;
        maxDecrement: number;
    };
    private startDrag;
    private canDrag;
    private offset;
    private currentOffset;
    private offEvent;
    private offDragEvent;
    private startOffset;
    private shell;
    constructor(props: DraggableLineProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onSelectStart(e: any): void;
    onStartMove(e: any): void;
    onEndMove(): void;
    onDrag(e: any): void;
    getClientPosition(e: any): any;
    initEvent(): () => void;
    initDragEvent(): () => void;
    getParent(): HTMLElement;
    render(): import("react").JSX.Element;
}
