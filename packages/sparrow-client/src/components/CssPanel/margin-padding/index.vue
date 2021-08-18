<template>
  <div>
    <a-form-item :colon="false" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
      <template #label>
        <div @click="handlChildOpen">
          <CaretDownOutlined v-if="childOpen"/>
          <CaretRightOutlined v-else />
          <span>{{prefix}}</span>
        </div>
      </template>
      <DistanceSelect 
        type="base" 
        :value="base" 
        @change="handlePaddingChange('base', $event)"
        @customChange="handleCustomChange"
      />
    </a-form-item>
    
    <div class="card-box" v-show="childOpen" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
      <a-form-item :colon="false" :label="`上${prefix}`" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
        <DistanceSelect :value="top" @change="handlePaddingChange('top', $event)"/>
      </a-form-item>
      <a-form-item :colon="false" :label="`右${prefix}`" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
        <DistanceSelect :value="right" @change="handlePaddingChange('right', $event)"/>
      </a-form-item>
      <a-form-item :colon="false" :label="`下${prefix}`" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
        <DistanceSelect :value="bottom" @change="handlePaddingChange('bottom', $event)"/>
      </a-form-item>
      <a-form-item :colon="false" :label="`左${prefix}`" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
        <DistanceSelect :value="left" @change="handlePaddingChange('left', $event)"/>
      </a-form-item>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import DistanceSelect from './DistanceSelect.vue';
const customEventList = ['update:base', 'update:top', 'update:right', 'update:bottom', 'update:left'];
export default defineComponent({
  props: {
    prefix: {
      type: String,
      default: '内边距',
    },
    base: {
      type: Object,
      default() {return {}}
    },
    top: {
      type: Object,
      default() {return {}}
    },
    right: {
      type: Object,
      default() {return {}}
    },
    bottom: {
      type: Object,
      default() {return {}}
    },
    left: {
      type: Object,
      default() {return {}}
    },
  } as any,
  components: {
    DistanceSelect
  },
  emits: customEventList,
  setup(props, {emit}) {
    const state = reactive({
      childOpen: true,
      selectName: '',
      labelWrapCol: {
        style: {
          'display': 'flex',
          'align-items': 'center',
          'width': '70px'
        }
      },
      wrapperCol: {
        style: {
          'flex': '1'
        }
      },
    })
    const handlChildOpen = () => {
      state.childOpen = !state.childOpen;
    };
    const handlePaddingChange = (type, data) => {
      if (type === 'base') {
        customEventList.forEach(item => {
          emit(item as any, data);
        })
      } else {
        emit(`update:base` as any, {
          value: '',
          unit: '',
        });
        emit(`update:${type}` as any, data);
      }
    }
    const handleCustomChange = () => {
      state.childOpen = true;
    }
    return {
      ...toRefs(state),
      handlChildOpen,
      handlePaddingChange,
      handleCustomChange
    };
  },
});
</script>
<style lang="less" scoped>
.card-box{
  background-color: rgba(31,56,88,.04);
  padding: 8px;
}
</style>