<template>
  <div class="ratings">
    <!-- 我是评价 -->
    <section class="rat">
      <div class="first">
        <div>
          <h2>{{seller.foodScore}}</h2>
          <p>综合评分</p>
          <p>
            <span>高于周边商家{{seller.rankRate}}%</span>
          </p>
        </div>

      </div>
      <div class="last">
        <p>
          <span>服务态度</span>
          <Rate allow-half v-model="seller.score" />
          <u>{{seller.score}}</u>
        </p>
        <p>
          <span>商品质量</span>
          <Rate allow-half v-model="seller.serviceScore" />
          <u>{{seller.serviceScore}}</u>
        </p>
        <p>
          <span>送达时间</span>
          <strong>{{seller.deliveryTime}}分钟</strong>
        </p>
      </div>
    </section>
    <div style="background:#f1f0f0;height:20px;"></div>
    <!-- 按钮部分 -->
    <section class="but">
      <p class="p">
        <Button type="info" @click="btn('all')" :class="{active:'all'=== currentBtn}">全部
          <span>{{all}}</span>
        </Button>
        <Button type="info" @click="btn('good')" :class="{active:'good'=== currentBtn}">满意
          <span>{{good}}</span>
        </Button>
        <Button type="info" @click="btn('bed')" :class="{active:'bed'=== currentBtn}">不满意
          <span>{{bed}}</span>
        </Button>
      </p>
      <!-- 只看内容 -->
      <p style="color:#ccc">
        <img @click="texshwo(currentBtn)" :src="this.shwoText?this.gmg:this.nmg" alt="" width="18" style="vertical-align:-5px;margin-right:10px;">
        <span>只看有内容的评价</span>
      </p>
    </section>
    <!-- 内容部分 -->
    <section class="content">
      <div v-for="(v,i) in alllist" :key="i">
        <img :src="v.avatar" alt="" width="28" style="border-radius:50%">
        <div>
          <span style="color:black">{{v.username}}</span>
          <p style="margin-bottom:5px;">
            <Rate allow-half v-model="v.score" />
            <span v-if="v.deliveryTime" style="margin-left:10px;color:rgb(147,153,159)">{{v.deliveryTime}}分钟后送达</span>
          </p>
          <p style="color:black;font-weight:600;margin-bottom:5px;">{{v.text}}</p>
          <p><img :src="im[v.rateType]" alt="" width="20" style="vertical-align:3px;">
            <span v-for="item in v.recommend" :key="item" class="sp">{{item}}</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async created() {
    // 获取到数据
    let d = await this.axios.get("/api/ratings");
    console.log(d);
    this.ratings = d.data.data;
    // 默认赋值给所有显示
    this.alllist = this.ratings;
  },
  props: ["seller"],
  data() {
    return {
      ratings: [],
      // 设置一个所有的
      alllist: [],
      im: [require("@/assets/1.png"), require("@/assets/0.png")],
      gmg: require("@/assets/g.png"),
      nmg: require("@/assets/gou.png"),
      // 穿件一个显示评论
      shwoText: false,
      // 更改样式
      currentBtn:'all',
    };
  },
  // 计算属性
  computed: {
    all() {
      // 三目运算 判断是否显示只看了内容然后筛选
      return this.shwoText
        ? // 显示就查看所有文本不是的长度
          this.ratings.filter(v => v.text != "").length
        : // 不显示就查看所有的长度
          this.ratings.length;
    },
    good() {
      // filter通过他赛选过滤
      return this.shwoText
        ? this.ratings.filter(v => v.text != "" && v.score >= 4).length
        : this.ratings.filter(v => v.score >= 4).length;
    },
    bed() {
      return this.shwoText
        ? this.ratings.filter(v => v.text != "" && v.score < 4).length
        : this.ratings.filter(v => v.score < 4).length;
    }
  },
  methods: {
    // 创建自定义函数
    con(f) {
      // 判断是否点击了只显示文字
      if (this.shwoText) {
        // 只显示文字
        // 传入要点击的值
        switch (f) {
          // 当点击全部就加载所有的显示文字的值
          case "all":
            this.alllist = this.ratings.filter(v => v.text != "");
            break;
          case "good":
            this.alllist = this.ratings.filter(
              v => v.text != "" && v.score >= 4
            );
            break;
          case "bed":
            this.alllist = this.ratings.filter(
              v => v.text != "" && v.score < 4
            );
            break;
        }
      } else {
        // 显示全部
        switch (f) {
          case "all":
            this.alllist = this.ratings;
            break;
          case "good":
            this.alllist = this.ratings.filter(v => v.score >= 4);
            break;
          case "bed":
            this.alllist = this.ratings.filter(v => v.score < 4);
            break;
        }
      }
    },
    btn(f) {
      // 更改样式
      this.currentBtn=f;
      // 调用函数
      this.con(f);
    },
    // 是否只显示文字信息
    texshwo(y) {
      // 去反
      this.shwoText = !this.shwoText;
      // 当这个为正确是就显示没有内容的
      // switch (this.shwoText) {
      //   case true:
      //     this.alllist = this.ratings.filter(v => v.text != "");
      //     break;
      //   case false:
      //     this.alllist = this.ratings;
      //     break;
      // }
      // 调用函数
      this.con(y);
    }
  }
};
</script>
<style lang="less">
.ratings {
  height: 100%;
  overflow-y: scroll;
  > .rat {
    display: flex;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    > .first {
      flex-grow: 4;
      text-align: center;
      padding: 18px 0;
      > div {
        padding: 0 18px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
      }
      h2 {
        color: rgb(255, 153, 0);
        font-size: 28px;
        line-height: 28px;
      }
      p {
        color: black;
        font-weight: 600;
        line-height: 24px;
        > span {
          color: rgb(126, 127, 128);
          font-size: 10px;
        }
      }
    }
    > .last {
      flex-grow: 6;
      padding: 16px 24px 16px 18px;
      line-height: 28px;
      font-size: 12px;
      p {
        font-weight: 600;
        .ivu-rate {
          font-size: 18px;
        }
        .ivu-rate-star {
          margin-right: 2px;
        }
        span {
          margin-right: 12px;
        }
        strong {
          color: rgb(202, 202, 202);
          font-weight: 600;
        }
        u {
          color: rgb(255, 153, 0);
          text-decoration: none;
          margin-left: 12px;
        }
      }
    }
  }
  > .but {
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding: 18px;
    > .p {
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      margin-bottom: 15px;
      button {
        color: rgb(47, 47, 47);
        margin-right: 10px;
      }
      .ivu-btn {
        border-radius: 0;
      }
      .ivu-btn-info {
        border: none;
        background-color: rgb(167, 208, 245);
      }
      .active {
        color: #fff;
        background-color: #2db7f5;
        border: none;
      }
    }
  }
  .content {
    padding: 0 18px;
    > div {
      display: flex;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding: 13px;
      > img {
        width: 28px;
        height: 28px;
        margin-right: 18px;
      }
      > div {
        flex-grow: 1;
        .ivu-rate {
          font-size: 16px;
        }
        .ivu-rate-star {
          margin-right: 2px;
        }
        .sp {
          display: inline-block;
          height: 20px;
          width: 50px;
          padding: 2px;
          // 字体缩小
          transform: scale(0.9);
          line-height: 15px;
          // 显示点点代替
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 2px;
          border: 1px solid rgba(7, 17, 27, 0.1);
          overflow: hidden;
          color: rgb(160, 160, 160);
        }
      }
    }
  }
}
</style>

