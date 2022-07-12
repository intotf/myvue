import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../src/router';
Vue.use(ElementUI);

import store from '../src/store'

Vue.config.productionTip = false

//导航守卫
// router.beforeEach((to,from,next)=>{
//   this.$store.commit('text','asdfasdfasdf')
 
//   if(to.name !=='Loginpage'){
//     next({name:'Loginpage'})
//   }else{
//     next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
