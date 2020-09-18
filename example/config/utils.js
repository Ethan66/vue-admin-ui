import { Message } from 'element-ui'

export const getSuccessMsg = function (text, type = 'success') {
  Message({
    message: text,
    type: type,
    duration: 2000
  })
}

// 从url上获取页面的$options.name
export const getOptionsName = (url) => {
  if (url) {
    let arr = url.split('/').slice(-2)
    let result = arr[0]
    arr[1] !== 'index' && (result += `-${arr[1]}`)
    return result
  }
}

// 接口传参删除多余参数
export const purifyParams = (params) => {
  let result = {}
  Object.keys(params).forEach(key => ((params[key] !== '' && params[key] !== null && params[key] !== undefined) && (result[key] = params[key])))
  return result
}

export const setMoreItems = (keys, config) => {
  if (!Array.isArray(keys) && typeof keys !== 'string') {
    console.error('setMoreItems的keys类型不正确')
    return true
  }
  const result = {}
  keys.toString().split(',').forEach((key, i) => {
    let tmp = key.match(/^([^\d]+)([\d]+)$/)
    if (tmp === null) {
      throw new Error('setMoreItems的keys格式不正确')
    }
    result[key] = config[tmp[1]]
  })
  return result
}

// 点击搜索按钮
export const handleSearch = function (val) {
  this.queryData = val
  handleGetTableData.call(this, this.getTableDataApi, val, 1)
}

// 获取表格数据
export const handleGetTableData = function (api, val = this.queryData, currentPage = this.tablePages.current) {
  this.getTableDataApi = api
  this.tableLoading = true
  let params = Object.assign({
    currentPage: currentPage || this.tablePages.current,
    pageSize: this.tablePages.pageSize
  }, val)
  api(params).then(res => {
    if (res.code === '000000') {
      const { list, page } = res.data
      this.tableData = this.allData = list
      if (page) {
        this.tablePages.current = page.currentPage
        this.tablePages.total = page.total
      }
      this.tableLoading = false
    } else {
      Message.error(res.msg)
    }
  })
}

// 选择页面跳转
export const handleChangePage = function (currentPage) {
  handleGetTableData.call(this, this.getTableDataApi, this.searchValues, currentPage)
}

// 接口：创建表格数据
export const apiCreateData = function (createDataApi, obj, getTableDataApi = this.getTableDataApi) {
  createDataApi(obj).then(res => {
    if (res.code === '000000') {
      this.$refs.dialog && (this.showDialogForm = false)
      getSuccessMsg(res.msg)
      getTableDataApi && handleGetTableData.call(this, getTableDataApi)
    } else {
      Message.error(res.msg)
    }
  })
}

// 接口：编辑表格数据
export const apiEditData = function (editDataApi, obj, getTableDataApi = this.getTableDataApi) {
  editDataApi(obj).then(res => {
    if (res.code === '000000') {
      this.showDialogForm = false
      getSuccessMsg(res.msg)
      getTableDataApi && handleGetTableData(this, getTableDataApi)
    } else {
      Message.error(res.msg)
    }
  })
}

// 接口：删除表格数据
export const apiDeleteData = function (deleteDataApi, id, getTableDataApi = this.getTableDataApi) {
  deleteDataApi({ id }).then(res => {
    if (res.code === '000000') {
      getSuccessMsg('删除成功')
      getTableDataApi && handleGetTableData.call(this, getTableDataApi)
    } else {
      Message.error(res.msg)
    }
  })
}
