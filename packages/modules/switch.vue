<template>
  <div class="my-switch">
    <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)" />
    <div class="box">
      <p>
        <span>启用</span>
        <span>关闭</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-switch',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.initChecked()
  },
  methods: {
    initChecked () {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="less">
  .my-switch{
    position: relative;
    input{
      position: absolute; z-index: 3; width: 124px; height: 40px; opacity: 0; cursor: pointer;
      &:checked+.box{
        &:after{
          transform: translateX(0);
        }
        p{
          span:first-child{
            color: #fff;
          }
          span:nth-child(2){
            color: #888;
          }
        }
      }
    }
    .box{
      width: 124px; background: #ddd; overflow: hidden; border-radius: 5px;
      height: 40px; position: relative; cursor: pointer;
      &:after{
        display: block; content: ''; background: #409EFF; width: 62px; height: 100%;
        transition: 400ms; transform: translateX(100%);
      }
      p{
        color: #fff; height: 100%; font-size: 0;
        position: absolute; z-index: 2;
        span{
          padding: 0 16px; font-size: 14px; letter-spacing: 1px;
          &:first-child{
            color: #888;
          }
        }
      }
    }
  }
</style>
