import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
// @就是src目录的路径别名
Vue.use(VueRouter)
// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
