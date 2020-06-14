<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'cde0e136'" class="block-item" :label="'PageHeader'">
          <box :index="undefined" :label="''" class="block-item">
            <el-page-header content="">
              <label-box label="详情页面" :clear-class="true" uuid="e0e13664" />
            </el-page-header>
          </box>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'e1366480'" class="block-item" :label="'Form'">
          <BasicForm1 />
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'6480e3f1'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '6480e3f1' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import BasicForm1 from "./components/BasicForm1";
import generatorMixin from "../mixins/generatorMixin";
export default {
  components: {
    BasicForm1
  },
  mixins: [generatorMixin]
};
</script>
