<template>
   <span
      :class="[handleSetStatusClsName(item.clsName || '', row[item.prop]), { canClick: item.clickFn !== undefined }]"
      @click="handleCellClick(item.clickFn, row)"
    >
      <i :class="handleSetStatusClsName(item.clsName || '', row[item.prop], 'i')"></i>
      <template v-if="item.formatter">{{ item.formatter(undefined, undefined, row[item.prop]) }}</template>
      <template v-else>{{ row[item.prop] }}</template>
    </span>
</template>

<script>
import statusClsName from './defaultStatusClsName'

export default {
  props: {
    item: Object,
    row: Object
  },
  methods: {
    // 设置状态clsName
    handleSetStatusClsName (type, value, i) {
      if (type) {
        if (i && statusClsName[type]) {
          return ['status-i', type, statusClsName[type][value]]
        } else if (statusClsName[type]) {
          return ['status', type, value]
        }
        return [type, value]
      }
    },
    handleCellClick (fn, row) {
      this.parent[fn] && this.parent[fn](row)
    }
  }
}
</script>

<style lang="less">
  .el-table__body-wrapper{
    & > table {
      tr td span.status{
        &>.status-i {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin-right: 6px;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }
  }
</style>
