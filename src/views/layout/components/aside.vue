<!-- 侧边栏 -->
<template>
<!-- el-menu-item 的 index 不能重复，确保唯一即可 -->
  <el-menu
        :default-active="$route.path"
        class="nav-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isasidecollapse"
        router>
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-menu"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-document"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
         <el-menu-item index="/comment">
          <i class="el-icon-setting"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
         <el-menu-item index="/fans">
          <i class="el-icon-setting"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
         <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
  </el-menu>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'AppAside',
  components: {},
  data () {
    return {
      isasidecollapse: false,
      activerouter: '/'
    }
  },
  computed: {},
  watch: {},
  created () {
    Bus.$on('isasidecollapse', (isasidecollapse) => {
      this.isasidecollapse = isasidecollapse
    })
  },
  mounted () {
  },
  methods: {
  }
}

</script>

<style lang='less' scoped>

</style>
