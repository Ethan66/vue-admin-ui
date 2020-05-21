const getters = {
  sidebar: state => state.app.sidebar,
  keepAliveList: state => state.pageCashe.keepAliveList,
  pageSearchValues: state => state.pageCashe.pageSearchValues,
  subTabObj: state => state.pageCashe.subTabObj
}
export default getters
