<template>
  <div class="home">
    <div class="block-list">
      <div class="block-list">
        <box :uuid="'1890105a'" class="block-item" :label="'Card'">
          <div style="margin-bottom: 20px;">
            <config-box>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <label-box
                    label="卡片名称"
                    uuid="105a8406"
                    :clear-class="true"
                  />
                </div>

                <div class="card-content">
                  <div class="block-list">
                    <box :uuid="'5a840601'" class="block-item" :label="''">
                      <paragraph
                        :type="'Container'"
                        :emit="'client.component.show'"
                        :params="{ uuid: '5a840601' }"
                      />
                    </box>
                  </div>
                </div>
              </el-card>
            </config-box>
          </div>
        </box>
      </div>
    </div>

    <div class="block-list">
      <div class="block-list">
        <box :uuid="'84060113'" class="block-item" :label="''">
          <paragraph
            :type="'Container'"
            :emit="'client.component.show'"
            :params="{ uuid: '84060113' }"
          />
        </box>
      </div>
    </div>
  </div>
</template>

<script>
import generatorMixin from "../mixins/generatorMixin";
export default {
  mixins: [generatorMixin]
};
</script>
