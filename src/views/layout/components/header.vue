<!-- 头部顶栏 -->
<template>
  <div class="header-container">
    <div class="header-title">
      <i :class="{
        'el-icon-s-fold': isasidecollapse,
        'el-icon-s-unfold': !isasidecollapse
      }"
      @click="changeAside()"></i>
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
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
   </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppHeader',
  components: {},
  data () {
    return {
      user: {},
      isasidecollapse: false
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
      })
    },
    changeAside () {
      this.isasidecollapse = !this.isasidecollapse
      Bus.$emit('isasidecollapse', this.isasidecollapse)
    },
    logout () {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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
    cursor: pointer;
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
