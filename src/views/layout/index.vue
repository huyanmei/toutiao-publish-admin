<!-- 首页布局组件 -->
<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <div class="logo-container">
      <img src="@/assets/images/logo_admin.png">
      </div>
      <AppAside class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <AppHeader />
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
          <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}

</script>

<style lang='less' scoped>
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside{
  .logo-container{
    width: 199px;
    height: 60px;
    background-color: #002033;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .aside-menu{
    height: calc(100% - 60px)
  }
  }
.header{}
.main{background-color: #fff;}
</style>
