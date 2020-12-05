<template>
  <div>
    <el-button type="primary" @click="saveLifeCycle" size="mini">
      保存
    </el-button>
    <codemirror ref="codemirror" v-model="code"></codemirror>
  </div>
</template>
<script>
import Message from '@/util/MessageWorker';
import { AppModule } from '@/store/modules/app';

export default {
  data() {
    return {
      code: ''
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    async getCode() {
      const res = await Message.emit('generator.scene.getLifeCycle', {
        uuid: AppModule.selecedFileInfo.uuid
      });
      this.code = res.code;
    },
    async saveLifeCycle() {
      const res = await Message.emit('generator.scene.saveLifeCycle', {
        uuid: AppModule.selecedFileInfo.uuid,
        code: this.code
      });
      this.$message.success('保存成功');
    }
  }
}
</script>
