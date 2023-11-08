import { Editor } from '@firefly/auto-editor-core';
import { DockConfig, PanelConfig, WidgetConfig, IWidgetBaseConfig, PanelDockConfig, DialogDockConfig } from './types';
import Panel from './widget/panel';
import WidgetContainer from './widget/widget-container';
import Area from './area';
import Widget, { IWidget } from './widget/widget';
import { Stage, StageConfig } from './widget/stage';
import { EditorConfig, PluginClassSet } from '@alilc/lowcode-types';
export declare enum SkeletonEvents {
    PANEL_DOCK_ACTIVE = "skeleton.panel-dock.active",
    PANEL_DOCK_UNACTIVE = "skeleton.panel-dock.unactive",
    PANEL_SHOW = "skeleton.panel.show",
    PANEL_HIDE = "skeleton.panel.hide",
    WIDGET_SHOW = "skeleton.widget.show",
    WIDGET_HIDE = "skeleton.widget.hide",
    WIDGET_DISABLE = "skeleton.widget.disable",
    WIDGET_ENABLE = "skeleton.widget.enable"
}
export declare class Skeleton {
    readonly editor: Editor;
    private panels;
    private containers;
    readonly leftArea: Area<DockConfig | PanelDockConfig | DialogDockConfig>;
    readonly leftFloatArea: Area<PanelConfig, Panel>;
    readonly leftFixedArea: Area<PanelConfig, Panel>;
    readonly mainArea: Area<WidgetConfig | PanelConfig, Widget | Panel>;
    readonly stages: Area<StageConfig, Stage>;
    constructor(editor: Editor);
    /**
     * setup events
     *
     * @memberof Skeleton
     */
    setupEvents(): void;
    /**
     * set isFloat status for panel
     *
     * @param {*} panel
     * @memberof Skeleton
     */
    toggleFloatStatus(panel: Panel): void;
    buildFromConfig(config?: EditorConfig, components?: PluginClassSet): void;
    private setupPlugins;
    postEvent(event: SkeletonEvents, ...args: any[]): void;
    readonly widgets: IWidget[];
    createWidget(config: IWidgetBaseConfig | IWidget): IWidget;
    getWidget(name: string): IWidget | undefined;
    createPanel(config: PanelConfig): Panel;
    getPanel(name: string): Panel | undefined;
    getStage(name: string): Stage;
    createStage(config: any): string;
    createContainer(name: string, handle: (item: any) => any, exclusive?: boolean, checkVisible?: () => boolean, defaultSetCurrent?: boolean): WidgetContainer<any, any>;
    private parseConfig;
    add(config: IWidgetBaseConfig, extraConfig?: Record<string, any>): IWidget | Panel;
}
