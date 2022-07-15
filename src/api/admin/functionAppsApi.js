import axios from "../axios";
import qs from 'qs'

export default{
    getPage: (query,data)=>{
        return axios.request({
            url:'/api/admin/functionApps?'+qs.stringify(query),
            method:'GET',
            data: data
        })
    },
    Create: (data)=>{
        return axios.request({
            url:'/api/admin/functionApps',
            method:'POST',
            data: data
        })
    },
    Update : (data)=>{
        return axios.request({
            url:'/api/admin/functionApps/'+data.id,
            method:'PUT',
            data: data
        })
    },
    Delete:(id)=>{
        return axios.request({
            url:'/api/admin/functionApps/'+id,
            method:'Delete'
        })
    }
} 