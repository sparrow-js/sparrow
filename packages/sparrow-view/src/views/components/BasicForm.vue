<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px">
        <el-form-item label=" ">
          <label-box label="文本库a框：" index="0" v-model="form.age" />
          <el-input v-model="form.age" index="0" />
        </el-form-item>

        <el-form-item label=" " prop="name">
          <label-box
            label="数字文："
            :index="undefined"
            v-model="form.id"
            index="1"
          />
          <el-input-number :min="1" :max="10" v-model="form.id" index="1" />
        </el-form-item>

        <el-form-item label=" ">
          <label-box
            label="开关："
            :index="undefined"
            v-model="form.name"
            index="2"
          />
          <el-switch v-model="form.name" index="2" />
        </el-form-item>
      </el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: 1,
        age: 2,
        name: "hello"
      }
    };
  }
};
</script>
