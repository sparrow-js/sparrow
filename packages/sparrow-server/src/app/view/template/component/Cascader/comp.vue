<template>
  <div class="root">
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        :options="cascaderOptions_unique"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange_unique"></el-cascader>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cascaderOptions_unique: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      };
    },
    methods: {
      handleChange_unique(value) {
        console.log(value);
      }
    }
  };
</script>