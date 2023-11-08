import { createIntl } from '@alilc/lowcode-editor-core';
import en_US from './en-US.json';
import zh_CN from './zh-CN.json';
var _createIntl = createIntl({
    'en-US': en_US,
    'zh-CN': zh_CN
  }),
  intl = _createIntl.intl,
  intlNode = _createIntl.intlNode,
  getLocale = _createIntl.getLocale,
  setLocale = _createIntl.setLocale;
export { intl, intlNode, getLocale, setLocale };