/// <reference types="node" />
import { StrictEventEmitter } from 'strict-event-emitter-types';
import { EventEmitter } from 'events';
import { IEditor, EditorConfig, PluginClassSet, KeyType, GetReturnType, HookConfig, GlobalEvent } from '@alilc/lowcode-types';
import Preference from './utils/preference';
import { AssetsJson } from '@alilc/lowcode-utils';
export declare interface Editor extends StrictEventEmitter<EventEmitter, GlobalEvent.EventConfig> {
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    listenerCount(type: string | symbol): number;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    eventNames(): Array<string | symbol>;
    getPreference(): Preference;
}
declare const Editor_base: any;
export declare class Editor extends Editor_base implements IEditor {
    /**
     * Ioc Container
     */
    private context;
    get locale(): any;
    /**
     * used to store preferences
     *
     * @memberof Editor
     */
    readonly preference: Preference;
    private hooks;
    get<T = undefined, KeyOrType = any>(keyOrType: KeyOrType): GetReturnType<T, KeyOrType> | undefined;
    has(keyOrType: KeyType): boolean;
    set(key: KeyType, data: any): void | Promise<void>;
    setAssets(assets: AssetsJson): Promise<void>;
    onceGot<T = undefined, KeyOrType extends KeyType = any>(keyOrType: KeyOrType): Promise<GetReturnType<T, KeyOrType>>;
    onGot<T = undefined, KeyOrType extends KeyType = any>(keyOrType: KeyOrType, fn: (data: GetReturnType<T, KeyOrType>) => void): () => void;
    register(data: any, key?: KeyType): void;
    config?: EditorConfig;
    components?: PluginClassSet;
    init(config?: EditorConfig, components?: PluginClassSet): Promise<any>;
    destroy(): void;
    initHooks: (hooks: HookConfig[]) => HookConfig[];
    registerHooks: (hooks: HookConfig[]) => void;
    unregisterHooks: () => void;
    private waits;
    private notifyGot;
    private setWait;
    private delWait;
}
export {};
