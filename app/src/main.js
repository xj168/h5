import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局iviw组件
import ViewUI from 'iview';
import 'iview/dist/styles/iview.css'; 

// 引入axios
import axios from 'axios';
axios.defaults.baseURL='http://120.25.233.72:3333/'//配置公共路径
Vue.prototype.axios=axios;//挂在原型上被this使用

Vue.config.productionTip = false
// 挂在在上面
Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
