<template>
  <div class="bl-login">
    <component
      :is="component"
      :component.sync="component"
      :systemObj="systemObj"
      :ipAddress="ipAddress"
      @handle-change-component="handleChangeComponent"
    />
  </div>
</template>

<script>
import { apiGetIp } from '@/api/login'
import login from './login'
import register from './register'
import rules from './rules'
import { getSystemVersion } from 'vue-admin-methods'
export default {
  components: { login, register },
  mixins: [rules],
  data () {
    return {
      component: 'login',
      systemObj: {
        system: '',
        browser: 'IE'
      },
      ipIsTrue: false,
      nowErrorCode: '',
      isLoading: false,
      ipAddress: '',
      isLogin: true
    }
  },
  created () {
    localStorage.clear()
    sessionStorage.clear()
    this.$store.commit('UPDATE_KEEP_ALIVE_LIST', { type: 'deleteAll' })
    this.$store.commit('UPDATE_PAGE_SEARCH_VALUES', { type: 'deleteAll' })
    this.handleCheckIp()
  },
  methods: {
    handleChangeComponent (val) {
      this.component = val
    },
    // 校验IP
    handleCheckIp () {
      this.systemObj = getSystemVersion()
      apiGetIp().then(res => {
        if (res) {
          let city = res.match(/(?!当前).[\u4e00-\u9fa5]\s/g)
          let ip = res.match(/[\d.]+/g).join()
          this.ip = ip
          city[0] = ''
          city[city.length - 1] = ''
          try {
            city = city.join('')
            this.ipAddress = `${ip} ${city}`
          } catch (error) { console.log('ipAddress' + error) }
        }
      })
    }
  }
}
</script>

<style lang="less">
  .bl-login{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #2d3a4b;
    h3{
      margin-bottom: 25px;
      font-size: 26px;
      font-weight: 700;
      color: #eee;
      text-align: center;
    }
    .el-form{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
    }
    .el-input__inner{
      width: 100%;
      height: 46px;
      line-height: 46px;
      border: 1px solid hsla(0,0%,100%,.1);
      border-color: hsla(0, 0%, 100%, 0.1) !important;
      background: rgba(0,0,0,.1);
      border-radius: 5px;
    }
    .el-form-item.noMargin{
      margin-bottom: 10px;
    }
    .el-button.cm-bg-color{
      width: 100%;
      height: 40px;
      border-radius: 4px;
      padding: 0;
    }
    .forgetPwd{
      color: #999;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
