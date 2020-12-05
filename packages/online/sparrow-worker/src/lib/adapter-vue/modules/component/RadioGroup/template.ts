export default {
  code: `
<template>
  <div>
      <el-radio-group v-model="checkList">
      <el-radio
        v-for="item in radionboxOptions_unique"
        :key="item.value"
        :label="item.label"
      ></el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radionboxOptions_unique: [
        {
          value: '单选框1',
          label: '单选框1'
        },
        {
          value: '单选框2',
          label: '单选框2'
        },
        {
          value: '单选框3',
          label: '单选框3'
        }
      ]
    };
  }
}
</script>  
  `
}