<template>
  <div>
    <codemirror ref="codemirror" v-model="code"></codemirror>
  </div>
</template>
<script>
import { AppModule } from '@/store/modules/app';
import socket from '@/util/socket.js';

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
      const res = await socket.emit('generator.scene.getOriginalCode', {
        uuid: AppModule.selecedFileInfo.uuid
      });
      this.code = res.code;
    }
  }
}
</script>
