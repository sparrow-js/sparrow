/**
 * used to store user preferences, such as pinned status of a pannel.
 * save to local storage.
 *
 * @class PreferenceStore
 */
export default class Preference {
    getStorageKey(key: string, module?: string): string;
    set(key: string, value: any, module?: string): void;
    get(key: string, module: string): any;
    /**
     * check if local storage contain certain key
     *
     * @param {string} key
     * @param {string} module
     * @returns {boolean}
     * @memberof Preference
     */
    contains(key: string, module: string): boolean;
}
