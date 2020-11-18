<template>
  <div class="app-wrapper">
    <sidebar :class="['sidebar-container el-scrollbar', { collapse: !sidebar.opened }]">
      <h1><img :src="logo" /><span v-if="sidebar.opened">{{ $systemObj.fullName }}</span></h1>
    </sidebar>
    <div class="main-container">
      <navbar/>
      <tags-view />
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar, Sidebar, AppMain, TagsView
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
  }
}
</script>

<style lang="less">
 .main-container{
  overflow: hidden;
  background: #f2f4f5;
}
</style>
