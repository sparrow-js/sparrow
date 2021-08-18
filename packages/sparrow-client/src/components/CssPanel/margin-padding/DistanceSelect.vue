<template>
  <div 
    @mousedown="handleOpenSelect($event)"
  >
    <a-select 
      :value="selectValue"
      :open="selectOpen"
      @select="handleSelect"
    >
      <template #dropdownRender="{ menuNode: menu }">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0" />
        <div
          style="padding: 4px 8px; cursor: pointer"
        >
          <a-input-group compact>
            <a-input 
              style="width: 60%"
              v-model:value="customItem.value"
              @click="e=>{e => e.preventDefault();e.target.focus()}"
              @change="customChange"
              placeholder="自定义"
            />
            <a-select
              v-model:value="customItem.unit"
              @change="customChange"
            >
              <a-select-option value="px">
                px
              </a-select-option>
              <a-select-option value="%">
                %
              </a-select-option>
            </a-select>
          </a-input-group>
        </div>
      </template>
      <a-select-option v-for="item in items" :key="item.label" :value="item.id">
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, nextTick } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default () {
        return {
          value: '',
          unit: 'px'
        }
      }
    }
  },
  emits: ['change', 'customChange'],
  setup(props, {emit}) {
    const state = reactive({
      selectOpen: false,
      customItem: {
        value: '',
        unit: 'px'
      },
      items: [
        {
          label: '超大（24px）',
          id: '24px',
          value: {
            value: 24,
            unit: 'px'
          }
        },
        {
          label: '大（20px）',
          id: '20px',
          value: {
            value: 20,
            unit: 'px'
          }
        },
        {
          label: '中（16px）',
          id: '16px',
          value: {
            value: 16,
            unit: 'px'
          }
        },
        {
          label: '小（12px）',
          id: '12px',
          value: {
            value: 12,
            unit: 'px'
          }
        },
        {
          label: '超小（8px）',
          id: '8px',
          value: {
            value: 8,
            unit: 'px'
          }
        },
        {
          label: '无（0px）',
          id: '0px',
          value: {
            value: '0',
            unit: 'px'
          }
        },
        {
          label: '默认',
          id: 'px',
          value: {
            value: '',
            unit: 'px'
          }
        }
      ]
    })
    if ((props as any).type == 'base') {
      state.items.push({
        label: '自定义',
        id: '',
        value: {
          value: '',
          unit: '',
        }
      });
    }

    const selectValue = computed(function () {
      if ((props as any).value.value === '' && (props as any).value.unit === '') {
        return '';
      }
      return `${(props as any).value.value}${(props as any).value.unit}`;
    });

    const handleSelect = (value) => {
      state.selectOpen = false;
      const option = state.items.find(item => item.id === value);
      if (value == '') {
         emit('customChange', option.value);
      } else {
        if (option) {
          emit('change', option.value);
        }
      }
    };


    const handleOpenSelect = (e) => {
      e.preventDefault();
      e.stopPropagation();
      state.selectOpen = !state.selectOpen;
    }

    const customChange = () => {
      emit('change', state.customItem);
    };
    nextTick(() => {
      document.querySelector('.right-board').addEventListener('mousedown', () => {
        state.selectOpen = false;
      });
    })

    // const set

    return {
      ...toRefs(state),
      handleSelect,
      customChange,
      handleOpenSelect,
      selectValue,
    };
  },
  components: {
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
});
</script>
