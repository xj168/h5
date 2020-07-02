<template>
    <div class="myfooter">
        <!-- 我是底部 -->
        <div class="gwc">
            <div @click="carlist">
                <div class="fcar">
                    <!-- 多少件 -->
                    <span class="numb" v-if="numb">{{numb}}</span>
                    <span :class="{active:this.carshwo}">
                        <Icon type="md-cart" />
                    </span>
                </div>
            </div>
            <div>
                <span :class="{active:this.carshwo}">￥{{total}}</span>
                <span class="lin"></span>
                <span>另需配送费{{seller.deliveryPrice}}元</span>
            </div>
            <!-- 第二种方式:三元表达式 注意点：放在数组中，类名要用引号-->
            <div :class="[ this.carshwo ? 'bg' : 'bb' ]">
                <span v-if="total===0">￥{{seller.minPrice}}起送</span>
                <span v-else-if="total<20">还差{{20-total}}元起送</span>
                <span v-else>去结算</span>
            </div>
        </div>
        <transition name="fade">
            <div v-if="this.carshwo" class="carshwo">
                <div>
                    <div>
                        <span>购物车</span>
                        <span @click="clear">清空</span>
                    </div>
                    <ul>
                        <li v-for="(v,i) in carList" :key="i">
                            <h3>{{v.name}}</h3>
                            <span>￥
                                <strong>{{v.price*v.conut}}</strong>
                            </span>
                            <div class="mbutton">
                                <Icon type="md-remove-circle" @click="reduce(v)" />
                                <span>{{v.conut}}</span>
                                <Icon type="md-add-circle" @click="add(v)" />
                            </div>
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  props: ["seller"],
  data() {
    return {
      // 创建打开购物车的函数
      carshwo: false
    };
  },
  methods: {
    carlist() {
      this.carshwo = !this.carshwo;
    },
    // 添加商品
    add(v) {
      this.$store.commit("add", v.name);
    },
    // 减少商品
    reduce(v) {
      this.$store.commit("reduce", v.name);
    },
    // 清空数据
    clear() {
      this.$store.commit("clear");
      //隐藏弹窗
      this.carshwo = false;
    }
  },
  //   计算属性
  computed: {
    carList() {
      return this.$store.getters.cartList;
    },
    //   计算总价
    total() {
      var num = 0;
      this.carList.forEach(v => {
        num += v.price * v.conut;
      });
      return num;
    },
    // 多少件商品
    numb() {
      var num = 0;
      this.carList.forEach(v => {
        num += v.conut;
      });
      return num;
    }
  }
};
</script> 
<style lang="less">
.myfooter {
  height: 50px;
  background: #141d27;
  > .gwc {
    height: 50px;
    width: 100%;
    background: #141d27;
    display: flex;
    line-height: 50px;
    font-size: 18px;
    position: absolute;
    z-index: 4;
    > div:nth-child(1) {
      width: 80px;
      //   flex-grow: 2;
      text-align: right;
      padding-right: 12px;
      color: rgba(255, 255, 255, 0.418);
      .fcar {
        position: absolute;
        bottom: 0;
        left: 18px;
        z-index: 4;
        height: 62px;
        width: 62px;
        text-align: center;
        background: #141d27;
        padding: 6px;
        border-radius: 50%;
        > .numb {
          position: absolute;
          display: inline-block;
          top: 2px;
          right: 0;
          z-index: 6;
          background: red;
          width: 28px;
          height: 16px;
          font-size: 12px;
          border-radius: 16px;
          color: white;
          line-height: 16px;
        }
        > span {
          display: inline-block;
          background: rgba(218, 218, 218, 0.2);
          color: rgba(255, 255, 255, 0.637);
          width: 44px;
          height: 44px;
          font-size: 26px;
          border-radius: 50%;
          line-height: 44px;
        }
        .active {
          background: rgb(0, 140, 255);
          color: white;
        }
      }
    }
    > div:nth-child(2) {
      width: 1px;
      flex-grow: 4;
      font-size: 14px;
      display: flex;
      > span:nth-child(1) {
        font-weight: 600;
        font-size: 18px;
      }
      .active {
        color: white;
      }
      .lin {
        align-self: center;
        display: inline-block;
        width: 1px;
        height: 28px;
        border-left: 1px solid rgba(255, 255, 255, 0.157);
        margin: 0 12px;
      }
    }
    > div:nth-child(3) {
      width: 1px;
      flex-grow: 3;
      text-align: center;
      font-weight: 700;
      font-size: 14px;
    }
    > .bg {
      background: rgb(0, 140, 255);
      color: white;
    }
    > .bb {
      color: rgba(255, 255, 255, 0.287);
      background: rgba(170, 170, 170, 0.2);
    }
  }
  .carshwo {
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(31, 31, 31, 0.822);
    z-index: 3;
    top: 0;
    left: 0;
    > div {
      background: white;
      position: absolute;
      bottom: 20px;
      width: 100%;
      > div {
        height: 40px;
        background: #f3f5f7;
        line-height: 40px;
        padding: 0 18px;
        border-bottom: 1px solid rgba(218, 218, 218, 0.2);
        > span:nth-child(1) {
          font-size: 16px;
          color: rgb(7, 17, 27);
        }
        > span:nth-child(2) {
          font-size: 14px;
          position: absolute;
          color: rgb(0, 140, 255);
          right: 18px;
        }
      }
      > ul li {
        height: 48px;
        line-height: 48px;
        padding: 0 18px;
        display: flex;
        border-bottom: 1px solid rgba(218, 218, 218, 0.2);
        > h3 {
          width: 1px;
          flex-grow: 2;
        }
        > span {
          color: red;
          margin-right: 12px;
          > strong {
            font-size: 18px;
          }
        }
        > div {
          font-size: 24px;
          color: rgb(75, 151, 250);
          > span {
            font-size: 16px;
            display: inline-block;
            width: 24px;
            text-align: center;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.8s;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateY(100%);
  }
}
</style>