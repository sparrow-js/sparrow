<template>
  <div class="root">
    <el-form label-width="100px">
      <el-form-item label="文本框">
        <el-input placeholder="" v-model="form.name" />
      </el-form-item>

      <el-form-item label="数字文本框">
        <el-input-number :min="1" :max="10" />
      </el-form-item>

      <el-form-item label="单选框">
        <el-radio-group v-model="form.date1">
          <el-radio
            v-for="item in radionboxOptions45edec29"
            :key="item.value"
            :label="item.label"
          />
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {},

  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      radionboxOptions45edec29: [
        {
          value: "单选框1",
          label: "单选框1"
        },
        {
          value: "单选框2",
          label: "单选框2"
        },
        {
          value: "单选框3",
          label: "单选框3"
        }
      ]
    };
  }
};
</script>
