"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.globalLocale = void 0;
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _events = require("events");
var _obx = require("../utils/obx");
var _dec, _class, _descriptor;
var languageMap = {
  en: 'en-US',
  zh: 'zh-CN',
  zt: 'zh-TW',
  es: 'es-ES',
  pt: 'pt-PT',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  ru: 'ru-RU',
  ja: 'ja-JP',
  ko: 'ko-KR',
  ar: 'ar-SA',
  tr: 'tr-TR',
  th: 'th-TH',
  vi: 'vi-VN',
  nl: 'nl-NL',
  he: 'iw-IL',
  id: 'in-ID',
  pl: 'pl-PL',
  hi: 'hi-IN',
  uk: 'uk-UA',
  ms: 'ms-MY',
  tl: 'tl-PH'
};
var LowcodeConfigKey = 'ali-lowcode-config';
var GlobalLocale = (_dec = _obx.obx.ref, (_class = /*#__PURE__*/function () {
  function GlobalLocale() {
    this.emitter = new _events.EventEmitter();
    (0, _initializerDefineProperty2["default"])(this, "_locale", _descriptor, this);
    this.emitter.setMaxListeners(0);
  }
  var _proto = GlobalLocale.prototype;
  _proto.setLocale = function setLocale(locale) {
    if (locale === this.locale) {
      return;
    }
    this._locale = locale;
    if (hasLocalStorage(window)) {
      var store = window.localStorage;
      var config;
      try {
        config = JSON.parse(store.getItem(LowcodeConfigKey) || '');
      } catch (e) {
        // ignore;
      }
      if (config && typeof config === 'object') {
        config.locale = locale;
      } else {
        config = {
          locale: locale
        };
      }
      store.setItem(LowcodeConfigKey, JSON.stringify(config));
    }
    this.emitter.emit('localechange', locale);
  };
  _proto.getLocale = function getLocale() {
    return this.locale;
  };
  _proto.onChangeLocale = function onChangeLocale(fn) {
    var _this = this;
    this.emitter.on('localechange', fn);
    return function () {
      _this.emitter.removeListener('localechange', fn);
    };
  };
  (0, _createClass2["default"])(GlobalLocale, [{
    key: "locale",
    get: function get() {
      if (this._locale != null) {
        return this._locale;
      }

      // TODO: store 1 & store 2 abstract out as custom implements

      // store 1: config from window
      var locale = getConfig('locale');
      if (locale) {
        return languageMap[locale] || locale.replace('_', '-');
      }

      // store 2: config from storage
      if (hasLocalStorage(window)) {
        var _config;
        var store = window.localStorage;
        var config;
        try {
          config = JSON.parse(store.getItem(LowcodeConfigKey) || '');
        } catch (e) {
          // ignore;
        }
        if ((_config = config) !== null && _config !== void 0 && _config.locale) {
          return (config.locale || '').replace('_', '-');
        }
      }

      // store 2: config from system
      var _ref = window,
        navigator = _ref.navigator;
      if (navigator.language) {
        var lang = navigator.language;
        return languageMap[lang] || lang.replace('_', '-');
      } else if (navigator.browserLanguage) {
        var it = navigator.browserLanguage.split('-');
        locale = it[0];
        if (it[1]) {
          locale += "-" + it[1].toUpperCase();
        }
      }
      if (!locale) {
        locale = 'zh-CN';
      }
      return locale;
    }
  }]);
  return GlobalLocale;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_locale", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "locale", [_obx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "locale"), _class.prototype)), _class));
function getConfig(name) {
  var win = window;
  return win[name] || (win.g_config || {})[name] || (win.pageConfig || {})[name];
}
function hasLocalStorage(obj) {
  return obj.localStorage;
}
var globalLocale = new GlobalLocale();
// let globalLocale: GlobalLocale;
// if ((window as any).__GlobalLocale) {
//   globalLocale = (window as any).__GlobalLocale as any;
// } else {
//   globalLocale = new GlobalLocale();
//   (window as any).__GlobalLocale = globalLocale;
// }
exports.globalLocale = globalLocale;