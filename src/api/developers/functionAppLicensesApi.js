import axios from "../axios";
import qs from 'qs'

export default {
    getPage : (query)=>{
        return axios.request({
            url:'/api/developer/functionAppLicenses?'+qs.stringify(query),
            method:'GET'
        })
    },
}