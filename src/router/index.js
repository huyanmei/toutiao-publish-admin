import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Settings from '@/views/settings'
import Fans from '@/views/fans'
import Test from '@/views/test'
// @就是src目录的路径别名
// import 有两个作用: 1.执行模块中的代码 2.获取模块中导出的结果
// 当加载路径只指定到了目录，那么它会自动按顺序查找index.js -> index.vue -> index.json,如果都没找到，那就报错
// 注意： import Publish from '@/views/publish' 最好写成 import Publish from '@/views/publish/'
// 最后面加 / 会识别为目录进行加载
// 如果不加 / ，当有相同文件和目录时（如publish文件夹目录和publish.js同时存在），肯定首先加载publish.js文件
// 如果加 / 肯定首先加载publish文件夹目录
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
        path: '/article',
        name: 'article',
        component: Article
      }, {
        path: '/publish',
        name: 'publish',
        component: Publish
      }, {
        path: '/image',
        name: 'image',
        component: Image
      }, {
        path: '/comment',
        name: 'comment',
        component: Comment
      }, {
        path: '/settings',
        name: 'settings',
        component: Settings
      }, {
        path: '/fans',
        name: 'fans',
        component: Fans
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
