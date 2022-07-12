import Cookie from 'js-cookie'

const tokenKey = 'accountToken'
export default {
    state:{
        text:'test',
        accountToken:''
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
           state.accountToken = this.state.token || Cookie.get(tokenKey)
        },
        setText(state,val){
            state.text = val;
        }
    }
}