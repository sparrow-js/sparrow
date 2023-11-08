import { ReactElement, ComponentType } from 'react';
import { TitleContent, IconType, I18nData, TipContent } from '@alilc/lowcode-types';
import { IWidget } from './widget/widget';
/**
 * 所有可能的停靠位置
 */
export declare type IWidgetConfigArea = 'leftArea' | 'left' | 'rightArea' | 'right' | 'topArea' | 'top' | 'toolbar' | 'mainArea' | 'main' | 'center' | 'centerArea' | 'bottomArea' | 'bottom' | 'leftFixedArea' | 'leftFloatArea' | 'stages';
export interface IWidgetBaseConfig {
    type: string;
    name: string;
    /**
     * 停靠位置：
     * - 当 type 为 'Panel' 时自动为 'leftFloatArea'；
     * - 当 type 为 'Widget' 时自动为 'mainArea'；
     * - 其他时候自动为 'leftArea'；
     */
    area?: IWidgetConfigArea;
    props?: Record<string, any>;
    content?: any;
    contentProps?: Record<string, any>;
    [extra: string]: any;
}
export interface WidgetConfig extends IWidgetBaseConfig {
    type: 'Widget';
    props?: {
        align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
        onInit?: (widget: IWidget) => void;
        title?: TitleContent;
    };
    content?: string | ReactElement | ComponentType<any>;
}
export declare function isWidgetConfig(obj: any): obj is WidgetConfig;
export interface DockProps {
    title?: TitleContent;
    icon?: IconType;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    description?: TipContent;
    onClick?: () => void;
}
export interface DividerConfig extends IWidgetBaseConfig {
    type: 'Divider';
    props?: {
        align?: 'left' | 'right' | 'center';
    };
}
export declare function isDividerConfig(obj: any): obj is DividerConfig;
export interface IDockBaseConfig extends IWidgetBaseConfig {
    props?: DockProps & {
        align?: 'left' | 'right' | 'bottom' | 'center' | 'top';
        onInit?: (widget: IWidget) => void;
    };
}
export interface DockConfig extends IDockBaseConfig {
    type: 'Dock';
    content?: string | ReactElement | ComponentType<any>;
}
export declare function isDockConfig(obj: any): obj is DockConfig;
export interface DialogDockConfig extends IDockBaseConfig {
    type: 'DialogDock';
    dialogProps?: {
        title?: TitleContent;
        [key: string]: any;
    };
}
export declare function isDialogDockConfig(obj: any): obj is DialogDockConfig;
export interface PanelConfig extends IWidgetBaseConfig {
    type: 'Panel';
    content?: string | ReactElement | ComponentType<any> | PanelConfig[];
    props?: PanelProps;
}
export declare function isPanelConfig(obj: any): obj is PanelConfig;
export declare type HelpTipConfig = string | {
    url?: string;
    content?: string | ReactElement;
};
export interface PanelProps {
    title?: TitleContent;
    icon?: any;
    description?: string | I18nData;
    hideTitleBar?: boolean;
    help?: HelpTipConfig;
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    condition?: (widget: IWidget) => any;
    onInit?: (widget: IWidget) => any;
    onDestroy?: () => any;
    shortcut?: string;
    enableDrag?: boolean;
    keepVisibleWhileDragging?: boolean;
}
export interface PanelDockConfig extends IDockBaseConfig {
    type: 'PanelDock';
    panelName?: string;
    panelProps?: PanelProps & {
        area?: IWidgetConfigArea;
    };
    content?: string | ReactElement | ComponentType<any> | PanelConfig[];
}
export declare function isPanelDockConfig(obj: any): obj is PanelDockConfig;
