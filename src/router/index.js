import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '../views/mainPage.vue'
import loginPage from '../views/loginPage.vue'
import homePage from '../views/Home'

Vue.use(VueRouter);

var routers = [
    {
        path:'/',
        name:"mainPage",
        component:mainPage,
        children:[
            {
                path:'/home',
                name:'home',
                component:homePage
            },
            {
                path:'/user',
                name:'user',
                component: ()=> import('../views/User')
            },
            {
                path:'developers',
                name:'developers',
                component:()=>import('../views/Developers')
            }
        ]
    },
    {
        path:'/login',
        name:'loginPage',
        component:loginPage
    }
];

const router =  new VueRouter({
    mode:'history',
    routes:routers
})

// 这个是为了避免一个报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;


