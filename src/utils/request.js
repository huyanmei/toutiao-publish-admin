// 基于axios封装的请求模块
import axios from 'axios'

// 创建一个axios实例，说白了就是复制一个axios，通过这个实例去发送请求，把需要的配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 导出请求方法
export default request
