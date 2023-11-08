export declare type HotkeyCallback = (e: KeyboardEvent, combo?: string) => any | false;
export declare class Hotkey {
    private callBacks;
    private directMap;
    private sequenceLevels;
    private resetTimer;
    private ignoreNextKeyup;
    private ignoreNextKeypress;
    private nextExpectedAction;
    mount(window: Window): () => void;
    bind(combos: string[] | string, callback: HotkeyCallback, action?: string): Hotkey;
    unbind(combos: string[] | string, callback: HotkeyCallback, action?: string): void;
    /**
     * resets all sequence counters except for the ones passed in
     */
    private resetSequences;
    /**
     * finds all callbacks that match based on the keycode, modifiers,
     * and action
     */
    private getMatches;
    private handleKey;
    private handleKeyEvent;
    private resetSequenceTimer;
    private bindSequence;
    private bindSingle;
    private bindMultiple;
}
export declare const hotkey: Hotkey;
