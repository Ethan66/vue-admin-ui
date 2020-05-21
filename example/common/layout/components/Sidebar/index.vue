<template>
  <div class="layout-index">
    <slot></slot>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="!sidebar.opened"
        text-color="#fff"
        active-text-color="#fff"
      >
        <sub-sidebar v-for="(menu, i) in menuList" :key="menu.menuCode" :index="i" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import subSidebar from './subSidebar'
import { debounce } from '@/config/utils'

export default {
  components: { subSidebar },
  data () {
    return {
      menuList: JSON.parse(sessionStorage.getItem('menuList'))
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  mounted () {
    let changeSidebar = () => {
      if (+this.$systemObj.minScreenWidth > window.innerWidth) {
        this.$store.commit('TOGGLE_SIDEBAR', false)
      } else {
        this.$store.commit('TOGGLE_SIDEBAR', true)
      }
    }
    changeSidebar()
    window.addEventListener('resize', debounce(changeSidebar))
  }
}
</script>
