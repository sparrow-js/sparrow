<template>
  <div>
    <div
      class="quick-list"
      v-if="position === 'absolute' || position === 'fixed'"
    >
      <el-tooltip
        v-for="item in quickList"
        :key="item.value"
        class="item"
        effect="dark"
        :content="item.label"
        placement="top"
      >
        <span class="quick-item">
          {{ item.label }}
        </span>
      </el-tooltip>
    </div>
    <div class="luna-comp luna-position-space luna-position-space" id="space">
      <div style="position: relative; height: 100px;">
        <div class="top-div">
          <span class="next-input next-medium next-noborder top-input"
            ><input
              placeholder="auto"
              maxlength="6"
              height="100%"
              autocomplete="off"
              v-model="positionSize.top"
          /></span>
        </div>
        <div class="right-div">
          <span class="next-input next-medium next-noborder right-input"
            ><input
              placeholder="auto"
              maxlength="6"
              height="100%"
              autocomplete="off"
              v-model="positionSize.right"
          /></span>
        </div>
        <div class="bottom-div">
          <span class="next-input next-medium next-noborder bottom-input"
            ><input
              placeholder="auto"
              maxlength="6"
              height="100%"
              autocomplete="off"
              v-model="positionSize.bottom"
          /></span>
        </div>
        <div class="left-div">
          <span class="next-input next-medium next-noborder left-input"
            ><input
              placeholder="auto"
              maxlength="6"
              height="100%"
              autocomplete="off"
              v-model="positionSize.left"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    position: String,
    positionSize: {
      type: Object,
      default() {
        return {
          top: '',
          left: '',
          bottom: '',
          right: ''
        };
      }
    }
  },
  data() {
    return {
      quickList: [
        {
          label: '左上',
          value: 'left-top'
        },
        {
          label: '右上',
          value: 'right-top'
        },
        {
          label: '左下',
          value: 'left-bottom'
        },
        {
          label: '右下',
          value: 'right-bottom'
        },
        {
          label: '靠左',
          value: 'left'
        },
        {
          label: '靠右',
          value: 'right'
        },
        {
          label: '靠上',
          value: 'top'
        },
        {
          label: '靠下',
          value: 'bottom'
        },
        {
          label: '居中',
          value: 'center'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.quick-list {
  .quick-item {
    border: 1px solid #333;
    font-size: 12px;
    margin-right: 3px;
  }
}

.luna-position-space .top-div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 30px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.luna-position-space .top-div:hover {
  border-top: 30px solid #bfd4fb;
}

.luna-position-space .top-div .next-input.next-medium {
  position: absolute;
  left: 0;
  right: 0;
  top: -30px;
  height: 30px !important;
  background: transparent;
}

.luna-position-space .top-div .next-input.next-medium input {
  text-align: center;
  line-height: 30px;
  height: 30px;
  padding: 0;
}

.luna-position-space .bottom-div {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 30px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.luna-position-space .bottom-div:hover {
  border-bottom: 30px solid #bfd4fb;
}

.luna-position-space .bottom-div .next-input.next-medium {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -30px;
  height: 30px !important;
  background: transparent;
}

.luna-position-space .bottom-div .next-input.next-medium input {
  text-align: center;
  line-height: 30px;
  height: 30px;
  padding: 0;
}

.luna-position-space .left-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 0;
  width: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-left: 30px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.luna-position-space .left-div:hover {
  border-left: 30px solid #bfd4fb;
}

.luna-position-space .left-div .next-input.next-medium {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -30px;
  width: 30px;
  margin: auto;
  background: transparent;
}

.luna-position-space .left-div .next-input.next-medium input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -15px;
  margin: auto;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0 13px;
}

.luna-position-space .right-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  right: 0;
  width: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-right: 30px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.luna-position-space .right-div:hover {
  border-right: 30px solid #bfd4fb;
}

.luna-position-space .right-div .next-input.next-medium {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -30px;
  width: 30px;
  margin: auto;
  background: transparent;
}

.luna-position-space .right-div .next-input.next-medium input {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -15px;
  margin: auto;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0 13px;
}

.next-input.next-medium input {
  border: none;
  background-color: transparent;
  outline: none;
}
</style>
