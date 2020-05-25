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
        <cell-radio
          v-if="item.type==='radio'"
          :key="`radio${i}`"
          :item="item"
          :prop="item.prop"
          :parent="parent"
        />
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
  </div>
</template>

<script>
import cellRadio from './components/cellRadio' // 表格单选框
import { getTableHeight, getCellClass } from './config/method'
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
    // 默认总高度为菜单高度
    totalHeightClsName: {
      type: String,
      default: '.layout-index'
    },
    // 需要减掉的高度
    reduceHeightClsNameList: Array,
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
  },
  data () {
    return {
      tableHeight: 10000,
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
  mounted () {
    this.$nextTick(() => {
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
      if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      this.handleSetTableHeight()
    }
  },
  methods: {
    // 设置表格高度
    handleSetTableHeight () {
      this.tableHeight = getTableHeight(this.totalHeightClsName, this.reduceHeightClsNameList)
    },
    // 自定义设置列样式
    handleSetCellClass (row) {
      return getCellClass(row, this.tableItem, this.headerCellClassName)
    },
    // 自定义设置列样式
    handleSetHeaderCellClass (row) {
      return getCellClass(row, this.tableItem, this.cellClassName)
    },
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
    }
  }
}
</script>
