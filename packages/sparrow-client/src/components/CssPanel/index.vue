<template>
  <div class="css-panel">
    <layout />
    <div>
      <font />
    </div>
    <div>
      <location />
    </div>
    <div>
      <background />
    </div>
    <div>
      <border />
    </div>
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
  }
};
</script>
<style lang="scss" scoped>
.css-panel{
  width: 300px;
}
</style>