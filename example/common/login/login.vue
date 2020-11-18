<template>
  <el-form
    ref="login"
    :model="loginForm"
    key="login"
    :rules="rules">
    <h3>{{ $systemObj.name }}</h3>
    <el-form-item prop="user">
      <el-input
        autofocus
        v-model="loginForm.user"
        placeholder="账号"
        @blur="handleBlur('user')"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="密码"
        @blur="handleBlur('password')"
      />
    </el-form-item>

    <el-form-item class="noMargin">
      <el-button
        :loading="isLoading"
        class="cm-bg-color"
        type="primary"
        @click.native.prevent="submitForm('login')"
      >登 录</el-button>
    </el-form-item>
    <p class="forgetPwd" @click="$emit('handle-change-component', 'register')">注册</p>
  </el-form>
</template>

<script>
import { apiLogin } from '@/api/login'
import MD5 from 'js-md5'
import rules from './rules'

export default {
  props: {
    component: String,
    ipAddress: String,
    systemObj: Object
  },
  mixins: [rules],
  data () {
    return {
      loginForm: { user: '', password: '' },
      isLoading: false
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.nowErrorCode = ''
          let params = Object.assign({}, this.loginForm)
          params.password = MD5(params.password)
          params.loginIp = this.ip
          params.ipAddress = this.ipAddress
          params.operatingSystem = this.systemObj.system
          params.terminal = this.systemObj.browser
          apiLogin(params).then(res => {
            this.isLoading = false
            if (res.code === '000000') {
              this.$store.commit('SAVE_USERINFO', res.data)
              this.$router.push('/')
            } else {
              if (!this.handleSpeciaCode(res.code)) {
                this.$message.error(res.msg)
              }
            }
          })
        }
      })
    }
  }
}
</script>
