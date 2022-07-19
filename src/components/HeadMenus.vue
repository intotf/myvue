<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="handCollapse"></el-button>
            <el-button size="mini" plain icon="el-icon-s-home" :underline="false" @click="pushMenu('home')">返回首页</el-button>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click">
                <el-button type="text" style="color:#ffffff; font-weight:bold;">
                    {{userInfo.unique_name}} <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user-solid" @click.native="pushMenu" >个人资料</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" divided @click.native="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<style lang="less" scoped>
    header{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items:center;
    }
    .l-content{ 
       display: flex;
       align-items:center;
       .el-button {
            margin-right: 20px;
       }
    }
    .r-content{
        .userIcon{
            width:40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>

<script>

export default ({
    name:'HeadMenus',
    data() {
        return {
        }
    },
    methods:{
      handCollapse() {
        this.$store.commit('collapseMenu')
      },
      loginOut(){
         this.$confirm('是否确定退出当前登录', '退出提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('clearToken')
                this.$router.push({name:'loginPage'})
            }).catch((err) => {
               console.log(err)
               return      
            });
      },
      pushMenu(){
        let routerName = ''
        if(this.userInfo.role === 'Developer'){
            routerName = 'developers/developer'
        }else{
            routerName = 'user'
        }
        let routerFind = this.$router.getRoutes().find(item=> item.name === routerName)
        this.$store.commit('selectMenu',{
            path:'/'+routerName,
            name:routerName ,
            label:routerFind.meta.title,
            icon:''
        })
        this.$router.push({name:routerName})
      }
    },
    computed:{
        userInfo(){
            this.$store.commit('getUserInfo')
            return this.$store.state.token.userInfo
        }
    }
})
</script>
