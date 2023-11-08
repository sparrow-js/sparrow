import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _class;
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import { Component, createElement } from 'react';
import { IntlMessageFormat } from 'intl-messageformat';
import { globalLocale } from './global-locale';
import { isI18nData } from '@alilc/lowcode-types';
import { observer } from '../utils';
function generateTryLocales(locale) {
  var tries = [locale, locale.replace('-', '_')];
  if (locale === 'zh-TW' || locale === 'en-US') {
    tries.push('zh-CN');
    tries.push('zh_CN');
  } else {
    tries.push('en-US');
    tries.push('en_US');
    if (locale !== 'zh-CN') {
      tries.push('zh-CN');
      tries.push('zh_CN');
    }
  }
  return tries;
}
function injectVars(msg, params, locale) {
  if (!msg || !params) {
    return msg;
  }
  var formater = new IntlMessageFormat(msg, locale);
  return formater.format(params);
  /*
   return template.replace(/({\w+})/g, (_, $1) => {
    const key = (/\d+/.exec($1) || [])[0] as any;
    if (key && params[key] != null) {
      return params[key];
    }
    return $1;
  }); */
}

export function intl(data, params) {
  if (!isI18nData(data)) {
    return data;
  }
  if (data.intl) {
    return data.intl;
  }
  var locale = globalLocale.getLocale();
  var tries = generateTryLocales(locale);
  var msg;
  for (var _iterator = _createForOfIteratorHelperLoose(tries), _step; !(_step = _iterator()).done;) {
    var lan = _step.value;
    msg = data[lan];
    if (msg != null) {
      break;
    }
  }
  if (msg == null) {
    return "##intl@" + locale + "##";
  }
  return injectVars(msg, params, locale);
}
export function shallowIntl(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  var maps = {};
  Object.keys(data).forEach(function (key) {
    maps[key] = intl(data[key]);
  });
  return maps;
}
export function intlNode(data, params) {
  if (isI18nData(data)) {
    if (data.intlNode) {
      return data.intlNode;
    }
    return /*#__PURE__*/createElement(IntlElement, {
      data: data,
      params: params
    });
  }
  return data;
}
var IntlElement = observer(_class = /*#__PURE__*/function (_Component) {
  _inheritsLoose(IntlElement, _Component);
  function IntlElement() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = IntlElement.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      data = _this$props.data,
      params = _this$props.params;
    return intl(data, params);
  };
  return IntlElement;
}(Component)) || _class;
export function createIntl(instance) {
  var _class2;
  // TODO: make reactive
  var data = function () {
    var locale = globalLocale.getLocale();
    if (typeof instance === 'string') {
      if (window[instance]) {
        return window[instance][locale] || {};
      }
      var key = instance + "_" + locale.toLocaleLowerCase();
      return window[key] || {};
    }
    if (instance && typeof instance === 'object') {
      return instance[locale] || {};
    }
    return {};
  }();
  function intl(key, params) {
    // TODO: tries lost language
    var str = data[key];
    if (str == null) {
      return "##intl@" + key + "##";
    }
    return injectVars(str, params, globalLocale.getLocale());
  }
  var IntlElement = observer(_class2 = /*#__PURE__*/function (_Component2) {
    _inheritsLoose(IntlElement, _Component2);
    function IntlElement() {
      return _Component2.apply(this, arguments) || this;
    }
    var _proto2 = IntlElement.prototype;
    _proto2.render = function render() {
      var _this$props2 = this.props,
        id = _this$props2.id,
        params = _this$props2.params;
      return intl(id, params);
    };
    return IntlElement;
  }(Component)) || _class2;
  return {
    intlNode: function intlNode(id, params) {
      return /*#__PURE__*/createElement(IntlElement, {
        id: id,
        params: params
      });
    },
    intl: intl,
    getLocale: function getLocale() {
      return globalLocale.getLocale();
    },
    setLocale: function setLocale(locale) {
      globalLocale.setLocale(locale);
    }
  };
}
export { globalLocale };