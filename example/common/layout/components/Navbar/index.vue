<template>
  <div class="nav">
    <el-tabs v-model="currentUrl" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
       <el-tab-pane
        v-for="item in mainTabs"
        :key="item.url"
        :label="item.name"
        :name="item.url"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="username" src="~@/assets/img/username.png" />{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="width100">
          <span @click="changePassword">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout" class="width100">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <dialog-module
      ref="dialog"
      dialogTitle="修改密码"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOptionsName } from '@/config/utils'
import { apiUserLoginOut, apiModifyPassword } from '@/api/login'
import MD5 from 'js-md5'

export default {
  data () {
    return {
      userName: '',
      showDialogForm: false,
      editData: {},
      dialogItem: [
        { key: 'password', label: '原密码', type: 'input', show: true },
        { key: 'newPassword', label: '新密码', type: 'password', show: true },
        { key: 'checkNewPassword', label: '确认密码', type: 'password', show: true }
      ],
      dialogBtn: [
        { name: '取消', type: 'delete', show: true, disabled: false, clickFn: 'btnCancel' },
        { name: '确认', type: 'edit', show: true, color: 'primary', disabled: false, clickFn: 'handleChangePassword' }
      ],
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
    }
  },
  watch: {
    $route (val) {
      this.handleJudgeNowRoute(val)
    }
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.app.mainTabs },
      set (val) { this.$store.commit('UPDATETABS', val) }
    },
    mainActivedTab: {
      get () { return this.$store.state.app.mainActivedTab },
      set (val) { this.$store.commit('UPDATEMINACTIVEDTAB', val) }
    },
    currentUrl: {
      get () { return this.mainActivedTab.url || '' },
      set () {}
    },
    ...mapGetters(['subTabObj'])
  },
  created () {
    this.userName = JSON.parse(localStorage.getItem('userInfo')).userName
    if (!this.mainActivedTab.name) {
      this.mainActivedTab = JSON.parse(sessionStorage.getItem('mainActivedTab')) || {}
      this.mainTabs = this.mainActivedTab.name ? [].concat(this.mainActivedTab) : []
    }
  },
  mounted () {
    let path = this.$route.path.split('/').slice(0, -1).join('/')
    if (path && this.subTabObj[path]) {
      this.$nextTick(() => {
        if (document.querySelector('.app-main .substance')) {
          document.querySelector('.app-main .substance').style.minHeight = 'calc(100vh - 110px)'
        }
      })
    }
  },
  methods: {
    clickTab (tab) {
      if (this.mainTabs.length > 1 && this.currentUrl !== tab.name) {
        this.mainActivedTab = { name: tab.label, url: tab.name }
        sessionStorage.setItem('mainActivedTab', JSON.stringify(this.mainActivedTab))
        this.$router.push({ name: tab.name })
      }
    },
    removeTab (tab) {
      if (this.mainTabs.length > 1) {
        const index = this.mainTabs.findIndex(item => item.url === tab)
        if (index !== -1) {
          const arr = [].concat(this.mainTabs)
          arr.splice(index, 1)
          this.mainTabs = arr
          if (tab === this.currentUrl) {
            this.mainActivedTab = index === this.mainTabs.length ? this.mainTabs[this.mainTabs.length - 1] : this.mainTabs[index]
            this.$router.push({ name: this.mainActivedTab.url })
          }
          let lowName = getOptionsName(tab)
          sessionStorage.getItem(lowName) && sessionStorage.removeItem(lowName)
          this.$store.commit('UPDATE_KEEP_ALIVE_LIST', { name: lowName, type: 'delete' })
          this.$store.commit('UPDATE_PAGE_SEARCH_VALUES', { name: lowName, type: 'delete' })
        }
      }
    },
    handleJudgeNowRoute (nowRoute) {
      if (nowRoute.meta.isTab) {
        let path = nowRoute.path.split('/').slice(0, -1).join('/')
        if (path && this.subTabObj[path]) {
          this.$nextTick(() => {
            if (document.querySelector('.app-main .substance')) {
              document.querySelector('.app-main .substance').style.minHeight = 'calc(100vh - 110px)'
            }
          })
        }
        const nowUrl = nowRoute.name
        const label = nowRoute.meta.title
        const code = nowRoute.code
        if (!this.mainTabs.some(item => item.url === nowUrl)) {
          const tab = { name: label, url: nowUrl, code: code }
          const arr = [].concat(this.mainTabs)
          arr.push(tab)
          this.mainTabs = arr
          this.mainActivedTab = tab
          sessionStorage.setItem('mainActivedTab', JSON.stringify(tab))
        } else if (this.mainTabs.some(item => item.url === nowUrl) && this.mainActivedTab.url !== nowUrl) {
          this.clickTab({ label, name: nowUrl })
        }
      }
    },
    changePassword () {
      this.showDialogForm = true
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
    btnCancel () {
      this.$refs.dialog.showDialogForm1 = false
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
  .username{
    margin-right: 5px;
    width: 14px;
    vertical-align: middle;
  }
</style>
