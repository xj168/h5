import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 数据仓库
  state: {
    // 保存商品的数据
    goods: [],
  },
  mutations: {
    // 设置商品数据
    setGoods(state, v) {
      state.goods = v
    },
    // 添加购物车数量
    add(state, v) {
      for (const cate of state.goods) {
        for (const food of cate.foods) {
          if (food.name === v) {
            // 遍历到所有的数据，当前商品与传入的名称一样得时候，就把数量++
            food.conut++;
          }
        }
      }
    },
    // 减少
    reduce(state, v) {
      for (const cate of state.goods) {
        for (const food of cate.foods) {
          if (food.name === v) {
            // 遍历到所有的数据，当前商品与传入的名称一样得时候，就把数量--
            food.conut--;
          }
        }
      }
    },
    // 清空所有的数据
    clear(state){
      for (const cate of state.goods) {
        for (const food of cate.foods) {
            // 遍历到所有的数据，当前商品与传入的名称一样得时候，就把数量--
            food.conut=0;
        }
      }
    }
  },
  // 计算属性
  getters: {
    // 计算出购物车中的商品列表
    cartList(state) {
      // 需要找到数据大于零的
      // 定义一个数组用于装大于0的东西
      var arr = [];
      // 定义一个对象用于去重对象
      var timp = {};
      for (const cate of state.goods) {
        for (const food of cate.foods) {
          // 判断数量是否大于0的 而且名字不一样得额就往里面加
          if (food.conut > 0 && !timp[food.name]) {
            // 遍历到所有的数据，当前商品与传入的名称一样得时候，就把数量--
            arr.push(food);
            timp[food.name]='xx';
          }
        }
      }
      return arr;
    }
  },
  actions: {
  },
  modules: {
  }
})
