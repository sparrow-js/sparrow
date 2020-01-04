export default {
  type: 'form',
  fagment () {
    return `
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    `;
  }
}