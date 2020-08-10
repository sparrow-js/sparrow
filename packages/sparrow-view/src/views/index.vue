<template>
  <div class="home drag-box" data-id="9bd5eb6b">
    <div class="box">
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="6">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-2">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>people</div>
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

        <el-col :span="12" :xs="12" :sm="12" :lg="6">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-2">
                <svg-icon icon-class="message" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>message</div>
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

        <el-col :xs="12" :sm="12" :lg="6">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-4">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>shop</div>
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

        <el-col :xs="12" :sm="12" :lg="6">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-3">
                <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>money</div>
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

        <el-col :xs="12" :sm="12" :lg="6">
          <div class="column drag-box">
            <div class="card-panel card-panel-col">
              <div class="card-panel-icon-wrapper icon-color-1">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>

              <div class="card-panel-description">
                <div class="card-panel-text">
                  <div>people</div>
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
  </div>
</template>

<script>
export default {
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
