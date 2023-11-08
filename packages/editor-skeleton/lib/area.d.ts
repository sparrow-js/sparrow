import WidgetContainer from './widget/widget-container';
import { Skeleton } from './skeleton';
import { IWidget } from './widget/widget';
import { IWidgetBaseConfig } from './types';
export default class Area<C extends IWidgetBaseConfig = any, T extends IWidget = IWidget> {
    readonly skeleton: Skeleton;
    readonly name: string;
    private exclusive?;
    private _visible;
    get visible(): boolean;
    get current(): T & import("./widget/widget-container").Activeable;
    readonly container: WidgetContainer<T, C>;
    constructor(skeleton: Skeleton, name: string, handle: (item: T | C) => T, exclusive?: boolean, defaultSetCurrent?: boolean);
    isEmpty(): boolean;
    add(config: T | C): T;
    remove(config: T | string): number;
    private lastCurrent;
    setVisible(flag: boolean): void;
    hide(): void;
    show(): void;
    /**
     * @deprecated
     */
    removeAction(config: string): number;
}
