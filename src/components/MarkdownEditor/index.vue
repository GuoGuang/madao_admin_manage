<template>
  <editor
    ref="toastuiEditor"
    :options="options"
    :height="height+'px'"
    :language="language"
    :initial-value="value"
    @change="onEditorChange"
  />
</template>
<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import defaultOptions from './default-options'

export default {
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      default: '### '
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    height: {
      type: Number,
      required: false,
      default: 300
    },
    language: {
      type: String,
      required: false,
      default: 'en_US' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    }
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.$refs.toastuiEditor.invoke('getMarkdown')) {
        this.$refs.toastuiEditor.invoke('setMarkdown', newValue)
      }
    }
  },
  methods: {
    scroll() {
      this.$refs.toastuiEditor.invoke('scrollTop', 10)
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke('moveCursorToStart')
    },
    getHtml() {
      return this.$refs.toastuiEditor.invoke('getHtml')
    },
    getMarkdown() {
      return this.$refs.toastuiEditor.invoke('getMarkdown')
    },
    onEditorChange() {
      this.$emit('input', this.$refs.toastuiEditor.invoke('getMarkdown'))
    }
  }
}
</script>
