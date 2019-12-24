<template>
  <div class="home">
    <ul class="block-list">
      <li class="block-item">
        <box :index="0">
          <paragraph></paragraph>
        </box>
      </li>
      <li class="block-item">
        <box :index="1">
          <layout :col="3" :row="2"></layout>
        </box>
      </li>
      <li>
        <div>
          <toolbar />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "home",
  created () {
    Event.on('test', () => {
    })
  }
};
</script>
<style lang="scss" scoped>
.block-list{
  list-style: none;
  .block-item{
    margin-bottom: 12px;
  }
}
</style>
