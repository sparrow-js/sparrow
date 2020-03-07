<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <el-form-item label="基础文本框" prop="name">
          <el-input v-model="name" />
        </el-form-item>

        <el-form-item label="基础checkbox">
          <el-checkbox-group v-model="id">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 1,
      name: "hello"
    };
  }
};
</script>
