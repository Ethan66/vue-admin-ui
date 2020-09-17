<template>
  <el-tabs v-model="activeTab" class="subTabs" @tab-click="handleGoRoute">
    <el-tab-pane
      v-for="(item, index) in subTabs"
      :key="index"
      :label="item.title"
      :name="item.path"
      />
  </el-tabs>
</template>

<script>
export default {
  props: {
    subTabs: Array
  },
  data () {
    return {
      activeTab: ''
    }
  },
  created () {
    this.activeTab = location.pathname.replace('/blow', '')
  },
  methods: {
    handleGoRoute (tab) {
      this.$router.push(tab.name)
    }
  }
}
</script>

<style lang="less">
  .subTabs{
    height: 40px;
    .el-tabs__header{
      margin-bottom: 0;
    }
    .el-tabs__item{
      &.is-disabled{
        color: #999;
      }
      &.is-active{
        color: #4162DB;
      }
    }
    .el-tabs__active-bar{
      background-color: #4162DB;
    }
    .el-tabs__nav-wrap::after{
      height: 1px;
      background-color: #d8d8d8;
    }
  }
</style>
