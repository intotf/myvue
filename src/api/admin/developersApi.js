import axios from "../axios";
import qs from 'qs'

export const getPageDevelopers = (query,data)=>{
    return axios.request({
        url:'/api/admin/developers?'+qs.stringify(query),
        method:'GET',
        data: data
    })
}
