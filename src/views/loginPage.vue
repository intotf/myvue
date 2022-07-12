<template>
    <el-form>
        <el-form-item>
            <el-button type="primary" @click="login">登录  {{ text }}</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
//import userInfo from "../scripts/userInfo"
export default ({
    name:'LoginPage',
    data() {
        return {}
    },
    methods:{
       async  login(){
            this.$router.push({name:'Homepage'})
       }
    }
})
</script>
