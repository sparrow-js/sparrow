"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Editor = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _events = require("events");
var _config = require("./config");
var _intl = require("./intl");
var _preference = _interopRequireDefault(require("./utils/preference"));
var _utils = require("./utils");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _dec, _class, _descriptor;
_events.EventEmitter.defaultMaxListeners = 100;

// inner instance keys which should not be stored in config
var keyBlacklist = ['designer', 'skeleton', 'currentDocument', 'simulator', 'plugins'];
// eslint-disable-next-line no-redeclare
var Editor = (_dec = _utils.obx.shallow, (_class = /*#__PURE__*/function (_ref) {
  (0, _inheritsLoose2["default"])(Editor, _ref);
  function Editor() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ref.call.apply(_ref, [this].concat(args)) || this;
    /**
     * Ioc Container
     */
    (0, _initializerDefineProperty2["default"])(_this, "context", _descriptor, (0, _assertThisInitialized2["default"])(_this));
    // readonly utils = utils;
    /**
     * used to store preferences
     *
     * @memberof Editor
     */
    _this.preference = new _preference["default"]();
    _this.hooks = [];
    _this.config = void 0;
    _this.components = void 0;
    _this.initHooks = function (hooks) {
      _this.hooks = hooks.map(function (hook) {
        return (0, _extends2["default"])({}, hook, {
          // 指定第一个参数为 editor
          handler: hook.handler.bind((0, _assertThisInitialized2["default"])(_this), (0, _assertThisInitialized2["default"])(_this))
        });
      });
      return _this.hooks;
    };
    _this.registerHooks = function (hooks) {
      _this.initHooks(hooks).forEach(function (_ref2) {
        var message = _ref2.message,
          type = _ref2.type,
          handler = _ref2.handler;
        if (['on', 'once'].indexOf(type) !== -1) {
          _this[type](message, handler);
        }
      });
    };
    _this.unregisterHooks = function () {
      _this.hooks.forEach(function (_ref3) {
        var message = _ref3.message,
          handler = _ref3.handler;
        _this.removeListener(message, handler);
      });
    };
    /* eslint-disable */
    _this.waits = new Map();
    return _this;
  }
  var _proto = Editor.prototype;
  _proto.get = function get(keyOrType) {
    return this.context.get(keyOrType);
  };
  _proto.has = function has(keyOrType) {
    return this.context.has(keyOrType);
  };
  _proto.set = function set(key, data) {
    if (key === 'assets') {
      return this.setAssets(data);
    }
    // store the data to engineConfig while invoking editor.set()
    if (!keyBlacklist.includes(key)) {
      _config.engineConfig.set(key, data);
    }
    this.context.set(key, data);
    this.notifyGot(key);
  };
  _proto.setAssets = /*#__PURE__*/function () {
    var _setAssets = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(assets) {
      var components, componentDescriptions, remoteComponentDescriptions;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            components = assets.components;
            if (!(components && components.length)) {
              _context2.next = 10;
              break;
            }
            componentDescriptions = [];
            remoteComponentDescriptions = [];
            components.forEach(function (component) {
              if (!component) {
                return;
              }
              if (component.exportName && component.url) {
                remoteComponentDescriptions.push(component);
              } else {
                componentDescriptions.push(component);
              }
            });
            assets.components = componentDescriptions;
            assets.componentList = assets.componentList || [];

            // 如果有远程组件描述协议，则自动加载并补充到资产包中，同时出发 designer.incrementalAssetsReady 通知组件面板更新数据
            if (!(remoteComponentDescriptions && remoteComponentDescriptions.length)) {
              _context2.next = 10;
              break;
            }
            _context2.next = 10;
            return Promise.all(remoteComponentDescriptions.map( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(component) {
                var exportName, url;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      exportName = component.exportName, url = component.url;
                      _context.next = 3;
                      return new _lowcodeUtils.AssetLoader().load(url);
                    case 3:
                      return _context.abrupt("return", window[exportName]);
                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }()));
          case 10:
            this.context.set('assets', assets);
            this.notifyGot('assets');
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function setAssets(_x) {
      return _setAssets.apply(this, arguments);
    }
    return setAssets;
  }();
  _proto.onceGot = function onceGot(keyOrType) {
    var _this2 = this;
    var x = this.context.get(keyOrType);
    if (x !== undefined) {
      return Promise.resolve(x);
    }
    return new Promise(function (resolve) {
      _this2.setWait(keyOrType, resolve, true);
    });
  };
  _proto.onGot = function onGot(keyOrType, fn) {
    var _this3 = this;
    var x = this.context.get(keyOrType);
    if (x !== undefined) {
      fn(x);
      return function () {};
    } else {
      this.setWait(keyOrType, fn);
      return function () {
        _this3.delWait(keyOrType, fn);
      };
    }
  };
  _proto.register = function register(data, key) {
    this.context.set(key || data, data);
    this.notifyGot(key || data);
  };
  _proto.init = /*#__PURE__*/function () {
    var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(config, components) {
      var _this$config, _this$config$hooks, hooks, lifeCycles, init;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            this.config = config || {};
            this.components = components || {};
            _this$config = this.config, _this$config$hooks = _this$config.hooks, hooks = _this$config$hooks === void 0 ? [] : _this$config$hooks, lifeCycles = _this$config.lifeCycles;
            this.emit('editor.beforeInit');
            init = lifeCycles && lifeCycles.init || function () {};
            _context3.prev = 5;
            _context3.next = 8;
            return init(this);
          case 8:
            // 注册快捷键
            // 注册 hooks
            this.registerHooks(hooks);
            this.emit('editor.afterInit');
            return _context3.abrupt("return", true);
          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](5);
            console.error(_context3.t0);
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[5, 13]]);
    }));
    function init(_x3, _x4) {
      return _init.apply(this, arguments);
    }
    return init;
  }();
  _proto.destroy = function destroy() {
    if (!this.config) {
      return;
    }
    try {
      var _this$config$lifeCycl = this.config.lifeCycles,
        lifeCycles = _this$config$lifeCycl === void 0 ? {} : _this$config$lifeCycl;
      this.unregisterHooks();
      if (lifeCycles.destroy) {
        lifeCycles.destroy(this);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  _proto.getPreference = function getPreference() {
    return this.preference;
  };
  /* eslint-enable */
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
  (0, _createClass2["default"])(Editor, [{
    key: "locale",
    get: function get() {
      return _intl.globalLocale.getLocale();
    }
  }]);
  return Editor;
}(_events.EventEmitter), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "context", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Map();
  }
})), _class));
exports.Editor = Editor;