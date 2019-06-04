
/**
 * 公共common js
 */
export default {

  /**
* 格式化时间
* @param row
* @param column
* @returns {string}
*/
  dateFormat(row, column) {
    const timestamp = row[column.property]
    if (timestamp != null) {
      var d = new Date(timestamp)// 根据时间戳生成的时间对象
      var yy = d.getFullYear() // 年
      var mm = d.getMonth() + 1 // 月
      var dd = d.getDate() // 日
      var hh = d.getHours() // 时
      var ii = d.getMinutes() // 分
      var ss = d.getSeconds() // 秒
      var clock = yy + '-'
      if (mm < 10) clock += '0'
      clock += mm + '-'
      if (dd < 10) clock += '0'
      clock += dd + ' '
      if (hh < 10) clock += '0'
      clock += hh + ':'
      if (ii < 10) clock += '0'
      clock += ii + ':'
      if (ss < 10) clock += '0'
      clock += ss
      return clock
    }
    return ''
  },
  /**
  * 供普通函数调用
  * {{ common.dateFormat(profileInfo.createAt) }}
  * @param row
  * @param column
  * @returns {string}
  */
  dateFormatFun(timestamp) {
    if (timestamp != null) {
      var d = new Date(timestamp)// 根据时间戳生成的时间对象
      var yy = d.getFullYear() // 年
      var mm = d.getMonth() + 1 // 月
      var dd = d.getDate() // 日
      var hh = d.getHours() // 时
      var ii = d.getMinutes() // 分
      var ss = d.getSeconds() // 秒
      var clock = yy + '-'
      if (mm < 10) clock += '0'
      clock += mm + '-'
      if (dd < 10) clock += '0'
      clock += dd + ' '
      if (hh < 10) clock += '0'
      clock += hh + ':'
      if (ii < 10) clock += '0'
      clock += ii + ':'
      if (ss < 10) clock += '0'
      clock += ss
      return clock
    }
    return ''
  },

  /**
   * 将普通列表数据转换为树形结构
   * @param {*} data 需要转换的数据
   * @param {*} pid 根id
   */
  converTreeData(data, pid) {
    const result = []
    let temp
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === pid) {
        const obj = { 'id': data[i].id, 'name': data[i].name }
        temp = this.converTreeData(data, data[i].id.toString())
        if (temp.length > 0) {
          obj.children = temp
        }
        result.push(obj)
      }
    }
    return result
  },

  /**
   * table 转treeTable
   * @param {*} data 需要转换的数据
   * @param {*} pid 根id
   */
  converToTree(data, pid) {
    const result = []
    let temp
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === pid) {
        const callData = data[i]
        temp = this.converToTree(data, data[i].id)
        if (temp.length > 0) {
          callData.children = temp
        }
        result.push(callData)
      }
    }
    return result
  }
}

