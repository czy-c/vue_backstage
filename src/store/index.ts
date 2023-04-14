import { login } from '@/api/user'
import { getCookie, setCookie } from '@/utils/cookie'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default createStore({
  state: {
    isLogin:false,
    userInfo:{
      name:'',
      phone:'',
      account:''
    }
  },
  getters: {
  },
  mutations: {
    changeLoginStatus(state,status){
      state.isLogin = status
    },
    getUserInfo(state,userInfo){
      state.userInfo.name = userInfo.name
      state.userInfo.phone = userInfo.phone
      state.userInfo.account = userInfo.account
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
