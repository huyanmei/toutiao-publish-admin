// 文章相关请求模块
import request from '@/utils/request'
// 请求参数一般分为4种：
// 1.请求头Headers： Headers参数使用headers设置
// 默认是headers:{'Content-Type':'application/json',Authorization:'用户token'}
// 具体查看浏览器的 Network => Fetch/XHR => Response Headers 请求头相关参数

// 2.查询参数Query：Query参数使用params设置 params:{}
// 最终axios会在内部将对象转换成key=value&key=value的数据格式然后以?分割去拼接到url的后面传递给接口
// 具体查看浏览器的 Network => Query String Parameters或者General的Request URL

// 3.请求体Body：Body参数使用data设置 data:{}  任何数据和字符串去拼接都会转成toString
// 4.路径参数： 比如删除文章的接口，文档中的是Path： /mp/v1_0/articles/:target 项目里就的写成url: `/mp/v1_0/articles/${articleId}` 路径参数:target使用时改成指定参数
// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET', // 请求方法 get:一般用于查询，post:一般用于添加，put:一般用于修改、完整替换，delete:用于删除，patch:一般用于修改操作，局部修改
    url: '/mp/v1_0/articles', // 请求路径
    params
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

// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿
    },
    data
  })
}

// 编辑文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft // 是否存为草稿
    },
    data
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
