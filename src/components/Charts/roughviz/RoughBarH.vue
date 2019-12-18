<template>
  <div id="barH" />
</template>

<script>
import { BarH } from 'rough-viz'
import { putAttrsToObj } from '../mixins/putAttrsToObj'

export default {
  name: 'RoughBarH',
  mixins: [putAttrsToObj],
  mounted() {
    const barHAttr = this.putAttrsToObj
    barHAttr.element = '#barH'
    const barH = new BarH(barHAttr)
    return barH
  }
}
</script>

