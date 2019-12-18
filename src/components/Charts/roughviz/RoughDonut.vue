<template>
  <div id="donut" />
</template>

<script>
import { Donut } from 'rough-viz'
import { putAttrsToObj } from '../mixins/putAttrsToObj'

export default {
  name: 'RoughDonut',
  mixins: [putAttrsToObj],
  mounted() {
    const donutAttr = this.putAttrsToObj
    donutAttr.element = '#donut'
    const donut = new Donut(donutAttr)
    return donut
  }
}
</script>

