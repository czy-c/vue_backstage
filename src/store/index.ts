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
      account:'',
      id:'',
      avatar:''
    },
    token:''
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
      state.userInfo.id = userInfo.id
      state.userInfo.avatar = userInfo.avatar
    },
    setToken(state,token){
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
