import axios from "./axios";

export const getAdminToken = (params)=>{
    return axios.request({
        url:'/api/anonymous/tokens/admin',
        method:'POST',
        data:params
    })
}

export const getAdminMenu = (params)=>{
    return axios.request({
        url:'/menus.json',
        method:'GET',
        data:params
    })
}

