<template>
  <div class="sidebarContent">
    <!--只有一级菜单-->
    <template v-if="!item.list || item.list.length === 0">
      <router-link :to="item[menu.url]">
        <el-menu-item :index="item[menu.url]" :class="{'nosubmenu-arrow':!isNest}" @click="handleChooseMenu(item)">
          <template slot="title">
            <img v-if="item[menu.icon]" :src="require(`@/assets/img${item[menu.icon]}.png`)" class="iconfont" /><span slot="title">{{ item[menu.name] }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </template>

    <!--二级菜单-->
    <el-submenu v-else :index="item[menu.unique]">
      <template slot="title">
        <img v-if="item[menu.icon]" :src="require(`@/assets/img${item[menu.icon]}.png`)" class="iconfont" /><span slot="title">{{ item[menu.name] }}</span>
      </template>

      <template v-for="child in item.list">
        <subSidebar
          v-if="child.list&&child.list.length>0"
          :is-nest="true"
          :item="child"
          :key="child[menu.url]"
          :base-path="child[menu.url]"
          class="nest-menu" />
        <router-link v-else :to="child[menu.url]" :key="child[menu.name]">
          <el-menu-item :index="child[menu.url]" @click="handleChooseMenu(child)">
            <template slot="title">
              <i v-if="child[menu.icon]" class="iconfont" :class="child[menu.icon]" /><span slot="title">{{ child[menu.name] }}</span>
            </template>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'subSidebar',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyChild: null,
      menu: this.$systemObj.menuConfig
    }
  },
  methods: {
    // 点击菜单清空缓存
    handleChooseMenu (child) {
    }
  }
}
</script>

<style lang="less">
  .sidebarContent{
    .iconfont {
      width: 15px;
      margin-right: 5px;
      margin-top: -2px;
    }
  }
</style>
