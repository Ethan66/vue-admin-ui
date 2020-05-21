<template>
  <div class="bl-login">
    <component
      :is="component"
      :component.sync="component"
      :systemObj="systemObj"
      :ipAddress="ipAddress"
      @handleChangeComponent="handleChangeComponent"
    />
  </div>
</template>

<script>
import { apiGetIp } from '@/api/login'
// import { apiExampleGet, apiExamplePost } from '@/api/example'
import login from './login'
import register from './register'
import MD5 from 'js-md5'
import rules from './rules'
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
    this.$route.meta.firstLogin = true
    localStorage.clear()
    sessionStorage.clear()
    this.$store.commit('UPDATE_KEEP_ALIVE_LIST', { type: 'deleteAll' })
    this.$store.commit('UPDATE_PAGE_SEARCH_VALUES', { type: 'deleteAll' })
    this.handleCheckIp()
    // apiExampleGet({ name: 'frank' })
    // apiExamplePost({ msg: 'frank' })
  },
  methods: {
    handleChangeComponent (val) {
      this.component = val
    },
    // 校验IP
    handleCheckIp () {
      let version = navigator.userAgent
      let systemObj = this.systemObj
      systemObj.system = version.replace(/.+(Windows ).+?([\d\.]+).+/g, '$1$2')
      if (!systemObj.system) { // mac版本
        systemObj.system = version.replace(/.+(Mac.+?)\).+/g, RegExp.$1)
        if (navigator.vendor.incldes('Google')) {
          systemObj.browser = 'Chrome'
        }
      }
      if (systemObj.browser === 'IE') {
        let arr = ['Chrome', 'Firefox', 'Opera', 'Safari'].filter(item => version.includes(item))
        arr && (systemObj.browser = arr[0])
      }
      apiGetIp().then(res => {
        console.log(res)
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
    .el-form-item{
      margin-bottom: 25px;
    }
    position: relative;
    width: 100%;
    height: 100%;
    background: url('~@/assets/img/Bitmap.png');
    background-size: cover;
    &:before{
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .56;
    }
    h3{
      margin-bottom: 25px;
      font-size: 20px;
      color: #4a4a4a;
      text-align: center;
    }
    .el-form{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      padding: 25px 30px;
      border-radius: 4px;
      background: #fff;
    }
    .el-form-item.noMargin{
      margin-bottom: 10px;
    }
    .el-button.cm-bg-color{
      width: 100%;
      height: 40px;
      padding: 0;
      border: none;
      line-height: 40px;
    }
    .forgetPwd{
      margin: 0;
      font-size: 12px;
      text-align: center;
    }
  }
</style>
