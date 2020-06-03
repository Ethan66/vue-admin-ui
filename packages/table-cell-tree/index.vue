<template>
  <span :class="getTreeClass(scope.row)"
    @click.prevent="handleToggle(scope.$index, scope.row)"
    :style="handleStyle(scope.row)"
  >
    <i :class="iconClass(scope.row)"></i>{{scope.row[item.prop]}}
  </span>
</template>

<script>
export default {
  name: 'cell-tree',
  props: {
    item: Object,
    scope: Object,
    tableData: Array,
    // 表格树最开始的等级
    treeInitLevel: {
      type: Number,
      default: 0
    },
    // 表格树父亲id名字
    treeParentId: String,
    // 保存表格树打开的ids
    treeExpandIds: Array,
    // 表格树打开是否需要请求接口
    getTreeDataByPost: Boolean
  },
  methods: {
    getTreeClass (row) {
      let res = ['menuNameWrap']
      if (row.list) {
        res.push('cursor')
      }
      return res
    },
    // 树状样式箭头clsName
    iconClass (row) {
      let res = []
      if (row.hasLower) {
        res.push('arrow')
      }
      row.expand ? res.push('arrowDown') : res.push('arrowRight')
      return res
    },
    // 设置树状样式
    handleStyle (row) {
      return { 'padding-left': (row.level - this.treeInitLevel) * 25 + 'px' }
    },
    // 打开（关闭）树结构
    handleToggle (index, row) {
      let treeExpandIds = JSON.parse(JSON.stringify(this.treeExpandIds))
      if (this.getTreeDataByPost && !row.expand) {
        row.expand = true
        treeExpandIds.push(row.id)
        // this.$emit('handleSaveOpenIds', treeExpandIds)
        // this.$emit('clickGetTreeData', row, index) // 点击请求子数据
        this.$emit('update:treeExpandIds', treeExpandIds)
        return
      }
      if (!row.list) return false
      let tableData = JSON.parse(JSON.stringify(this.tableData))
      if (!row.expand) { // 未展开
        if (row.list) {
          tableData = tableData.splice(0, index + 1).concat(row.list).concat(tableData)
          tableData[index].expand = true
          treeExpandIds.push(row.id)
          this.$emit('update:treeExpandIds', treeExpandIds)
        }
      } else { // 展开
        let length = 0
        let arr = [row.id]
        tableData.forEach(item => {
          if (arr.includes(item[this.treeParentId])) {
            arr.push(item.id)
            length++
          }
        })
        tableData = tableData.splice(0, index + 1).concat(tableData.slice(length))
        tableData[index].expand = false
        let i = treeExpandIds.indexOf(row.id)
        treeExpandIds.splice(i, 1)
        this.$emit('update:treeExpandIds', treeExpandIds)
      }
      this.$emit('update:tableData', tableData)
    }
  }
}
</script>
