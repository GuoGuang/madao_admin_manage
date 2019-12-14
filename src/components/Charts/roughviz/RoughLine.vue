<template>
  <div id="line"/>
</template>

<script>
import { Line } from 'rough-viz'
import { putAttrsToObj } from '../mixins/putAttrsToObj'

export default {
  name: 'RoughLine',
  mixins: [putAttrsToObj],
  mounted() {
    const lineAttr = this.putAttrsToObj
    lineAttr.element = '#line'
    lineAttr.margin = { top: 50, bottom: 100, left: 45, right: 20 }
    const line = new Line(lineAttr)
    return line
  }
}
</script>

<style lang="scss" scoped></style>

