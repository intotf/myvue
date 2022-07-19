import axios from "../axios";

export default {
    getInfo : ()=>{
        return axios.request({
            url:'/api/developer/developers',
            method:'GET'
        })
    },
    Update : (data)=>{
        return axios.request({
            url:'/api/developer/developers',
            method:'PUT',
            data: data
        })
    }
}
