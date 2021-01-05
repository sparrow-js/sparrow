<template>
  <div class="home drag-box" data-id="7a32948a" style="">
    <div
      data-design-mode="design-border-api"
      data-instance-name="api"
      data-id="8ad7115e"
      data-type="api"
    />
  </div>
</template>

<script>
import { getList } from "./api";
export default {
  components: {},
  methods: {
    async getList() {
      const res = await getList(this.listQuery);

      if (res && res.data) {
        this.data8ad7115e = res.data;
      }
    }
  },

  data() {
    return {
      data8ad7115e: null
    };
  }
};
</script>
<style lang="scss" scoped></style>
