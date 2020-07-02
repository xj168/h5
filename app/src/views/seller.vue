<template>
  <div class="seller">
    <!-- 我是商家 -->
    <!-- 基础部分 -->
    <div class="hea">
      <div>
        <h2>{{seller.name}}</h2>
        <Rate allow-half v-model="seller.foodScore" /> ({{seller.ratingCount}})
        <span>月销售{{seller.sellCount}}单</span>
      </div>
      <span>
        <img :src="this.hert?this.redHert:this.kHert" width="25" @click="imgHert()">
        <p>收藏</p>
      </span>
    </div>
    <ul>
      <li>
        <p>
          <span>起送价</span>
        </p>
        <strong>{{seller.minPrice}}</strong>元
      </li>
      <li>
        <p>
          <span>商家配送</span>
        </p>
        <strong>{{seller.deliveryPrice}}</strong>元
      </li>
      <li>
        <p>
          <span>平均配送时间</span>
        </p>
        <strong>{{seller.deliveryTime}}</strong>分钟
      </li>
    </ul>
    <div style="background:#f1f0f0;height:20px;"></div>
    <!-- 公告与活动 -->
    <section class="secard">
      <h2>公告与活动</h2>
      <p>{{seller.bulletin}}</p>
      <div class="infos">
        <p v-for="(v) in seller.supports" :key="v.description">
          <img :src="supports[v.type]" alt="" width="16">
          <span>{{v.description}}</span>
        </p>
      </div>
    </section>
    <!-- 间隔 -->
    <div style="background:#f1f0f0;height:20px;"></div>
    <!-- 商家实景 -->
    <section class="infoImg">
      <h2>商家实景</h2>
      <div ref="imglist">
        <div ref="cont">
          <img @click="bigimgs(v)" v-for="v in seller.pics" :key="v" :src="v" width="120" height="90">
        </div>
        <!-- 蒙城 -->
        <div class="Mongolia" v-if="Mongolia" @click="Mongolia=false">
          <div>
            <img :src="im" alt="">
          </div>

        </div>
      </div>
    </section>
    <div style="background:#f1f0f0;height:20px;"></div>
    <!-- 底部 -->
    <section class="secard">
      <h2>商家信息</h2>
      <p></p>
      <div class="infos">
        <p v-for="(v) in seller.infos" :key="v">
          <span style="color:rgb(7, 17, 27);font-weight: 500;">{{v}}</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
// 引入滚动
export default {
  props: ["seller"],
  data() {
    return {
      // 创建一个获取图片链接
      im: "",
      // 点击图片放大
      Mongolia: false,
      // 做一个收藏图片标杆
      hert: false,
      // 引入图片链接
      redHert: require("@/assets/hert.png"),
      kHert: require("@/assets/hert1.png"),
      supports: [
        require("@/assets/decrease_3@2x.png"),
        require("@/assets/discount_3@2x.png"),
        require("@/assets/special_3@2x.png"),
        require("@/assets/invoice_3@2x.png"),
        require("@/assets/guarantee_3@2x.png")
      ]
    };
  },
  methods: {
    imgHert() {
      // 取反
      this.hert = !this.hert;
    },
    // 获取传入进来的图片链接
    bigimgs(v) {
      this.im = v;
      this.Mongolia = true;
    }
  }
};
</script>
<style lang="less">
.seller {
  height: 100%;
  overflow-y: scroll;
  > .hea {
    display: flex;
    padding: 18px;
    > div {
      > span {
        margin-left: 12px;
      }
    }
    > span {
      text-align: center;
      display: inline-block;
      margin-left: auto;
    }
  }
  > ul {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    li {
      display: block;
      width: 100%;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
    }
    li:last-child {
      border: none;
    }
    strong {
      font-size: 26px;
      font-weight: 200;
    }
  }
  > .secard {
    padding: 18px 18px 0;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    p {
      padding: 12px;
      color: red;
      line-height: 24px;
      font-weight: 200;
      font-size: 12px;
    }
    > .infos {
      > p {
        padding: 16px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(7, 17, 27);
        > img {
          vertical-align: -4px;
          margin-right: 6px;
        }
      }
    }
  }
  > .infoImg {
    padding: 18px 0 18px 18px;
    overflow-x: scroll;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    > div {
      .Mongolia {
        margin: 0;
        position: fixed;
        z-index: 6;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(1, 4, 7, 0.89);
        >div{
          margin: auto 0;
          img {
          width: 100%;
          height: auto;
        }
        }
        
      }
      > div {
        margin-top: 12px;
        overflow-x: scroll;
        display: flex;
        > img {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>