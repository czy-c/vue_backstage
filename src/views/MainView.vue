<template>
  <div class="main">
    <div>
      <h1>首页</h1>
    </div>
    <div class="info">
      <h2>Nmae：{{ userInfo.name }}&nbsp;&nbsp;</h2>
      <h2>Phone：{{ userInfo.phone }}&nbsp;&nbsp;</h2>
      <h2>Account：{{ userInfo.account }}</h2>
    </div>
    <el-button type="danger" @click="loginOut">Login Out</el-button>
  </div>
</template>
<script>
import { clearCookie, getCookie } from "@/utils/cookie";
import router from "@/router";
import EElMessage from "@/utils/EElMessage";
import { useStore } from "vuex";
export default {
  setup() {
    const userInfo = useStore().state.userInfo;
    const loginOut = () => {
      clearCookie("token");
      localStorage.removeItem("vuex");
      router.push({ path: "/" });
      EElMessage("退出成功!", "success");
    };
    return { loginOut, userInfo };
  },
};
</script>
<style lang="less">
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  .info{
    display: flex;
  }
}
</style>