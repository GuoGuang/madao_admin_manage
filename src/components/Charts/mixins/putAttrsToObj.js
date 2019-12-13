import { camelCase, toNumber } from 'lodash' // using lodash as a helper for camelcasing the attrs

export const putAttrsToObj = {
  computed: {
    putAttrsToObj: function() {
      const attrs = this.$attrs
      const obj = {}
      for (const [key, value] of Object.entries(attrs)) {
        obj[camelCase(key)] = isNaN(value) ? value : toNumber(value)
      }
      return obj
    }
  }
}
