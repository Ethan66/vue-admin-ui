<template>
  <div>
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch" />
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
      </div>
      <template slot="status" slot-scope="scope">
        <table-status
          :item="tableItem[3]"
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
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules">
      </dialog-module>
  </div>
</template>

<script>
import tableBtn from '@/components/tableBtn' // 按钮模块
import tableStatus from '@/components/table-status' // 自定义模块
import { apiGetUser } from '@/api/authority'
export default {
  name: 'demo-demo',
  components: { tableStatus, tableBtn },
  data () {
    return this.handleInit({
      pageData1: 'searchDemo',
      pageData2: 'i am test'
    })
  },
  created () {
    this.tableBtn = this.$getAuthBtns([
      { code: 'menu-edit-menu', clickFn: this.handleEditData },
      { code: 'menu-delete', clickFn: this.handleDeleteData }
    ])
    this.$handleGetTableData(apiGetUser)
  },
  methods: {
    // 搜索
    handleSearch (val) {
      this.$handleSearch(val)
    },
    // 页面改变
    handleChangePage (current) {
      this.$handleChangePage(current)
    },
    handleChange (val) {
      this.$setItem(this.searchItem, 1, 'disabled', val === 2)
    },
    // 点击新增按钮
    handleAdd () {
      this.isEdit = 0
      this.editData = {}
      this.showDialogForm = true
      this.dialogTitle = '新增'
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.isEdit = 1
      this.editData = row
      this.showDialogForm = true
      this.dialogTitle = '编辑'
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      alert(row.userId)
      this.$apiDeleteData(apiGetUser, row.userId)
    },
    // 提交按钮
    handleSubmit () {
      if (this.isEdit) {
        this.$apiEditData(apiGetUser, this.editData)
      } else {
        this.$apiCreateData(apiGetUser, this.editData)
      }
    },
    // 选择改变
    handleSelectChange (val) {
      this.chooseDataArr = val
      alert(JSON.stringify(this.chooseDataArr))
    },
    // 数据初始化
    handleInit (val) {
      return Object.assign(new this.$InitObj({
        items: {
          search: {
            normal: { label: '一般输入框' },
            disable: { label: '禁止输入', disabled: true },
            listen: { label: '监听改变', type: 'select', options: [{ label: '允许输入', value: 1 }, { label: '禁止输入', value: 2 }], change: this.handleChange },
            daterange: { label: '时间', key: 'str1,str2', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
          },
          table: {
            selection: { selectable: (row, index) => index !== 2 },
            name: { label: '用户名' },
            roleName: { label: '角色', width: 100 },
            status: { label: '状态', width: 90, slot: 'status', clsName: 'userStatus', formatterFn: this.$InitObj.prototype.formmater(['禁止登录', '允许登录']) },
            operator: { label: '操作人', width: 100 },
            btn: { width: 118, slot: 'btn' }
          },
          dialog: {
            name: { label: '账号' },
            operator: { label: '密码', disabled: true },
            roleId: { label: '角色', type: 'select', options: [{ label: '超级管理员', value: 1 }, { label: '管理员', value: 7 }, { label: '技术', value: 8 }] },
            status: { label: '状态', type: 'radio', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] }
          }
        }
      }), val)
    }
  }
}
</script>
