import _extends from "@babel/runtime/helpers/extends";
import { isI18nData, isTitleConfig } from '@alilc/lowcode-types';
import { isValidElement } from 'react';
export function composeTitle(title, icon, tip, tipAsTitle, noIcon) {
  if (!title) {
    title = {};
    if (!icon || tipAsTitle) {
      title.label = tip;
      tip = undefined;
    }
  }
  if (icon || tip) {
    if (typeof title !== 'object' || /*#__PURE__*/isValidElement(title) || isI18nData(title)) {
      if ( /*#__PURE__*/isValidElement(title)) {
        if (title.type === 'svg' || title.type.getIcon) {
          if (!icon) {
            icon = title;
          }
          if (tipAsTitle) {
            title = tip;
            tip = null;
          } else {
            title = undefined;
          }
        }
      }
      title = {
        label: title,
        icon: icon,
        tip: tip
      };
    } else {
      title = _extends({}, title, {
        icon: icon,
        tip: tip
      });
    }
  }
  if (isTitleConfig(title) && noIcon) {
    if (! /*#__PURE__*/isValidElement(title)) {
      title.icon = undefined;
    }
  }
  return title;
}