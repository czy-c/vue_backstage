import axios from 'axios'
export function getMessage(toId:string,fromId:string){
    return axios.get(`/api/getMessage?toId=${toId}&fromId=${fromId}`).then(res=>res)
}