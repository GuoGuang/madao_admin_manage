<template>
  <div id="stacked-bar"/>
</template>

<script>
import { StackedBar } from 'rough-viz'
import { putAttrsToObj } from '../mixins/putAttrsToObj'

export default {
  name: 'RoughStackedBar',
  mixins: [putAttrsToObj],
  mounted() {
    const stackedBarAttr = this.putAttrsToObj
    stackedBarAttr.element = '#stacked-bar'
    const stackedBar = new StackedBar(stackedBarAttr)
    return stackedBar
  }
}
</script>
