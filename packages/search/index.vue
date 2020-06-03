<template>
  <div class="searchContent">
    <h3>查询条件<span class="cm-btn-color" @click="handleShowAll" v-if="configItems.length > 6">更多搜索</span></h3>
    <el-form :inline="true" :model="value" size="small">
        <template v-for="(item, i) in newItems">
          <el-form-item
            v-if="item.$attr.slot"
            :label="item.label"
            :prop="item.key"
            :key="i"
          >
            <slot :name="item.$attr.slot"></slot>
          </el-form-item>
          <template v-else>
            <el-form-item
              v-if="['input', 'select', ...dateTypeList].includes(item.type) && item.show"
              :label="item.label"
              :key="i"
            >
              <basic-module
                :dateTypeList="dateTypeList"
                :config="item"
                :result="value"
              ></basic-module>
            </el-form-item>
            <el-form-item
              v-if="item.type === 'selectTree'"
              :label="item.label"
              :key="i"
            >
            </el-form-item>
          </template>
        </template>
      <el-form-item class="noMarginBottom">
        <el-button type="primary" icon="el-icon-search" @click.native.prevent="handleSearch()">查询</el-button>
        <el-button type="info" icon="el-icon-delete" @click.native.prevent="handleClear()" v-if="showReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import basicModule from './basic'
export default {
  name: 'searchModule',
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    // 是否展示重置
    showReset: {
      type: Boolean,
      default: true
    },
    showAll: Boolean,
    // 搜索默认值
    searchDefaultObj: Object
  },
  data () {
    return {
      dateTypeList: ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'], // ele-date默认type类型
      defaultShowNumber: 6, // 默认展示的搜索条数
      isShowAll: this.showAll
    }
  },
  computed: {
    configItems () {
      return this.items
    },
    newItems () {
      if (this.isShowAll) {
        return this.configItems
      } else {
        return this.configItems.slice(0, this.defaultShowNumber)
      }
    }
  },
  created () {
    this.initSearchValues()
  },
  methods: {
    // 对日期key是数组的进行初始化数据
    initSearchValues () {
      let initVal = Object.assign({}, this.value)
      const keys = this.configItems.reduce((result, current) => {
        result.push(current.key)
        return result
      }, [])
      keys.forEach(key => {
        if (/\w+,\w+/.test(key)) {
          initVal[key] = []
          const tmpKeys = key.split(',')
          initVal[key].push(initVal[tmpKeys[0]], initVal[tmpKeys[1]])
        }
      })
      this.$emit('input', initVal)
    },
    // 清空搜索数据
    handleClear () {
      sessionStorage.removeItem('activedSearchValues')
      if (Object.prototype.toString.call(this.searchDefaultObj) === '[object Object]') {
        this.$emit('input', Object.assign({}, this.searchDefaultObj))
      } else {
        this.$emit('input', {})
      }
      this.$refs.selectTree && (this.$refs.selectTree[0].clearHandle())
    },
    // 是否展示全部
    handleShowAll () {
      this.isShowAll = true
    },
    // 搜索
    handleSearch () {
      Object.keys(this.value).forEach(key => {
        if (/\w+,\w+/.test(key)) {
          const tmpKeys = key.split(',')
          const tmp = this.value[key]
          this.value[tmpKeys[0]] = tmp[0]
          this.value[tmpKeys[1]] = tmp[1]
          delete this.value[key]
        }
      })
      this.$emit('search', this.value)
    }
  },
  components: {
    basicModule
  }
}
</script>
