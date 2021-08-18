<template>
  <div>
    <a-form-item :colon="false" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
      <template #label>
        <div @click="handlChildOpen">
          <CaretDownOutlined v-if="childOpen"/>
          <CaretRightOutlined v-else />
          <span>阴影</span>
        </div>
      </template>
      <a-select v-model:value="fontQuick" @change="handleQuick">
        <a-select-option v-for="item in quickList" :key="item.id" :value="item.id">
          {{item.label}}
        </a-select-option>
      </a-select>
    </a-form-item>
    <div class="card-box" v-show="childOpen">
      <a-form-item :colon="false" label="颜色" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input 
          :value="shadowColor"
          @change="handleChange('shadowColor', $event)"
        />
      </a-form-item>

      <a-form-item :colon="false" label="X" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input-group compact>
          <a-input-number 
            style="width: 121px"
            :value="shadowOffsetX.value"
            @change="handleObjectChange('shadowOffsetX', 'value', $event)"
          />
          <a-select
            :value="shadowOffsetX.unit"
            @change="handleObjectChange('shadowOffsetX', 'unit', $event)"
          >
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>

      <a-form-item :colon="false" label="Y" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input-group compact>
          <a-input-number 
            style="width: 121px"
            :value="shadowOffsetY.value"
            @change="handleObjectChange('shadowOffsetY', 'value', $event)"
          />
          <a-select
            :value="shadowOffsetY.unit"
            @change="handleObjectChange('shadowOffsetY', 'unit', $event)"
          >
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>

      <a-form-item :colon="false" label="Blur" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input-group compact>
          <a-input-number 
            style="width: 121px"
            :value="shadowBlur.value"
            @change="handleObjectChange('shadowBlur', 'value', $event)"
          />
          <a-select
            :value="shadowBlur.unit"
            @change="handleObjectChange('shadowBlur', 'unit', $event)"
          >
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>

      <a-form-item :colon="false" label="Spread" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input-group compact>
          <a-input-number 
            style="width: 121px"
            :value="shadowSpread.value"
            @change="handleObjectChange('shadowSpread', 'value', $event)"
          />
          <a-select
            :value="shadowSpread.unit"
            @change="handleObjectChange('shadowSpread', 'unit', $event)"
          >
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>
    </div>
  </div>   
