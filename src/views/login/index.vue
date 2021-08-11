<!--登录页面  -->
<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" :rules="formRules" ref="login-form" :model="user">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"> <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"> <i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
        </el-form-item>
        <el-form-item prop="agree">
            <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      },
      loginLoading: false
    }
  },
  components: {

  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },

    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        this.$router.push({
          name: 'home'
        })
        console.log(res)
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}

</script>

<style lang='less' scoped>
  .login-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-form-wrap{
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;
      .login-head{
        display: flex;
        justify-content: center;
        .logo{
          width: 200px;
          height: 57px;
          background: url('./logo_index.png') no-repeat;
          background-size: contain;
        }
      }
      .login-form{
        .login-btn{
          width: 100%;
        }
      }
    }
  }
</style>
