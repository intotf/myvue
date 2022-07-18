import axios from "../axios";
import qs from 'qs'

export default {
    getPage : (query,data)=>{
        return axios.request({
            url:'/api/admin/functionAppLicenses?'+qs.stringify(query),
            method:'GET',
            data: data
        })
    },
}