<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="handCollapse"></el-button>
            <h3 style="color:#fff" @click="pushMenu('home')">返回首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img :src="userHeadImg" class="userIcon">
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item icon="el-icon-user-solid" command="user">个人资料</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" divided command="loginOut">退出登录</el-dropdown-item>
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
//import bus from  '../scripts/eventBus'
export default ({
    name:'HeadMenus',
    data() {
        return {
            userHeadImg: require('../assets/logo.png')
        }
    },
    methods:{
      handCollapse() {
        this.$store.commit('collapseMenu')
        //bus.$emit('handCollapse')
      },
      handleCommand(command) {
        console.log('handleCommand'+command);
        if(command == 'loginOut'){
             console.log('退出登录');
             this.$store.commit('clearToken')
             return;
        }
        this.$router.push({ name:command})
      },
      pushMenu(name){
        this.$router.push({ name:name})
      }
    }
})
</script>
