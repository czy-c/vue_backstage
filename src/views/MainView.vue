<template>
  <div class="main">
    <div class="header">
      <div>
        <h1>首页</h1>
      </div>
      <div class="info">
        <h2>Nmae：{{ userInfo.name }}&nbsp;&nbsp;</h2>
        <h2>Phone：{{ userInfo.phone }}&nbsp;&nbsp;</h2>
        <h2>Account：{{ userInfo.account }}</h2>
      </div>
      <el-button type="danger" @click="loginOut">Log Out</el-button>
    </div>
    <el-button type="success" plain @click="$router.push({path:'/Chat'})">Chat</el-button>
    <!-- <el-button type="success" plain @click="antShake">防抖</el-button>
    <el-button type="success" plain @click="ReduceExpenditure">节流</el-button> -->
  </div>
</template>
<script lang="ts">
import { clearCookie, getCookie } from "@/utils/cookie";
import router from "@/router";
import EElMessage from "@/utils/EElMessage";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import {debounce} from '@/utils/debounce'
import {throttle} from '@/utils/throttle'
export default defineComponent({
  setup(props,ctx) {
    const userInfo = useStore().state.userInfo;
    const store = useStore()
    const loginOut = () => {
      store.commit('changeLoginStatus',false)
      sessionStorage.removeItem(`token_${userInfo.id}`);
      localStorage.removeItem("vuex");
      router.push({ path: "/" });
      EElMessage("退出成功!", "success");
    };
    const antShake = debounce(()=>{
      console.log('我是防抖')
    },300)
    const ReduceExpenditure = throttle(()=>{
      console.log('我是节流')
    },3000)
    return { loginOut, userInfo,antShake,ReduceExpenditure };
  },
});
</script>
<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  .info{
    display: flex;
  }
}
</style>