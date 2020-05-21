<template>
  <div class="page-404">
    <div class="wrap">
      <p><img src="@/assets/img/404.png" /></p>
      <p class="text">抱歉！您访问的页面失联啦...</p>
      <p class="button">
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" @click="$router.push('admin/index')">进入首页</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.page-404{
  .wrap{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    text-align: center;
    img{
      width: 400px;
      margin-bottom: 25px;
    }
    .text{
      margin-bottom: 30px;
      font-size: 20px;
      color: #444;
    }
    .button{
      button{
        width: 104px;
        height: 40px;
        padding: 0;
        line-height: 40px;
      }
    }
  }
}
</style>
