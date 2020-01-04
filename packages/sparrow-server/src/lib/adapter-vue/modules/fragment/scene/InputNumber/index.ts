export default {
  type: 'form',
  fragment () {
    return `
      <el-form-item label="基础文本框" prop="name">
        <el-input-number :min="1" :max="10"></el-input-number>
      </el-form-item>
    `;
  },
};