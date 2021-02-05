<template>
  <div class="s-box-model">
    <div class="s-box-model__body">
      <div class="margin-top-div">
        <span class="next-input next-medium next-noborder"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.margin_top"
            @input="inputChange('margin_top')"
        /></span>
      </div>
      <div class="margin-right-div">
        <span class="next-input next-medium next-noborder margin-right-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.margin_right"
        /></span>
      </div>
      <div class="margin-bottom-div">
        <span class="help-txt">MARGIN</span
        ><span class="next-input next-medium next-noborder margin-bottom-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.margin_bottom"
        /></span>
      </div>
      <div class="margin-left-div">
        <span class="next-input next-medium next-noborder margin-left-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.margin_left"
        /></span>
      </div>
      <div class="padding-top-div">
        <span class="next-input next-medium next-noborder padding-top-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.padding_top"
        /></span>
      </div>
      <div class="padding-right-div">
        <span class="next-input next-medium next-noborder padding-right-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.padding_right"
        /></span>
      </div>
      <div class="padding-bottom-div">
        <span class="help-txt">PADDING</span
        ><span class="next-input next-medium next-noborder padding-bottom-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.padding_bottom"
        /></span>
      </div>
      <div class="padding-left-div">
        <span class="next-input next-medium next-noborder padding-left-input"
          ><input
            placeholder="0"
            maxlength="6"
            height="100%"
            autocomplete="off"
            v-model="boxModelForm.padding_left"
        /></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    boxModelForm: {
      type: Object,
      default() {
        return {
          margin_top: '',
          margin_bottom: '',
          margin_left: '',
          margin_right: '',
          padding_top: '',
          padding_bottom: '',
          padding_left: '',
          padding_right: ''
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    inputChange(stylekey) {
      this.$emit('change', this.boxModelForm);
    }
  }
};
</script>
<style lang="scss" scoped>
.s-box-model {
  &__body {
    position: relative;
    width: 200px;
    height: 120px;
  }
  .margin-top-div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .margin-top-div:hover {
    border-top: 20px solid #bfd4fb;
  }
  .margin-top-div .next-input.next-medium {
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    height: 20px !important;
    background: transparent;
  }
  .margin-top-div .next-input.next-medium input {
    text-align: center;
    line-height: 20px;
    height: 20px;
    padding: 0;
  }
  .margin-bottom-div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .margin-bottom-div:hover {
    border-bottom: 20px solid #bfd4fb;
  }
  .margin-bottom-div .next-input.next-medium {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -20px;
    height: 20px !important;
    background: transparent;
  }
  .margin-bottom-div .next-input.next-medium input {
    text-align: center;
    line-height: 20px;
    height: 20px;
    padding: 0;
  }

  .margin-left-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .margin-left-div:hover {
    border-left: 20px solid #bfd4fb;
  }
  .margin-left-div .next-input.next-medium {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -20px;
    width: 20px;
    margin: auto;
    background: transparent;
  }
  .margin-left-div .next-input.next-medium input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -20px;
    margin: auto;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: right;
    padding: 0 8px;
  }
  .margin-right-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    right: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .margin-right-div:hover {
    border-right: 20px solid #bfd4fb;
  }

  .margin-right-div .next-input.next-medium {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -20px;
    width: 20px;
    margin: auto;
    background: transparent;
  }
  .margin-right-div .next-input.next-medium input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -20px;
    margin: auto;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    padding: 0 8px;
  }

  .padding-top-div {
    position: absolute;
    top: 25px;
    left: 25px;
    right: 25px;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .padding-top-div:hover {
    border-top: 20px solid #bfd4fb;
  }
  .padding-top-div .next-input.next-medium {
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    height: 20px !important;
    background: transparent;
  }
  .padding-top-div .next-input.next-medium input {
    text-align: center;
    line-height: 20px;
    height: 20px;
    padding: 0;
  }

  .padding-bottom-div {
    position: absolute;
    bottom: 25px;
    left: 25px;
    right: 25px;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .padding-bottom-div:hover {
    border-bottom: 20px solid #bfd4fb;
  }

  .padding-bottom-div .next-input.next-medium {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -20px;
    height: 20px !important;
    background: transparent;
  }

  .padding-bottom-div .next-input.next-medium input {
    text-align: center;
    line-height: 20px;
    height: 20px;
    padding: 0;
  }
  .padding-left-div {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 25px;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .padding-left-div:hover {
    border-left: 20px solid #bfd4fb;
  }

  .padding-left-div .next-input.next-medium {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -20px;
    width: 20px;
    margin: auto;
    background: transparent;
  }

  .padding-left-div .next-input.next-medium input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    padding: 0 8px;
  }

  .padding-right-div {
    position: absolute;
    top: 30px;
    bottom: 30px;
    right: 25px;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d6e4ff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .padding-right-div:hover {
    border-right: 20px solid #bfd4fb;
  }
  .padding-right-div .next-input.next-medium {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -20px;
    width: 20px;
    margin: auto;
    background: transparent;
  }
  .padding-right-div .next-input.next-medium input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: right;
    padding: 0 8px;
  }
  .help-txt {
    float: left;
    margin-left: -10px;
    -webkit-transform: scale(0.75);
    -ms-transform: scale(0.75);
    transform: scale(0.75);
  }
  .next-input.next-medium input{
    border: none;
    background-color: transparent;
    outline: none;
  }
}
</style>
