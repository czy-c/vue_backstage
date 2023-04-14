import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:3001'
// 登录
export function login (data: object){
   return axios({
        url:'/api/login',
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data
    })
}
// 注册
export function register(data:object){
    return axios({
        url:'/api/register',
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data
    })
}