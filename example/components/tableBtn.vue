<template>
  <div>
    <template
      v-for="(item, index) in btns"
    >
      <el-button
        v-show="item.name"
        type="text"
        size="mini"
        :key="index"
        @click="item.clickFn(row)">{{ item.name }}</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'table-btn',
  props: {
    row: {
      type: Object,
      required: true
    },
    btns: {
      type: Array,
      required: true
    }
  }
}
</script>
