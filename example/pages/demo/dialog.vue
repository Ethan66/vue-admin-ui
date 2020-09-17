<template>
  <div>
    <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
    <el-button type="danger" size="small" @click="handleEdit">编辑</el-button>
    <el-button type="success" size="small" @click="handleWatch">查看</el-button>
    <dialog-module
      ref="dialog"
      :allRead="allRead"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules">
        <el-switch slot="switch" v-model="editData.delivery"></el-switch>
        <el-input slot="textarea" type="textarea" v-model="editData.textarea"></el-input>
      </dialog-module>
  </div>
</template>

<script>
export default {
  name: 'demo-dialog',
  data () {
    return Object.assign(new this.$InitObj({
      items: {
        dialog: {
          account: { label: '账号' },
          password: { label: '密码', disabled: true },
          delivery: { label: '开关', slot: 'switch' },
          textarea: { label: '文本', slot: 'textarea' },
          position: { label: '职位', type: 'select', options: [{ label: '前端', value: '1' }, { label: '运营', value: '2' }] },
          roleId: { label: '角色', type: 'select', multiple: true, options: [{ label: '超级管理员', value: '1' }, { label: '管理员', value: '2' }, { label: '技术', value: '3' }] },
          position3: { label: '关联账号', type: 'checkbox', options: [{ label: '测试', value: '2' }, { label: '运营', value: '3' }] },
          status: { label: '状态', type: 'radio', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
          date: { label: '日期', type: 'date' },
          daterange: { label: '日期范围', type: 'daterange', key: 'str1,str2' },
          week: { label: '周', type: 'week', format: 'yyyy 第 WW 周' },
          month: { label: '月', type: 'month' },
          year: { label: '年', type: 'year' }
        }
      }
    }), {
      allRead: false,
      rules: {
        account: [
          { required: true, trigger: 'blur', message: '请填写账号' }
        ],
        name: [
          { required: true, trigger: 'blur', message: '请填写用户名' }
        ],
        roleId: [
          { required: true, trigger: 'blur', message: '请选择角色' }
        ]
      }
    })
  },
  methods: {
    handleAdd () {
      this.isEdit = 0
      this.showDialogForm = true
      this.dialogTitle = '新增'
      this.$set(this.editData, 'position3', [])
    },
    handleEdit () {
      this.isEdit = 1
      this.editData = { position3: ['3'], roleId: ['2', '3'], account: '2423', textarea: '胜多负少的', position: '1', status: 1 }
      this.showDialogForm = true
      this.dialogTitle = '编辑'
    },
    handleWatch () {
      this.isEdit = 1
      this.allRead = true
      this.editData = { position3: ['3'], roleId: ['2', '3'], account: '2423', textarea: '胜多负少的', position: '1', status: 1 }
      this.showDialogForm = true
      this.dialogTitle = '查看'
    },
    handleSubmit () {
      alert(JSON.stringify(this.editData))
    }
  }
}
</script>
