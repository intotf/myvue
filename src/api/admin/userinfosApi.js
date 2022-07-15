import axios from "../axios";
import qs from 'qs'

export default{
    getPage: (query,data)=>{
        return axios.request({
            url:'/api/admin/userinfos?'+qs.stringify(query),
            method:'GET',
            data: data
        })
    },
    Create: (data)=>{
        return axios.request({
            url:'/api/admin/userinfos',
            method:'POST',
            data: data
        })
    },
    Update : (data)=>{
        return axios.request({
            url:'/api/admin/userinfos/'+data.id,
            method:'PUT',
            data: data
        })
    },
    Delete:(id)=>{
        return axios.request({
            url:'/api/admin/userinfos/'+id,
            method:'Delete'
        })
    }
} 