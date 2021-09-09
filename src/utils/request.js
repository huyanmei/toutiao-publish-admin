// 基于axios封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
// 非组件模块可以这样加载使用 element 的 message 提示组件
import { Message } from 'element-ui'

// 创建一个axios实例，说白了就是复制一个axios，通过这个实例去发送请求，把需要的配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})
// const req2 = axiox.create()
// req2.default.baseURL = 'http://127.0.0.1"3000'

// 请求拦截器
request.interceptors.request.use(
  // 任何请求都会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录用户信息，则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 当这里的 return config执行以后，请求才会真正发送出去
    return config
  }, function (error) {
  // 请求失败会经过这里
    return Promise.reject(error)
  })
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 所有响应码为 2XX 的响应都会进入这里
  // response 是响应处理
  // 注意: 一定要把响应结果 return,否则真正发请求的位置拿不到数据
  return response
}, function (error) {
  const { status } = error.response
  // 任何超出 2XX 的响应码都会进入这里
  // console.dir(error)可以显示一个对象所有的属性和方法
  if (status === 401) {
    // 跳转到登录页面并清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或过期 (没有操作权限)
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端请求参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})

// 导出请求方法
export default request
