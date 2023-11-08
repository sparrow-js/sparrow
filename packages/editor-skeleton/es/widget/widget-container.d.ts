export interface WidgetItem {
    name: string;
}
export interface Activeable {
    setActive(flag: boolean): void;
}
export default class WidgetContainer<T extends WidgetItem = any, G extends WidgetItem = any> {
    readonly name: string;
    private handle;
    private exclusive;
    private checkVisible;
    private defaultSetCurrent;
    items: T[];
    private maps;
    private _current;
    get current(): T & Activeable;
    constructor(name: string, handle: (item: T | G) => T, exclusive?: boolean, checkVisible?: () => boolean, defaultSetCurrent?: boolean);
    get visible(): boolean;
    active(nameOrItem?: T | string | null): void;
    unactive(nameOrItem?: T | string | null): void;
    unactiveAll(): void;
    add(item: T | G): T;
    get(name: string): T | null;
    getAt(index: number): T | null;
    has(name: string): boolean;
    indexOf(item: T): number;
    /**
     * return indexOf the deletion
     */
    remove(item: string | T): number;
}
