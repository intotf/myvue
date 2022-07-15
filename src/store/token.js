import Cookie from 'js-cookie'

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
            state.menus = []
            Cookie.remove(tokenKey)
            Cookie.remove(menusKey)
        },
        getToken(state){
           state.accountToken = this.state.accountToken || Cookie.get(tokenKey)
        }
    }
}