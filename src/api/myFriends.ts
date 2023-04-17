import axios from 'axios'
export function myFriendsList(){
    const url = '/api/getMyFriends'
    return axios.get(url)
}