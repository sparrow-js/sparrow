<template>
  <div>
    <codemirror v-model="value" :options="codeMirrorOptions" ref="editor"></codemirror>
  </div>
</template>

<script>
import "codemirror/mode/vue/vue.js";
import VueFormGenerator from "vue-form-generator";
import { codemirror } from "vue-codemirror";
require("codemirror/lib/codemirror.css");
export default {
  mixins: [VueFormGenerator.abstractField],
  components: {
    codemirror
  },
  computed: {
    codeMirrorOptions() {
      // Allows setting of CodeMirror options, including setting theme
      // http://codemirror.net/doc/manual.html#config
      if (this.schema.hasOwnProperty("codeMirrorOptions")) {
        const cmOptions = this.schema.codeMirrorOptions;
        // Load theme css, if specified in codeMirrorOptions
        if (cmOptions.hasOwnProperty("theme")) {
          try {
            require("codemirror/theme/" + cmOptions.theme + ".css");
          } catch (e) {
            console.log({ e });
          }
        }
        if (cmOptions.hasOwnProperty("mode")) {
          let modeName = "";
          if (
            typeof cmOptions.mode === "object" &&
            cmOptions.mode.hasOwnProperty("name")
          ) {
            modeName = cmOptions.mode.name;
          } else if (typeof cmOptions.mode === "string") {
            modeName = cmOptions.mode;
          }
          // Load the mode js, if specified in codeMirrorOptions
          try {
            require("codemirror/mode/" + modeName + "/" + modeName + ".js");
          } catch (e) {
            console.log({ e });
          }
        }
        return cmOptions;
      } else {
        return {};
      }
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.$refs.editor && this.$refs.editor.codemirror)
        this.$refs.editor.codemirror.refresh();
    }, 1000);
  }
};
</script>