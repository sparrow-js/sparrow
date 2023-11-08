
import { createElement } from 'react';
import { render } from 'react-dom';
import {
    Skeleton as InnerSkeleton,
} from '@firefly/auto-editor-skeleton';
import {
  Designer,
  AutoCodePluginManager,
  ILowCodePluginContext,
  PluginPreference,
} from '@firefly/auto-designer';
import { Editor, globalContext } from '@firefly/auto-editor-core';
import getSkeletonCabin from './modules/skeleton-cabin';
import DesignerPlugin from '@firefly/auto-plugin-designer';
import LocatorPlugin from '@firefly/auto-plugin-locator';
import { IconOutline } from './IconOutline';
import { IconChatgpt } from './IconChatgpt';
import { OutlinePane } from './OutlinePane';
import ComponentPane from '@firefly/auto-plugin-components-pane';
import ChatgptPane from '@firefly/auto-plugin-chatgpt';
import PromptPanel from '@firefly/auto-plugin-prompt';
import { IconPrompt } from './IconPrompt';
import { IconSetting } from './IconSetting';
import SystemSettingPane from '@firefly/auto-plugin-system-setting';


const editor = new Editor();
globalContext.register(editor, Editor);
globalContext.register(editor, 'editor');

const designer = new Designer({ editor });
editor.set('designer' as any, designer);

const innerSkeleton = new InnerSkeleton(editor);
const skeletonCabin = getSkeletonCabin(innerSkeleton);
const { Workbench } = skeletonCabin;
editor.set('skeleton' as any, innerSkeleton);


const plugins = new AutoCodePluginManager(editor).toProxy();

let engineInited = false;

(async function registerPlugins() {
  // const locatorRegistry = (ctx: ILowCodePluginContext) => {
  //   return {
  //     init() {
  //       LocatorPlugin(ctx);
  //     },
  //   };
  // };
  // locatorRegistry.pluginName = '__locator__';
  // await plugins.register(locatorRegistry);

  const defaultPanelRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        innerSkeleton.add({
          area: 'mainArea',
          name: 'designer',
          type: 'Widget',
          content: DesignerPlugin,
        });

        // innerSkeleton.add({
        //   area: 'leftArea',
        //   name: 'outlinePane',
        //   type: 'PanelDock',
        //   content: {
        //     name: 'outline-pane',
        //     props: {
        //       icon: IconOutline,
        //       description: null,
        //     },
        //     content: OutlinePane,
        //   },
        //   panelProps: {
        //     area: 'leftFloatArea',
        //     keepVisibleWhileDragging: true,
        //   },
        // });
      },
    };
  };
  defaultPanelRegistry.pluginName = '___default_panel___';
  await plugins.register(defaultPanelRegistry);

  // 组件面板
  const componentPanelRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        innerSkeleton.add({
            area: 'leftArea',
            type: 'PanelDock',
            name: 'componentsPane',
            content: {
              name: 'component-pane',
              props: {
                icon: IconOutline,
                description: null,
                editor,
              },
              content: ComponentPane,
            },
            contentProps: {
              editor,
            },
            panelProps: {
              area: 'leftFloatArea',
              keepVisibleWhileDragging: true,
            },
          });
      },
    };
  };

  componentPanelRegistry.pluginName = '___component_panel___';

  await plugins.register(componentPanelRegistry);

  // chatGPT面板
  const chatGPTPanelRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        innerSkeleton.add({
            area: 'leftArea',
            type: 'PanelDock',
            name: 'chatgptPane',
            content: {
              name: 'chatgpt-pane',
              props: {
                icon: IconChatgpt,
                description: null,
                editor,
              },
              content: ChatgptPane,
            },
            contentProps: {
              editor,
            },
            panelProps: {
              area: 'leftFixedArea',
              keepVisibleWhileDragging: true,
            },
          });
      },
    };
  };

  chatGPTPanelRegistry.pluginName = '___chatgpt_panel___';

  await plugins.register(chatGPTPanelRegistry);

  // prompt 面板
  const promptPanelRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        innerSkeleton.add({
            area: 'leftArea',
            type: 'PanelDock',
            name: 'PromptPanel',
            content: {
              name: 'prompt-panel',
              props: {
                icon: IconPrompt,
                description: null,
                editor,
              },
              content: PromptPanel,
            },
            contentProps: {
              editor,
            },
            panelProps: {
              area: 'leftFixedArea',
              keepVisibleWhileDragging: true,
            },
          });
      },
    };
  };

  promptPanelRegistry.pluginName = '___prompt_panel___';

  await plugins.register(promptPanelRegistry);

  // 设置面板
  const SystemSettingRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        innerSkeleton.add({
            area: 'leftArea',
            type: 'PanelDock',
            name: 'SystemSettingPanel',
            content: {
              name: 'system-setting-panel',
              props: {
                icon: IconSetting,
                description: null,
                editor,
                align: 'bottom',
              },
              content: SystemSettingPane,
            },
            contentProps: {
              editor,
            },
            panelProps: {
              area: 'leftFixedArea',
              keepVisibleWhileDragging: true,
            },
          });
      },
    };
  };

  SystemSettingRegistry.pluginName = '___system-setting_panel___';

  await plugins.register(SystemSettingRegistry);

  const editorInit = (ctx: ILowCodePluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        // 修改面包屑组件的分隔符属性setter
        // const assets = await (
        //   await fetch(
        //     `https://alifd.alicdn.com/npm/@alilc/lowcode-materials/build/lowcode/assets-prod.json`
        //   )
        // ).json();
        // 设置物料描述
        const { project } = ctx;

        // 加载 schema
        project.open();
      },
    };
  };
  editorInit.pluginName = 'editorInit';
  await plugins.register(editorInit);
})();

export async function init(
    container?: HTMLElement | null,
    options?: any,
    pluginPreference?: any,
) {
    if (engineInited) return;
    engineInited = true;

    let engineOptions = options;
    let engineContainer = container || document.createElement('div');
    await plugins.init(pluginPreference as any);
    render(
        createElement(Workbench, {
          skeleton: innerSkeleton,
          className: 'engine-main',
          topAreaItemClassName: 'engine-actionitem',
        }),
        engineContainer,
      );
    console.log('auto engine core init');
}