<template>
  <div>
    <div @click="handlChildOpen">
        <CaretDownOutlined v-if="childOpen"/>
        <CaretRightOutlined v-else />
      <span>背景</span>
    </div>
    <div class="card-box" v-show="childOpen">
      <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
        <template #label>
          <a-tooltip placement="top" title="填充色">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M881.2544 1004.3392c-50.9952 0-92.3648-41.3696-92.3648-92.3648 0-50.9952 92.3648-215.6544 92.3648-215.6544s92.3648 164.6592 92.3648 215.6544S932.4544 1004.3392 881.2544 1004.3392L881.2544 1004.3392zM50.3808 546.6112 449.9456 151.552l399.7696 395.264-399.7696 395.264L50.3808 546.6112 50.3808 546.6112zM449.9456 239.2064l-277.0944 272.384 554.3936 0L449.9456 239.2064 449.9456 239.2064zM272.384 63.488l44.4416-43.8272L449.9456 151.552 405.504 195.3792 272.384 63.488 272.384 63.488zM272.384 63.488"></path></svg>
          </a-tooltip>
        </template>
        <a-input :value="backgroundColor" @input="handleChange"/>
      </a-form-item>
      <!-- <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
        <template #label>
          <div>
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M736 448c53 0 96-43 96-96 0-53-43-96-96-96-53 0-96 43-96 96C640 405 683 448 736 448z"></path><path d="M904 128 120 128c-31.2 0-56 25.4-56 56.6l0 654.8c0 31.2 24.8 56.6 56 56.6l784 0c31.2 0 56-25.4 56-56.6L960 184.6C960 153.4 935.2 128 904 128zM697.8 523.4c-6-7-15.2-12.4-25.6-12.4-10.2 0-17.4 4.8-25.6 11.4l-37.4 31.6c-7.8 5.6-14 9.4-23 9.4-8.6 0-16.4-3.2-22-8.2-2-1.8-5.6-5.2-8.6-8.2L448 430.6c-8-9.2-20-15-33.4-15-13.4 0-25.8 6.6-33.6 15.6L128 736.4 128 215.4c2-13.6 12.6-23.4 26.2-23.4l715.4 0c13.8 0 25 10.2 25.8 24l0.6 520.8L697.8 523.4z"></path></svg>
          </div>
        </template>
        <a-input />
      </a-form-item> -->
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
export default {
  props: {
    backgroundColor: {
      type: String,
      default: ''
    }
  },
  emits: ['update:backgroundColor'],
  setup (props, {emit}) {
    const state = reactive({
      childOpen: false,
      labelCol: {
        style: {
          'display': 'flex',
          'align-items': 'center'
        }
      },
      wrapperCol: {
        flex: '1',
      },
    })
    const handlChildOpen = () => {
      state.childOpen = !state.childOpen;
    };

    const handleChange = (data) => {
      emit('update:backgroundColor', data.target.value);
    }

    return {
      ...toRefs(state),
      handlChildOpen,
      handleChange
    }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  background-color: rgba(31,56,88,.04);
  padding: 8px;
}
</style>