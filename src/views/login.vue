<style lang="less">
@import "./login.less";
</style>

<template>
  <div
    class="login"
    @keydown.enter="handleSubmit"
  >
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form
            ref="loginForm"
            :model="form"
            :rules="rules"
          >
            <FormItem prop="userName">
              <Input
                v-model="form.userName"
                placeholder="请输入用户名"
              >
              <span slot="prepend">
                <Icon
                  :size="16"
                  type="person"
                ></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              >
              <span slot="prepend">
                <Icon
                  :size="14"
                  type="locked"
                ></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button
                @click="handleSubmit"
                type="primary"
                long
              >登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      var self = this;
      self.$refs.loginForm.validate(valid => {
        if (valid) {
          // const {username,password} = self.form;
          // self.$http.post('http://172.21.46.17:8080/login',{
          //     username,
          //     password
          // })
          // .then(function (response) {
          //     console.log(response);
          //       Cookies.set('user', self.form.userName);
          //       Cookies.set('token', response.headers.authorization);
          //       self.$router.push({
          //         name: 'home_index'
          //       });
          // })
          // .catch(function (error) {
          //     console.log(error);
          // });
          self.$router.push({
            name: "home_index"
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
