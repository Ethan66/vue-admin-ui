<template>
  <el-dialog :title="title" ref="dialog" :visible.sync="showDialog1" :class="['dialogModule', { doubleColumn }]" :close-on-click-modal="false">
    <el-form :model="data" :rules="rules" ref="form">
      <el-row v-for="(item, i) in dialogItem" :key="i" :class="handleClass(item.span, item.type)">
        <el-col :class="item.clsName || ''">
           <el-form-item
            v-if="item.$attr.slot"
            :class="['label' + chineseTybe]"
            :label="item.label"
            :prop="item.key"
          >
            <slot :name="item.$attr.slot"></slot>
          </el-form-item>
          <template v-else>
            <el-form-item
              v-if="['text', 'number', 'radio', 'checkbox', 'textarea', 'select', ...dateTypeList].includes(item.type) && item.show"
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
            <el-form-item
              v-if="['switch'].includes(item.type) && item.show"
              :class="['label' + chineseTybe]"
              :label="item.label"
              :prop="item.key"
            >
              <my-switch
                v-model="data[item.key]"
              >
              </my-switch>
            </el-form-item>
          </template>
          <!--  <el-form-item :class="['label' + chineseTybe, { radio: ['radio'].includes(item.type) }]" :label="item.label" :prop="item.key">
            <el-select
                      v-if="['select', 'selectMore'].includes(item.type)"
                      v-model="data[item.key]"
                      :placeholder="item.placeholder"
                      :filterable="item.type === 'select'"
                      :multiple="item.type === 'selectMore'"
                      @change="handleChange(item.changeFn, data[item.key])"
                      :disabled="item.disabled || allRead"
            >
              <el-option v-for="(child, k) in item.options" :label="child.label" :value="child.value" :disabled="child.disabled" :key="k"></el-option>
            </el-select>
            <el-input
                      v-model="data[item.key]"
                      :type="item.type"
                      :placeholder="item.placeholder"
                      :disabled="item.disabled || allRead"
                      :maxlength="item.maxlength"
                      @input="handleChange(item.changeFn, data[item.key])"
                      v-if="['text', 'number', 'password'].includes(item.type)"
            >
            </el-input>
            <el-input v-model="data[item.key]" type="textarea"
                      :placeholder="item.placeholder"
                      :disabled="item.disabled || allRead"
                      :rows="item.rows"
                      :maxlength="item.maxlength"
                      @input="handleChange(item.changeFn, data[item.key])"
                      v-if="item.type==='textarea'">
            </el-input>
            <el-radio-group v-model="data[item.key]" v-if="item.type==='radio'" :disabled="item.disabled || allRead" size="small">
              <el-radio v-for="(child, k) in item.options" @change="handleChange(item.changeFn, data[item.key])" :label="child.value" :key="k">{{child.label}}</el-radio>
            </el-radio-group>
            <el-date-picker type="datetime" :placeholder="item.placeholder || ''" style="width: 100%;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="data[item.key]"
                            @change="handleChange(item.changeFn, data[item.key])"
                            :clearable="false"
                            v-if="item.type==='date'">
            </el-date-picker>
            <my-switch v-model="data[item.key]" v-if="item.type==='switch'">
            </my-switch>
            <tree-select
              v-if="item.type === 'selectTree'"
              ref="selectTree"
              clearable
              :multiple="selectTreeMultiple"
              :width="selectTreeWidth"
              :data="item.dialogData"
              :defaultProps="item.defaultProps"
              nodeKey="id" :checkedKeys="selectTreeCheckedValue"
              @change="handleClearSelectTree"
              @popoverHide="popoverHide"/>
              <tree-select
              v-if="item.type === 'selectTree2'"
              ref="selectTree2"
              clearable
              :multiple="selectTreeMultiple2"
              :width="selectTreeWidth2"
              :data="item.dialogData"
              :defaultProps="item.defaultProps"
              nodeKey="id" :checkedKeys="selectTreeCheckedValueTwo"
              @change="handleClearSelectTree2"
              @popoverHide="popoverHide2"/>
          </el-form-item> -->
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-for="(item, i) in btns">
      <el-button :key="i"
                 v-if="item.show"
                 :type="item.color"
                 :disabled="item.disabled"
                 @click="handleFn(item.type, item.clickFn || '')">{{item.name}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import basicModule from './basic'
import mySwitch from '../modules/switch'
import treeSelect from '../modules/tree-select'

export default {
  name: 'dialogModule',
  components: { basicModule, treeSelect, mySwitch },
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
    allRead: Boolean,
    selectTreeCheckedValue: Array,
    selectTreeCheckedValueTwo: Array,
    selectTreeWidth: Number,
    selectTreeWidth2: Number,
    selectTreekey: String,
    selectTreekey2: String,
    selectTreeMultiple: Boolean,
    selectTreeMultiple2: Boolean
  },
  data () {
    return {
      dateTypeList: ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'], // ele-date默认type类型
      chineseTybe: 0,
      showDialog1: false,
      oldEditData: null,
      selectTreeProps: {// 配置项（必选）
        value: 'id',
        label: 'departmentName',
        children: 'childIdList'
        // disabled:true
      }
    }
  },
  watch: {
    showDialog (val) {
      if (val === true) {
        this.showDialog1 = true
        this.handleInieEditData()
        this.oldEditData = JSON.parse(JSON.stringify(this.data))
      }
    },
    showDialog1 (val) {
      if (val === false) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
        let selectTree = this.$refs.selectTree
        let selectTree2 = this.$refs.selectTree2
        if (selectTree && selectTree.length > 0) {
          this.$refs.selectTree[0].clearSelectedNode()
        }
        if (selectTree2 && selectTree2.length > 0) {
          this.$refs.selectTree2[0].clearSelectedNode()
        }
        this.$emit('update:showDialog', false)
      }
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
    },
    dialogItem () {
      return this.items.filter(item => item.show)
    }
  },
  created () {
    this.dialogItem.forEach(item => {
      if (item.label.length > this.chineseTybe) {
        this.chineseTybe = item.label.length
      }
    })
    // this.$setItem(this.items, 'dialog')
  },
  methods: {
    handleClass (span = 24, type) {
      if (this.doubleColumn) span = 12
      if (this.doubleColumn && type === 'textarea') span = 24
      return ['width', `width${span}`]
    },
    // 对editData多选项进行初始化操作
    handleInieEditData () {
      // 找出多选的选项，转化为数组
      this.dialogItem.forEach(item => {
        if (item.type === 'selectMore') {
          if (this.parent.isEdit === 0) {
            this.data[item.key] = []
          } else if (this.parent.isEdit === 1) {
            if (this.data[item.key] === '') {
              this.data[item.key] = []
            } else {
              this.data[item.key] = this.data[item.key].split(',')
            }
          }
        }
      })
    },
    handleClearSelectTree (val) {
      this.$emit('handleClearSelectTree', val)
    },
    handleClearSelectTree2 (val) {
      this.$emit('handleClearSelectTree2', val)
    },
    // 拿到选择树的值
    popoverHide (checkedIds, checkedData) {
      this.data[this.selectTreekey] = checkedIds
      this.$emit('handleSelectTreeValue', checkedData)
    },
    popoverHide2 (checkedIds, checkedData) {
      this.data[this.selectTreekey2] = checkedIds
      this.$emit('handleSelectTreeValue2', checkedData)
    },
    // 点击按钮事件
    handleFn (type, clickFn = '') {
      if (type === 'delete') {
        if (clickFn === '') {
          this.showDialog1 = false
          return true
        } else {
          this.parent[clickFn]()
          return true
        }
      } else if (type === 'edit') {
        if (this.allRead) {
          this.showDialog1 = false
          return false
        }
        if (this.handleConfirmEdit('form') === false) return false
        if (clickFn === '') {
          this.showDialog1 = false
          return true
        }
        this.parent[clickFn]()
      }
    },
    // 点击确认时校验
    handleConfirmEdit (formName) {
      if (JSON.stringify(this.oldEditData) === JSON.stringify(this.data)) {
        this.$message.error('您未修改或添加任何数据')
        return false
      }
      // 校验规则
      let result
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          result = false
          return false
        }
        result = true
      })
      if (result === false) return false
      return true
    }
  }
}
</script>
