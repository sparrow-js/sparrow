/**
 * 所有可能的停靠位置
 */

export function isWidgetConfig(obj) {
  return obj && obj.type === 'Widget';
}
export function isDividerConfig(obj) {
  return obj && obj.type === 'Divider';
}
export function isDockConfig(obj) {
  return obj && /Dock$/.test(obj.type);
}

// 按钮弹窗扩展

export function isDialogDockConfig(obj) {
  return obj && obj.type === 'DialogDock';
}

// 窗格扩展

export function isPanelConfig(obj) {
  return obj && obj.type === 'Panel';
}
export function isPanelDockConfig(obj) {
  return obj && obj.type === 'PanelDock';
}