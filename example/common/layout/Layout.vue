<template>
  <div class="app-wrapper">
    <sidebar :class="['sidebar-container el-scrollbar', { collapse: !sidebar.opened }]">
      <h1><img :src="logo" /><span v-if="sidebar.opened">{{ $systemObj.fullName }}</span></h1>
    </sidebar>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar, Sidebar, AppMain
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data () {
    return {
      logo: require(`@/${this.$systemObj.logo}.png`)
    }
  },
  // 跳转到默认的home页
  /* computed: {
    mainTabs: {
      get () { return this.$store.state.app.mainTabs },
      set (val) { this.$store.commit('UPDATETABS', val) }
    },
    mainActivedTab: {
      get () { return this.$store.state.app.mainActivedTab },
      set (val) { this.$store.commit('UPDATEMINACTIVEDTAB', val) }
    }
  },
  methods: {
    handleGoHome () {
      this.$router.push({ name: 'home' })
      this.mainTabs = [{ name: '首页', url: '/' }]
      this.mainActivedTab = this.mainTabs[0]
      sessionStorage.setItem('mainActivedTab', JSON.stringify(this.mainActivedTab))
    }
  } */
}
</script>

<style lang="less">
 .main-container{
  overflow: hidden;
  background: #f2f4f5;
}
</style>
