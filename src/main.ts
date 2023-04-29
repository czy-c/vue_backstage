import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { getCookie } from "@/utils/cookie";
router.beforeEach((to, from, next) => {
    const token =sessionStorage.getItem(`token_${store.state.userInfo.id}`)||""
    if (token) {
        if(to.path=='/'){
            next('/main');
        }else{
            next()
        }
    } else {
        if(to.path=='/'||to.path=='/Register')next()
        else{
            next({path:"/"});
        }
    }
  });

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
