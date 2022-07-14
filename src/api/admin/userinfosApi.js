import axios from "../axios";
import qs from 'qs'

export const getPageUserinfos = (query,data)=>{
    return axios.request({
        url:'/api/admin/userinfos?'+qs.stringify(query),
        method:'GET',
        data: data
    })
}
