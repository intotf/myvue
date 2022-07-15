
import axios from 'axios'
import config from '../config'
import { Message } from 'element-ui';
import router  from '@/router'
import store from '@/store';

const  baseURL = process.env.NOOE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
  constructor(baseURL){
    this.baseURL = baseURL
  }

  //获取配置
  getInsideConfig(){
    const config = {
        baseURL : this.baseURL,
        Header:{},
        timeout: 2500
    }
    return config
  }

  interceptors(interce){
    // 添加请求拦截器
    interce.interceptors.request.use(function (config) {
      store.commit('getToken')
      const token = store.state.token.accountToken;
      if(token){
        config.headers.Authorization = 'Bearer '+token;
      }

      // 在发送请求之前做些什么
      //console.log('发送请求之前'+config);
      return config;
    }, function (error) {
      
      console.log('请求错误'+config);
      // 对请求错误做些什么
      return Promise.reject(error);
    });


    // 添加响应拦截器
    interce.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      if(response.data.code !== 0){
        const msg =  response.data.message ?? '响应code 异常,请管理员检查api'
        Message({
          message:msg,
          type: 'error'
        });
        throw new Error(msg);
      }
      return response
    }, function (error) {
      console.log(error);
      if(error.response.status === 401){
        Message({
          message: '登录超时,请重新登录',
          type: 'error'
        });
        router.replace({
          path: '/login'
        })
        return
      }
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  request(options){
    const instance  =  axios.create();
    options = {...this.getInsideConfig(), ...options}
    this.interceptors(instance)
    return instance(options)
  }
}
export default new HttpRequest(baseURL)
