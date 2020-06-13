<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'5e3fa6ce'" class="block-item">
          <div class="box">
            <Table5 />
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'c42640b3'" class="block-item">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: 'c42640b3' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import Table5 from "./components/Table5";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    Table5
  },
  mixins: [generatorMixin]
};
</script>
