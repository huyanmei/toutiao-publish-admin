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
      <image-list />
    </el-card>
 </div>
</template>

<script>
import ImageList from './components/image-list.vue'
export default {
  name: 'ImageIndex',
  components: {
    ImageList
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
  }
}

</script>

<style lang='less' scoped></style>
