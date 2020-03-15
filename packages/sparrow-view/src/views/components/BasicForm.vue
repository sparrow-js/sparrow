<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="true" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="评分" indexcomp="0" v-model="id" />
            <el-rate v-model="id" />
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
