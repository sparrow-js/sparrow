import { ReactNode } from 'react';
import { globalLocale } from './global-locale';
export declare function intl(data: any, params?: object): ReactNode;
export declare function shallowIntl(data: any): any;
export declare function intlNode(data: any, params?: object): ReactNode;
export declare function createIntl(instance: string | object): {
    intlNode(id: string, params?: object): ReactNode;
    intl(id: string, params?: object): string;
    getLocale(): string;
    setLocale(locale: string): void;
};
export { globalLocale };
