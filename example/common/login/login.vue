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
    <p class="forgetPwd cm-hover-color" @click="$emit('handleChangeComponent', 'register')">注册</p>
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
    // 失焦
    handleBlur (type) {
      let code = this.nowErrorCode
      if (code) {
        let obj = this.errorCodeObj[code]
        if (obj && (obj.type === type || (obj.connect && obj.connect === type))) {
          this.nowErrorCode = ''
        }
      }
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.nowErrorCode = ''
          let params = Object.assign({}, this.loginForm)
          params.user
          params.password = MD5(params.password)
          params.loginIp = this.ip
          params.ipAddress = this.ipAddress,
          params.operatingSystem = this.systemObj.system
          params.terminal = this.systemObj.browser
          apiLogin(params).then(res => {
            if (res.code === '000000') {
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              this.$router.push('/')
            } else {
              if (!this.handleSpeciaCode(res.code)) {
                this.$message.error(res.msg)
              }
              throw new Error()
            }
          }).catch(e => {
            this.isLoading = false
          })
        }
      })
    },
    // 特殊code码进行提示
    handleSpeciaCode (code, form = 'login') {
      if (Object.keys(this.errorCodeObj).includes(code)) {
        this.nowErrorCode = code
        this.$refs[form].validateField([this.errorCodeObj[code].type])
        return true
      }
      return false
    }
  }
}
</script>
    