<template>
  <el-table-column
    :min-width="item.width"
    :prop="item.prop"
    :label="item.label"
    :fixed="item.fixed"
    header-align="left">
    <template slot-scope="scope">
      <el-radio-group v-model="scope.row[item.prop]" @change="handleChange(item, scope.row)">
        <el-radio
          v-for="(child, i) in item.options"
          :key="i"
          :label="child.value"
        >{{ child.label }}</el-radio>
      </el-radio-group>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'cell-radio',
  props: {
    item: Object,
    parent: Object
  },
  methods: {
    handleChange (item, row) {
      this.parent && this.parent[item.changeFn](row)
    }
  }
}
</script>
