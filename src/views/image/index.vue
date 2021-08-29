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
        <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(img, index) in images" :key = "index" class="image-item">
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
              :preview-src-list="[img.url]"
            >
          </el-image>
          <div class="image-action">
            <el-button
              type="warning"
              circle
              size="mini"
              :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              :loading="img.loading"
              @click="onCollent(img)"
            >
            </el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" :loading="img.loading" @click="onDelete(img)"></el-button>
          </div>
        </el-col>
      </el-row>
      <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :disabled="pageLoading"
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
import { getImages, collectImages, deleteImages } from '@/api/image'
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
      pageLoading: true
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
      this.pageLoading = true
      // 重置高亮页码，防止数据和页码不对应,切换到收藏的时候页码回到第1页
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(img => {
          // 在接收到的数据img对象中手动添加loading状态来控制每个收藏按钮
          img.loading = false
        })
        this.images = results
        this.totalCount = res.data.data.total_count
        this.pageLoading = false
        console.log(res)
      })
    },
    // onCollectChange () {
    //   this.loadImages(1)
    // },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onCurrentChange (page) {
      this.loadImages(page)
    },
    onCollent (img) {
      collectImages(img.id, !img.is_collected).then(res => {
        // 更新视图状态
        img.is_collected = !img.is_collected
        img.loading = false
        // 关闭 loading
        console.log(res)
      })
    },
    onDelete (img) {
      img.loading = true
      deleteImages(img.id).then((res) => {
        console.log(res)
        // 重新加载数据列表
        this.loadImages(this.page)
        img.loading = false
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
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
.image-item{
  position: relative;
}
.image-action{
  position:absolute;
  left: 5px;
  right: 5px;
  bottom: 4px;
  background-color:rgba(204, 204, 204,0.6);
  height:30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /deep/ .el-button--mini.is-circle{
    padding: 5px;
  }
}

</style>
