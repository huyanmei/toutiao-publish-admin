<!-- 素材管理 -->
<template>
 <div class="image-container">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="mini" @click="dialogUploadVisible = true">上传素材</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(img, index) in images" :key = "index">
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
              :preview-src-list="[img.url]"
            >
          </el-image>
        </el-col>
      </el-row>
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
    </el-card>
    <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true" width="400px">
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :headers="uploadHeaders"
        name="image"
        :show-file-list="false"
        :on-success="onUploadSuccess"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
 </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0, // 总数据条数
      pageSize: 20, // 每页大小
      page: 1, // 当前页码
      loading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    // 页面初始化加载第1页数据
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      this.loading = true
      // 重置高亮页码，防止数据和页码不对应,切换到收藏的时候页码回到第1页
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.loading = false
        console.log(res)
      })
    },
    // onCollectChange () {
    //   this.loadImages(1)
    // },
    onUploadSuccess () {
      this.loadImages(false)
      this.dialogUploadVisible = false
    },
    onCurrentChange (page) {
      this.loadImages(page)
    }
  }
}

</script>

<style lang='less' scoped>
.action-head{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
