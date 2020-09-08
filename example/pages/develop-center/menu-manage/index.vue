<template>
  <div class="substance menu-mange">
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :data="tableData"
      :items="tableItem"
    >
      <div class="btn-content" slot="header-btn">
        <!-- <el-button @click="handleAdd" v-if="$authBtn('menu-add-menu')">{{ $authBtn('menu-add-menu') }}</el-button> -->
        <!-- <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button> -->
        <!-- <el-button @click="handleBatchCreate('catalogue')" v-if="$authBtn('menu-add-catogue-all')">{{ $authBtn('menu-add-catogue-all') }}</el-button> -->
        <!-- <el-button @click="handleBatchCreate('menu')" v-if="$authBtn('menu-add-menu-all')">{{ $authBtn('menu-add-menu-all') }}</el-button> -->
        <!-- <el-button @click="handleBatchCreate('btn')" v-if="$authBtn('menu-add-btn-all')">{{ $authBtn('menu-add-btn-all') }}</el-button> -->
      </div>
      <template slot="tree" slot-scope="scope">
        <cell-tree
          :scope="scope"
          :item="tableItem[0]"
          :tableData.sync="tableData"
          :treeExpandIds.sync="saveExpendIdList"
          treeParentId="menuParentId"
        >
        </cell-tree>
      </template>
      <template slot="btn" slot-scope="scope">
        <div>
          <el-button type="text" size="mini" @click="handleEditData(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="handleDeleteData(scope.row)">更多</el-button>
        </div>
      </template>
    </table-module>
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules"
    >
      <select-tree
        slot="tree"
        v-model="editData.menuParentId"
        clearable
        :data="allParentMenu"
        :defaultChecked="checkedKeys"
        :defaultProps="{ children: 'list', label: 'menuName' }"
        nodeKey="id"
      />
    </dialog-module>
  </div>
</template>

<script>
import { menu } from '../mixins'
import basicMethod from '@/config/mixins'
import adminUtils  from '$pkg/utils/index.ts'
import { apiModifyMenu, apiAddMenu, apiDeleteMenu } from '@/api/developCenter'
import { apiGetAllMenu } from '@/api/login'
import cellTree from '$pkg/table-cell-tree' // 表格树
import selectTree from '$pkg/select-tree' // 选择树
export default {
  name: 'menu-manage',
  mixins: [basicMethod, menu],
  components: { cellTree, selectTree },
  data () {
    return {
       saveExpendIdList: [],
       checkedKeys: [],
       allParentMenu: []
    }
  },
   created () {
    this.tablePages.pageSize = 10000
    this.handleGetTableData(apiGetAllMenu)
  },
  methods: {
    // 获取所有父菜单树
    handleGetAllParentTree () {
      this.checkedKeys = []
      let filterArr = JSON.parse(JSON.stringify(this.allData.filter(item => item.menuLevel !== 3)))
      this.allParentMenu = adminUtils.menuRelation(filterArr, 'id', 'menuParentId', 'menuLevel', 'sortNo')
    },
     // 处理表格数据
    handleTableData (tableData) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.showBtnCode = []
        if (item.menuTypeStash === undefined) {
          item.menuTypeStash = item.menuType
        }
        switch (item.menuType) {
          case 1:
            item.menuType = '目录'
            break
          case 2:
            item.menuType = '菜单'
            break
          case 3:
            item.menuType = '按钮'
            break
        }
        if (item.menuLevelStash === undefined) {
          item.menuLevelStash = item.menuLevel - 1
          item.menuLevel = `${item.menuLevel}级`
        }
        item.statusStash = item.status
        switch (item.status) {
          case 1:
            item.status = '显示'
            item.showBtnCode.push('menu-hide-menu')
            break
          case 0:
            item.status = '隐藏'
            item.showBtnCode.push('menu-show-menu')
            break
        }
      })
      this.tableData = adminUtils.menuRelation(tableData, 'id', 'menuParentId', 'menuLevelStash', 'sortNo')
      function fn (data) {
        data.forEach(item => {
          if (item.list && item.list.length > 0) {
            item.hasLower = true
            fn(item.list)
          }
        })
      }
      fn(this.tableData)
      if (this.saveExpendIdList.length > 0) {
        this.handleOpenTree(this.tableData, this.saveExpendIdList)
      }
    },
    handleEditData (item) {
      this.$setItem(this.dialogItem, 2, 'disabled', true)
      this.editData = Object.assign({}, item)
      this.handleGetAllParentTree()
      this.checkedKeys.push(item.menuParentId)
      this.showDialogForm = true
    },
    handleDeleteData () {}
  }
}
</script>
