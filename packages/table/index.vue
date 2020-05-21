<template>
  <div class="tableModule">
    <!-- 头部按钮 -->
    <slot name="header-btn"></slot>
    <el-table
      :data="tableData"
      :max-height="tableHeight"
      v-loading="tableLoading"
      :header-cell-class-name="handleSetHeaderCellClass"
      :cell-class-name="handleSetCellClass"
      border
      style="width: 100%;"
      class="table"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="(item, i) in tableItem">
        <el-table-column
          v-if="item.type==='selection'"
          :key="`selection${i}`"
          align="center"
          v-bind="item"
        />
        <el-table-column
          v-if="['cell'].includes(item.type)"
          :key="`content${i}`"
          :min-width="item.width"
          :width="undefined"
          :slot="undefined"
          v-bind="item"
        >
          <template slot-scope="scope">
            <slot
              :name="item.slot"
              :row="scope.row"
              :$index="scope.$index"
            ></slot>
            <template v-if="!item.slot">
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
        <slot
          v-if="['btn'].includes(item.type) && item.show !== false"
          name="btn"
          :$index="i"
        ></slot>
        <!-- <el-table-column
          v-if="item.type==='selection' && item.show !== false"
          :key="`selection${i}`"
          :width="item.width"
          :selectable="handleSelect"
          align="center"
          type="selection"
          :fixed="item.fixed"
        /> -->
        <!-- <el-table-column
          v-if="['cell', 'input', 'select'].includes(item.type)"
          :key="`content${i}`"
          :min-width="item.width"
          :sortable="item.sortStatus || false"
          :show-overflow-tooltip="item.overflow || true"
          :label="item.label"
          :align="item.align || 'left'"
          :fixed="item.fixed"
        >
        <template slot-scope="scope">
          <inline-edit
            v-if="scope.row.editStatus && ['input', 'select'].includes(item.type)"
            :item="item"
            :type="item.type"
            :row="scope.row"
            :prop="item.prop"
          />
          <span
            v-else
            :class="[handleSetStatusClsName(item.clsName || '', scope.row[item.prop]), { canClick: item.clickFn !== undefined }]"
            @click="handleCellClick(item.clickFn, scope.row)"
          >
            <i :class="handleSetStatusClsName(item.clsName || '', scope.row[item.prop], 'i')"></i>
            <template v-if="item.formatterFn">{{ item.formatterFn(scope.row[item.prop]) }}</template>
            <template v-else>{{ scope.row[item.prop] }}</template>
          </span>
        </template>
        </el-table-column> -->
        <cell-radio
          v-if="item.type==='radio'"
          :key="`radio${i}`"
          :item="item"
          :prop="item.prop"
          :parent="parent"
        />
       <!--  <cell-tree
          v-if="item.type==='tree'"
          :key="`tree${i}`"
          :item="item"
          :tableData="tableData"
          :treeInitLevel="treeInitLevel"
          :treeExpandIds="treeExpandIds"
          :treeParentId="treeParentId"
          :getTreeDataByPost="getTreeDataByPost"
          @handleSaveOpenIds="handleSaveOpenIds"
          @handAddTableData="handAddTableData"
          @clickGetTreeData="handleClickGetTreeData"
        >
        </cell-tree> -->
       <!--  <table-btn
          v-if="item.type==='btn' && item.show !== false"
          :key="`btn${i}`"
          :item="item"
          :i="i"
          :tableBtn="tableBtn"
          :isInlineEdit="isInlineEdit"
          :inlineLabelToValue="inlineLabelToValue"
          :tableItem="tableItem"
          :rowOrignData="rowOrignData"
          @handleInlineEditTableData="handleInlineEditTableData"
        /> -->
        <el-table-column
          v-if="item.type==='setting'"
          :key="`selection${i}`"
          width="30"
          align="center"
          fixed="right"
          filter-placement="bottom-end"
        >
      </el-table-column>
      </template>
    </el-table>
    <!-- 底部统计数据 -->
    <slot name="total"></slot>
    <!-- 页码 -->
    <div
      class="right"
      v-if="tablePages.current"
    >
      <el-pagination
        :current-page.sync="tablePages.current"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="tablePages.pageSize"
        :total="tablePages.total"
        :layout="layout"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 自定义表头 -->
    <!-- <user-define-head-list
      v-if="showTableHeadSetting"
      :totalSetHeadList="totalSetHeadList"
      :choosedHeadList="choosedHeadList"
      @handleSendHead="handleSendHead"
    /> -->
  </div>
</template>

