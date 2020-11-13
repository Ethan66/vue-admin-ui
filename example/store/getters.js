const getters = {
  sidebar: state => state.app.sidebar,
  mainActivedTab: state => state.app.mainActivedTab,
  mainTabs: state => state.app.mainTabs,
  userInfo: state => state.app.userInfo,
  menuList: state => state.app.menuList,
  keepAliveList: state => state.pageCashe.keepAliveList,
  pageSearchValues: state => state.pageCashe.pageSearchValues,
  subTabObj: state => state.app.subTabObj,
  isAddDynamicRoutes: state => state.app.isAddDynamicRoutes
}
export default getters
