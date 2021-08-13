import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Test from '@/views/test'
// @就是src目录的路径别名
Vue.use(VueRouter)
// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 如果layout有一个默认子路由时，就不要给父路由起名字
    // name: 'home',
    component: Layout,
    children: [
      {
        path: '', // path为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      }, {
        path: '/article', // path为空，会作为默认子路由渲染
        name: 'article',
        component: Article
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫，所有的页面导航都会经过这里
// to: 要去的路由信息
// from: 来自哪里的路由信息
// next: 放行方法
// 如果要访问的页面不是/login,校验登录状态
// 如果没有登录，则跳转到登录页面
// 如果登录了，则允许通过

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已经登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
