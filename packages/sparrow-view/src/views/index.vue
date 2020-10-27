<template>
  <div class="home drag-box" data-id="0964baa0">
    <div class="box">
      <el-row gutter="40">
        <el-col :xs="12" :sm="12" :lg="6" span="12">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-1">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>输入文本</div>
                </div>
                <count-to
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="6" span="12">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-2">
                <svg-icon icon-class="message" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>输入文本</div>
                </div>
                <count-to
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="6" span="12">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-3">
                <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>输入文本</div>
                </div>
                <count-to
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="6" span="12">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-4">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>输入文本</div>
                </div>
                <count-to
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                  class="card-panel-num"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="margin-bottom: 20px;">
      <el-card class="box-card" shadow="always" :body-style="{}">
        <div class="card-content drag-box">
          <h4 class="s-typography">
            退款申请
          </h4>

          <div class="box">
            <el-row>
              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >取货单号</span
                  >

                  <span class="sp-descriptions-item-content">1000000000</span>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >状态</span
                  >

                  <span class="sp-descriptions-item-content">已取货</span>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >销售单号</span
                  >

                  <span class="sp-descriptions-item-content">1234123421</span>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >子订单</span
                  >

                  <span class="sp-descriptions-item-content">3214321432</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <el-divider />

          <h4 class="s-typography">
            用户信息
          </h4>

          <div class="box">
            <el-row>
              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >用户姓名</span
                  >

                  <span class="sp-descriptions-item-content">付小小</span>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >联系电话</span
                  >

                  <span class="sp-descriptions-item-content">18100000000</span>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="column drag-box">
                  <span
                    class="sp-descriptions-item-label sp-descriptions-item-colon"
                    >常用快递</span
                  >

                  <span class="sp-descriptions-item-content">菜鸟仓储</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {},

  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.card-panel-col {
  margin-bottom: 32px;
}

.card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);

  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }

    .icon-color-1 {
      background: #40c9c6;
    }

    .icon-color-2 {
      background: #36a3f7;
    }

    .icon-color-3 {
      background: #f4516c;
    }

    .icon-color-4 {
      background: #34bfa3;
    }
  }

  .icon-color-1 {
    color: #40c9c6;
  }

  .icon-color-2 {
    color: #36a3f7;
  }

  .icon-color-3 {
    color: #f4516c;
  }

  .icon-color-4 {
    color: #34bfa3;
  }

  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel-icon {
    float: left;
    font-size: 48px;
  }

  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }

    .card-panel-num {
      font-size: 20px;
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
