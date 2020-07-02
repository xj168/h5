<template>
  <div id="app">
    <!-- 我是头部 -->
    <!-- 传给儿子 -->
    <myheader :seller="seller"></myheader>
    <!-- 我是导航栏 -->
    <mynav></mynav>
    <!-- 我是身体 -->
    <main>
      <router-view :seller="seller"/>
    </main>
    <myfooter :seller="seller"></myfooter>
  </div>
</template>
<script>
import myheader from "@/components/myheader";
import mynav from "@/components/mynav";
import myfooter from "@/components/myfooter";

export default {
  components: {
    myheader,
    mynav,
    myfooter
  },
  async created() {
    // 获取到数据
    let d = await this.axios.get("/api/seller");
    // console.log(d);
    this.seller=d.data.data;
  },
  data() {
    return {
      seller: {}
    };
  }
};
</script>


<style lang="less">
html,
body,
#app {
  height: 100%;
}
ul li{
  list-style: none;
}
#app {
  display: flex;
  // 行排列
  flex-direction: column;
  > main {
    height: 1px;
    flex-grow: 1;
  }
}
</style>
