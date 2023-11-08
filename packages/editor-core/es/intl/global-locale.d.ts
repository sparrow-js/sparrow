declare class GlobalLocale {
    private emitter;
    private _locale?;
    get locale(): any;
    constructor();
    setLocale(locale: string): void;
    getLocale(): any;
    onChangeLocale(fn: (locale: string) => void): () => void;
}
declare let globalLocale: GlobalLocale;
export { globalLocale };
