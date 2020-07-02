<template>
  <div class="goods">
    <!-- 商品页面 -->
    <!-- 导航 -->
    <aside ref="catelist">
      <ul>
        <!-- 循环列表 -->
        <li @click="chgcate(v)" v-for="v in goods" :key="v.name" :class="{active:v.name===activeCate}">
          <span><img v-if="v.type>=0" :src="supports[v.type]" width="14">{{v.name}}</span>
        </li>
      </ul>
    </aside>
    <!-- 商品列表 -->
    <div class="goodslist" ref="goodslist">
      <div>
        <!-- 创建一个id和名字是一样的 -->
        <section v-for="cate in goods" :key="cate.name" :id="cate.name">
          <h3>{{cate.name}}</h3>
          <ul>
            <li v-for="(item) in cate.foods" :key="item.name">
              <img :src="item.image" alt="" height="60" width="60" @click="shwoitem(item)">
              <div class="man">
                <h4>{{item.name}}</h4>
                <p>月售{{item.sellCount}}份
                  <span>好评率{{item.rating}}%</span>
                </p>
                <strong>￥
                  <span>{{item.price}}</span>
                </strong>
                <!-- 如果有就显示 -->
                <del v-if="item.oldPrice">￥{{item.oldPrice}}</del>
              </div>
              <div class="mbutton">
                <!-- 如果有值大于1就为真 -->
                <Icon v-if="item.conut" type="md-remove-circle" @click.stop="reduce(item)" />
                <span v-if="item.conut">{{item.conut}}</span>
                <Icon type="md-add-circle" @click.stop="add(item)" />
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div class="bulletin" v-if="value1">
      <img :src="goodsItem.image" width="100%" @click="value1=false">
      <div class="man">
        <div>
          <h2>{{goodsItem.name}}</h2>
          <p>月售{{goodsItem.sellCount}}份
            <span>好评率{{goodsItem.rating}}%</span>
          </p>
          <strong>￥
            <span>{{goodsItem.price}}</span>
          </strong>
          <!-- 如果有就显示 -->
          <del v-if="goodsItem.oldPrice">￥{{goodsItem.oldPrice}}</del>
        </div>
        <Button type="info" @click.stop="adds(goodsItem)">加入购物车</Button>
      </div>
      <!-- 间隔 -->
      <div style="background:#f1f0f0;height:20px;"></div>
      <!-- 商品介绍 -->
      <section class="secard" v-if="goodsItem.info">
        <h2>商品介绍</h2>
        <p>{{goodsItem.info}}</p>
      </section>
      <!-- 间隔 -->
      <div style="background:#f1f0f0;height:20px;"></div>
      <!-- 按钮 -->
      <section class="but">
        <p class="p">
          <Button type="info" @click="btn('all')" :class="{active:'all'=== currentBtn}">全部
            <span>{{all}}</span>
          </Button>
          <Button type="info" @click="btn('good')" :class="{active:'good'=== currentBtn}">推荐
            <span>{{good}}</span>
          </Button>
          <Button type="info" @click="btn('bed')" :class="{active:'bed'=== currentBtn}">吐槽
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
          <div style="margin-bottom:5px;">
            <p>
              <span style="margin-left:10px;color:rgb(147,153,159)">{{ytime(v)}}</span>
            </p>
            <p><img :src="im[v.rateType]" alt="" width="20" style="vertical-align:-8px;margin-right:10px">{{v.text}}</p>
          </div>
          <div style="text-align:right;padding-top:15px;">
            <span style="color:black">{{v.username}} <img :src="v.avatar" alt="" width="28" style="border-radius:50%;vertical-align:-8px;"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
// 引入滚动
import BScroll from "better-scroll";
// 引入时间轴
import moment from "moment";

