<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="life-cycle" name="life-cycle"></el-tab-pane>
      <el-tab-pane label="api" name="api"></el-tab-pane>
      <el-tab-pane label="code" name="code"></el-tab-pane>
    </el-tabs>

    <div v-if="activeName === 'code'">
      <code-show />
    </div>

    <div v-if="activeName === 'api'">
      <api-create />
    </div>

    <div v-if="activeName === 'life-cycle'">
      <life-cycle />
    </div>
  </div>
</template>
<script>
import { AppModule } from '@/store/modules/app';
import CodeShow from './CodeShow';
import ApiCreate from './ApiCreate';
import LifeCycle from './LifeCycle';

export default {
  components: {
    CodeShow,
    ApiCreate,
    LifeCycle
  },
  data() {
    return {
      activeName: 'life-cycle'
    };
  },
  created() {},
  methods: {
    handleClick() {}
  }
}
</script>
