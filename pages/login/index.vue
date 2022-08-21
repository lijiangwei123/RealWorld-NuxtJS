<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="!isLogin" to="login">Have an account?</nuxt-link>
            <nuxt-link v-else to="register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }}&nbsp;{{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                required
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                minlength="8"
                required
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 尽在客户端加载js-cookie
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: ["notAuthenticated"],
  name: "LoginIndex",
  data() {
    return {
      user: {
        username: "",
        email: "2352636652@qq.com",
        password: "lijiangwei123",
      },
      errors: {}, // 错误信息
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });

        // 保存用户的登录状态
        this.$store.commit("setUser", data.user);
        // 为了防止刷新页面导致数据丢失，需要把数据持久化
        Cookie.set("user", JSON.stringify(data.user));
        // 跳转到首页
        this.$router.push("/");
      } catch (error) {
        // console.dir(error);失败之后的提示
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>