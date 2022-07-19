<template>
    <div class="dialogForm">
      <el-form :model="formData" :rules="rules" ref="dialogForm">
       <el-form-item label="帐号" :label-width="labelwidth" prop="username">
          <el-input v-model="formData.username" autocomplete="off" disabled clearable></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="labelwidth"  prop="name">
          <el-input v-model="formData.name" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="登录密码" :label-width="labelwidth" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="不修改请为空" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="公司名称" :label-width="labelwidth"  prop="company">
          <el-input v-model="formData.company" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="联系电话" :label-width="labelwidth"  prop="phone">
          <el-input v-model="formData.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveForm"> 保 存 </el-button>
      </div>
    </div>
</template>

<script>
import api from '../../../api/developers/developersApi'
export default ({
    name:'developer',
    data() {
        return { 
            formData:{},
            labelwidth:'120px',
            rules:{
                name:[
                    { required:true, message: "请输入姓名", trigger:"blur" }
                ],
                username:[
                    { required:true, message: "请输入登录名", trigger:"blur" },
                    { min: 6, message:'登录名至少6位数',trigger: 'blur' }
                ],
                password:[
                  { required:false, message: "不修改密码请为空", trigger:"blur" },
                  { min: 6, message:'登录密码至少6位数',trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //保存创建及编辑
       saveForm(){
         this.$refs.dialogForm.validate((valid) => {
            if (valid) {
                api.Update(this.formData).then(res=>{
                    this.$message({message:'操作成功',type:'success'})
                    this.onSearch()
                    this.closeFormDialog()
                })
            }
        });
      }
    },
    mounted(){
         api.getInfo().then(res=>{
            this.formData = res.data.data
            this.formData.password = ''
         })
    }
})
</script>
<style lang="less" scoped>
.dialogForm {
    width: 80%;
    margin: auto;
}

.dialogForm .dialog-footer{
    text-align: center;
}
</style>