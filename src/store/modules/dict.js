/**
 * 前端数据字典
 */

const dict = {
  state: {
    // 数据状态选择
    dataState: [
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
    dialogTitleTextMap: { update: '编辑', create: '添加' },

    // 文章来源
    articleOrigin: [
      {
        value: 1,
        label: '原创',
        type: ''
      },
      {
        value: 2,
        label: '转载',
        type: 'warning'
      },
      {
        value: 3,
        label: '混撰',
        type: 'info'
      }
    ],
    // 文章审核状态
    articleState: [
      {
        value: 1,
        label: '通过',
        type: 'success'
      },
      {
        value: 2,
        label: '审核中',
        type: 'warning'
      },
      {
        value: 3,
        label: '拒绝',
        type: 'danger'
      }
    ],
    // 日志操作类型 增删改
    logState: [
      {
        value: 1,
        label: '增加',
        type: 'success'
      },
      {
        value: 2,
        label: '删除',
        type: 'danger'
      },
      {
        value: 3,
        label: '修改',
        type: 'warning'
      }
    ]
  },
  mutations: {

  },
  actions: {
  }
}
export default dict
