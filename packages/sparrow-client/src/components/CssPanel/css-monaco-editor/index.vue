<template>
  <div id="code-editor"></div>
</template>

<script>
import { defineComponent, inject } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import  debounce from 'lodash-es/debounce';
import { key as configProviderKey } from '@/hooks/useConfigProvider';
import {parse as postcssParse } from "postcss";

export default defineComponent({
  name: 'codeEidtor',
  monacoInstance: null,
  data() {
    return {
      isEditor: false,
      beforeValue: '',
      globalStore: inject(configProviderKey),
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    cssMonacoCode: {
      type: String,
      default: '',
    }
  },
  emits: ['updateCode'],
  created () {
    this.handleEditor = debounce(this.handleEditor, 1000);
  },
  methods: {
    handleEditor() {
      try {
        let newValue = this.monacoInstance.getValue();
        if (newValue === '') {
          newValue = ':root{\n}';
          this.monacoInstance.setValue(newValue);
        }

        // 检测css编辑里的css写的有问题或者没写完就不会往下同步
        postcssParse(newValue);
        this.globalStore.ctx.eventBus.emit('css-monaco-change', newValue);
      } catch (e) {
        console.error(`${e.reason} on line ${e.line}`);
      }
    },
  },
  mounted() {
    this.monacoInstance = monaco.editor.create(
      document.getElementById('code-editor'),
      {
        value: this.cssMonacoCode,
        language: 'css',
      }
    );
    this.monacoInstance.onDidChangeModelContent(() => {
      if (this.open) {
        this.handleEditor();
      }
    })
  },
  watch: {
    cssMonacoCode () {
      if (this.open) return;
      this.monacoInstance.setValue(this.cssMonacoCode);
    }
  },
  unmounted() {
    this.monacoInstance.dispose();
  },
});
</script>

<style lang="less" scoped>
#code-editor {
  height: 400px;
  border: 1px solid #ccc;
  overflow: hidden;
}
</style>
