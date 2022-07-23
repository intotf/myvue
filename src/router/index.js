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
        meta:{
            title:'后台管理系统 1.0'
        },
        children:[
            {
                path:'/home',
                name:'home',
                component:homePage,
                meta:{
                    title:'后台管理系统 1.0'
                }
            },
            {
                path:'/user',
                name:'user',
                component: ()=> import('../views/Admin/User'),
                meta: {
                    title: '管理员',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/developers',
                name:'developers',
                component:()=>import('../views/Admin/Developers'),
                meta: {
                    title: '开发者',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/functions',
                name:'functions',
                component:()=>import('../views/Admin/Functions/index.vue'),
                meta: {
                    title: '功能管理',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/functionapps',
                name:'functionapps',
                component:()=>import('../views/Admin/FunctionApps'),
                meta: {
                    title: '应用管理',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/functionapplicenses',
                name:'functionapplicenses',
                component:()=>import('../views/Admin/FunctionAppLicenses'),
                meta: {
                    title: '授权记录',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            
            {
                path:'/developers/developer',
                name:'developers/developer',
                component:()=>import('../views/Developers/Developer'),
                meta: {
                    title: '个人资料',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/developers/functionAppLicenses',
                name:'developers/functionAppLicenses',
                component:()=>import('../views/Developers/FunctionAppLicenses'),
                meta: {
                    title: '应用授权记录',
                    keepAlive: true, //此组件需要被缓存
                    isBack:false//用于判断上一个页面是哪个
                }
            },
            {
                path:'/developers/functionApps',
                name:'developers/functionApps',
                component:()=>import('../views/Developers/FunctionApps'),
                meta: {
                    title: '功能应用',
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
    mode:'hash',
    routes:routers
})

// 这个是为了避免一个报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;


