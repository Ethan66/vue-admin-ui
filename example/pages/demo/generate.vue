<template>
  <div class="code-generator">
    <draggable
      class="component"
      :list="config"
      :group="{ name: 'view', pull: 'clone', put: false }"
      :clone="cloneComponent"
      draggable=".component-item"
      :sort="false"
      @end="onEnd"
    >
      <h3>search组件</h3>
      <div class="component-item" v-for="item in config" :key="item.title">{{item.title}}</div>
    </draggable>
    <draggable
      class="view"
      :list="viewList"
       group="view"
    >
      <div class="view-item" v-for="item in viewList" :key="item.title">{{item.title}}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import config from '@/config/generator'
export default {
  components: { draggable },
  data () {
    return {
      config,
      viewList: [
        { title: 'sdf' }
      ]
    }
  },
  methods: {
    cloneComponent () {
      return ({
        title: '上花覅'
      })
    },
    onEnd () {
      console.log(2)
    }
  }
}
</script>

<style lang="less">
  .code-generator{
    display: flex;
    height: 100%;
    .component{
      border-right: 1px solid #ddd;
    }
    .view{
      flex-grow: 1;
    }
  }
</style>
