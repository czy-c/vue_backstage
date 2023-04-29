<template>
  <div class="home">
    <el-form
      class="login"
      :label-position="'top'"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 40%"
    >
      <h1>Login</h1>
      <el-form-item label="Account">
        <el-input v-model="formLabelAlign.account" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="formLabelAlign.password" show-password />
      </el-form-item>
      <el-button type="primary" @click="loginSubmit">Login</el-button>
      <el-button
        type="primary"
        plain
        @click="$router.push({ path: 'Register' })"
        >Register</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { login } from "@/api/user";
import router from "@/router";
import { ElMessage } from "element-plus";
import { setCookie, getCookie } from "@/utils/cookie";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginView",
  components: {},
  setup(props, ctx) {
    const formLabelAlign = reactive({
      account: "",
      password: "",
    });
    const store = useStore();
    console.log(store.state.isLogin)
    const loginSubmit = () => {
      let data: object = {
        account: formLabelAlign.account,
        password: formLabelAlign.password,
      };
      login(data).then((res) => {
        if (res.data.status == "success") {
          console.log(res);
          store.commit("changeLoginStatus", true);
          router.push({ path: "main" });
          store.commit("getUserInfo", res.data.userInfo);
          store.commit("setToken", res.data.token);
          sessionStorage.setItem(`token_${store.state.userInfo.id}`, res.data.token);
        }
        ElMessage({
          message: res.data.message,
          type: res.data.status,
        });
      });
    };
    const Register = () => {
      console.log(1);
    };
    return { formLabelAlign, loginSubmit, Register };
  },
});
</script>
<style>
.home {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/images/bgc.png");
  position: relative;
}
.login {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 460px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
