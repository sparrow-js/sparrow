<template>
  <div>
    <codemirror ref="codemirror" v-model="code"></codemirror>
  </div>
</template>
<script>
import { AppModule } from '@/store/modules/app';
import Message from '@/util/MessageWorker';

export default {
  data() {
    return {
      code: ''
    };
  },
  created () {
    this.getOriginalCode();
  },
  methods: {
    async getOriginalCode() {
      const res = await Message.emit('generator.scene.getOriginalCode', {
        uuid: AppModule.selecedFileInfo.uuid
      });
      this.code = res.code;
    }
  }
}
</script>
