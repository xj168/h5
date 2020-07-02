<template>
  <div class="myheader">
    <!-- 我是有头部 -->
    <!-- 动态回去背景 -->
    <div class="bg" :style="{background: 'url( '+ seller.avatar +')'}"></div>
    <header>
      <!-- 背景颜色模糊 -->
      <img :src="seller.avatar" width="64" height="64">
      <div class="man">
        <h4><img src="@/assets/brand@3x.png" height="20">{{seller.name}}</h4>
        <p>{{seller.description}} / {{seller.deliveryTime}}分钟到达</p>
        <!-- 判断有没有数据 有就渲染 -->
        <p v-if="seller.supports">
          <img src="@/assets/decrease_1@3x.png" alt="" width="15">{{seller.supports[0].description}}
        </p>
      </div>
      <span v-if="seller.supports" @click="value1 = true">
        {{seller.supports.length}}个 >
      </span>
    </header>
    <div class="fot" @click="value1 = true">
      <img src="@/assets/bulletin@3x.png" alt="" height="16">{{seller.bulletin}}
    </div>
    <!-- 优惠和公告的层城 -->
    <div class="bulletin" v-if="value1">
      <h3>{{seller.name}}</h3>
      <Rate allow-half v-model="seller.foodScore" />
      <div>
        <span></span>
        <strong>优惠信息</strong>
        <span></span>
      </div>
      <ul>
        <li v-for="v in seller.supports" :key="v.description"><img :src="icun[v.type]" alt="" width="16"> {{v.description}}</li>
      </ul>
      <div>
        <span></span>
        <strong>优惠信息</strong>
        <span></span>
      </div>
      <p>{{seller.bulletin}}</p>
      <h2>
        <img src="../assets/x.png"  @click="value1=false" width="40"/>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  // 获取父级传过来的值
  props: ["seller"],
  data() {
    return {
      value1: false,
      // 动态获取地址
      icun: [
        require("@/assets/decrease_1@2x.png"),
        require("@/assets/discount_1@2x.png"),
        require("@/assets/guarantee_1@2x.png")
      ]
    };
  }
};
</script>

<style lang="less">
.myheader {
  height: 134px;
  color: rgb(255, 255, 255);
  position: relative;
  header {
    width: 100%;
    display: flex;
    padding: 22px 18px 18px;
    background-color: rgba(7, 17, 27, 0.5);
    > img {
      margin-right: 18px;
      border-radius: 5px;
    }
    .man {
      h4 img {
        margin-right: 8px;
        vertical-align: -5px;
        border-radius: 3px;
      }
      p img {
        margin-right: 5px;
        vertical-align: -3px;
        border-radius: 3px;
      }
    }
    span {
      padding: 7px 8px;
      border-radius: 15px;
      display: inline-block;
      background-color: rgba(7, 17, 27, 0.55);
      align-self: flex-end;
      text-align: right;
      margin-left: auto;
    }
  }
  > .fot {
    height: 30px;
    background-color: rgba(7, 17, 27, 0.6);
    width: 100%;
    padding: 0 10px;
    overflow: hidden;
    line-height: 28px;
    font-size: 10px;
    img {
      // padding-left: 10px;
      margin-right: 8px;
      vertical-align: -3px;
    }
    .Drawer {
      background: red;
    }
  }
  // 公告和优惠的样式
  > .bulletin {
    position: fixed;
    z-index: 8;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 6, 24, 0.8);
    padding: 64px 36px 0 36px;
    >h3{
      text-align: center;
    }
    >h2{
      position: absolute;
      left: 50%;
      margin-left: -20px;
      bottom: 32px;
      color: rgba(255, 255, 255,.5);
      font-size: 32px;
    }
    >.ivu-rate{
      display: block;
      margin: 16px auto;
      text-align: center;
    }
    ul li{
      line-height: 24px;
      font-weight: 200;
      padding-left:12px;
      >img{
        vertical-align: middle;
        margin-right: 6px;
      } 
    }
    >p{
      font-weight: 200;
      line-height: 24px;
    }
    >div{
      display: flex;
      margin: 24px auto;
      >strong{
        margin: 0 14px;
        font-size: 14px;
      }
      >span{
        display: inline-block;
        flex-grow: 1;
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        // 转换成相对定位
        position: relative;
        top: -10px;
      }
    }
  }
  > .bg {
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    filter: blur(7px);
    //background: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg");
  }
}
</style>
