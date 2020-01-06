export function eform (content: string) {
  return `
    <el-form label-width="100px">${content}</el-form>
  `;
}

export function layout (col: number = 3, row: number = 2) {
  return `
    <layout :col="${col}" :row="${row}"></layout>
  `;
}

export function box (index: number) {
  return `
    <box :index="${index}" class="block-item"></box>
  `;
}