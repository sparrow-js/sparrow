<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0">
          <el-form-item label=" ">
            <label-box
              label="文本框"
              indexcomp="0"
              v-model="form.name"
              type="textarea"
              rows="4"
            />
            <el-input v-model="form.name" type="textarea" rows="4" />
          </el-form-item> </component-box
        ><component-box :is-active="true" indexcomp="1">
          <el-form-item label=" ">
            <label-box label="文本框" indexcomp="1" v-model="form.id" />
            <el-input v-model="form.id" />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: 1,
        name: "10"
      }
    };
  }
};
</script>
