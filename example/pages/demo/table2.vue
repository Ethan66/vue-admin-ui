<template>
  <div>
    <table-module
      ref="table"
      :loading="tableLoading"
      :data="tableData"
      :items="tableItem"
      :page="tablePages"
      @jump="handleChangePage"
      @selection-change="handleSelectChange"
    >
      <div class="btn-content" slot="header-btn">
        <el-button @click="handleAdd" v-btn="'user-create-user'">{{ $getBtnName('user-create-user') }}</el-button>
        <el-button @click="handleDeleteMore" v-btn="'user-delete-batch'">{{ $getBtnName('user-delete-batch') }}</el-button>
      </div>
      <template slot="status" slot-scope="scope">
        <table-status
          :item="tableItem[4]"
          :row="scope.row"
        ></table-status>
      </template>
      <template slot="btn" slot-scope="scope">
        <table-btn
          :row="scope.row"
          :btns="tableBtn"
        />
      </template>
    </table-module>
    <table-module
      ref="table2"
      :loading="tableLoading2"
      :data="tableData2"
      :items="tableItem2"
      :page="tablePages2"
      @jump="handleChangePage2"
      @selection-change="handleSelectChange"
    >
      <div class="btn-content" slot="header-btn">
        <el-button @click="handleSelected">默认勾选第一行</el-button>
      </div>
      <template slot="status" slot-scope="scope">
        <table-status
          :item="tableItem[4]"
          :row="scope.row"
        ></table-status>
      </template>
      <template slot="btn" slot-scope="scope">
        <table-btn
          :row="scope.row"
          :btns="tableBtn"
        />
      </template>
    </table-module>
  </div>
</template>

<script>
import tableBtn from '@/components/tableBtn' // 按钮模块
import tableStatus from '@/components/table-status' // 自定义模块
import { apiGetUser } from '@/api/authority'

export default {
  name: 'demo-table2',
  components: { tableStatus, tableBtn },
  data () {
    return Object.assign(new this.$InitObj({
      items: {
        table: {
          selection: { selectable: (row, index) => index !== 2 },
          account: { label: '账号', width: 100, show: false },
          name: { label: '用户名' },
          roleName: { label: '角色', width: 100 },
          status: { label: '状态', width: 90, slot: 'status', clsName: 'userStatus', formatterFn: this.$InitObj.prototype.formmater(['禁止登录', '允许登录']) },
          loginTime: { label: '最近登录', width: 120 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118, slot: 'btn' }
        }
      }
    }), this.$setMoreItems(['tableData2', 'chooseDataArr2', 'isEdit2', 'tableItem2', 'tableLoading2', 'tablePages2'], new this.$InitObj({
      items: {
        table: {
          selection: '',
          account: { label: '账号', width: 100 },
          roleName: { label: '角色', width: 100 },
          loginTime: { label: '最近登录', width: 120 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118, slot: 'btn' }
        }
      }
    })))
  },
  created () {
    this.tableBtn = this.$getAuthBtns([
      { code: 'menu-edit-menu', clickFn: this.handleEditData },
      { code: 'menu-delete', clickFn: this.handleDeleteData }
    ])
    this.handleGetTableData()
  },
  methods: {
    handleSelectChange (val) {
      this.chooseDataArr = val
      alert(JSON.stringify(this.chooseDataArr))
    },
    // 获取表格数据
    handleGetTableData (val = {}) {
      this.tableLoading = true
      this.tableLoading2 = true
      let params = Object.assign({
        currentPage: this.tablePages.current,
        pageSize: this.tablePages.pageSize
      }, val)
      apiGetUser(params).then(res => {
        if (res.code === '000000') {
          const { list, page } = res.data
          this.tableData2 = this.tableData = this.allData = list
          if (page) {
            this.tablePages.current = page.currentPage
            this.tablePages.total = page.total
            this.tablePages2.current = page.currentPage
            this.tablePages2.total = page.total
          }
          this.tableLoading = false
          this.tableLoading2 = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleChangePage (val) {
      this.handleGetTableData({}, val)
    },
    handleChangePage2 (val) {
      this.handleGetTableData({}, val)
    },
    handleSelected () {
      this.$refs.table2.$children[1].toggleRowSelection(this.tableData[0])
    },
    // 点击新增按钮
    handleAdd () {
      alert('我是add')
    },
    // 批量删除
    handleDeleteMore () {
      alert('我是批量删除')
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      alert('我是编辑')
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      alert('我是删除')
    }
  }
}
</script>
