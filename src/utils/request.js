// 基于axios封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

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

// 导出请求方法
export default request
