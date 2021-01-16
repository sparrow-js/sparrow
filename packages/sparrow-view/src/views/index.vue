<template>
  <div class="home drag-box" data-id="30aec502" style="">
    <template>
      <div>
        <el-form
          label-width="100px"
          class="demo-ruleForm"
          data-design-mode="design-border-box"
          data-instance-name="el-form"
          data-type="box"
        >
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
            data-id="c5021563"
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
  methods: {},

  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>