export default {
  async created() {
    // 获取到数据
    let d = await this.axios.get("/api/goods");
    // 给商品数据添加一个conut,用于统计购买数量 初始值为0
    // for of拿到的是对象
    for (let cate of d.data.data) {
      // 拿到每一条数据
      // console.log(cate);
      for (let food of cate.foods) {
        // 拿到每一条数据中的foods数据
        // console.log(food);
        // 给每一个添加cony属性 默认值为0
        food.conut = 0;
      }
    }
    // console.log(d);
    // 传入vuex中去
    this.$store.commit("setGoods", d.data.data);
    // this.goods = d.data.data;
  },
  data() {
    return {
      // goods: [],
      activeCate: "热销榜",
      goodslist: {}, //用于保存商品列表保存对象,
      num: 0,
      // 用于链接右边小图标
      supports: [
        require("@/assets/decrease_3@2x.png"),
        require("@/assets/discount_3@2x.png"),
        require("@/assets/special_3@2x.png"),
        require("@/assets/invoice_3@2x.png"),
        require("@/assets/guarantee_3@2x.png")
      ],
      // 蒙层打开
      value1: false,
      // 创建一个储存传进来的数据
      goodsItem: {},
      // 蒙层按钮
      ratings: [],
      // 设置一个所有的
      alllist: [],
      im: [require("@/assets/0.png"), require("@/assets/1.png")],
      gmg: require("@/assets/g.png"),
      nmg: require("@/assets/gou.png"),
      // 穿件一个显示评论
      shwoText: false,
      // 更改样式
      currentBtn: "all",
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
        ? this.ratings.filter(v => v.text != "" && v.rateType == 1).length
        : this.ratings.filter(v => v.rateType == 1).length;
    },
    bed() {
      return this.shwoText
        ? this.ratings.filter(v => v.text != "" && v.rateType == 0).length
        : this.ratings.filter(v => v.rateType == 0).length;
    },
    // 从vuex厂库中获取数据
    goods() {
      return this.$store.state.goods;
    }
  },
  mounted() {
    // 加载完成实现滚动
    this.catelist = new BScroll(this.$refs.catelist, { click: true });
    this.goodslist = new BScroll(this.$refs.goodslist, { click: true });
  },
  methods: {
    // 转换时间
    ytime(v) {
      return moment(new Date(parseInt(v.rateTime))).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    },
    chgcate(v) {
      // 让样式选择器等于点击的值
      this.activeCate = v.name;
      // 跳到制定的id
      this.goodslist.scrollToElement("#" + v.name, 500);
    },
    shwoitem(item) {
      // console.log(item);
      this.value1 = true;
      // 赋值给储存到的值
      this.goodsItem = item;
      //素组信服赋值给数组
      this.ratings = item.ratings;
      this.alllist = this.ratings;
    },
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
              v => v.text != "" && v.rateType == 1
            );
            break;
          case "bed":
            this.alllist = this.ratings.filter(
              v => v.text != "" && v.rateType == 0
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
            this.alllist = this.ratings.filter(v => v.rateType == 1);
            break;
          case "bed":
            this.alllist = this.ratings.filter(v => v.rateType == 0);
            break;
        }
      }
    },
    btn(f) {
      // 更改样式
      this.currentBtn = f;
      // 调用函数
      this.con(f);
    },
    // 是否只显示文字信息
    texshwo(y) {
      // 去反
      this.shwoText = !this.shwoText;
      // 调用函数
      this.con(y);
    },
    // 添加商品
    add(item) {
      this.$store.commit("add", item.name);
    },
    // 减少商品
    reduce(item) {
      this.$store.commit("reduce", item.name);
    },
    // 添加一个商品
    adds(goodsItem) {
      this.$store.commit("add", goodsItem.name);
    }
  }
};
</script>

<style lang="less">
.goods {
  height: 100%;
  display: flex;
  overflow-y: scroll;
  > aside {
    width: 80px;
    overflow-y: scroll;
    ul {
      background-color: #f3f5f7;
      li {
        height: 54px;
        padding: 6px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
        display: flex;
        flex-direction: column; /*元素的排列方向为垂直*/
        justify-content: center; /*水平居中对齐*/
        align-items: center;
        img {
          vertical-align: -3px;
        }
      }
      li.active {
        background: rgb(255, 255, 255);
      }
    }
  }
  > .goodslist {
    width: 1px;
    flex-grow: 1;
    overflow-y: scroll;
    > h3 {
      background: #f3f5f7;
      color: rgb(147, 153, 159);
      line-height: 30px;
      font-size: 14px;
      padding-left: 12px;
      border-left: 4px solid #d9dde1;
    }
    ul li {
      display: flex;
      padding: 13px;
      img {
        margin-right: 15px;
      }
      .man {
        // display: flex;
        font-size: 12px;
        width: 1px;
        flex-grow: 3;
        h4 {
          color: rgb(7, 17, 27);
          font-size: 14px;
        }
        p span {
          margin-left: 10px;
        }
        > strong {
          color: red;
          font-size: 10px;
        }
        strong > span {
          font-size: 16px;
          font-weight: 600;
        }
        del {
          font-size: 14px;
          font-weight: 600;
          margin-left: 14px;
        }
      }
      .mbutton {
        font-size: 20px;
        color: #2db7f5;
        align-self: flex-end;
        margin-bottom: 5px;
        text-align: right;
        > span {
          display: inline-block;
          text-align: center;
          width: 24px;
          font-size: 14px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  // 公告和优惠的样式
  .bulletin {
    position: fixed;
    // display:;
    z-index: 3;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: white;
    overflow-y: scroll;
    // 标题
    .man {
      display: flex;
      padding: 18px 18px 10px 18px;
      // font-size: 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      p {
        margin-bottom: 14px;
      }
      p span {
        margin-left: 10px;
      }
      strong {
        color: red;
        font-size: 15px;
      }
      strong > span {
        font-size: 24px;
        font-weight: 600;
      }
      del {
        font-size: 14px;
        font-weight: 600;
        margin-left: 14px;
      }
      > button {
        height: 24px;
        width: 74px;
        border-radius: 12px;
        align-self: flex-end;
        text-align: right;
        margin-left: auto;
        text-align: center;
        margin-bottom: 8px;
      }
      .ivu-btn {
        padding: 0;
      }
    }
    // 公告与活动
    > .secard {
      padding: 18px 18px 0;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      p {
        padding: 12px;
        line-height: 24px;
        font-weight: 200;
        font-size: 12px;
      }
    }
    // 按钮组合
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
        padding: 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        > div {
          // line-height: 16px;
          flex-grow: 1;
          > p {
            margin: 10px 0;
            font-size: 14px;
          }
        }
        > p {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>

