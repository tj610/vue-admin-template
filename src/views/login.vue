<template>
  <div class="login">
    <div class="login-container">
      <div class="login-logo"><img src="../assets/images/logo.png"></div>
      <div class="login-desc">Admin 企业级前端/设计解决方案</div>
      <Form :model="loginForm">
        <FormItem>
          <Input size="large" v-model="loginForm.username" placeholder="请输入用户名" >
            <Icon type="ios-contact-outline" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Input size="large" type="password" v-model="loginForm.password" placeholder="请输入密码" >
            <Icon type="ios-lock-outline" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" long @click="$router.push('/dashboard')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { apiOnLogin } from '../http/api'
import { Form, FormItem, Input, Icon, Button } from 'view-design'
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('Button', Button)

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        cellphone: '13261046866'
      }
    }
  },
  mounted() {
  },
  methods: {
    login() {
      apiOnLogin(this.loginForm).then(res => {})
    }
  }
}
</script>

<style>
.login{width:100%;height:100%;background:url(../assets/images/login.svg) 0 0 no-repeat;background-size:100%;background-position:50%;padding-top:100px;}
.login-logo{width:100%;height:80px;text-align:center;}
.login-logo img{width:auto;height:75px;display:inline-block;}
.login-desc{width:100%;text-align:center;margin-bottom:30px;font-size:14px;color:#808695;line-height:20px;}
.login-container{width:384px;margin:0 auto;}
</style>