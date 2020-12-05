<template>
  <iframe
    id="sparrowWorker"
    class="sparrow-worker"
    @load="iframeOnload"
    src="http://localhost:9999/example/example-dev.html"
  />
</template>
<script>
export default {
  methods: {
    iframeOnload () {}
  }
}
</script>
<style lang="scss" scoped>
.sparrow-worker{
  width: 0;
  height: 0;
}
</style>