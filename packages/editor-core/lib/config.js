"use strict";

exports.__esModule = true;
exports.engineConfig = exports.EngineConfig = void 0;
var _lodash = require("lodash");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _logger = require("./utils/logger");
var logger = (0, _logger.getLogger)({
  level: 'log',
  bizName: 'config'
});

// this default behavior will be different later
var STRICT_PLUGIN_MODE_DEFAULT = true;

// used in strict mode, when only options in this VALID_ENGINE_OPTIONS can be accepted
// type and description are only used for developer`s assistance, won`t affect runtime
var VALID_ENGINE_OPTIONS = {
  enableCondition: {
    type: 'boolean',
    description: '是否开启 condition 的能力，默认在设计器中不管 condition 是啥都正常展示'
  },
  designMode: {
    type: 'string',
    "enum": ['design', 'live'],
    "default": 'design',
    description: '设计模式，live 模式将会实时展示变量值'
  },
  device: {
    type: 'string',
    "enum": ['default', 'mobile', 'any string value'],
    "default": 'default',
    description: '设备类型'
  },
  deviceClassName: {
    type: 'string',
    "default": undefined,
    description: '指定初始化的 deviceClassName，挂载到画布的顶层节点上'
  },
  locale: {
    type: 'string',
    "default": 'zh_CN',
    description: '语言'
  },
  renderEnv: {
    type: 'string',
    "enum": ['react', 'rax', 'any string value'],
    "default": 'react',
    description: '渲染器类型'
  },
  deviceMapper: {
    type: 'object',
    description: '设备类型映射器，处理设计器与渲染器中 device 的映射'
  },
  enableStrictPluginMode: {
    type: 'boolean',
    "default": STRICT_PLUGIN_MODE_DEFAULT,
    description: '开启严格插件模式，默认值: STRICT_PLUGIN_MODE_DEFAULT , 严格模式下，插件将无法通过engineOptions传递自定义配置项'
  },
  enableReactiveContainer: {
    type: 'boolean',
    "default": false,
    description: '开启拖拽组件时，即将被放入的容器是否有视觉反馈'
  },
  disableAutoRender: {
    type: 'boolean',
    "default": false,
    description: '关闭画布自动渲染，在资产包多重异步加载的场景有效'
  },
  disableDetecting: {
    type: 'boolean',
    "default": false,
    description: '关闭拖拽组件时的虚线响应，性能考虑'
  },
  customizeIgnoreSelectors: {
    type: 'function',
    "default": undefined,
    description: '定制画布中点击被忽略的 selectors, eg. (defaultIgnoreSelectors: string[], e: MouseEvent) => string[]'
  },
  disableDefaultSettingPanel: {
    type: 'boolean',
    "default": false,
    description: '禁止默认的设置面板'
  },
  disableDefaultSetters: {
    type: 'boolean',
    "default": false,
    description: '禁止默认的设置器'
  },
  enableCanvasLock: {
    type: 'boolean',
    "default": false,
    description: '打开画布的锁定操作'
  },
  enableLockedNodeSetting: {
    type: 'boolean',
    "default": false,
    description: '容器锁定后，容器本身是否可以设置属性，仅当画布锁定特性开启时生效'
  },
  stayOnTheSameSettingTab: {
    type: 'boolean',
    "default": false,
    description: '当选中节点切换时，是否停留在相同的设置 tab 上'
  },
  hideSettingsTabsWhenOnlyOneItem: {
    type: 'boolean',
    description: '是否在只有一个 item 的时候隐藏设置 tabs'
  },
  loadingComponent: {
    type: 'ComponentType',
    "default": undefined,
    description: '自定义 loading 组件'
  },
  supportVariableGlobally: {
    type: 'boolean',
    "default": false,
    description: '设置所有属性支持变量配置'
  },
  visionSettings: {
    type: 'object',
    description: 'Vision-polyfill settings'
  },
  simulatorUrl: {
    type: 'array',
    description: '自定义 simulatorUrl 的地址'
  },
  /**
   * 与 react-renderer 的 appHelper 一致，  https://lowcode-engine.cn/docV2/nhilce#appHelper
   */
  appHelper: {
    type: 'object',
    description: '定义 utils 和 constants 等对象'
  },
  requestHandlersMap: {
    type: 'object',
    description: '数据源引擎的请求处理器映射'
  },
  thisRequiredInJSE: {
    type: 'boolean',
    description: 'JSExpression 是否只支持使用 this 来访问上下文变量'
  }
};
var getStrictModeValue = function getStrictModeValue(engineOptions, defaultValue) {
  if (!engineOptions || !(0, _lowcodeUtils.isPlainObject)(engineOptions)) {
    return defaultValue;
  }
  if (engineOptions.enableStrictPluginMode === undefined || engineOptions.enableStrictPluginMode === null) {
    return defaultValue;
  }
  return engineOptions.enableStrictPluginMode;
};
var EngineConfig = /*#__PURE__*/function () {
  function EngineConfig(config) {
    this.config = {};
    this.waits = new Map();
    this.config = config || {};
  }

  /**
   * 判断指定 key 是否有值
   * @param key
   * @returns
   */
  var _proto = EngineConfig.prototype;
  _proto.has = function has(key) {
    return this.config[key] !== undefined;
  }

  /**
   * 获取指定 key 的值
   * @param key
   * @param defaultValue
   * @returns
   */;
  _proto.get = function get(key, defaultValue) {
    return (0, _lodash.get)(this.config, key, defaultValue);
  }

  /**
   * 设置指定 key 的值
   * @param key
   * @param value
   */;
  _proto.set = function set(key, value) {
    this.config[key] = value;
    this.notifyGot(key);
  }

  /**
   * 批量设值，set 的对象版本
   * @param config
   */;
  _proto.setConfig = function setConfig(config) {
    var _this = this;
    if (config) {
      Object.keys(config).forEach(function (key) {
        _this.set(key, config[key]);
      });
    }
  }

  /**
   * if engineOptions.strictPluginMode === true, only accept propertied predefined in EngineOptions.
   *
   * @param {EngineOptions} engineOptions
   * @memberof EngineConfig
   */;
  _proto.setEngineOptions = function setEngineOptions(engineOptions) {
    var _this2 = this;
    if (!engineOptions || !(0, _lowcodeUtils.isPlainObject)(engineOptions)) {
      return;
    }
    var strictMode = getStrictModeValue(engineOptions, STRICT_PLUGIN_MODE_DEFAULT) === true;
    if (strictMode) {
      var isValidKey = function isValidKey(key) {
        var result = VALID_ENGINE_OPTIONS[key];
        return !(result === undefined || result === null);
      };
      Object.keys(engineOptions).forEach(function (key) {
        if (isValidKey(key)) {
          _this2.set(key, engineOptions[key]);
        } else {
          logger.warn("failed to config " + key + " to engineConfig, only predefined options can be set under strict mode, predefined options: ", VALID_ENGINE_OPTIONS);
        }
      });
    } else {
      this.setConfig(engineOptions);
    }
  }

  /**
   * 获取指定 key 的值，若此时还未赋值，则等待，若已有值，则直接返回值
   *  注：此函数返回 Promise 实例，只会执行（fullfill）一次
   * @param key
   * @returns
   */;
  _proto.onceGot = function onceGot(key) {
    var _this3 = this;
    var val = this.config[key];
    if (val !== undefined) {
      return Promise.resolve(val);
    }
    return new Promise(function (resolve) {
      _this3.setWait(key, resolve, true);
    });
  }

  /**
   * 获取指定 key 的值，函数回调模式，若多次被赋值，回调会被多次调用
   * @param key
   * @param fn
   * @returns
   */;
  _proto.onGot = function onGot(key, fn) {
    var _this$config,
      _this4 = this;
    var val = (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config[key];
    if (val !== undefined) {
      fn(val);
      return function () {};
    } else {
      this.setWait(key, fn);
      return function () {
        _this4.delWait(key, fn);
      };
    }
  };
  _proto.notifyGot = function notifyGot(key) {
    var waits = this.waits.get(key);
    if (!waits) {
      return;
    }
    waits = waits.slice().reverse();
    var i = waits.length;
    while (i--) {
      waits[i].resolve(this.get(key));
      if (waits[i].once) {
        waits.splice(i, 1);
      }
    }
    if (waits.length > 0) {
      this.waits.set(key, waits);
    } else {
      this.waits["delete"](key);
    }
  };
  _proto.setWait = function setWait(key, resolve, once) {
    var waits = this.waits.get(key);
    if (waits) {
      waits.push({
        resolve: resolve,
        once: once
      });
    } else {
      this.waits.set(key, [{
        resolve: resolve,
        once: once
      }]);
    }
  };
  _proto.delWait = function delWait(key, fn) {
    var waits = this.waits.get(key);
    if (!waits) {
      return;
    }
    var i = waits.length;
    while (i--) {
      if (waits[i].resolve === fn) {
        waits.splice(i, 1);
      }
    }
    if (waits.length < 1) {
      this.waits["delete"](key);
    }
  };
  return EngineConfig;
}();
exports.EngineConfig = EngineConfig;
var engineConfig = new EngineConfig();
exports.engineConfig = engineConfig;