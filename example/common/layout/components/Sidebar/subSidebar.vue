<template>
  <div class="sidebarContent">
    <!--只有一级菜单-->
    <template v-if="!item.list || item.list.length === 0">
      <router-link :to="item.menuUrl">
        <el-menu-item :index="item.menuUrl" :class="{'nosubmenu-arrow':!isNest}" @click="handleChooseMenu(item)">
          <template slot="title">
            <img v-if="item.menuIcon" :src="require(`@/assets/img${item.menuIcon}.png`)" class="iconfont" /><span slot="title">{{ item.menuName }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </template>

    <!--二级菜单-->
    <el-submenu v-else :index="item.code">
      <template slot="title">
        <img v-if="item.menuIcon" :src="require(`@/assets/img${item.menuIcon}.png`)" class="iconfont" /><span slot="title">{{ item.menuName }}</span>
      </template>

      <template v-for="child in item.list">
        <my-sidebar
          v-if="child.list&&child.list.length>0"
          :is-nest="true"
          :item="child"
          :key="child.menuUrl"
          :base-path="child.menuUrl"
          class="nest-menu" />
        <router-link v-else :to="child.menuUrl" :key="child.name">
          <el-menu-item :index="child.menuUrl" @click="handleChooseMenu(child)">
            <template slot="title">
              <i v-if="child.menuIcon" class="iconfont" :class="child.menuIcon" /><span slot="title">{{ child.menuName }}</span>
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
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      onlyChild: null
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
