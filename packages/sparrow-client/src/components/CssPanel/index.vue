<template>
  <div>
    <layout />
    <div>
      <font />
    </div>
    <div>
      <location />
    </div>
  </div>
</template>
<script>
import Layout from './Layout';
import Font from './Font';
import Location from './Location';
export default {
  components: {
    Layout,
    Font,
    Location
  }
};
</script>
<style lang="scss" scoped></style>