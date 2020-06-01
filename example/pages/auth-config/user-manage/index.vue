<template>
  <div class="substance user-manage">
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :loading="tableLoading"
      :data="tableData"
      :items="tableItem"
      @selection-change="handleSelectChange"
    >
      <div class="btn-content" slot="header-btn">
        <el-button size="mini" @click="handleAdd" v-if="$authBtn('user-create-user')">{{ $authBtn('user-create-user') }}</el-button>
        <el-button size="mini" @click="handleDeleteMore" v-if="$authBtn('user-delete-batch')">{{ $authBtn('user-delete-batch') }}</el-button>
      </div>
      <template slot="status" slot-scope="scope">
        <table-status
          :item="tableItem[4]"
          :row="scope.row"
        ></table-status>
      </template>
      <template slot="btn" slot-scope="scope">
        <div>
          <el-button type="text" size="mini" @click="handleEditData(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" v-if="scope.row.status === 1" @click="handleChangeStatus(scope.row)">禁止登录</el-button>
          <el-button type="text" size="mini" v-if="scope.row.status === 0" @click="handleChangeStatus(scope.row)">允许登录</el-button>
          <el-button type="text" size="mini" @click="handleDeleteData(scope.row)">删除</el-button>
        </div>
      </template>
      <!-- <template slot="btn" slot-scope="scope">
        <table-btn
          :item="tableItem[7]"
          :i="scope.$index"
          :tableBtn="tableBtn"
          :tableItem="tableItem"
        />
      </template> -->
    </table-module>
     <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { user } from '../mixins'
import tableStatus from '@/components/table-status'
import tableBtn from '@/components/tableBtn' // 按钮模块
import basicMethod from '@/config/mixins'
import MD5 from 'js-md5'
import { apiAddUser, apiGetUser, apiModifyUserInfo, apiDeleteUser, apiGetRole } from '@/api/authority'

export default {
  name: 'user-manage',
  mixins: [basicMethod, user],
  components: { tableStatus, tableBtn },
  data () {
    return {
      operator: JSON.parse(localStorage.getItem('userInfo')).userName
    }
  },
  created () {
    this.handleGetTableData(apiGetUser)
    apiGetRole({}).then(res => {
      if (res.code === '000000') {
        this.dialogItem[2].options = res.data.list.map(item => ({ label: item.roleName, value: item.roleId }))
      }
    })
  },
  methods: {
    handleSelectChange (val) {
      this.chooseDataArr = val
    },
    handleChange () {
      console.log(11, this.searchItem)
    },
    formatterStatus (row) {
      return row.userStatus === 1 ? '允许登录' : '禁止登录'
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.$set(this.editData, 'status', 1)
      this.isEdit = 0
      this.dialogTitle = '新增用户'
      this.showDialogForm = true
    },
    // 批量删除
    handleDeleteMore () {
      let idArr = this.chooseDataArr.map(item => item.userId)
      this.apiDeleteData(apiDeleteUser, idArr, apiGetUser)
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.dialogTitle = '编辑用户'
      this.showDialogForm = true
    },
    // 改变用户状态
    handleChangeStatus (row) {
      let { userId, status, account } = row
      status = row.status === 1 ? 0 : 1
      this.apiEditData(apiModifyUserInfo, { account, id: userId, status, operator: this.operator }, apiGetUser)
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteUser, [row.userId], apiGetUser)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      let params = Object.assign({}, this.editData)
      params.id = params.userId
      delete params.userId
      params.operator = this.operator
      params.password && (params.password = MD5(params.password))
      if (this.isEdit === 0) {
        this.apiCreateData(apiAddUser, this.$purifyParams(params), apiGetUser)
      } else {
        this.apiEditData(apiModifyUserInfo, this.$purifyParams(params), apiGetUser)
      }
    },
    // 处理表格数据
    handleTableData (tableData) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.showBtnCode = []
        switch (item.status) {
          case 1:
            item.showBtnCode.push('user-bin-login')
            break
          case 0:
            item.showBtnCode.push('user-agree-login')
            break
        }
      })
    }
  }
}
</script>
