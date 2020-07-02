import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path: '/',
      redirect:'/goods'
    },
    {
      path: '/goods',
      component: () => import('../views/goods.vue')
    },
    {
      path: '/ratings',
      component: () => import('../views/ratings.vue')
    },
    {
      path: '/seller',
      component: () => import('../views/seller.vue')
    }
  ]
})

export default router
