<template>
  <div>
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch" />
      <p style="margin-top: 10px;"></p>
      <search-module
      :items="search2Item"
      v-model="search2Values"
      @search="handleSearch2" />
  </div>
</template>

<script>
export default {
  name: 'demo-search2',
  data () {
    return Object.assign(new this.$InitObj({
      items: {
        search: {
          normal: { label: '一般输入框' },
          max: { label: '最大输入值', maxlength: 3 },
          clear: { label: '可清空', clearable: true },
          disable: { label: '禁止输入', disabled: true },
          listen: { label: '监听改变', type: 'select', options: [{ label: '允许输入', value: 1 }, { label: '禁止输入', value: 2 }], change: this.handleChange },
          'str1,str2': { label: '时间', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
          date: { label: '时间', type: 'date' },
          week: { label: '周', type: 'week', format: 'yyyy 第 WW 周' },
          month: { label: '月', type: 'month' },
          year: { label: '年', type: 'year' }
        },
        search2: {
          disable: { label: '禁止输入', disabled: true },
          listen: { label: '监听改变', type: 'select', options: [{ label: '允许输入', value: 1 }, { label: '禁止输入', value: 2 }], change: this.handleChange2 }
        }
      }
    }))
  },
  methods: {
    handleSearch (val) {
      console.log('value:', val)
    },
    handleChange (val) {
      this.$setItem(this.searchItem, 3, 'disabled', val === 2)
    },
    handleSearch2 (val) {
      console.log('value2:', val)
    },
    handleChange2 (val) {
      this.$setItem(this.search2Item, 0, 'disabled', val === 2)
    }
  }
}
</script>
