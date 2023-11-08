import { SettingTopEntry } from '@alilc/lowcode-designer';
import { Editor } from '@alilc/lowcode-editor-core';
export declare class SettingsMain {
    readonly editor: Editor;
    private emitter;
    private _sessionId;
    private _settings?;
    get length(): number | undefined;
    get componentMeta(): import("@alilc/lowcode-designer").ComponentMeta;
    get settings(): SettingTopEntry;
    private disposeListener;
    private designer?;
    constructor(editor: Editor);
    private init;
    private setup;
    purge(): void;
}
