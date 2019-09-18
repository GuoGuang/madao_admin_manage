const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user,
  avatar: state => state.user.user.avatar,
  lastDate: state => state.user.user.lastDate,
  menu: state => state.user.menu,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // 显示dialog的标题,参数 create 或者 update
  dialogTitleText: state => (key) => state.dict.dialogTitleTextMap[key],
  // 禁用的下拉列表选项,返回的为一个json数组
  dataState: state => state.dict.dataState,
  articleOrigin: state => state.dict.articleOrigin,
  resourceType: state => state.dict.resourceType,
  articleState: state => state.dict.articleState,
  logState: state => state.dict.logState
}
export default getters
