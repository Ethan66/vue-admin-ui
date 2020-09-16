# DialogModule 对话框

### 基础用法

:::demo [disabled]() 控制是否可输入，[type=radio]() 控制Radio，[type=select]() 控制单选， [multiple]() 控制多选，[type=checkbox]() 控制checkbox
```html
<template>
  <div>
    <div style="padding: 10px 0;">
      <el-button type="primary" size="small" @click="onAdd">新增</el-button>
    </div>
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :items="dialogItem"
      :data="editData"
      :btns="dialogBtn"
    ></dialog-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'onSubmit', disabled: false, show: true }
}

  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          dialog: {
            account: { label: '输入框' },
            password: { label: '不可点击', disabled: true },
            position: { label: '单选', type: 'select', options: [{ label: '前端', value: '1' }, { label: '运营', value: '2' }] },
            roleId: { label: '多选', type: 'select', multiple: true, options: [{ label: '超级管理员', value: '1' }, { label: '管理员', value: '2' }, { label: '技术', value: '3' }] },
            position3: { label: '关联账号', type: 'checkbox', options: [{ label: '测试', value: '2' }, { label: '运营', value: '3' }] },
            status: { label: '状态', type: 'radio', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
          }
        }
      })
    },
    methods: {
      onAdd () {
        this.dialogTitle = '新增'
        this.isEdit = 0
        this.$set(this.editData, 'position3', [])
        this.showDialogForm = true
      },
      onSubmit () {
        alert(JSON.stringify(this.editData))
        this.$refs.dialog.showDialog1 = false
      }
    }
  }
</script>
```
:::

### 插槽

:::demo [slot=switch]() 控制switch，[slot=textarea]() 控制文本框， [slot]() 自定义插槽
```html
<template>
  <div>
    <div style="padding: 10px 0;">
      <el-button type="primary" size="small" @click="onAdd">新增</el-button>
    </div>
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :items="dialogItem"
      :data="editData"
      :btns="dialogBtn"
    >
      <el-switch slot="switch" v-model="editData.delivery"></el-switch>
      <el-input slot="textarea" type="textarea" v-model="editData.textarea"></el-input>
      <p slot="slot1">水电费水电费</p>
    </dialog-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'onSubmit', disabled: false, show: true }
}

  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          dialog: {
            delivery: { label: '开关', slot: 'switch' },
            textarea: { label: '文本', slot: 'textarea' },
            mySlot: { label: '自定义', slot: 'slot1' },
          }
        }
      })
    },
    methods: {
      onAdd () {
        this.dialogTitle = '新增'
        this.isEdit = 0
        this.showDialogForm = true
      },
      onSubmit () {
        alert(JSON.stringify(this.editData))
        this.$refs.dialog.showDialog1 = false
      }
    }
  }
</script>
```
:::

### 日期

:::demo [type=daterange]() 控制日期范围，key必须是字符串中间以逗号隔开，其他按照element-ui执行
```html
<template>
  <div>
    <div style="padding: 10px 0;">
      <el-button type="primary" size="small" @click="onAdd">新增</el-button>
    </div>
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :items="dialogItem"
      :data="editData"
      :btns="dialogBtn"
    >
      <el-switch slot="switch" v-model="editData.delivery"></el-switch>
      <el-input slot="textarea" type="textarea" v-model="editData.textarea"></el-input>
      <p slot="slot1">水电费水电费</p>
    </dialog-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'onSubmit', disabled: false, show: true }
}

  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          dialog: {
            date: { label: '日期', type: 'date' },
            daterange: { label: '日期范围', type: 'daterange', key: 'str1,str2' },
            week: { label: '周', type: 'week', format: 'yyyy 第 WW 周' },
            month: { label: '月', type: 'month' },
            year: { label: '年', type: 'year' }
          }
        }
      })
    },
    methods: {
      onAdd () {
        this.dialogTitle = '新增'
        this.isEdit = 0
        this.showDialogForm = true
      },
      onSubmit () {
        alert(JSON.stringify(this.editData))
        this.$refs.dialog.showDialog1 = false
      }
    }
  }
</script>
```
:::

### 全部只读/规则

:::demo [allRead]() 控制是否只读
```html
<template>
  <div>
    <div style="padding: 10px 0;">
      <el-button type="primary" size="small" @click="onAdd">全部只读</el-button>
    </div>
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :allRead="allRead"
      :items="dialogItem"
      :data="editData"
      :btns="dialogBtn"
    ></dialog-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'onSubmit', disabled: false, show: true }
}

  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return Object.assign(new InitObj({
        items: {
          dialog: {
            account: { label: '输入框' },
            roleId: { label: '多选', type: 'select', multiple: true, options: [{ label: '超级管理员', value: '1' }, { label: '管理员', value: '2' }, { label: '技术', value: '3' }] }
          }
        }
      }), {
        allRead: false,
        rules: {
          account: [
            { required: true, trigger: 'blur', message: '请填写账号' }
          ],
          roleId: [
            { required: true, trigger: 'blur', message: '请选择角色' }
          ]
        }
      })
    },
    methods: {
      onAdd () {
        this.dialogTitle = '只读'
        this.isEdit = 0
        this.allRead = true
        this.showDialogForm = true
      },
      onSubmit () {
        alert(JSON.stringify(this.editData))
        this.$refs.dialog.showDialog1 = false
      }
    }
  }
</script>
```
:::