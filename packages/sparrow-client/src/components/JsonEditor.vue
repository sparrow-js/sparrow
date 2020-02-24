<template>
    <div ref="jsoneditor">
    </div>
</template>

<script>
import JSONEditor from 'jsoneditor/dist/jsoneditor-minimalist.js'
import 'jsoneditor/dist/jsoneditor.min.css'
import _ from 'lodash'
export default {
  name: 'json-editor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    json: {
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    onChange: {
      type: Function
    }
  },
  watch: {
    json: {
      handler (newJson) {
        if (this.editor) {
          this.editor.set(newJson)
        }
      },
      deep: true
    }
  },
  methods: {
    _onChange (e) {
      if (this.onChange && this.editor) {
        this.onChange(this.editor.get())
      }
    }
  },
  mounted () {
    const container = this.$refs.jsoneditor
    const options = _.extend({
      onChange: this._onChange
    }, this.options)
    this.editor = new JSONEditor(container, options)
    this.editor.set(this.json)
  },
  beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
      this.editor = null
    }
  }
}
</script>