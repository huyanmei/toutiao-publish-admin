/**
 * 项目的启动入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载element组件库
import ElementUI from 'element-ui'
// 富文本编辑器 element-tiptap
import { ElementTiptapPlugin } from 'element-tiptap'
// 加载element组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
// 富文本编辑器 element-tiptap的样式
import 'element-tiptap/lib/index.css'

// 加载全局样式文件
import './styles/index.less'

// import JSONbig from 'json-bigint'
// const str = '{ "id": 1253585734669959168 }'
// console.log(JSON.parse(str)) // 125358573466995920
// console.log(JSONbig.parse(str).id.toString())
// const data = JSONbig.parse(str)
// console.log(JSON.stringify(data))
// console.log(JSONbig.stringify(data))

// 全局注册element组件库
Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
