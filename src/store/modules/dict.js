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
        value: 'ORIGINAL',
        label: '原创',
        type: ''
      },
      {
        value: 'REPRINT',
        label: '转载',
        type: 'warning'
      },
      {
        value: 'MIXED',
        label: '混撰',
        type: 'info'
      }
    ],
    // 性别
    sex: [
      {
        value: 1,
        label: '男'
      },
      {
        value: 2,
        label: '女'
      }
    ],
    // 文章审核状态
    articleState: [
      {
        value: 'PASS',
        label: '通过',
        type: 'success'
      },
      {
        value: 'AUDITING',
        label: '审核中',
        type: ''
      },
      {
        value: 'REFUSE',
        label: '拒绝',
        type: 'danger'
      }
    ],
    // 菜单管理->菜单类型列
    resourceType: [
      {
        value: 1,
        label: '目录',
        type: 'primary'
      },
      {
        value: 2,
        label: '菜单',
        type: 'success'
      },
      {
        value: 3,
        label: '按钮',
        type: 'warning'
      }
    ],
    // 日志操作类型 增删改
    logState: [
      {
        value: 'ADD',
        label: '增加',
        type: 'success'
      },
      {
        value: 'DELETE',
        label: '删除',
        type: 'danger'
      },
      {
        value: 'MODIFY',
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
