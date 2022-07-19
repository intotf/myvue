import Cookie from 'js-cookie'
import jwt_decode from "jwt-decode"

const tokenKey = 'accountToken'
export default {
    state:{
        accountToken:'',
        userInfo:{}
    },
    mutations:{
        setToken(state,val){
            state.accountToken = val;
            Cookie.set(tokenKey,val)
        },
        clearToken(state){
            state.accountToken = '';
            Cookie.remove(tokenKey)
        },
        getToken(state){
           state.accountToken = this.state.accountToken || Cookie.get(tokenKey)
        },
        getUserInfo(state){
            state.userInfo = jwt_decode(state.accountToken || Cookie.get(tokenKey))
        }
    }
}