const getters = {
  sidebar: state => state.app.sidebar,
  mainTabs: state => state.app.mainTabs,
  userInfo: state => state.app.userInfo,
  menuList: state => state.app.menuList,
  keepAliveList: state => state.pageCashe.keepAliveList,
  pageSearchValues: state => state.pageCashe.pageSearchValues
}
export default getters
