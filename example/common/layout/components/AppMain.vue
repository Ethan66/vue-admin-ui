<template>
  <section class="app-main">
    <subTabs
      v-if="showSubTabs"
      :subTabs="subTabsData"
    />
    <keep-alive :include="keepAliveList">
      <router-view class="transition-group"></router-view>
    </keep-alive>
  </section>
</template>

<script>
import subTabs from './subTabs'
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  components: { subTabs },
  data () {
    return {
      showSubTabs: false,
      transitionKey: 0,
      subTabsData: []
    }
  },
  watch: {
    $route (val) {
      this.transitionKey++
      this.handleIsShowSubTabs(val)
    }
  },
  computed: {
    ...mapGetters(['keepAliveList', 'subTabObj'])
  },
  created () {
    this.handleIsShowSubTabs(this.$route, true)
  },
  methods: {
    handleIsShowSubTabs (val, isRefresh = false) {
      let path = val.path.split('/').slice(0, -1).join('/')
      let { title, level } = val.meta
      let index = -1
      if (this.subTabObj[path]) {
        this.showSubTabs = true
        this.subTabsData = this.subTabObj[path]
      } else {
        this.showSubTabs = false
      }
    }
  }
}
</script>

<style lang="less">
.app-main {
  min-height: calc(100vh - 55px);
  padding: 0 15px 0;
  position: relative;
  overflow: hidden;
  .transition-group{
    margin-top: 15px;
  }
  .substance{
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 70px);
    padding-bottom: 15px;
  }
}
</style>
