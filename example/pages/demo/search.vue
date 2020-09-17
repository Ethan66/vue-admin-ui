<template>
  <div>
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch" />
      <p style="margin-top: 10px;">{{ pageData1 }}: {{ pageData2 }}</p>
  </div>
</template>

<script>
export default {
  name: 'demo-search',
  data () {
    return Object.assign(new this.$InitObj({
      items: {
        search: {
          normal: { label: '一般输入框' },
          max: { label: '最大输入值', maxlength: 3 },
          clear: { label: '可清空', clearable: true },
          disable: { label: '禁止输入', disabled: true },
          listen: { label: '监听改变', type: 'select', options: [{ label: '允许输入', value: 1 }, { label: '禁止输入', value: 2 }], change: this.handleChange },
          daterange: { label: '时间', key: 'str1,str2', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
          date: { label: '时间', type: 'date' },
          week: { label: '周', type: 'week', format: 'yyyy 第 WW 周' },
          month: { label: '月', type: 'month' },
          year: { label: '年', type: 'year' }
        }
      }
    }), {
      pageData1: 'searchDemo',
      pageData2: 'i am test'
    })
  },
  methods: {
    handleSearch (val) {
      console.log('value:', val)
    },
    handleChange (val) {
      this.$setItem(this.searchItem, 3, 'disabled', val === 2)
    }
  }
}
</script>
