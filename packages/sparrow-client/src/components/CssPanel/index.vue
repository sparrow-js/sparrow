<template>
  <div class="css-panel">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="布局" name="1">
        <layout @change="change" />
      </el-collapse-item>
      <el-collapse-item title="文字" name="2">
        <font @change="change"/>
      </el-collapse-item>
      <el-collapse-item title="定位" name="3">
        <location @change="change"/>
      </el-collapse-item>
      <el-collapse-item title="背景" name="4">
        <background @change="change"/>
      </el-collapse-item>
      <el-collapse-item title="边框" name="5">
        <border @change="change"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Layout from './Layout';
import Font from './Font';
import Location from './Location';
import Background from './Background';
import Border from './Border';
export default {
  components: {
    Layout,
    Font,
    Location,
    Background,
    Border
  },
  data() {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6'],
      form: {}
    };
  },
  methods: {
    change(data) {
      const {css, type} = data;
      
    },
    transformToCss() {

    }
  }
};
</script>
<style lang="scss" scoped>
.css-panel{
  overflow: scroll;
  height: 100%;
}
</style>