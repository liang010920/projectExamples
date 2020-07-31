<template>
  <div class="wrapper">
    <div class="left">
      <div class="left-pic" />
    </div>
    <div class="right" v-if="Is_show == 1">
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="login-form"
               auto-complete="on"
               label-position="left">
        <div class="title">{{name}}</div>
        <el-form-item prop="username">
          <el-input ref="name"
                    v-model="loginForm.username"
                    autofocus="autofocus"
                    name="username"
                    type="text"
                    auto-complete="on"
                    placeholder="请输入用户名"
                    @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    v-model="loginForm.password"
                    name="password"
                    auto-complete="on"
                    placeholder="请输入密码"
                    @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading"
                     @click.native.prevent="handleLogin"
                     class="submit-btn">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="register">
        <span>还没有账号？<i @click="Is_show = 2">医生注册</i></span>
      </div>
      <div class="copyright">
        华润电力健康管理受国家计算机软件著作权保护，未经授权不得进行商业行为，违者必究。<br>
        ©2019 华润电力健康管理
      </div>
    </div>

    <div class="right" v-if="Is_show == 2">
      <el-form ref="loginForm"
               class="login-form"
               auto-complete="on"
               label-position="left">
        <div class="title">{{name}}</div>
        <el-form-item prop="username">
          <el-input ref="name"
                    v-model="registerName"
                    type="text"
                    placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-input type="password"
                    v-model="registerPassWord"
                    placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-input type="password"
                    v-model="registerPassWord2"
                    placeholder="请确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" @click="registerDoctor()" class="submit-btn">
            注册
          </el-button>
        </el-form-item>
      </el-form>
      <div class="register">
        <span>已有账号，<i @click="Is_show = 1">去登陆</i></span>
      </div>
      <div class="copyright">
        华润电力健康管理受国家计算机软件著作权保护，未经授权不得进行商业行为，违者必究。<br>
        ©2019 华润电力健康管理
      </div>
    </div>

    <!-- <img class="logo"
         :src="logo" /> -->
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Lockr from 'lockr'
import {
  MemberDoctorAdd
} from '@/api/oamanagement/workbench'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      Is_show: 1,
      registerName:"",
      registerPassWord:"",
      registerPassWord2:"",

      loading: false,
      redirect: undefined,
      remember: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['logo', 'name'])
  },
  mounted() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm)
            .then(res => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/workbench/index' })
            })
            .catch(() => {
              this.loading = false
              this.$message.error("登录时发生了一个错误");
            })
        } else {
          return false
        }
      })
    },
    registerDoctor(){
      var t_data =this
      var reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      var ret = reg.test(t_data.registerName)
      if (!ret) {
        this.$message.error('手机号码格式不正确')
        return
      }
      if (!t_data.registerPassWord) {
        this.$message.error('请输入密码')
        return
      }
      if (t_data.registerPassWord != t_data.registerPassWord2) {
        this.$message.error('两次输入的密码不一致')
        return
      }
      var param = {
        ID: 0,
        memberTel: t_data.registerName,
        memberPwd: t_data.registerPassWord,
        memberName: "--",
        memberRoleId:'3',
        memberArea1: '',
        memberArea2:'',
        memberArea3: '',
        memberAddress:'',
        memberIntro: '',
        memberDoctorJob: '',
        memberIntro1: ''
      }
      console.log('param------------' + JSON.stringify(param))
      MemberDoctorAdd(param).then(res => {
        if (!res.status) {
          this.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }

        this.$message.success('注册成功')

      })
    },
  }
}
</script>

<style lang="scss" scoped>
$dark_gray: #ccc;
$light_gray: #333;
$login_theme: #00aaee;

/deep/ input {
  border: 0 none;
  background-color: white;
  -webkit-appearance: none;
  &:-webkit-autofill {
    background-image: none;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: $light_gray !important;
  }
}
/deep/ .el-input__inner {
  height: 40px;
  padding: 0 12px;
  background-color: white;
  border: 0 none;
  border-bottom: 1px solid #e6e6e6 !important;
}
/deep/ .el-form-item__error {
  left: 12px;
}
.wrapper {
  position: relative;
  width: 100%;
  min-width: 1300px;
  display: flex;
  .left {
    width: 100%;
    .left-pic {
      width: 100%;
      height: 100%;
      background: url('../../assets/img/login/login2.png') no-repeat center;
      opacity:0.75;
      background-size: cover;
    }
  }
  .right {
    position: absolute;
    width: 32%;
    height: 100%;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 15%;
    .el-form {
      width: 70%;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 50px;
        text-align: center;
      }
      .submit-btn {
        width: 100%;
        line-height: 25px;
        font-size: 16px;
        color: white;
        border-radius: 3px;
        background-color: $login_theme;
        display: block;
      }
      .el-button {
        border: 0 none;
      }
      .action-control {
        color: #999;
        /deep/ .el-checkbox {
          .el-checkbox__label {
            color: #999;
          }
          .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: $login_theme;
            border-color: $login_theme;
          }
        }

        .forget {
          cursor: pointer;
          float: right;
        }
      }
    }

    .register {
      width: 70%;
      text-align: right;
      font-size: 15px;
      i{
        color: #e21918;
        cursor: pointer;
      }
    }

    .copyright {
      width: 92%;
      position: absolute;
      bottom: 2%;
      color: #d0d0d0;
      font-size: 12px;
      text-align: center;
      line-height: 1.5;
    }
  }

  .logo {
    position: absolute;
    left: 60px;
    top: 50px;
    width: 180px;
    height: 48px;
    z-index: 200;
  }
}
</style>