<script>
// import userDefineHeadList from './components/userDefineHeadList' // 自定义表头设置模块
// import tableBtn from './components/tableBtn' // 按钮模块
// import inlineEdit from './components/inlineEdit' // 行内编辑
// import cellTree from './components/cellTree' // 表格树
import cellRadio from './components/cellRadio' // 表格单选框
// import statusClsName from './config/defaultStatusClsName'
import { getTableHeight, getCellClass, setHeadIcon, setInitTableStyle } from './config/method'
export default {
  name: 'tableModule',
  components: { cellRadio },
  props: {
    // 已经处理过的表格数据
    data: {
      type: Array,
      required: true
    },
    // 初始化表头映射关系
    items: {
      type: Array,
      required: true
    },
    // 自定义最大高度
    maxHeight: String,
    headerCellClassName: Function || String,
    cellClassName: Function || String,
    /* // 全部的自定义表头
    totalSetHeadList: Array, */
    /* // 已勾选的自定义表头
    choosedHeadList: Array, */
    /* // 表格树最开始的等级
    treeInitLevel: Number,
    // 表格树打开是否需要请求接口
    getTreeDataByPost: Boolean,
    // 表格树父亲id名字
    treeParentId: {
      type: String,
      default: 'parentId'
    },
    // 保存表格树打开的ids
    treeExpandIds: Array, */
    // 是否为行内编辑
    // isInlineEdit: Boolean,
    // 选择框中文转value
    // inlineLabelToValue: Object,
    // 默认总高度为菜单高度
    totalHeightClsName: {
      type: String,
      default: '.layout-index'
    },
    // 需要减掉的高度
    reduceHeightClsNameList: Array,
    /* // 按钮
    btns: Array, */
    // 分页
    tablePages: {
      type: Object,
      default () {
        return {}
      }
    },
    // 页码布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    /*  // 判断哪几行需要勾选
    selectableFn: Function */
  },
  data () {
    return {
      tableHeight: 10000,
      // rowOrignData: [], // 行内编辑编辑时保存的原始数据
      parent: ''
    }
  },
  computed: {
    tableData () {
      return this.data
    },
    // 表头过滤tableItem
    tableItem () {
      return this.items
    },
    /* tableBtn () {
      return this.btns
    }, */
    /* // 是否展示自定义表头
    showTableHeadSetting () {
      if (this.tableItem.findIndex(item => item.type === 'setting') > -1) {
        return true
      }
      return false
    }, */
    tableLoading () {
      let parent = this.$parent
      let i = 0
      while (!typeof parent.tableLoading === 'undefined') {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      this.parent = parent
      return parent.tableLoading
    }
  },
  watch: {
    tableLoading (val) {
      if (!val) {
        setInitTableStyle()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.showTableHeadSetting && setHeadIcon()
      if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      let timer = setTimeout(() => {
        this.handleSetTableHeight()
        clearTimeout(timer)
      }, 100)
    })
    window.onresize = () => {
      setInitTableStyle()
      if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      // this.showTableHeadSetting && setHeadIcon()
      this.handleSetTableHeight()
    }
  },
  methods: {
    // 设置表格高度
    handleSetTableHeight () {
      this.tableHeight = getTableHeight(this.totalHeightClsName, this.reduceHeightClsNameList)
    },
    /* // 设置状态clsName
    handleSetStatusClsName (type, value, i) {
      if (type) {
        if (i && statusClsName[type]) {
          return ['status-i', type, statusClsName[type][value]]
        } else if (statusClsName[type]) {
          return ['status', type, value]
        }
        return [type, value]
      }
    }, */
    /* // 发送自定义表头
    handleSendHead (val) {
      this.$emit('handleSendHead', val)
    }, */
    // 自定义设置列样式
    handleSetCellClass (row) {
      return getCellClass(row, this.tableItem, this.headerCellClassName)
    },
    // 自定义设置列样式
    handleSetHeaderCellClass (row) {
      return getCellClass(row, this.tableItem, this.cellClassName)
    },
    /* // 判断此行是否要勾选
    handleSelect (row, index) {
      if (this.selectableFn) {
        if (this.selectableFn(row, index)) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }, */
    /* // 行内编辑点击编辑按钮时修改tableData
    handleInlineEditTableData (index, row, delete1) {
      this.$set(this.tableData, index, row)
      if (delete1 === 'delete') {
        this.tableData.splice(index, 1)
        this.$set(this, 'tableData', this.tableData)
      }
    }, */
    /* // 树表格点击请求子数据
    handleClickGetTreeData (row, index) {
      this.$emit('clickGetTreeData', row, index)
    },
    // 树表格修改tableData
    handAddTableData (tableData) {
      this.$emit('update:data', tableData)
    },
    // 表格树保存已打开的id
    handleSaveOpenIds (idList) {
      this.$emit('update:treeExpandIds', idList)
    }, */
    // 事件：每页几条
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.tablePages.pageSize = val
      this.handleCurrentChange(this.tablePages.current)
    },
    // 事件：page改变
    handleCurrentChange (val) {
      this.$emit('table-jump', val)
      this.tablePages.current = val
    },
    /*  handleCellClick (fn, row) {
      this.parent[fn] && this.parent[fn](row)
    } */
  }
}
</script>
