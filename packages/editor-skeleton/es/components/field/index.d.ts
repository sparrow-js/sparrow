import { ReactNode } from 'react';
import { TitleContent } from '@alilc/lowcode-types';
import './index.less';
import { Field, PopupField, EntryField, PlainField } from './fields';
export interface FieldProps {
    className?: string;
    title?: TitleContent | null;
    display?: 'accordion' | 'inline' | 'block' | 'plain' | 'popup' | 'entry';
    collapsed?: boolean;
    valueState?: number;
    onExpandChange?: (collapsed: boolean) => void;
    onClear?: () => void;
    [extra: string]: any;
}
export declare function createField(props: FieldProps, children: ReactNode, type?: 'accordion' | 'inline' | 'block' | 'plain' | 'popup' | 'entry'): import("react").ReactSVGElement | import("react").CElement<{
    defaultDisplay: "block" | "inline" | "accordion";
    className?: string;
    title?: TitleContent;
    display?: "block" | "inline" | "popup" | "accordion" | "plain" | "entry";
    collapsed?: boolean;
    valueState?: number;
    onExpandChange?: (collapsed: boolean) => void;
    onClear?: () => void;
}, import("react").Component<{
    defaultDisplay: "block" | "inline" | "accordion";
    className?: string;
    title?: TitleContent;
    display?: "block" | "inline" | "popup" | "accordion" | "plain" | "entry";
    collapsed?: boolean;
    valueState?: number;
    onExpandChange?: (collapsed: boolean) => void;
    onClear?: () => void;
}, any, any>>;
export { Field, PopupField, EntryField, PlainField };
