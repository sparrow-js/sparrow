/// <reference types="react" />
declare const intl: (id: string, params?: object) => string, intlNode: (id: string, params?: object) => import("react").ReactNode, getLocale: () => string, setLocale: (locale: string) => void;
export { intl, intlNode, getLocale, setLocale };
