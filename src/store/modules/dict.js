/**
 * 前端数据字典
 */

const dict = {
  state: {
    // 数据状态选择
    dataState: [
      {
        value: 2,
        label: '全部'
      },
      {
        value: 1,
        label: '正常'
      },
      {
        value: 0,
        label: '禁用'
      }
    ],
    // disabledStatusMap: { false: '使用', true: '禁用' },
    disabledStatusColorMap: { false: 'success', true: 'danger' },
    // 弹出表单的标题
    dialogTitleTextMap: { update: '编辑', create: '添加' }
  },
  mutations: {

  },
  actions: {
  }
}
export default dict
