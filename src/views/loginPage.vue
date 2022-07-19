<template>
   
    <el-form :model="form" status-icon :rules="rules" ref="form" class="login-container">
         <el-tabs v-model="role" @tab-click="handleClick">
            <el-tab-pane label="系统管理员登录" name="admin" class="loginTabs">
                <el-form-item label="用户名" label-width="80px" prop="username" class="username">
                    <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入登录名" />
                </el-form-item>

                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码" />
                </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="开发者登录" name="developer" class="loginTabs">
                <el-form-item label="用户名" label-width="80px" prop="username" class="username">
                    <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入登录名" />
                </el-form-item>

                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码" />
                </el-form-item>
            </el-tab-pane>
        </el-tabs>

        <el-form-item class="login_submit"> 
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>

    
</template>

<script>
import api from '../api/tokenApi.js'
export default ({
    name:'loginPage',
    data() {
        return {
            role:'admin',
            form :{
            },
            rules:{
                username:[
                    { required:true, message: "请输入登录名", trigger:"blur" },
                    { min: 3, message:'登录名不能小于3位',trigger: 'blur' }
                ],
                password:[
                    { required:true, message: "请输入密码", trigger:"blur" }
                ]
            }
        }
    },
    methods:{
       login(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // 发送 POST 请求
                    api.getToken(this.form,this.role).then(res=>{
                        this.$store.commit('setToken',res.data.data.access_token)
                        this.$router.push({name:'home'})
                    })
                }
            });
       },
       handleClick(tab, event) 
       {
            this.role = tab.name
       }
    }
})
</script>


<style lang="less" scoped>
.loginTabs{
     padding-top: 15px;
}
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #F0F0F0;
    box-shadow: 0 0 25px #D0D0D0;
    text-align: center;
}
.login_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.login_submit {
    margin: 10px auto 0px auto;
}
</style>