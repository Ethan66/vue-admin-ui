<template>
  <div class="nav">
    <i
      :class="['unfold', $store.getters.sidebar.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
      @click="handleChangeFold"
    ></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-if="$route.path!=='/admin/index'">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.apth">{{ item.meta.title }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="username" src="~@/assets/img/username.png" />{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="showDialogForm = true">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <dialog-module
      ref="dialog"
      title="修改密码"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { apiUserLoginOut, apiModifyPassword } from '@/api/login'
import MD5 from 'js-md5'

export default {
  data () {
    return Object.assign({
      userName: '',
      showDialogForm: false,
      editData: {},
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkNewPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }, new this.$InitObj({
      btns: {
        dialog: [
          { confirm: { clickFn: 'handleChangePassword' } }, 'cancel'
        ]
      },
      items: {
        dialog: {
          password: { label: '原密码' },
          newPassword: { label: '新密码' },
          checkNewPassword: { label: '确认密码' }
        }
      }
    }))
  },
  created () {
    this.userName = this.$store.getters.userInfo.userName
  },
  methods: {
    handleChangeFold () {
      this.$store.commit('TOGGLE_SIDEBAR', !this.$store.getters.sidebar.opened)
    },
    logout () {
      this.$confirm('确定退出', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            apiUserLoginOut().then((res) => {
              if (res.code === '000000') {
                this.$router.push({ path: '/login' })
              }
            })
          }
        }
      })
    },
    handleChangePassword () {
      if (this.editData.newPassword !== this.editData.checkNewPassword) {
        this.$message.error('二次密码不一致')
        return
      }
      let params = {
        password: MD5(this.editData.password),
        newPassword: MD5(this.editData.newPassword)
      }
      apiModifyPassword(params).then(res => {
        if (res.code === '000000') {
          this.$router.push({ path: '/login' })
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .nav{
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 55px;
    background: #fff;
    padding: 10px 14px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .unfold{
      font-size: 20px;
      margin-right: 10px;
    }
    .el-breadcrumb{
      flex-grow: 1;
      .el-breadcrumb__inner{
        color: #97a8be;
      }
      .el-breadcrumb__inner.is-link{
        color: #303133;
        font-weight: 400;
      }
      .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #97a8be;
      }
    }
    .username{
      margin-right: 5px;
      width: 14px;
      vertical-align: middle;
    }
    .el-dropdown{
      max-width: 200px;
      line-height: 35px;
      background: #fff;
      color: #333;
      text-align: right;
      cursor: pointer;
      .el-icon-arrow-down{
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
</style>
