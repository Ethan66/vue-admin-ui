<template>
  <el-table-column
      :min-width="item.width"
      v-if="!item.slot"
      :width="undefined"
      :slot="undefined"
      :type="undefined"
      v-bind="item"
    >
    <template v-if="item.children">
      <table-level :item="child" v-for="(child, i) in item.children" :key="`level${i}`">
      </table-level>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :min-width="item.width"
    :width="undefined"
    :slot="undefined"
    :type="undefined"
    v-bind="item"
  >
  </el-table-column>
</template>

<script>
export default {
  name: 'table-level',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
