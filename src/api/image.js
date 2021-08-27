// 素材请求相关模块
import request from '@/utils/request'

// 一般文件上传的接口都要求把请求头中的Content-Type设置为 multipart/form-data
// 但是我们使用axios上传文件不需要手动设置，只要给data一个new FormData（）对象即可

// 上传用户图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 获取素材列表
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
