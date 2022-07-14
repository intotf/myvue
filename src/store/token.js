import Cookie from 'js-cookie'

const tokenKey = 'accountToken'
const menusKey = 'systemmenus'
export default {
    state:{
        accountToken:'',
        menus:[]
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
        },
        setMenu(state,val){
            val.forEach(item => {
                var itemChildre = [];
                if(item.items){
                    itemChildre = item.items.map((it)=> {
                        return {
                            groupName : it.groupName,
                            name : it.path,
                            apiPath : it.relativePath,
                            enable : it.enable,
                            label : it.name,
                            path: '/'+it.path,
                            component : ()=> import(`../views/${item.name}`)
                        }
                    })
                }
                item =  {
                    groupName :item.group,
                    name : item.path,
                    apiPath : item.relativePath,
                    enable : item.enable,
                    label : item.group,
                    childre : itemChildre
                }
                state.menus.push(item);
            });
            const menusJson = JSON.stringify(state.menus);
            Cookie.set(menusKey,menusJson)
        },
        getMenu(state){
            state.menus =  this.state.menus ?? JSON.parse(Cookie.get(menusKey))
        }
    }
}