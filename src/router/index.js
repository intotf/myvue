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
                component: ()=> import('../views/User'),
                meta: {
                    title: '管理员',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/developers',
                name:'developers',
                component:()=>import('../views/Developers'),
                meta: {
                    title: '开发者',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/functions',
                name:'functions',
                component:()=>import('../views/Functions'),
                meta: {
                    title: '功能管理',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/functionapps',
                name:'functionapps',
                component:()=>import('../views/FunctionApps'),
                meta: {
                    title: '应用管理',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/functionapplicenses',
                name:'functionapplicenses',
                component:()=>import('../views/FunctionAppLicenses'),
                meta: {
                    title: '授权记录',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
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


