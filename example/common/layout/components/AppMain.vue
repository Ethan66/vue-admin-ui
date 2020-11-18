<template>
  <section class="app-main">
    <keep-alive :include="keepAliveList">
      <router-view class="transition-group"></router-view>
    </keep-alive>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  watch: {
    $route: {
      handler: function (val) {
        val && val.meta.menuCode && this.$store.commit('UPDATE_KEEP_ALIVE_LIST', { name: val.meta.menuCode })
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['keepAliveList'])
  }
}
</script>

<style lang="less">
.app-main {
  min-height: calc(100vh - 85px);
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
