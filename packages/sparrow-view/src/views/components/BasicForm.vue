<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="true" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="时间选择器" :index="0" v-model="id" />

            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="id"
            >
            </el-date-picker>
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 1
    };
  }
};
</script>
