<template>
  <div id="pie" />
</template>

<script>
import { Pie } from 'rough-viz'
import { putAttrsToObj } from './mixins/putAttrsToObj'

export default {
  name: 'RoughPie',
  mixins: [putAttrsToObj],
  mounted() {
    const pieAttr = this.putAttrsToObj
    pieAttr.element = '#pie'
    const pie = new Pie(pieAttr)
    return pie
  }
}
</script>

