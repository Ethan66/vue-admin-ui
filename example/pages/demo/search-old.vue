<template>
  <div>
    <search-module
      :items="searchItem"
      v-model="searchValues"
      :min="min"
      ref="search"
      :rules="{ max: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ] }"
      :default="searchDefault"
      @search="handleSearch">
      <el-button type="success" @click="min=0" slot="btn">展示全部</el-button>
      <el-button type="success" @click="searchItem[0].show=true" slot="btn">展示被隐藏</el-button>
      <el-button type="success" @click="handleSaveLocal" slot="btn">本地缓存</el-button>
    </search-module>
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
          normal: { label: '一般输入框', show: false },
          max: { label: '最大输入值', maxlength: 3 },
          clear: { label: '可清空', clearable: true },
          disable: { label: '禁止输入', disabled: true },
          listen: { label: '监听改变', type: 'select', options: [], change: this.handleChange },
          'str1,str2': { label: '时间', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
          date: { label: '时间', type: 'date' },
          week: { label: '周', type: 'week', format: 'yyyy 第 WW 周' },
          month: { label: '月', type: 'month' },
          year: { label: '年', type: 'year' }
        }
      }
    }), {
      min: 0,
      pageData1: 'searchDemo',
      pageData2: 'i am test',
      searchDefault: { week: '2020-09-06T16:00:00.000Z', str1: '2020-08-31T16:00:00.000Z', str2: '2020-09-01T16:00:00.000Z' }
    })
  },
  created () {
    this.searchItem[4].options = [{ label: '允许输入', value: 1 }, { label: '禁止输入', value: 2 }]
    this.searchValues = JSON.parse(localStorage.getItem('aaa')) || {}
  },
  methods: {
    handleSearch (val) {
      this.values = val
      console.log('value:', val)
      this.$refs.search.$refs.search.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleChange (val) {
      this.$setItem(this.searchItem, 3, 'disabled', val === 2)
    },
    handleSaveLocal () {
      localStorage.setItem('aaa', JSON.stringify(this.values))
    }
  }
}
</script>
