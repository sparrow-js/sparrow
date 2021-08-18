<template>
  <div class="style-config" >
    <a-popover
      title="样式编辑"
      trigger="click"
      placement="leftTop"
      :visible="openSourceCss"
      @visibleChange="handleSourceCssChange"
    >
      <template #content>
        <div class="css-editor-box">
          <CssMonacoEditor :open="openSourceCss" :cssMonacoCode="cssMonacoCode"/>
        </div>
      </template>
      <a-button class="source-button" type="primary" ghost>
        源码编辑
      </a-button>
    </a-popover>
    <a-divider />
    <a-form>
      <a-form-item :colon="false" label="宽" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
         <a-input-group compact>
          <a-input-number
            :min="0"
            v-model:value="formStyle.width.value"
            style="width: 129px;"
          />
          <a-select v-model:value="formStyle.width.unit">
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>
       <a-divider />
      <a-form-item :colon="false" label="高" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
        <a-input-group compact>
          <a-input-number
            :min="0"
            v-model:value="formStyle.height.value"
            style="width: 129px;"
          />
          <a-select v-model:value="formStyle.height.unit">
            <a-select-option value="px">
              px
            </a-select-option>
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>
       <a-divider />
      <Black
        v-model:display="formStyle.display"
        v-model:flexDirection="formStyle.flexDirection"
        v-model:alignItems="formStyle.alignItems"
        v-model:justifyContent="formStyle.justifyContent"
      />
       <a-divider />
      <MarginPadding
        v-model:base="formStyle.padding"
        v-model:top="formStyle.paddingTop"
        v-model:right="formStyle.paddingRight"
        v-model:bottom="formStyle.paddingBottom"
        v-model:left="formStyle.paddingLeft"
        prefix="内边距"
      />
      <a-divider />
      <MarginPadding
        v-model:base="formStyle.margin"
        v-model:top="formStyle.marginTop"
        v-model:right="formStyle.marginRight"
        v-model:bottom="formStyle.marginBottom"
        v-model:left="formStyle.marginLeft"
        prefix="外边距"
      />
      <a-divider />
      <Font
        v-model:fontWeight="formStyle.fontWeight"
        v-model:fontStyle="formStyle.fontStyle"
        v-model:color="formStyle.color"
        v-model:fontSize="formStyle.fontSize"
        v-model:lineHeight="formStyle.lineHeight"
        v-model:textAlign="formStyle.textAlign"
        v-model:textDecoration="formStyle.textDecoration"
        :componentId="componentId"
      />
      <a-divider />
      <Background
        v-model:backgroundColor="formStyle.backgroundColor"
      />
      <a-divider />
      <Border
        v-model:borderDirection="formStyle.borderDirection"
        v-model:borderWidth="formStyle.borderWidth"
        v-model:borderStyle="formStyle.borderStyle"
        v-model:borderColor="formStyle.borderColor"
         v-model:borderRadiusDirection="formStyle.borderRadiusDirection"
        v-model:borderRadiusWidth="formStyle.borderRadiusWidth"
      />
      <a-divider />
      <Shadow
        v-model:shadowOffsetX="formStyle.shadowOffsetX"
        v-model:shadowOffsetY="formStyle.shadowOffsetY"
        v-model:shadowBlur="formStyle.shadowBlur"
        v-model:shadowSpread="formStyle.shadowSpread"
        v-model:shadowColor="formStyle.shadowColor"
        :componentId="componentId"
      />
      <a-divider />
      <a-form-item :colon="false" label="不透明度" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
         <a-input-group compact>
          <a-input-number
            v-model:value="formStyle.opacity.value"
            placeholder="默认"
            style="width: 129px;"
          />
          <a-select default-value="%">
            <a-select-option value="%">
              %
            </a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>
      <a-divider />
      <a-form-item :colon="false" label="手势" :label-col="labelWrapCol" :wrapper-col="wrapperCol">
        <a-select
          v-model:value="formStyle.cursor"
        >
          <a-select-option
            v-for="item in cursorList"
            :key="item.value"
            :value="item.value">
            {{item.value}}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import { reactive, toRefs, watch, computed } from 'vue';
  import generator from './jsTocss/index.ts';
  import CssMonacoEditor from './css-monaco-editor/index.vue';
  import transform from './cssToJs/index.ts';
  import Black from './black/index.vue';
  import MarginPadding from './margin-padding/index.vue';
  import Font from './font/index.vue';
  import Background from './background/index.vue';
  import Border from './border/index.vue';
  import Shadow from './shadow/index.vue';
  import cloneDeep from 'lodash-es/cloneDeep';
  const initStyle = {
    width: {
      value: '',
      unit: 'px',
    },
    height: {
      value: '',
      unit: 'px',
    },
    display: '',
    flexDirection: '',
    alignItems: '',
    justifyContent: '',
    padding: {
      unit: 'px',
      value: '',
    },
    paddingBottom: {
      unit: 'px',
      value: '',
    },
    paddingLeft: {
      unit: 'px',
      value: '',
    },
    paddingTop: {
      unit: 'px',
      value: '',
    },
    paddingRight: {
      unit: 'px',
      value: '',
    },
    margin: {
      unit: 'px',
      value: '',
    },
    marginBottom: {
      unit: 'px',
      value: '',
    },
    marginLeft: {
      unit: 'px',
      value: '',
    },
    marginTop: {
      unit: 'px',
      value: '',
    },
    marginRight: {
      unit: 'px',
      value: '',
    },
    // font
    fontFamily: '',
    fontWeight: '',
    fontStyle: '',
    color: '',
    fontSize: {
      unit: 'px',
      value: '',
    },
    lineHeight: {
      unit: 'px',
      value: '',
    },
    textAlign: '',
    textDecoration: '',
    backgroundColor: '',
    // border
    borderDirection: '',
    borderWidth: {
      unit: 'px',
      value: '',
    },
    borderStyle: '',
    borderColor: '',
    borderRadiusDirection: '',
    borderRadiusWidth: {
      unit: 'px',
      value: '',
    },
    //box-shadow
    shadowOffsetX: {
      unit: 'px',
      value: '',
    },
    shadowOffsetY: {
      unit: 'px',
      value: '',
    },
    shadowBlur: {
      unit: 'px',
      value: '',
    },
    shadowSpread: {
      unit: 'px',
      value: '',
    },
    shadowColor: '',
    // opacity
    opacity: {
      unit: '%',
      value: '',
    },
    cursor: ''
  };
  export default {
    components: {Black, CssMonacoEditor, MarginPadding, Font, Background, Border, Shadow},
    emits: ['onChange'],
    props: {
      componentsSchema: { // 项目所有组件的信息
        type: Array,
        default: () => [],
      },
      componentId: {
        type: String,
        default: ''
      },
      initCss:{
        type: String,
        default: ''
      }
    },
    setup (props, {emit}) {
      const state = reactive({
        formStyle: cloneDeep(initStyle),
        cursorList: [
          {
            label: 'default',
            value: 'default'
          },
          {
            label: 'pointer',
            value: 'pointer'
          }
        ],
        openSourceCss: false,
        cssCode: '',
        labelWrapCol: {
          style: {
            'display': 'flex',
            'align-items': 'center',
            'width': '70px'
          }
        },
        wrapperCol: {
          style: {
            'width': '190px'
          }
        },
      });
      const handleSourceCssChange = (visible) => {
        state.openSourceCss = visible;
      }

      const cssMonacoCode = computed(() => {
        return props.componentsSchema?.properties?.styleCode?.default;
      });

      const syncCss = () => {
        const initCss = props.componentsSchema.properties?.styleCode?.default;
        if (!initCss) return;
        const cssObj = transform(initCss.match(/:\w+[^{]+\{[^}]*\}/g));
        if (cssObj) {
          state.formStyle = Object.assign(cloneDeep(initStyle), cssObj);
        }
      }

      watch(() => props.componentId, () => {
        // 组件切换初始化数据
        syncCss();
      },
      {
        immediate: true,
        deep: true,
      })

      watch(() => state.formStyle, () => {
        state.cssCode = generator({
          ...state.formStyle,
        });
        emit('onChange', state.cssCode);
      },
      {
        immediate: false,
        deep: true,
      });

      return {
        ...toRefs(state),
        handleSourceCssChange,
        cssMonacoCode,
        syncCss
      }
    }
  }
</script>
<style lang="less">
.style-config{
  padding: 0 16px 16px;
  .ant-form-item{
    margin-bottom: 12px;
  }
  .ant-form-item-label{
    line-height: 1;
  }
  .ant-divider-horizontal{
    margin: 10px 0;
  }
  .ant-form-item-no-colon{
    display: flex;
  }
}
.css-editor-box{
  width: 300px;
  height: 420px;
}

</style>
