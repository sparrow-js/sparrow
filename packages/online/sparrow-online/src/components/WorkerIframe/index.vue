<template>
  <iframe
    id="sparrowWorker"
    class="sparrow-worker"
    @load="iframeOnload"
    src="https://sparrow-js.github.io/sparrow-worker/"
  />
</template>
<script>
export default {
  methods: {
    iframeOnload () {
      this.$EventBus.$emit('sparrow-worker-load');
    }
  }
}
</script>
<style lang="scss" scoped>
.sparrow-worker{
  width: 0;
  height: 0;
}
</style>