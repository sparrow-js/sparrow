"use strict";

exports.__esModule = true;
exports["default"] = _default;
var _lowcodeTypes = require("@alilc/lowcode-types");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var leadingFnRe = /^function/;
var leadingFnNameRe = /^\w+\s*\(/;
/**
 * 将函数字符串转成函数，支持几种类型
 *   类型一：() => {} / val => {}
 *   类型二：setValue() {}
 *   类型三：function() {} / function setValue() {}
 * @param str
 * @returns
 */
function transformStringToFunction(str) {
  if (typeof str !== 'string') return str;
  var fn;
  if (leadingFnNameRe.test(str) && !leadingFnRe.test(str)) {
    str = "function " + str;
  }
  var fnBody = "\n    return function() {\n      const self = this;\n      try {\n        return (" + str + ").apply(self, arguments);\n      } catch(e) {\n        console.log('call function which parsed by lowcode failed: ', e);\n        return e.message;\n      }\n    };\n  ";
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(fnBody)();
  } catch (e) {
    console.error(str);
    console.error(e.message);
  }
  return fn;
}
function parseJSFunc(obj, enableAllowedKeys) {
  if (enableAllowedKeys === void 0) {
    enableAllowedKeys = true;
  }
  if (!obj) return;
  Object.keys(obj).forEach(function (key) {
    var item = obj[key];
    if ((0, _lowcodeTypes.isJSFunction)(item)) {
      obj[key] = transformStringToFunction(item.value);
    } else if (Array.isArray(item)) {
      item.forEach(function (o) {
        return parseJSFunc(o, enableAllowedKeys);
      });
    } else if ((0, _lowcodeUtils.isPlainObject)(item)) {
      parseJSFunc(item, enableAllowedKeys);
    }
  });
}
function _default(metadata) {
  parseJSFunc(metadata, false);
  return metadata;
}