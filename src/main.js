import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../src/router';
import dayjs from 'dayjs'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);

import store from '../src/store'
import http from 'axios'

Vue.prototype.$http = http
Vue.prototype.$config = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message
ElementUI.Dialog.props.closeOnClickModal.default=false;
Vue.prototype.$dayjs = dayjs;

Vue.config.productionTip = false

//导航守卫
router.beforeEach((to,from,next)=>{
  const title= router.getRoutes().find(item=> item.name==='mainPage').meta.title
  if(to.meta && to.meta.title){
    document.title = `${title} - ${to.meta.title}`
  }

  store.commit('getToken')
  const token = store.state.token.accountToken;
  if(!token && to.name !=='loginPage'){
    next({name:'loginPage'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
