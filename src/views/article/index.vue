<!-- 内容管理 -->
<template>
 <div class="article-container">
  <el-card class="box-card filter-card">
    <div slot="header" class="clearfix">
        <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
        <!-- /面包屑 -->
    </div>
    <!-- 数据筛选表单 -->
    <el-form ref="form" :model="form" label-width="40px" size="mini">
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择频道">
          <el-option label="全部" :value="null"></el-option>
          <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="rangeDate"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="loading" @click="loadArticles(1)">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- /数据筛选表单 -->
  </el-card>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        根据筛选条件共查询到{{ totalCount }}条结果：
    </div>
    <!-- 数据列表 -->
    <el-table
      class="list-table"
      :data="articles"
      stripe
      style="width: 100%"
      size="mini"
      v-loading="loading">
      <el-table-column
        prop="date"
        label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            :preview-src-list="scope.row.cover.images"
            fit="cover"
            lazy>
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
           <!-- <img v-if="scope.row.cover.images[0]" class="article-cover" :src="scope.row.cover.images[0]">
           <img v-else class="article-cover" src="./no-cover.gif"> -->
         </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}
          </el-tag>
        <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
        <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
        <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
        <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
        <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="100"
        label="操作">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="onDeleteArticle(scope.row.id)"></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- /数据列表 -->
    <!-- 列表分页 -->
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :disabled="loading"
      :current-page.sync="page"
      @current-change="onCurrentChange"
       />
       <!-- total 用来设定总数据的条数
        它默认按照 10 条每页计算总页码
        page-size 每页显示条目个数，支持 .sync 修饰符，默认每页 10 条 -->
    <!-- /列表分页 -->
  </el-card>
 </div>
</template>

<script>
import {
  getArticles,
  getArticleChannels,
  deleteArticle
} from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        region: '',
        date1: '',
        date2: '',
        resource: ''
      },
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 20, // 每页大小
      status: null, // 查询文章的状态，不传就是全部
      page: 1, // 当前页码
      channels: [], // 文章频道列表
      channelId: null, // 查询文章的频道
      rangeDate: null, // 筛选的范围日期
      loading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      console.log('id1:' + articleId)
      console.log('id2:' + articleId.toString())
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.loadArticles(this.page)
          // console.log(res)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>

<style lang='less' scoped>
.filter-card{
  margin-bottom: 30px;
}
.list-table{
  margin-bottom: 20px;
}
.article-cover{
  width: 60px;
  background-size: cover;
}
.image-slot{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #C0C4CC;
  vertical-align: middle;
}
</style>
