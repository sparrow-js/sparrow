<template>
  <el-select placeholder="请选择">
    <el-option
      v-for="item in selectOptions_unique"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        selectOptions_unique: [
          {
            value: '选项1',
            label: '选项1'
          },
          {
            value: '选项2',
            label: '选项2'
          },
          {
            value: '选项3',
            label: '选项3'
          }
        ],
      }
    }
  }
</script>