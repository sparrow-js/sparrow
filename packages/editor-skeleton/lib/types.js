"use strict";

exports.__esModule = true;
exports.isDialogDockConfig = isDialogDockConfig;
exports.isDividerConfig = isDividerConfig;
exports.isDockConfig = isDockConfig;
exports.isPanelConfig = isPanelConfig;
exports.isPanelDockConfig = isPanelDockConfig;
exports.isWidgetConfig = isWidgetConfig;
/**
 * 所有可能的停靠位置
 */

function isWidgetConfig(obj) {
  return obj && obj.type === 'Widget';
}
function isDividerConfig(obj) {
  return obj && obj.type === 'Divider';
}
function isDockConfig(obj) {
  return obj && /Dock$/.test(obj.type);
}

// 按钮弹窗扩展

function isDialogDockConfig(obj) {
  return obj && obj.type === 'DialogDock';
}

// 窗格扩展

function isPanelConfig(obj) {
  return obj && obj.type === 'Panel';
}
function isPanelDockConfig(obj) {
  return obj && obj.type === 'PanelDock';
}