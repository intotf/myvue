import axios from "./axios";

export default {
    getToken: (params,role)=>{
        return axios.request({
            url:'/api/anonymous/tokens/'+role,
            method:'POST',
            data:params
        })
    },
    getMenu : (role)=>{
        return axios.request({
            url: role +'Menus.json',
            method:'GET'
        })
    }
}
