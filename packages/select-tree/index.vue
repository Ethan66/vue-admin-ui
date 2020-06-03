
<!--
    /** 单多选
     * <tree-select :height="400" // 下拉框中树形高度
     *          :width="200" // 下拉框中树形宽度
     *         size="small"  // 输入框的尺寸: medium/small/mini
     *         :data="data" // [{ name: '一级', id: '1', children: [{ name: '二级', id: '2' }] }]
     *         :defaultProps="defaultProps" // { label: 'name', children: 'children' }
     *         multiple   // 是否多选
     *         clearable   // 可清空选择
     *         collapseTags   // 多选时将选中值按文字的形式展示
     *         checkStrictly // 多选时，严格遵循父子不互相关联
     *         :nodeKey="nodeKey"   // 绑定nodeKey，默认绑定'id'
     *         :defaultChecked="defaultChecked"  // 传递默认选中的节点key组成的数组
     *         >
     *         </tree-select>
     */
-->
<template>
  <div class="tree-select">
    <div class="mask" v-show="isShowSelect" @click="isShowSelect = !isShowSelect"></div>
    <el-popover ref="elPopover" placement="bottom-start" :width="newWidth || width" trigger="manual"
                v-model="isShowSelect" @hide="popoverHide">
      <el-tree class="common-tree" :style="{ width: width + 'px', height: height + 'px' }" ref="tree" :data="data" :props="defaultProps"
              :show-checkbox="multiple"
              :node-key="nodeKey"
              :check-strictly="checkStrictly"
              default-expand-all
              :expand-on-click-node="false"
              :check-on-click-node="multiple"
              :highlight-current="true"
              @node-click="handleNodeClick"
              @check-change="handleCheckChange"></el-tree>
      <el-select :style="{ width: width === '100%' ? width : width + 'px' }" slot="reference" ref="select" :size="size"
                 v-model="checkedKeys"
                 :multiple="multiple"
                 :clearable="clearable"
                 :collapse-tags="collapseTags"
                 @click.native="isShowSelect = !isShowSelect"
                 @remove-tag="removeSelectedNodes"
                 @clear="clearCheckedKeys"
                 class="tree-select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'select-tree',
  props: {
    // 树结构数据
    data: {
      type: Array,
      default () {
        return []
      }
    },
    defaultProps: Object,
    // 配置是否可多选
    multiple: Boolean,
    // 配置是否可清空选择
    clearable: Boolean,
    // 配置多选时是否将选中值按文字的形式展示
    collapseTags: Boolean,
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: Boolean,
    // 默认选中的节点key数组
    defaultChecked: {
      type: Array,
      default () {
        return []
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    width: {
      type: Number | String,
      default: '100%'
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      newWidth: '', // 当width为100%时使用
      isShowSelect: false, // 是否显示树状选择器
      options: [], // 隐藏的选择器配置
      checkedKeys: '' // 勾选的id
    }
  },
  mounted () {
    this.initCheckedData()
    if (this.width === '100%') {
      this.newWidth = document.querySelector('.tree-select').offsetWidth
    }
  },
  methods: {
    initCheckedData () {
      let defaultChecked = this.defaultChecked
      if (defaultChecked.length > 0) {
        if (this.multiple) { // 多选
          this.$refs.tree.setCheckedKeys(defaultChecked)
        } else { // 单选
          var checkedKey = defaultChecked[0]
          this.$refs.tree.setCurrentKey(checkedKey) // 设置树高亮
          var node = this.$refs.tree.getNode(checkedKey) // 获取默认选中的节点的node数据
          node && this.handleNodeClick(undefined, node) // 设置options
        }
      }
    },
    // 单选模式：点击选中节点事件
    handleNodeClick (data, node) {
      if (!this.multiple && !node.disabled) {
        this.options = [].concat({ value: node.key, label: node.label })
        this.checkedKeys = node.key
        this.isShowSelect = false
      }
    },
    // 单多选模式：清空选中
    clearCheckedKeys () {
      if (this.multiple) {
        this.$refs.tree.getCheckedKeys().forEach(key => this.$refs.tree.setChecked(key, false)) // 同时修改了this.checkedKeys
      } else {
        this.$refs.tree.setCurrentKey(null) // 同时修改了this.checkedKeys
      }
      this.popoverHide() // 回调给父组件
    },
    // 多选模式：改变勾选状态触发
    handleCheckChange () {
      this.checkedKeys = this.$refs.tree.getCheckedKeys() // 获取已勾选的唯一值
      this.options = this.checkedKeys.map((key) => {
        var node = this.$refs.tree.getNode(key) // 获取已勾选的node数据
        return { value: node.key, label: node.label }
      })
    },
    // 多选模式：从选择器上删除单个选项
    removeSelectedNodes (key) {
      this.$refs.tree.setChecked(key, false)
      var node = this.$refs.tree.getNode(key)
      if (!this.checkStrictly && node.childNodes.length > 0) {
        // 将对象中的所有子集变成平级
        function  treeToList (tree) {
          var queen = []
          var out = []
          queen = queen.concat(tree)
          while (queen.length) {
            var first = queen.shift()
            if (first.childNodes) {
              queen = queen.concat(first.childNodes)
            }
            out.push(first)
          }
          return out
        }
        treeToList(node).map(item => {
          this.$refs.tree.setChecked(item, false) // 同时修改了this.checkedKeys
        })
      }
    },
    // 回调
    popoverHide () {
      let checkedData = null
      if (this.multiple) {
        checkedData = this.$refs.tree.getCheckedNodes() // 获取已勾选的数据
      } else {
        checkedData = this.$refs.tree.getCurrentNode()
      }
      this.$emit('input', this.checkedKeys)
    }
  },
  watch: {
    isShowSelect (val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur()
    }
  }
}
</script>

<style lang="less">
.tree-select {
  z-index: 111;
  .mask{
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 11;
      position: fixed;
      top: 0;
      left: 0;
    }
    .common-tree{
      overflow: scroll;
    }
    .common-tree::-webkit-scrollbar {/*滚动条整体样式*/
        width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .common-tree::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        background: rgba(65,98,219,0.5);
        // background: #4162DB;
    }

}
.el-tree.common-tree{
  overflow: auto;
  padding-top: 5px;
}
.el-popover{
    width: 300px;
    .el-checkbox{
      margin-bottom: 0px;
    }
  }
</style>
