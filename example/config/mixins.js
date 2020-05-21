import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['pageSearchValues'])
  },
  watch: {
    showAll () {
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.handleSetTableHeight()
      })
    }
  },
  methods: {
    // 点击搜索按钮
    handleSearch (val) {
      this.handleGetTableData(this.getTableDataApi, val)
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      let obj = this.handleSaveSearchValues(val, currentPage)
      val = obj.val || val
      for (let key in val) {
        val[key] === '' && delete val[key]
      }
      currentPage = obj.currentPage || currentPage
      this.getTableDataApi = api
      this.tableLoading = true
      let params = Object.assign({
        currentPage: this.tablePages.current,
        pageSize: this.tablePages.pageSize
      }, val)
      api(params).then(res => {
        if (res.code === '000000') {
          const { list, page } = res.data
          this.allData = list
          if (page) {
            this.tablePages.current = page.currentPage
            this.tablePages.total = page.total
          }
          this.tableData = JSON.parse(JSON.stringify(this.allData))
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 选择页面跳转
    handleJump (currentPage) {
      this.handleGetTableData(this.getTableDataApi, this.searchValues, currentPage)
    },
    // 接口：创建表格数据
    apiCreateData (createDataApi, obj, getTableDataApi) {
      return createDataApi(obj).then(res => {
        if (res.code === '000000') {
          this.$refs.dialog && (this.$refs.dialog.showDialogForm1 = false)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getTableDataApi && this.handleGetTableData(getTableDataApi, this.searchValues, this.tablePages.current)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 接口：编辑表格数据
    apiEditData (editDataApi, obj, getTableDataApi) {
      return editDataApi(obj).then(res => {
        if (res.code === '000000') {
          this.$refs.dialog && (this.$refs.dialog.showDialogForm1 = false)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getTableDataApi && this.handleGetTableData(getTableDataApi, this.searchValues, this.tablePages.current)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 接口：删除表格数据
    apiDeleteData (deleteDataApi, id, getTableDataApi) {
      return deleteDataApi({ id: id }).then(res => {
        if (res.code === '000000') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getTableDataApi && this.handleGetTableData(getTableDataApi, this.searchValues, this.tablePages.current)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // searchValues vuex缓存
    handleSaveSearchValues (val = {}, currentPage) {
      // keepAlive不需要存取数据
      if (this.keepAlive) return { val, currentPage }
      // 只有第一次搜索读取缓存数据
      let lowName = this.$options.name ? this.$options.name.toLowerCase() : ''
      if (!this.searched) {
        let savedSearchValues = null
        // 取vuex数据
        if (this.pageSearchValues && this.pageSearchValues[lowName]) {
          savedSearchValues = this.pageSearchValues[lowName]
        } else {
          // vuex没有数据取缓存
          let obj = sessionStorage.getItem('activedSearchValues')
          if (obj) {
            if (JSON.parse(obj)[lowName]) {
              savedSearchValues = JSON.parse(obj)[lowName]
            }
          }
        }
        if (savedSearchValues) {
          let obj = savedSearchValues
          this.searchValues = val = obj.searchValues
          this.tablePages.current = currentPage = obj.currentPage
        } else {
          this.searchValues = val = Object.assign({}, this.searchDefaultObj)
        }
      }
      this.searched = true
      // 将搜索等数据缓存
      this.$store.commit('UPDATE_PAGE_SEARCH_VALUES', {
        name: lowName,
        value: { searchValues: val, currentPage }
      })
      return { val, currentPage }
    },
    // 编辑后展示已打开的树
    handleOpenTree (tableData, saveExpendIdList) {
      let result = []
      function open (result, data, idList) {
        data.forEach(item => {
          result.push(item)
          if (idList.includes(item.id)) {
            item.expand = true
            if (item.list) {
              open(result, item.list, idList)
            }
          }
        })
      }
      open(result, tableData, saveExpendIdList)
      this.tableData = result
    }
  }
}
