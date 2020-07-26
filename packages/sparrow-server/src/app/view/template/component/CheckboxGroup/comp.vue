<template>
  <div>
      <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in checkboxOptions_unique"
        :key="item.value"
        :label="item.label"
      ></el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      initCheckbox: [],
      checkboxOptions_unique: [
        {
          value: '复选框1',
          label: '复选框1'
        },
        {
          value: '复选框2',
          label: '复选框2'
        },
        {
          value: '复选框3',
          label: '复选框3'
        }
      ]
    };
  }
}
</script>