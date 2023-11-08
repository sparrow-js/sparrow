export declare class FocusTracker {
    mount(win: Window): () => void;
    private actives;
    get first(): Focusable;
    private modals;
    addModal(checkDown: (e: MouseEvent) => boolean, checkOpen: () => boolean): void;
    private checkModalOpen;
    private checkModalDown;
    execSave(): void;
    execEsc(): void;
    create(config: FocusableConfig): Focusable;
    internalActiveItem(item: Focusable): void;
    internalSuspenseItem(item: Focusable): void;
}
export interface FocusableConfig {
    range: HTMLElement | ((e: MouseEvent) => boolean);
    modal?: boolean;
    onEsc?: () => void;
    onBlur?: () => void;
    onSave?: () => void;
    onActive?: () => void;
}
export declare class Focusable {
    private tracker;
    private config;
    readonly isModal: boolean;
    constructor(tracker: FocusTracker, config: FocusableConfig);
    active(): void;
    suspense(): void;
    purge(): void;
    internalCheckInRange(e: MouseEvent): boolean;
    internalTriggerBlur(): void;
    internalTriggerSave(): boolean;
    internalTriggerEsc(): void;
    internalTriggerActive(): void;
}
export declare const focusTracker: FocusTracker;
