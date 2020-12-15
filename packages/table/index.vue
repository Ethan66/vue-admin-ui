<template>
  <div class="tableModule">
    <!-- 头部按钮 -->
    <slot name="header-btn"></slot>
    <el-table
      :ref="tableRef"
      :data="tableData"
      :max-height="tableHeight"
      v-loading="loading"
      border
      style="width: 100%;"
      class="table"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="(item, i) in tableItem">
        <el-table-column
          v-if="item.type === 'index'"
          :key="`index${i}`"
          align="center"
          type="index"
          v-bind="item"
        />
        <el-table-column
          v-if="item.type==='selection'"
          :key="`selection${i}`"
          align="center"
          v-bind="item"
        />
        <template v-if="item.type === 'cell'">
          <el-table-column
            v-if="!item.slot"
            :key="`content${i}`"
            :min-width="item.width"
            :width="undefined"
            v-bind="item"
          />
          <el-table-column
            v-else
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
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-if="item.type === 'btn'"
          :key="`btn${i}`"
          :width="item.width"
          :slot="undefined"
          v-bind="item"
        >
          <template slot-scope="scope">
            <slot
              name="btn"
              :row="scope.row"
              :$index="scope.$index"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部统计数据 -->
    <slot name="total"></slot>
    <!-- 页码 -->
    <div
      class="right"
      v-if="page.current"
    >
      <el-pagination
        :current-page.sync="page.current"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="page.pageSize"
        :total="page.total"
        :layout="layout"
        background
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getTableHeight } from './config/method'
export default {
  name: 'tableModule',
  props: {
    loading: Boolean,
    // 已经处理过的表格数据
    data: {
      type: Array,
      required: true
    },
    tableRef: {
      type: String,
      default: 'table'
    },
    // 初始化表头映射关系
    items: {
      type: Array,
      required: true
    },
    // 自定义最大高度
    maxHeight: String,
    // 默认总高度为菜单高度
    totalHeightClsName: {
      type: String,
      default: '.layout-index'
    },
    // 需要减掉的高度
    reduceHeightClsNameList: Array,
    // 分页
    page: {
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
      return this.items.filter(item => item.show !== false)
    },
  },
  mounted () {
    this.$nextTick(() => {
      if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      let timer = setTimeout(() => {
        this.onSetTableHeight()
        clearTimeout(timer)
      }, 100)
    })
    window.onresize = () => {
      if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      this.onSetTableHeight()
    }
  },
  methods: {
    // 设置表格高度
    onSetTableHeight () {
      this.tableHeight = getTableHeight(this.totalHeightClsName, this.reduceHeightClsNameList)
    },
    // 事件：每页几条
    onSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.onCurrentChange(this.page.current)
    },
    // 事件：page改变
    onCurrentChange (val) {
      this.$emit('jump', val)
      this.page.current = val
    }
  }
}
</script>
