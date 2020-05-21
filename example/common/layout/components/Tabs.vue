<template>
  <div class="tabs">
    <el-tabs
      v-model="currentUrl"
      closable
      @tab-click="handleChooseTab"
      @tab-remove="removeTabHandle"
    >
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.url"
        :label="item.name"
        :name="item.url" />
    </el-tabs>
  </div>
</template>

<script>
export default {
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
    }
  },
  created () {
    if (!this.mainActivedTab.name) {
      this.mainActivedTab = JSON.parse(sessionStorage.getItem('mainActivedTab')) || {}
      this.mainTabs = this.mainActivedTab.name ? [].concat(this.mainActivedTab) : []
    }
  },
  methods: {
    // 选择tab并跳转页面
    handleChooseTab (tab) {
      if (this.mainTabs.length > 0 && this.currentUrl !== tab.name) {
        this.mainActivedTab = { name: tab.label, url: tab.name }
        sessionStorage.setItem('mainActivedTab', JSON.stringify(this.mainActivedTab))
        this.$router.push({ name: tab.name })
      }
    },
    removeTabHandle (tab) {
      if (this.mainTabs.length > 1) {
        const index = this.mainTabs.findIndex(item => item.url === tab)
        if (index !== -1) {
          const arr = [].concat(this.mainTabs)
          arr.splice(index, 1)
          this.mainTabs = arr
          if (tab === this.currentUrl) {
            if (index > this.mainTabs.length - 1) {
              this.mainActivedTab = this.mainTabs[this.mainTabs.length - 1]
            } else {
              this.mainActivedTab = this.mainTabs[index]
            }
            this.$router.push({ name: this.mainActivedTab.url })
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
  .tabs{
    .el-tabs__header{
      margin-bottom: 0;
    }
    .el-tabs__active-bar{
      background-color: transparent;
    }
    .el-tabs__item{
      height: 26px; line-height: 26px; border: 1px solid #ddd; margin: 4px; padding: 0 10px !important;
      &.is-active{
        background: #42b983; color: #fff; border-color: #42b983;
        &:hover{
          color: #fff;
        }
        &:before{
          display: inline-block; content: '';
          width: 8px; height: 8px; background: #fff; border-radius: 50%; margin-right: 5px;
        }
      }
      .el-icon-close{
        transition-duration: 0ms;
      }
      .el-icon-close:before{
        transform: scale(.7);
      }
      &:hover{
        color: inherit;
      }
    }
    .el-tabs__nav-wrap::after{
      height: 1px;
    }
  }
</style>
