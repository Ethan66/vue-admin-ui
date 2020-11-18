<template>
  <div class="tags-view">
    <el-tabs v-model="curTab" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.url"
        :label="item.name"
        :name="item.url"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tags-view',
  data () {
    return {
      curTab: ''
    }
  },
  computed: {
    ...mapGetters([
      'mainTabs'
    ])
  },
  watch: {
    $route: {
      handler: 'addTab',
      immediate: true
    }
  },
  mounted () {
    this.curTab = this.$route.name
  },
  methods: {
    clickTab () {
      this.$router.push({ name: this.curTab })
    },
    addTab () {
      if (this.$route.meta.isTab) {
        this.curTab = this.$route.name
        this.$store.commit('ADD_TAB', this.$route)
      }
    },
    removeTab (tab) {
      if (this.mainTabs.length <= 1) return false
      this.$store.dispatch('delTab', tab).then(res => {
        if (this.$route.name === tab) {
          this.$router.push({ name: res.slice(-1)[0].url })
        }
      })
    }
  }
}
</script>

<style lang="less">
  .tags-view{
    width: 100%;
    height: 30px;
    padding: 2px 10px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
      padding-left: 10px;
    }
    .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2){
      padding-left: 10px;
    }
    .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child{
      padding-right: 8px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
      padding-right: 8px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover{
      padding-left: 10px;
      padding-right: 8px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable .el-icon-close{
      width: 14px;
    }
    .el-tabs__nav-next{
      line-height: 26px;
    }
    .el-tabs__header{
      margin-bottom: 0;
      border: none !important;
    }
    .el-tabs__nav{
      border: none !important;
    }
    .el-tabs__nav-wrap{
      margin-bottom: 0;
    }
    .el-tabs__item{
      height: 100%;
      line-height: 24px;
      border: 1px solid #E4E7ED !important;
      padding: 0 8px;
      margin-right: 5px;
      box-sizing: border-box;
      &.is-active{
        background: #409EFF;
        color: #fff;
        border-color: #409EFF !important;
        &::before{
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 2px;
          background-color: #fff;
        }
      }
    }
  }
</style>