</template>
<script>
import { reactive, toRefs, watch } from 'vue';
import isEqual from 'lodash-es/isEqual';
const customEvents = [
  'update:shadowOffsetX',
  'update:shadowOffsetY',
  'update:shadowBlur',
  'update:shadowSpread',
  'update:shadowColor'
]
export default {
  props: {
    shadowOffsetX: {
      type: Object,
      default() {return {}}
    },
    shadowOffsetY: {
      type: Object,
      default() {return {}}
    },
    shadowBlur: {
      type: Object,
      default() {return {}}
    },
    shadowSpread: {
      type: Object,
      default() {return {}}
    },
    shadowColor: {
      type: String,
      default: '',
    },
    componentId: {
      type: String,
      default: '',
    }
  },
  emits: customEvents,
  setup (props, {emit}) {
    const state = reactive({
      childOpen: false,
      fontQuick: '',
      labelCol: {
        style: {
          'display': 'flex',
          'align-items': 'center',
          'width': '60px'
        }
      },
      labelWrapCol: {
        style: {
          'display': 'flex',
          'align-items': 'center',
          'width': '70px'
        }
      },
      wrapperCol: {
        flex: '1',
      },
      quickList: [
        {
          label: '大',
          value: {
            shadowOffsetX: {
              value: '4',
              unit: 'px'
            },
            shadowOffsetY: {
              value: '4',
              unit: 'px'
            },
            shadowBlur: {
              value: '15',
              unit: 'px'
            },
            shadowSpread: {
              value: '0',
              unit: 'px'
            },
            shadowColor: 'rgba(31, 56, 88, 0.2)'
          },
          id: 15
        },
        {
          label: '中',
          value: {
            shadowOffsetX: {
              value: '2',
              unit: 'px'
            },
            shadowOffsetY: {
              value: '2',
              unit: 'px'
            },
            shadowBlur: {
              value: '10',
              unit: 'px'
            },
            shadowSpread: {
              value: '0',
              unit: 'px'
            },
            shadowColor: 'rgba(31, 56, 88, 0.2)'
          },
          id: 10
        },
        {
          label: '小',
          value: {
            shadowOffsetX: {
              value: '1',
              unit: 'px'
            },
            shadowOffsetY: {
              value: '1',
              unit: 'px'
            },
            shadowBlur: {
              value: '4',
              unit: 'px'
            },
            shadowSpread: {
              value: '0',
              unit: 'px'
            },
            shadowColor: 'rgba(31, 56, 88, 0.2)'
          },
          id: 4
        },
        {
          label: '无',
          value: {
            shadowOffsetX: {
              value: '0',
              unit: 'px'
            },
            shadowOffsetY: {
              value: '0',
              unit: 'px'
            },
            shadowBlur: {
              value: '0',
              unit: 'px'
            },
            shadowSpread: {
              value: '0',
              unit: 'px'
            },
            shadowColor: 'rgba(31, 56, 88, 0.2)'
          },
          id: 0
        },
        {
          label: '默认',
          value: {
            shadowOffsetX: {
              value: '',
              unit: 'px'
            },
            shadowOffsetY: {
              value: '',
              unit: 'px'
            },
            shadowBlur: {
              value: '',
              unit: 'px'
            },
            shadowSpread: {
              value: '',
              unit: 'px'
            },
            shadowColor: ''
          },
          id: ''
        },
        {
          label: '自定义',
          value: {
            shadowOffsetX: {
              value: '4',
              unit: 'px'
            },
            shadowOffsetY: {
              value: '4',
              unit: 'px'
            },
            shadowBlur: {
              value: '15',
              unit: 'px'
            },
            shadowSpread: {
              value: '0',
              unit: 'px'
            },
            shadowColor: 'rgba(31, 56, 88, 0.2)'
          },
          id: 'custom'
        }
      ]
    });
    const handlChildOpen = () => {
      state.childOpen = !state.childOpen;
    };

    const handleQuick = () => {
      const quickItem = state.quickList.find(item => item.id === state.fontQuick);
      if (state.fontQuick === 'custom') {
        state.childOpen = true;
      } else {
      if (quickItem) {
          Object.keys(quickItem.value).forEach(key => {
            emit(`update:${key}`, quickItem.value[key]);
          })
        }
      }
    }

    const handleChange = (type, data) => {
      state.fontQuick = 'custom';
      emit(`update:${type}`, data.target.value);
    }

    const handleObjectChange = (key1, key2, data) => {
      state.fontQuick = 'custom';
      const currentProp = props[key1];
      let temp = {};
      if (key2 === 'value') {
        temp = {
          value: data,
          unit: currentProp['unit'],
        }
      } else {
        temp = {
          value: currentProp.value,
          unit: data,
        }
      }
      emit(`update:${key1}`, temp);
    }

    const setInitFontQuick = () => {
      const findIndex = state.quickList.findIndex(item => {
        return isEqual(item.value, {
          shadowOffsetX: props.shadowOffsetX,
          shadowOffsetY: props.shadowOffsetY,
          shadowBlur: props.shadowBlur,
          shadowSpread: props.shadowSpread,
          shadowColor: props.shadowColor,
        })
      });

      if (findIndex >= 0) {
        state.fontQuick = state.quickList[findIndex].id;
      }
    }
    watch(() => props.componentId, () => {
      setInitFontQuick();
    },
    {
      immediate: true,
      deep: true,
    })

    return {
      ...toRefs(state),
      handlChildOpen,
      handleQuick,
      handleChange,
      handleObjectChange
    }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  background-color: rgba(31,56,88,.04);
  padding: 8px;
  margin-bottom: 6px;
}
</style>