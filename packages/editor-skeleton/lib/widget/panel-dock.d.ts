import { ReactNode } from 'react';
import { Skeleton } from '../skeleton';
import { PanelDockConfig } from '../types';
import Panel from './panel';
import { IWidget } from './widget';
export default class PanelDock implements IWidget {
    readonly skeleton: Skeleton;
    readonly config: PanelDockConfig;
    readonly isWidget = true;
    readonly isPanelDock = true;
    readonly id: string;
    readonly name: string;
    readonly align?: string;
    private inited;
    private _body;
    get body(): {};
    private _shell;
    get content(): ReactNode;
    getDOMNode(): Element | Text;
    private _visible;
    get visible(): boolean;
    get actived(): boolean;
    readonly panelName: string;
    private _panel?;
    private _disabled;
    get panel(): Panel;
    constructor(skeleton: Skeleton, config: PanelDockConfig);
    setVisible(flag: boolean): void;
    hide(): void;
    show(): void;
    toggle(): void;
    private setDisabled;
    disable(): void;
    enable(): void;
    get disabled(): boolean;
    togglePanel(): void;
    getName(): string;
    getContent(): ReactNode;
    hidePanel(): void;
    showPanel(): void;
    /**
     * @deprecated
     */
    onActiveChange(func: () => any): () => void;
}
export declare function isPanelDock(obj: any): obj is PanelDock;
