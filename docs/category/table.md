# tableModule 表格

### 基础表格

:::demo [width]() 设置单元格最小宽度，[show]()控制是否展示此列，[selection]() 控制勾选, [class-name]() 控制class
```html
<template>
  <table-module ref="table" :loading="tableLoading" :data="tableData" :items="tableItem" />
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          table: {
            selection: '',
            name: { label: '用户名' },
            roleName: { label: '角色', width: 100, 'class-name': 'roleClass' },
            operator: { label: '操作人', width: 100, show: false }
          }
        }
      })
    },
    created () {
      this.onGetData()
    },
    methods: {
      // 获取表格数据
      onGetData (val = {}) {
        this.tableLoading = true
        setTimeout(() => {
          this.tableData = [
            { operator: "庄成",  roleName: "超级管理员", name: "庄成" },
            { operator: "庄成",  roleName: "测试人员", name: "庄成" },
            { operator: "庄成",  roleName: "外部人员", name: "外来人" }
          ]
          this.tableLoading = false
        }, 1000)
      }
    }
  }
</script>
```
:::

### 表格操作

:::demo [slot="btn"]() 插槽插入表格按钮
```html
<template>
  <table-module ref="table" :loading="tableLoading" :data="tableData" :items="tableItem">
    <template slot="btn" slot-scope="scope">
        <el-button @click="onWatch(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
  </table-module>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          table: {
            name: { label: '用户名' },
            roleName: { label: '角色', width: 100 },
            btn: { width: 118, slot: 'btn' }
          }
        }
      })
    },
    created () {
      this.onGetData()
    },
    methods: {
      // 获取表格数据
      onGetData (val = {}) {
        this.tableLoading = true
        setTimeout(() => {
          this.tableData = [
            { operator: "庄成",  roleName: "超级管理员", name: "庄成" },
            { operator: "庄成",  roleName: "测试人员", name: "庄成" },
            { operator: "庄成",  roleName: "外部人员", name: "外来人" }
          ]
          this.tableLoading = false
        }, 1000)
      },
      onWatch (row) {
        alert(JSON.stringify(row))
      }
    }
  }
</script>
```
:::

### 默认勾选项和禁止勾选

:::demo [selectable]() 方法控制哪些行是可以勾选的
```html
<template>
  <table-module ref="table" :loading="tableLoading" :data="tableData" :items="tableItem">
    <div class="btn-content" slot="header-btn">
      <el-button @click="onSelected" type="primary" size="small">默认勾选第一行</el-button>
    </div>
  </table-module>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          table: {
            selection: { selectable: (row, index) => index !== 2 },
            name: { label: '用户名' },
            roleName: { label: '角色', width: 100 },
            operator: { label: '操作人', width: 100 }
          }
        }
      })
    },
    created () {
      this.onGetData()
    },
    methods: {
      // 获取表格数据
      onGetData (val = {}) {
        this.tableLoading = true
        setTimeout(() => {
          this.tableData = [
            { operator: "庄成",  roleName: "超级管理员", name: "庄成" },
            { operator: "庄成",  roleName: "测试人员", name: "庄成" },
            { operator: "庄成",  roleName: "外部人员", name: "外来人" }
          ]
          this.tableLoading = false
        }, 1000)
      },
      onSelected () {
        this.$refs.table.$children[1].toggleRowSelection(this.tableData[0])
      }
    }
  }
</script>
```
:::

### 格式化内容

:::demo [formatterFn]() 方法控制格式化单元格
```html
<template>
  <table-module ref="table" :loading="tableLoading" :data="tableData" :items="tableItem"></table-module>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          table: {
            name: { label: '用户名' },
            roleName: { label: '角色', width: 100, formatterFn: InitObj.prototype.formmater(['超级管理员', '管理员', '测试']) },
            operator: { label: '操作人', width: 100 }
          }
        }
      })
    },
    created () {
      this.onGetData()
    },
    methods: {
      // 获取表格数据
      onGetData (val = {}) {
        this.tableLoading = true
        setTimeout(() => {
          this.tableData = [
            { operator: "庄成",  roleName: 0, name: "庄成" },
            { operator: "庄成",  roleName: 1, name: "庄成" },
            { operator: "庄成",  roleName: 2, name: "外来人" }
          ]
          this.tableLoading = false
        }, 1000)
      }
    }
  }
</script>
```
:::

### 自定义单元格

:::demo [slot]() 自定义单元格
```html
<template>
  <table-module ref="table" :loading="tableLoading" :data="tableData" :items="tableItem">
    <template slot="role" slot-scope="scope">
        <p>{{ scope.row.name }}是{{ scope.row.roleName }}</p>
      </template>
  </table-module>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          table: {
            name: { label: '用户名' },
            roleName: { label: '角色', width: 100, slot: 'role' },
            operator: { label: '操作人', width: 100 }
          }
        }
      })
    },
    created () {
      this.onGetData()
    },
    methods: {
      // 获取表格数据
      onGetData (val = {}) {
        this.tableLoading = true
        setTimeout(() => {
          this.tableData = [
            { operator: "庄成",  roleName: 0, name: "庄成" },
            { operator: "庄成",  roleName: 1, name: "庄成" },
            { operator: "庄成",  roleName: 2, name: "外来人" }
          ]
          this.tableLoading = false
        }, 1000)
      }
    }
  }
</script>
```
:::