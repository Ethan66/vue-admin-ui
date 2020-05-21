let btnList = JSON.parse(sessionStorage.getItem('btnList'))

// 展示、获取按钮
export const authBtn = (btnCode, type) => {
  !btnList && (btnList = JSON.parse(sessionStorage.getItem('btnList')))
  if (window.btnList) { // 刷新页面的window.btnList保存的是最新的按钮权限
    btnList = window.btnList
    window.btnList = undefined
  }
  let obj = btnList.find(item => item.btnCode === btnCode)
  if (type) {
    if (obj) {
      return true
    } else {
      return false
    }
  }
  if (obj) {
    return obj.btnName
  } else {
    return false
  }
}

// 表格更多按钮里按钮列表展示
export const authMoreBtn = (list) => {
  return list.map(item => {
    let obj = { code: item.code, name: '', clickFn: item.clickFn }
    obj.name = authBtn(item.code)
    obj.show = authBtn(item.code, 'show')
    item.config && Object.assign(obj, item.config)
    return obj
  })
}
