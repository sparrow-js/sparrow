"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.setLocale = exports.intlNode = exports.intl = exports.getLocale = void 0;
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _enUS = _interopRequireDefault(require("./en-US.json"));
var _zhCN = _interopRequireDefault(require("./zh-CN.json"));
var _createIntl = (0, _lowcodeEditorCore.createIntl)({
    'en-US': _enUS["default"],
    'zh-CN': _zhCN["default"]
  }),
  intl = _createIntl.intl,
  intlNode = _createIntl.intlNode,
  getLocale = _createIntl.getLocale,
  setLocale = _createIntl.setLocale;
exports.setLocale = setLocale;
exports.getLocale = getLocale;
exports.intlNode = intlNode;
exports.intl = intl;