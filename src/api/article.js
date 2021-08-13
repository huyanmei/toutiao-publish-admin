// 文章相关请求模块
import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
    // Body参数使用data设置
    // Query参数使用params设置
    // Headers参数使用headers设置
  })
}

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
// 接口文档中写的 路径参数（如 /:target） 需要在url中传递，凡事看见接口路径中有如/:XXXX格式的字段，则需要传递路径参数
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
