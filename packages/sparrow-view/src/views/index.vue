<template>
  <div class="home drag-box" data-id="7d689a27" style="">
    <template>
      <div>
        <el-form
          label-width="100px"
          class="demo-ruleForm"
          data-design-mode="design-border-box"
          data-instance-name="el-form"
          data-type="box"
          data-id="689a27fe"
          data-child-id="9a27fe28"
        >
          <el-form-item label="文本框">
            <el-input closable="true" />
          </el-form-item>

          <el-form-item label="文本框">
            <el-input type="textarea" closable="true" rows="4" />
          </el-form-item>

          <el-form-item label="文本框">
            <el-autocomplete
              :fetch-suggestions="querySearch38570f74"
              @select="handleSelect38570f74"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="drag-box">
          <div
            class="drag-box clearfix"
            data-design-mode="design-border-box"
            data-instance-name="Container"
            data-id="fe286df2"
            style="display: block;flex-direction: column;"
            data-empty="true"
          />
        </div>
      </div>
    </template>
    <div />
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    test() {
      console.log("*test*");
    },

    submitForm() {},

    resetForm() {}
  },

  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>
