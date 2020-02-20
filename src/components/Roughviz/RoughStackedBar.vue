<template>
  <div id="stacked-bar" />
</template>

<script>
import { StackedBar } from 'rough-viz'
import { putAttrsToObj } from './mixins/putAttrsToObj'

export default {
  name: 'RoughStackedBar',
  mixins: [putAttrsToObj],
  mounted() {
    const stackedBarAttr = this.putAttrsToObj
    stackedBarAttr.element = '#stacked-bar'
    // TODO 优化为外部传入
    stackedBarAttr.width = document.getElementById('stacked').clientWidth - 50
    const stackedBar = new StackedBar(stackedBarAttr)
    return stackedBar
  }
}
</script>
