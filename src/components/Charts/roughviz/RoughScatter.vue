<template>
  <div id="scatter"/>
</template>

<script>
import { Scatter } from 'rough-viz'
import { putAttrsToObj } from '../mixins/putAttrsToObj'

export default {
  name: 'RoughScatter',
  mixins: [putAttrsToObj],
  mounted() {
    const scatterAttr = this.putAttrsToObj
    scatterAttr.element = '#scatter'
    scatterAttr.margin = { top: 50, bottom: 60, left: 35, right: 100 }
    const scatter = new Scatter(scatterAttr)
    return scatter
  }
}
</script>

