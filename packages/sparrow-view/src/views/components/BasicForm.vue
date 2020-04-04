<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px" :inline="false"
        ><component-box :is-active="false" indexcomp="0">
          <el-form-item label=" ">
            <label-box label="级联选择器：" indexcomp="0" v-model="form.name" />
            <el-cascader
              v-model="form.name"
              :options="cascaderOptions"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChangea6824eeb"
            />
          </el-form-item> </component-box
        ><component-box :is-active="false" indexcomp="1">
          <el-form-item label=" ">
            <label-box label="多选框：" indexcomp="1" v-model="form.id" />
            <el-checkbox-group v-model="form.id">
              <el-checkbox :label="1">备选项1</el-checkbox>
              <el-checkbox :label="2">备选项2</el-checkbox>
              <el-checkbox :label="3">备选项3</el-checkbox>
            </el-checkbox-group>
          </el-form-item> </component-box
        ><component-box :is-active="true" indexcomp="2">
          <el-form-item label=" ">
            <label-box label="文本框：" indexcomp="2" v-model="form.age" />
            <el-input v-model="form.age" />
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    handleChangea6824eeb(value) {
      console.log(value);
    }
  },

  data() {
    return {
      form: {
        id: 1,
        age: 2,
        name: ""
      },
      value: [],
      cascaderOptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    };
  }
};
</script>
