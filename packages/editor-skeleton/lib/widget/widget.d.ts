import { ReactNode } from 'react';
import { WidgetConfig, IWidgetBaseConfig } from '../types';
import { Skeleton } from '../skeleton';
import { TitleContent } from '@alilc/lowcode-types';
export interface IWidget {
    readonly name: string;
    readonly content: ReactNode;
    readonly align?: string;
    readonly isWidget: true;
    readonly visible: boolean;
    readonly disabled?: boolean;
    readonly body: ReactNode;
    readonly skeleton: Skeleton;
    readonly config: IWidgetBaseConfig;
    getName(): string;
    getContent(): any;
    show(): void;
    hide(): void;
    toggle(): void;
    enable?(): void;
    disable?(): void;
}
export default class Widget implements IWidget {
    readonly skeleton: Skeleton;
    readonly config: WidgetConfig;
    readonly isWidget = true;
    readonly id: string;
    readonly name: string;
    readonly align?: string;
    private _visible;
    get visible(): boolean;
    inited: boolean;
    private _disabled;
    private _body;
    get body(): ReactNode;
    get content(): ReactNode;
    readonly title: TitleContent;
    constructor(skeleton: Skeleton, config: WidgetConfig);
    getId(): string;
    getName(): string;
    getContent(): ReactNode;
    hide(): void;
    show(): void;
    setVisible(flag: boolean): void;
    toggle(): void;
    private setDisabled;
    disable(): void;
    enable(): void;
    get disabled(): boolean;
}
export declare function isWidget(obj: any): obj is IWidget;
