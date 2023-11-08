import { ReactNode } from 'react';
import { CustomView, TitleContent } from '@alilc/lowcode-types';
export declare type RegisteredSetter = {
    component: CustomView;
    defaultProps?: object;
    title?: TitleContent;
    /**
     * for MixedSetter to check this setter if available
     */
    condition?: (field: any) => boolean;
    /**
     * for MixedSetter to manual change to this setter
     */
    initialValue?: any | ((field: any) => any);
    recommend?: boolean;
    isDynamic?: boolean;
};
export declare function registerSetter(typeOrMaps: string | {
    [key: string]: CustomView | RegisteredSetter;
}, setter?: CustomView | RegisteredSetter): void;
export declare function getSetter(type: string): RegisteredSetter | null;
export declare function getSettersMap(): Map<string, RegisteredSetter & {
    type: string;
}>;
export declare function createSetterContent(setter: any, props: Record<string, any>): ReactNode;
