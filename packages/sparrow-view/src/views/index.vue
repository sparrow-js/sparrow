<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list test">
        <Form />
      </div>
    </div>

    <div class="block-list">
      <div class="block-list test">
        <paragraph
          :type="'Container'"
          :emit="'client.component.show'"
          :params="{ uuid: 'ad78eda6' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "./components/Form";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    Form
  },
  mixins: [generatorMixin]
};
</script>
