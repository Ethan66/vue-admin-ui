 <template>
  <el-form
    ref="register"
    key="password"
    :model="passwordForm" :rules="passwordrules">
    <h3>{{ $systemObj.name }}</h3>
    <el-form-item prop="user">
      <el-input autofocus v-model="passwordForm.user"
        placeholder="账号" @blur="handleBlur('user')" />
    </el-form-item>
    <el-form-item prop="userName">
      <el-input autofocus v-model="passwordForm.userName"
        placeholder="用户名" @blur="handleBlur('userName')" />
    </el-form-item>

    <el-form-item prop="password1">
      <el-input type="password" v-model="passwordForm.password1"
        placeholder="密码" />
    </el-form-item>

    <el-form-item prop="password2">
      <el-input type="password" v-model="passwordForm.password2"
        placeholder="确认密码" />
    </el-form-item>

    <el-form-item class="noMargin">
      <el-button
        :loading="isLoading" class="cm-bg-color"
        type="primary" @click.native.prevent="submitForm('register')"
      >确 认</el-button>
    </el-form-item>
    <p class="forgetPwd" @click="$emit('handle-change-component', 'login')">去登录？</p>
  </el-form>
</template>

<script>
import rules from './rules'
import MD5 from 'js-md5'
import { apiRegister } from '@/api/login'

export default {
  mixins: [rules],
  data () {
    return {
      passwordForm: { user: '', userName: '', password1: '', password2: '' },
      isLoading: false,
      nowErrorCode: ''
    }
  },
  methods: {
    // 注册
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.nowErrorCode = ''
          let params = {
            user: this.passwordForm.user,
            userName: this.passwordForm.userName,
            password: MD5(this.passwordForm.password1)
          }
          apiRegister(params).then(res => {
            if (res.code === '000000') {
              this.isLoading = false
              this.$message.success('注册成功')
              this.$emit('handleChangeComponent', 'login')
            } else {
              if (!this.handleSpeciaCode(res.code, 'register')) {
                this.$message.error(res.message)
              }
              throw new Error()
            }
          }).catch(e => {
            this.isLoading = false
          })
        }
      })
    }
  }
}
</script>
