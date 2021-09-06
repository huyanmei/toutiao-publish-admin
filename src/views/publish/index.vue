<!-- 发布文章 -->
<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="publish-form" :rules="publishRules" :model="article" label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap v-model="article.content" :extensions="extensions" height="350" placeholder="请输入文章内容..." />
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!--
            当子组件提供的数据既要使用又要编辑修改时，使用v-model简化数据绑定
            v-model="article.cover.images[index]"
            给子组件传递了一个名字叫 value 的数据
            :value="article.cover.images[index]"
            默认监听 input 事件，当事件发生，它会让绑定数据 = 事件参数
            @input="article.cover.images[index] = 事件参数"
            注意： v-model 只是简写了 实质还是处理父子组件通信传值
            参考文档： https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
          -->
          <div class="cover-container" v-if="article.cover.type > 0">
            <upload-cover
            v-for="(cover, index) in article.cover.type"
            :key="cover"
            v-model="article.cover.images[index]"
            />
          </div>
          <!-- 需要把选好的封面图片地址放到article.cover.images数组中 -->
          <!-- 如果想要在事件处理函数自定义传参以后继续使用哪个事件本身的参数，则需要手动指定 $event，它就代表哪个事件本身的参数 -->
          <!-- <template v-if="article.cover.type > 0">
            <upload-cover
            v-for="(cover, index) in article.cover.type"
            :key="cover"
            :cover-image="article.cover.images[index]"
            @update-cover="onUpdateCover(index, $event)" />
          </template> -->
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本编辑器有: 1.百度的UEditor 2.国外的CKEditor
import {
  getArticleChannels,
  addArticle,
  updateArticle,
  getArticle
} from '@/api/article'
import {
  uploadImage
} from '@/api/image'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Image,
  Bold,
  Underline,
  Italic,
  Strike,
  HorizontalRule,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import UploadCover from './components/upload-cover.vue'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 1, // 封面类型 -1:自动  0:无图  1:1张图片     3:3张图片
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      channels: [], // 文章频道列表
      extensions: [
        new Doc(), // 必须
        new Text(), // 必须
        new Paragraph(), // 必须
        new Heading({
          level: 5
        }),
        new Bold({
          bubble: true
        }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 组件默认会把图片处理成base64格式字符串和内容存储在一起
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data ,则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第一个 return 是返回 Promise 对象，因为 axios 本身就是返回Promise对象
            return uploadImage(fd).then(res => {
              // 这个return是返回最后的结果
              return res.data.data.url
            })
          } // 图片的上传方法,返回一个 Promise<url>
        }), // 上传图片
        new Underline({
          bubble: true,
          menubar: false
        }), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(), // 全屏
        new Preview(), // 预览
        new CodeBlock(), // 代码片段
        new TextColor()
      ],
      publishRules: {
        title: [{
          required: true, message: '请输入文章标题', trigger: 'blur'
        }, {
          min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur'
        }],
        content: [{
          required: true, message: '请输入文章内容', trigger: 'blur'
        }, {
          validator (rule, value, callback) {
            if (value === '<p></p>') {
              callback(new Error('请输入文章内容'))
            } else {
              callback()
            }
          }
        }],
        channel_id: [{
          required: true, message: '请选择文章频道'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    onPublish (draft = false) {
      this.$refs['publish-form'].validate((valid) => {
        // 验证失败, 停止提交表单
        if (!valid) {
          return
        }
        // 验证通过, 提交表单 如果是修改文章执行修改操作，否则执行添加操作
        const articleId = this.$route.query.id
        if (articleId) {
          updateArticle(articleId, this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '修改'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
          addArticle(this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
          })
          this.$router.push('/article')
        }
      })
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
        // this.$message({
        //   message: '发布成功',
        //   type: 'success'
        // })
      })
    },
    onUpdateCover (index, url) {
      this.article.cover.images[index] = url
    }
  }
}

</script>

<style lang='less' scoped>
.cover-container{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
