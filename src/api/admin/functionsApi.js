import axios from "../axios";
import qs from 'qs'

export default {
    getPage : (query,data)=>{
        return axios.request({
            url:'/api/admin/functions?'+qs.stringify(query),
            method:'GET',
            data: data
        })
    },
    getAll : ()=>{
        return axios.request({
            url:'/api/admin/functions/all',
            method:'GET'
        })
    },
    Create: (data)=>{
        return axios.request({
            url:'/api/admin/functions',
            method:'POST',
            data: data
        })
    },
    Update : (data)=>{
        return axios.request({
            url:'/api/admin/functions/'+data.id,
            method:'PUT',
            data: data
        })
    },
    Delete:(id)=>{
        return axios.request({
            url:'/api/admin/functions/'+id,
            method:'Delete'
        })
    }
}
