<template>
  <el-dialog :title="title" ref="dialog" :visible.sync="showDialog1" :class="['dialogModule', { doubleColumn }]" :close-on-click-modal="false">
    <el-form :model="data" :rules="rules" ref="form">
      <el-row v-for="(item, i) in dialogItem" :key="i" :class="onClass(item.span, item.type)">
        <el-col :class="item.clsName || ''">
           <el-form-item
            v-if="item.$attr.slot"
            :class="['label' + chineseTybe]"
            :label="item.label"
            :prop="item.key"
            :key="i"
          >
            <slot :name="item.$attr.slot"></slot>
          </el-form-item>
          <template v-else>
            <el-form-item
              v-if="['text', 'number', 'switch', 'radio', 'checkbox', 'textarea', 'select', ...dateTypeList].includes(item.type) && item.show"
              :class="['label' + chineseTybe, { radio: ['radio'].includes(item.type) }]"
              :label="item.label"
              :prop="item.key"
            >
              <basic-module
                :dateTypeList="dateTypeList"
                :config="item"
                :result="data"
                :all-read="allRead"
              >
              </basic-module>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-for="(item, i) in btns">
      <el-button :key="i"
                 v-if="item.show"
                 :type="item.color"
                 :disabled="item.disabled"
                 @click="onFn(item.type, item.clickFn || '')">{{item.name}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import basicModule from './basic'

export default {
  name: 'dialogModule',
  components: { basicModule },
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    doubleColumn: Boolean,
    showDialog: Boolean,
    btns: Array,
    allRead: Boolean
  },
  data () {
    return {
      dateTypeList: ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'], // ele-date默认type类型
      chineseTybe: 0,
      showDialog1: false,
      dialogItem: []
    }
  },
  watch: {
    items: {
      handler (val) {
        this.dialogItem = val.filter(item => item.show)
        this.dialogItem.forEach(item => {
          if (item.label.length > this.chineseTybe) {
            this.chineseTybe = item.label.length
          }
          if (['checkbox'].includes(item.type)) {
            this.$set(this.data, item.key, [])
          }
        })
      },
      deep: true,
      immediate: true
    },
    showDialog (val) {
      if (val === true) {
        this.showDialog1 = true
      } else {
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.resetFields()
        })
        this.showDialog1 = false
      }
    },
    showDialog1 (val) {
      this.$emit('update:showDialog', val)
    }
  },
  computed: {
    parent () {
      let parent = this.$parent
      let i = 0
      while (parent.dialogItem !== this.items) {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      return parent
    }
  },
  methods: {
    onClass (span = 24, type) {
      if (this.doubleColumn && type !== 'textarea') span = 12
      return [`el-col-${span}`]
    },
    // 点击按钮事件
    onFn (type, clickFn = '') {
      if (type === 'delete') {
        if (clickFn === '') {
          this.showDialog1 = false
          return true
        } else {
          if (typeof clickFn === 'function') {
            clickFn()
          } else {
            this.parent[clickFn]()
          }
          return true
        }
      } else if (type === 'edit') {
        if (this.allRead || clickFn === '') {
          this.showDialog1 = false
          return false
        }
        if (!this.onConfirmEdit('form')) return false
        if (typeof clickFn === 'function') {
            clickFn()
          } else {
            this.parent[clickFn]()
          }
      }
    },
    // 点击确认时校验
    onConfirmEdit (formName) {
      // 校验规则
      let result = true
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          result = false
        }
      })
      if (result === false) return false
      return true
    }
  }
}
</script>
