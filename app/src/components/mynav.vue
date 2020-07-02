<template>
  <div class="mynav">
      <!-- 我是导航 -->
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/seller">商家</router-link>
  </div>
</template>

<script>
export default {

}

</script>
<style lang="less">
.mynav{
    height: 40px;
    // 开启弹性布局
    display: flex;
    background: rgb(255, 255, 255);
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    >*{
        // 让他偶有的自动填充
        width: 1px;
        flex-grow: 1;
        line-height: 40px;
        text-align: center;
        color: black;
        font-size: 18px;
    }
    a.router-link-active{
            color: red;
        }
}
</style>