import axios from "../axios";
import qs from 'qs'

export default{
    getPage: (query,data)=>{
        return axios.request({
            url:'/api/developer/functionApps?'+qs.stringify(query),
            method:'GET',
            data: data
        })
    },
    Create: (data)=>{
        return axios.request({
            url:'/api/developer/functionApps',
            method:'POST',
            data: data
        })
    },
    Update : (data)=>{
        return axios.request({
            url:'/api/developer/functionApps/'+data.id,
            method:'PUT',
            data: data
        })
    },
    Delete:(id)=>{
        return axios.request({
            url:'/api/developer/functionApps/'+id,
            method:'Delete'
        })
    },
    GetFunctionsAll:()=>{
        return axios.request({
            url:'/api/developer/functions/all',
            method:'GET'
        })
    }
} 