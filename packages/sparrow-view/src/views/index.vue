<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list test">
        <box :uuid="'61afa7ea'" class="block-item" :label="'Form'">
          <div class="box">
            <FOrm1 />
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list test">
        <box :uuid="'dc7a7ff3'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: 'dc7a7ff3' }"
          />
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list test">
        <box :uuid="'7a7ff311'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '7a7ff311' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import FOrm1 from "./components/FOrm1";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    FOrm1
  },
  mixins: [generatorMixin]
};
</script>
