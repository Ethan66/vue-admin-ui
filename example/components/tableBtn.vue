<template>
  <el-table-column
    :key="`btn${i}`"
    :fixed="item.fixed || 'right'"
    v-bind="item"
  >
  <template slot-scope="scope">
      <template v-for="(btn, index) in tableBtn1">
        <template
          v-if="handleShowBtn(btn, scope.row)"
        >
          <template v-if="!btn.list">
            <template v-if="!isInlineEdit">
              <p
                class="btnCls"
                :key="i+index"
                :disabled="btn.disabled || (scope.row.disabledBtn && scope.row.disabledBtn.includes(btn.name))"
                @click="handleBtnClick(btn.clickFn, scope.row, scope.$index, btn, btn.noClickFn)"
              >{{ btn.name }}</p>
            </template>

            <template v-if="isInlineEdit">
              <p
                v-if="btn.show || (scope.row.showBtn && scope.row.showBtn.includes(btn.name))"
                class="btnCls"
                :key="i+index"
                :disabled="btn.disabled || (scope.row.disabledBtn && scope.row.disabledBtn.includes(btn.name))"
                @click="handleBtnClick(btn.clickFn, scope.row, scope.$index, btn, btn.noClickFn)"
              >{{ handleSetInlineShowName(btn, scope.row) }}</p>
            </template>
          </template>
          <template v-if="btn.list">
            <el-dropdown
              :key="i+index"
              @command="handleChooseBtn"
            >
              <p
                class="btnCls"
              >{{ btn.name }}<i class="el-icon-arrow-down"></i></p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(operato, i) in btn.list
                  .filter(item => item.show)
                  .filter(item => (scope.row.showBtnCode && scope.row.showBtnCode.includes(item.code)) || item.inlineShow !== false)"
                  :key="i"
                  :disabled="operato.disabled"
                  :command="handleCreateCommand(operato, scope.row, index)"
                >
                  {{ operato.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  props: {
    item: Object,
    i: Number,
    tableBtn: Array,
    isInlineEdit: Boolean,
    inlineLabelToValue: Object,
    tableItem: Array,
    isMore: Boolean
  },
  data () {
    return {
      firstInit: true,
      parent: '',
      rowOrignData: []
    }
  },
  computed: {
    tableBtn1 () {
      let btn = JSON.parse(JSON.stringify(this.tableBtn))
      btn.forEach(item => {
        if (item.list) {
          item.list = item.list.filter(child => child.show !== false)
        }
      })
      return btn
    }
  },
  methods: {
    // 是否显示按钮
    handleShowBtn (btn, row) {
      if (this.isInlineEdit) return true
      if (!btn.show) return false
      if (row.showBtnCode && row.showBtnCode.includes(btn.code)) return true
      if (btn.inlineShow !== false) return true
      return false
    },
    handleSetInlineShowName (btn, row) {
      return btn.name === '编辑' && row.editBtnName ? row.editBtnName : btn.name
    },
    // 点击按钮触发
    handleBtnClick (fn, row, index, btn, noClickFn) {
      let btnName = btn.name
      // 判断父组件
      if (this.firstInit && fn) {
        let i = 0
        let parent = this.$parent
        while (!parent[fn]) {
          parent = parent.$parent
          i++
          if (i === 5) break
        }
        this.parent = parent
        this.firstInit = false
      }
      if ((!this.isInlineEdit && !fn) || (this.isInlineEdit && !fn && btnName !== '取消')) return
      if (this.isInlineEdit && btnName === '删除' && noClickFn) {
        this.$emit('handleInlineEditTableData', index, row, 'delete')
        return false
      }
      if (btnName === '删除') {
        if (btn.noTip === false) {
          this.parent[fn](row)
        } else {
          let tip = btn.deleteTip || '是否确认删除'
          this.$confirm(tip, '温馨提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: action => {
              if (action === 'confirm') {
                this.parent[fn](row)
              }
            }
          })
        }
      } else if (!this.isInlineEdit) { // 非行内编辑
        this.parent[fn](row)
      } else if (this.isInlineEdit) { // 行内编辑
        if (btnName === '编辑' && !row.editBtnName) { // 点击编辑按钮
          this.rowOrignData[index] = JSON.parse(JSON.stringify(row))
          if (this.inlineLabelToValue) {
            this.handleLabelToValue(row, 'edit')
          }
          row.showBtn = ['取消']
          row.editStatus = true
          row.editBtnName = '保存'
          row.editBtnColor = 'success'
          this.$emit('handleInlineEditTableData', index, row)
          this.$nextTick(() => {
            let input = document.querySelector('.tableModule .edit-input input[type=text]')
            input && input.focus()
          })
        } else if (btnName === '编辑' && row.editBtnName === '保存') { // 点击保存按钮
          row.showBtn = ['删除']
          row.editStatus = false
          row.editBtnName = undefined
          row.editBtnColor = undefined
          let sendRowData = JSON.parse(JSON.stringify(row))
          if (this.inlineLabelToValue) {
            this.handleLabelToValue(row, 'save')
          }
          this.$emit('handleInlineEditTableData', index, row)
          if (noClickFn) return false
          this.parent[fn](sendRowData)
        } else if (btnName === '取消') { // 点击取消
          row.showBtn = ['删除']
          if (!row.editStatus) return
          row.editStatus = false
          this.tableItem.forEach(item => {
            if (item.canEdit === 1) {
              row[item.prop] = this.rowOrignData[index][item.prop]
            }
          })
          row.editBtnName = row.editBtnColor = undefined
          this.$emit('handleInlineEditTableData', index, row)
          fn && this.parent[fn](row)
        } else {
          this.parent[fn](row)
        }
      }
    },
    // 更多按钮时下拉选择触发
    handleChooseBtn (command) {
      let { operato, row, index } = command
      this.handleBtnClick(operato.clickFn, row, index, operato, operato.noClickFn)
    },
    // 更多按钮下拉选择生成command
    handleCreateCommand (operato, row, index) {
      return { operato, row, index }
    },
    handleLabelToValue (row, type) {
      Object.keys(this.inlineLabelToValue).forEach(key => {
        this.inlineLabelToValue[key].forEach(item => {
          if (type === 'edit') {
            if (item.label === row[key]) row[key] = item.value
          } else if (type === 'save') {
            if (item.value === row[key]) row[key] = item.label
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
  .table-btn{
    display: inline-block;
    & + .table-btn{
      margin-left: 12px;
    }
  }
  .tableModule{
    .btnCls{
      position: relative;
      display: inline-block;
      padding: 0 7px;
      margin: 0;
      color: #4162DB;
      .el-icon-arrow-down{
        margin-left: 2px;
        font-size: 12px;
      }
      &:hover{
        cursor: pointer;
      }
      &:first-child{
      padding-left: 0;
    }
    }
    .btnCls+.btnCls, .el-dropdown{
      padding-left: 9px;
        &::before{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-57%);
        display: block;
        content: '|';
      }
      .btnCls{
        padding-right: 0;
      }
    }
  }
</style>
