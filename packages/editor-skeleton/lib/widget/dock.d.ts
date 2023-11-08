import { ReactNode } from 'react';
import { DockConfig } from '../types';
import { Skeleton } from '../skeleton';
import { IWidget } from './widget';
/**
 * 带图标（主要）/标题（次要）的扩展
 */
export default class Dock implements IWidget {
    readonly skeleton: Skeleton;
    readonly config: DockConfig;
    readonly isWidget = true;
    readonly id: string;
    readonly name: string;
    readonly align?: string;
    private _visible;
    get visible(): boolean;
    private _disabled;
    get content(): ReactNode;
    private inited;
    private _body;
    get body(): ReactNode;
    constructor(skeleton: Skeleton, config: DockConfig);
    setVisible(flag: boolean): void;
    private setDisabled;
    disable(): void;
    enable(): void;
    get disabled(): boolean;
    getContent(): ReactNode;
    getName(): string;
    hide(): void;
    show(): void;
    toggle(): void;
}
