import axios from "../axios";
import qs from 'qs'

export default {
    getPage : (query,data)=>{
        return axios.request({
            url:'/api/admin/developers?'+qs.stringify(query),
            method:'GET',
            data: data
        })
    },
    getAll : ()=>{
        return axios.request({
            url:'/api/admin/developers/all',
            method:'GET'
        })
    },
    Create: (data)=>{
        return axios.request({
            url:'/api/admin/developers',
            method:'POST',
            data: data
        })
    },
    Update : (data)=>{
        return axios.request({
            url:'/api/admin/developers/'+data.id,
            method:'PUT',
            data: data
        })
    },
    Delete:(id)=>{
        return axios.request({
            url:'/api/admin/developers/'+id,
            method:'Delete'
        })
    }
}
