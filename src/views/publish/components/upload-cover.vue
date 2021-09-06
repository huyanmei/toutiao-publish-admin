<!-- 文章封面 -->
<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <i class="el-icon-plus cover-icon" v-if="!value"></i>
      <img class="cover-image" ref="cover-image" :src='value'>
    </div>
    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <!--
            ref 有两个作用:
            1.作用到普通 HTML 标签上可以获取 DOM
            2.作用到组件上可以获取组件

            is-show-selected 为 true时 直接这么写就可以 要设置为false时写成 :is-show-selected="false"
          -->
          <image-list
            :is-show-add="false"
            :is-show-action="false"
            is-show-selected
            ref="image-list"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="onFileChange">
          <img width="100" ref="preview-image">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'
export default {
  name: 'UploadCoverIndex',
  components: {
    ImageList
  },
  // props: ['cover-image'],
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // 防止用户选择同一个文件不触发 change 事件
      // this.$refs.file.value = ''
    },
    onCoverConfirm () {
      // 如果 tab 是上传图片并且input-file有选择的文件，才执行上传图片的操作
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        // 执行上传文件的操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          // 关闭弹出层
          this.dialogVisible = false
          // 展示上传的图片
          this.$refs['cover-image'].src = res.data.data.url
          // 将图片地址发送给父组件
          // this.$emit('update-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        // this.$emit('ima')
        // 还有一种组件通信方式：父组件可以直接访问子组件中的数据 ref
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择封面图片')
          return
        }
        // 关闭对话框
        this.dialogVisible = false
        // 修改父组件绑定数据
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}

</script>

<style lang='less' scoped>
.cover-wrap {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  .cover-image {
    // height: 150px;
    // max-width: 100%;
    width: 100%;
    height: 100%;
    border-radius: 6px;

  }
  .cover-icon{
    font-size: 28px;
    color: #8c939d;
    line-height: 150px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
