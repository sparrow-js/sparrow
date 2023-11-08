"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.composeTitle = composeTitle;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _lowcodeTypes = require("@alilc/lowcode-types");
var _react = require("react");
function composeTitle(title, icon, tip, tipAsTitle, noIcon) {
  if (!title) {
    title = {};
    if (!icon || tipAsTitle) {
      title.label = tip;
      tip = undefined;
    }
  }
  if (icon || tip) {
    if (typeof title !== 'object' || /*#__PURE__*/(0, _react.isValidElement)(title) || (0, _lowcodeTypes.isI18nData)(title)) {
      if ( /*#__PURE__*/(0, _react.isValidElement)(title)) {
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
      title = (0, _extends2["default"])({}, title, {
        icon: icon,
        tip: tip
      });
    }
  }
  if ((0, _lowcodeTypes.isTitleConfig)(title) && noIcon) {
    if (! /*#__PURE__*/(0, _react.isValidElement)(title)) {
      title.icon = undefined;
    }
  }
  return title;
}