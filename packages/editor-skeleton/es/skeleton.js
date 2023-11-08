import _Divider from "@alifd/next/lib/divider";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
var _excluded = ["dialogProps", "balloonProps", "panelProps", "linkProps"],
  _excluded2 = ["content"];
var _class;
import { action, makeObservable } from '@firefly/auto-editor-core';
import { isDockConfig, isPanelDockConfig, isPanelConfig, isDividerConfig } from './types';
import Panel, { isPanel } from './widget/panel';
import WidgetContainer from './widget/widget-container';
import Area from './area';
import Widget, { isWidget } from './widget/widget';
import PanelDock from './widget/panel-dock';
import Dock from './widget/dock';
import { Stage } from './widget/stage';
import { isValidElement } from 'react';
import { isPlainObject, uniqueId } from '@alilc/lowcode-utils';
export var SkeletonEvents = /*#__PURE__*/function (SkeletonEvents) {
  SkeletonEvents["PANEL_DOCK_ACTIVE"] = "skeleton.panel-dock.active";
  SkeletonEvents["PANEL_DOCK_UNACTIVE"] = "skeleton.panel-dock.unactive";
  SkeletonEvents["PANEL_SHOW"] = "skeleton.panel.show";
  SkeletonEvents["PANEL_HIDE"] = "skeleton.panel.hide";
  SkeletonEvents["WIDGET_SHOW"] = "skeleton.widget.show";
  SkeletonEvents["WIDGET_HIDE"] = "skeleton.widget.hide";
  SkeletonEvents["WIDGET_DISABLE"] = "skeleton.widget.disable";
  SkeletonEvents["WIDGET_ENABLE"] = "skeleton.widget.enable";
  return SkeletonEvents;
}({});
export var Skeleton = (_class = /*#__PURE__*/function () {
  function Skeleton(editor) {
    var _this = this;
    this.editor = editor;
    this.panels = new Map();
    this.containers = new Map();
    this.leftArea = void 0;
    this.leftFloatArea = void 0;
    this.leftFixedArea = void 0;
    this.mainArea = void 0;
    this.stages = void 0;
    this.widgets = [];
    makeObservable(this);
    this.leftArea = new Area(this, 'leftArea', function (config) {
      if (isWidget(config)) {
        return config;
      }
      return _this.createWidget(config);
    }, false);
    this.leftFixedArea = new Area(this, 'leftFixedArea', function (config) {
      if (isPanel(config)) {
        return config;
      }
      return _this.createPanel(config);
    }, true);
    this.leftFloatArea = new Area(this, 'leftFloatArea', function (config) {
      if (isPanel(config)) {
        return config;
      }
      return _this.createPanel(config);
    }, true);
    this.mainArea = new Area(this, 'mainArea', function (config) {
      if (isWidget(config)) {
        return config;
      }
      return _this.createWidget(config);
    }, true, true);
    this.stages = new Area(this, 'stages', function (config) {
      if (isWidget(config)) {
        return config;
      }
      return new Stage(_this, config);
    });
    this.setupPlugins();
    this.setupEvents();
  }
  /**
   * setup events
   *
   * @memberof Skeleton
   */
  var _proto = Skeleton.prototype;
  _proto.setupEvents = function setupEvents() {
    // adjust pinned status when panel shown
    // this.editor.on('skeleton.panel.show', (panelName, panel) => {
    //   const panelNameKey = `${panelName}-pinned-status-isFloat`;
    //   const isInFloatAreaPreferenceExists = this.editor?.getPreference()?.contains(panelNameKey, 'skeleton');
    //   if (isInFloatAreaPreferenceExists) {
    //     const isInFloatAreaFromPreference = this.editor?.getPreference()?.get(panelNameKey, 'skeleton');
    //     const isCurrentInFloatArea = panel?.isChildOfFloatArea();
    //     if (isInFloatAreaFromPreference !== isCurrentInFloatArea) {
    //       this.toggleFloatStatus(panel);
    //     }
    //   }
    // });
  }

  /**
   * set isFloat status for panel
   *
   * @param {*} panel
   * @memberof Skeleton
   */;
  _proto.toggleFloatStatus = function toggleFloatStatus(panel) {
    var _panel$parent, _this$editor, _this$editor$getPrefe;
    var isFloat = (panel === null || panel === void 0 ? void 0 : (_panel$parent = panel.parent) === null || _panel$parent === void 0 ? void 0 : _panel$parent.name) === 'leftFloatArea';
    if (isFloat) {
      this.leftFloatArea.remove(panel);
      this.leftFixedArea.add(panel);
      this.leftFixedArea.container.active(panel);
    } else {
      this.leftFixedArea.remove(panel);
      this.leftFloatArea.add(panel);
      this.leftFloatArea.container.active(panel);
    }
    (_this$editor = this.editor) === null || _this$editor === void 0 ? void 0 : (_this$editor$getPrefe = _this$editor.getPreference()) === null || _this$editor$getPrefe === void 0 ? void 0 : _this$editor$getPrefe.set(panel.name + "-pinned-status-isFloat", !isFloat, 'skeleton');
  };
  _proto.buildFromConfig = function buildFromConfig(config, components) {
    if (components === void 0) {
      components = {};
    }
    if (config) {
      this.editor.init(config, components);
    }
    this.setupPlugins();
  };
  _proto.setupPlugins = function setupPlugins() {
    var _this2 = this;
    var _this$editor2 = this.editor,
      config = _this$editor2.config,
      _this$editor2$compone = _this$editor2.components,
      components = _this$editor2$compone === void 0 ? {} : _this$editor2$compone;
    if (!config) {
      return;
    }
    var plugins = config.plugins;
    if (!plugins) {
      return;
    }
    Object.keys(plugins).forEach(function (area) {
      plugins[area].forEach(function (item) {
        var pluginKey = item.pluginKey,
          type = item.type,
          _item$props = item.props,
          props = _item$props === void 0 ? {} : _item$props,
          pluginProps = item.pluginProps;
        var config = {
          area: area,
          type: 'Widget',
          name: pluginKey,
          contentProps: pluginProps
        };
        var dialogProps = props.dialogProps,
          balloonProps = props.balloonProps,
          panelProps = props.panelProps,
          linkProps = props.linkProps,
          restProps = _objectWithoutPropertiesLoose(props, _excluded);
        config.props = restProps;
        if (dialogProps) {
          config.dialogProps = dialogProps;
        }
        if (balloonProps) {
          config.balloonProps = balloonProps;
        }
        if (panelProps) {
          config.panelProps = panelProps;
        }
        if (linkProps) {
          config.linkProps = linkProps;
        }
        if (type === 'TabPanel') {
          config.type = 'Panel';
        } else if (/Icon$/.test(type)) {
          config.type = type.replace('Icon', 'Dock');
        }
        if (pluginKey in components) {
          config.content = components[pluginKey];
        }
        _this2.add(config);
      });
    });
  };
  _proto.postEvent = function postEvent(event) {
    // this.editor.emit(event, ...args);
  };
  _proto.createWidget = function createWidget(config) {
    if (isWidget(config)) {
      return config;
    }
    config = this.parseConfig(config);
    var widget;
    if (isDockConfig(config)) {
      if (isPanelDockConfig(config)) {
        // outline-pane
        widget = new PanelDock(this, config);
        if (config.name === 'outline-pane') {
          widget.togglePanel();
        }
      } else if (false) {
        // DialogDock
        // others...
      } else {
        widget = new Dock(this, config);
      }
    } else if (isDividerConfig(config)) {
      widget = new Widget(this, _extends({}, config, {
        type: 'Widget',
        content: _Divider
      }));
    } else if (isPanelConfig(config)) {
      widget = this.createPanel(config);
    } else {
      widget = new Widget(this, config);
    }
    this.widgets.push(widget);
    return widget;
  };
  _proto.getWidget = function getWidget(name) {
    return this.widgets.find(function (widget) {
      return widget.name === name;
    });
  };
  _proto.createPanel = function createPanel(config) {
    var parsedConfig = this.parseConfig(config);
    var panel = new Panel(this, parsedConfig);
    this.panels.set(panel.name, panel);
    return panel;
  };
  _proto.getPanel = function getPanel(name) {
    return this.panels.get(name);
  };
  _proto.getStage = function getStage(name) {
    return this.stages.container.get(name);
  };
  _proto.createStage = function createStage(config) {
    var _stage$getName;
    var stage = this.add(_extends({
      name: uniqueId('stage'),
      area: 'stages'
    }, config));
    return stage === null || stage === void 0 ? void 0 : (_stage$getName = stage.getName) === null || _stage$getName === void 0 ? void 0 : _stage$getName.call(stage);
  };
  _proto.createContainer = function createContainer(name, handle, exclusive, checkVisible, defaultSetCurrent) {
    if (exclusive === void 0) {
      exclusive = false;
    }
    if (checkVisible === void 0) {
      checkVisible = function checkVisible() {
        return true;
      };
    }
    if (defaultSetCurrent === void 0) {
      defaultSetCurrent = false;
    }
    var container = new WidgetContainer(name, handle, exclusive, checkVisible, defaultSetCurrent);
    this.containers.set(name, container);
    return container;
  };
  _proto.parseConfig = function parseConfig(config) {
    if (config.parsed) {
      return config;
    }
    var content = config.content,
      restConfig = _objectWithoutPropertiesLoose(config, _excluded2);
    if (content) {
      if (isPlainObject(content) && ! /*#__PURE__*/isValidElement(content)) {
        Object.keys(content).forEach(function (key) {
          if (/props$/i.test(key) && restConfig[key]) {
            restConfig[key] = _extends({}, restConfig[key], content[key]);
          } else {
            restConfig[key] = content[key];
          }
        });
      } else {
        restConfig.content = content;
      }
    }
    restConfig.pluginKey = restConfig.name;
    restConfig.parsed = true;
    return restConfig;
  };
  _proto.add = function add(config, extraConfig) {
    var parsedConfig = _extends({}, this.parseConfig(config), extraConfig);
    var area = parsedConfig.area;
    if (!area) {
      if (parsedConfig.type === 'Panel') {
        area = 'leftFloatArea';
      } else if (parsedConfig.type === 'Widget') {
        area = 'mainArea';
      } else {
        area = 'leftArea';
      }
    }
    switch (area) {
      case 'leftArea':
      case 'left':
        return this.leftArea.add(parsedConfig);
      case 'mainArea':
      case 'main':
      case 'center':
      case 'centerArea':
        return this.mainArea.add(parsedConfig);
      case 'leftFixedArea':
        return this.leftFixedArea.add(parsedConfig);
      case 'leftFloatArea':
        return this.leftFloatArea.add(parsedConfig);
      case 'stages':
        return this.stages.add(parsedConfig);
      default:
      // do nothing
    }
  };
  return Skeleton;
}(), (_applyDecoratedDescriptor(_class.prototype, "toggleFloatStatus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleFloatStatus"), _class.prototype)), _class);