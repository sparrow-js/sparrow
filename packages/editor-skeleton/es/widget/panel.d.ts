import { ReactNode } from 'react';
import { TitleContent } from '@alilc/lowcode-types';
import WidgetContainer from './widget-container';
import { PanelConfig, HelpTipConfig } from '../types';
import { Skeleton } from '../skeleton';
import { IWidget } from './widget';
import PanelDock from './panel-dock';
export default class Panel implements IWidget {
    readonly skeleton: Skeleton;
    readonly config: PanelConfig;
    readonly isWidget = true;
    readonly name: string;
    readonly id: string;
    inited: boolean;
    private _actived;
    private emitter;
    get actived(): boolean;
    get visible(): boolean;
    readonly isPanel = true;
    get body(): {};
    get content(): ReactNode;
    readonly title: TitleContent;
    readonly help?: HelpTipConfig;
    private plain;
    private container?;
    parent?: WidgetContainer;
    constructor(skeleton: Skeleton, config: PanelConfig);
    setParent(parent: WidgetContainer): void;
    add(item: Panel | PanelConfig): Panel;
    getPane(name: string): Panel | null;
    remove(item: Panel | string): number;
    active(item?: Panel | string | null): void;
    getName(): string;
    getContent(): ReactNode;
    /**
     * check is current panel is in float area or not
     *
     * @returns {boolean}
     * @memberof Panel
     */
    isChildOfFloatArea(): boolean;
    /**
     * check is current panel is in fixed area or not
     *
     * @returns {boolean}
     * @memberof Panel
     */
    isChildOfFixedArea(): boolean;
    setActive(flag: boolean): void;
    toggle(): void;
    hide(): void;
    show(): void;
    getAssocDocks(): PanelDock[];
    /**
     * @deprecated
     */
    getSupportedPositions(): string[];
    /**
     * @deprecated
     */
    getCurrentPosition(): string;
    /**
     * @deprecated
     */
    setPosition(): void;
    /**
     * @deprecated
     */
    onActiveChange(fn: (flag: boolean) => void): () => void;
}
export declare function isPanel(obj: any): obj is Panel;
