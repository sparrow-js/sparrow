export function row (content: string) {
  return `
    <el-row>${content}</el-row>
  `;
}

export function col (colSpan: number, content: string) {
  return `
    <el-col :span=${colSpan}>${content}</el-col>
  `;
}