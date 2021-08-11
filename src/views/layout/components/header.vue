<!-- 头部顶栏 -->
<template>
  <div class="header-container">
    <div class="header-title">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客科技教育有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="user.photo">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
   </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
        // console.log(res)
      })
    }
  }
}

</script>

<style lang='less' scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .header-title{
    span{
          margin-left: 10px;
    }
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
