import _extends from "@babel/runtime/helpers/extends";
import { createElement } from 'react';
import './index.less';
import { Field, PopupField, EntryField, PlainField } from './fields';
export function createField(props, children, type) {
  if (type === 'popup') {
    return /*#__PURE__*/createElement(PopupField, props, children);
  }
  if (type === 'entry') {
    return /*#__PURE__*/createElement(EntryField, props, children);
  }
  if (type === 'plain' || !props.title) {
    return /*#__PURE__*/createElement(PlainField, props, children);
  }
  return /*#__PURE__*/createElement(Field, _extends({}, props, {
    defaultDisplay: type
  }), children);
}
export { Field, PopupField, EntryField, PlainField };