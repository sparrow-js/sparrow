export function eform (content: string = '') {
  return `
    <el-form label-width="100px">${content}</el-form>
  `;
}
// 布局
export function layout (col: number = 3, row: number = 2) {
  return `
    <layout :col="${col}" :row="${row}"></layout>
  `;
}

export function box (index: number, content: string = '', label: string = '') {
  return `
    <box :index="${index}" :label="'${label}'"  class="block-item">
      ${content}
    </box>
  `;
}

// 区块
export function block () {
  return `
    <block></block>
  `;
}