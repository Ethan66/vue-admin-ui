const getters = {
  sidebar: state => state.app.sidebar,
  menuList: state => state.app.menuList,
  keepAliveList: state => state.pageCashe.keepAliveList,
  pageSearchValues: state => state.pageCashe.pageSearchValues,
  subTabObj: state => state.app.subTabObj,
  isAddDynamicRoutes: state => state.app.isAddDynamicRoutes
}
export default getters
