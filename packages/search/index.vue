<template>
  <div class="searchContent">
    <slot name="header"></slot>
    <el-form :inline="true" :model="value" :rules="rules" size="small" :ref="searchRef">
        <template v-for="(item, i) in newItems">
          <el-form-item
            v-if="item.$attr.slot"
            :label="item.label"
            :prop="item.field"
            :key="i"
          >
            <slot :name="item.$attr.slot"></slot>
          </el-form-item>
          <template v-else>
            <el-form-item
              v-if="els.includes(item.el)"
              :label="item.label"
              :prop="item.field"
              :key="i"
            >
              <!-- <basic-module
                :els="els"
                :config="item"
                :result="value"
              ></basic-module> -->
              <basic-module
                :config="item"
                :result="value"
              ></basic-module>
            </el-form-item>
          </template>
        </template>
      <el-form-item :class="{ noMarginBottom: !sameLine }">
        <el-button type="primary" icon="el-icon-search" @click.native.prevent="onSearch()" v-if="showQuery">查询</el-button>
        <el-button type="danger" icon="el-icon-delete" @click.native.prevent="onClear()" v-if="showReset">重置</el-button>
        <slot name="btn"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import basicModule from './basic'
export default {
  name: 'searchModule',
  props: {
    searchRef: {
      type: String,
      default: 'search'
    },
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    sameLine: Boolean,
    // 是否展示重置
    showReset: {
      type: Boolean,
      default: true
    },
    // 是否展示重置
    showQuery: {
      type: Boolean,
      default: true
    },
    min: {
      type: String | Number,
      default: 0
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    // 搜索默认值
    default: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      els: ['input', 'switch', 'cascader', 'date-picker', 'time-picker', 'input-number', 'slider', 'rate', 'select', 'radio-group']
    }
  },
  watch: {
    items: {
      handler (items) {
        this.initValues(items, this.value)
      },
      immediate: true
    }
  },
  computed: {
    newItems () {
      const tmp = this.items.filter(item => item.show !== false)
      if (Number(this.min) === 0) {
        return tmp
      }
      return tmp.slice(0, Number(this.min))
    }
  },
  methods: {
    // 对日期key是数组的进行初始化数据
    initValues (items, val) {
      debugger
      let initVal = Object.assign({}, val, this.default)
      const keys = items.filter(item => item.show !== false).reduce((result, current) => {
        result.push(current.field)
        return result
      }, [])
      keys.forEach(key => {
        if (/\w+,\w+/.test(key)) {
          initVal[key] = key.split(',').map(k => initVal[k] === undefined ? '' : initVal[k])
        } else {
          initVal[key] === undefined && (initVal[key] = '')
        }
      })
      this.$emit('input', initVal)
    },
    // 清空搜索数据
    onClear () {
      this.initValues(this.items, {})
    },
    // 搜索
    onSearch () {
      let value = Object.assign({}, this.value)
      Object.keys(value).forEach(key => {
        if (/\w+,\w+/.test(key)) {
          const tmpKeys = key.split(',')
          const tmp = value[key] || []
          value[tmpKeys[0]] = tmp[0]
          value[tmpKeys[1]] = tmp[1]
          delete value[key]
        }
      })
      this.$emit('search', value)
    }
  },
  components: {
    basicModule
  }
}
</script>
