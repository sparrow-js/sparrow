import { TipConfig } from '@alilc/lowcode-types';
export interface TipOptions extends TipConfig {
    target: HTMLElement;
}
declare class TipHandler {
    tip: TipOptions | null;
    private showDelay;
    private hideDelay;
    private emitter;
    setTarget(target: HTMLElement): void;
    hideImmediately(): void;
    onChange(func: () => void): () => void;
}
export declare const tipHandler: TipHandler;
export declare function postTip(id: string, props: TipConfig | null): void;
export {};
