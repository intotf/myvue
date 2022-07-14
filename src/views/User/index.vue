<template>
<div>
  
  <div class="filter-container">
    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.name" placeholder="姓名" size="small"></el-input>
      </el-form-item>
     
     <el-form-item>
        <el-input v-model="formSearch.username" placeholder="帐号" size="small"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="toolbar">
    <el-button type="text" icon="el-icon-plus" :underline="false" @click="openFormDialog">创建</el-button>
    <el-button type="text" icon="el-icon-plus" :underline="false">删除</el-button>
  </div>
  
  <el-table border :data="resultData.dataArray" style="width: 100%" :default-sort = "{prop: 'createTime', order: 'descending'}">
    <el-table-column type="index" width="50" label="序号" />
    
    <el-table-column prop="name" label="姓名" sortable width="180" />
    <el-table-column prop="username" label="帐号" />
    <el-table-column prop="createTime"  label="创建时间" sortable width="150" :formatter="formatterDate" />

     <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" @click="openFormDialog(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="resultData.pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="resultData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultData.totalCount">
    </el-pagination>


    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="dialogForm">
       <el-form-item label="帐号" :label-width="labelwidth" prop="username">
          <el-input v-model="form.username" autocomplete="off" :disabled="form.id !== undefined"></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="labelwidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="登录密码" v-if="isCreate" :label-width="labelwidth">
          <el-input type="pawssword" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFormDialog">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </div>
    </el-dialog>
   </div>
</template>

<script>
import { getPageUserinfos } from '../../api/admin/userinfosApi.js'
export default ({
    name:'user',
    data(){
        return {
            formSearch: {
              username: '',
              name: ''
            },
            pageInfo:{
                pageIndex:0,
                pageSize:10,
                obderby:''
            },
            resultData:{},
            form: {
            },
            dialogTitle:'用户',
            dialogFormVisible:false,
            labelwidth:'100px',
            rules:{
                name:[
                    { required:true, message: "请输入姓名", trigger:"blur" }
                ],
                username:[
                    { required:true, message: "请输入登录名", trigger:"blur" },
                    { min: 3, message:'登录名不能小于3位',trigger: 'blur' }
                ]
            },
            isCreate:false
        }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      formatterDate(row,column){
            return this.$dayjs(row.value).format('YYYY-MM-DD')
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      openFormDialog(index,val){
        this.dialogTitle = '创建用户'
        if(val){
          this.dialogTitle = '编辑用户'
          this.form = val
          this.isCreate = false
        }
        this.isCreate = true
        this.dialogFormVisible = true
      },
      closeFormDialog(){
        this.form = {}
        this.dialogFormVisible = false
      },
      saveForm(){
         this.$refs['dialogForm'].validate((valid) => {
            if (valid) {
                console.log('提交数据')
                // // 发送 POST 请求
                // getAdminToken(this.form).then(res=>{
                //     this.$store.commit('setToken',res.data.data.access_token)
                //     getAdminMenu().then(res=>{
                //         this.$store.commit('setMenu',res.data);
                //         this.$store.commit('addMenu',this.$router);
                //     })
                //     this.$router.push({name:'home'})
                // })
            }
        });
      },
      onSearch() {
        
      }
    },
    mounted(){
         getPageUserinfos(this.pageInfo,null).then(res=>{
           this.resultData =  res.data.data
        });
    }
})
</script>

<style lang="less" scoped>
.filter-container {
  text-align: left;
}

.filter-container .el-form-item{
  margin-bottom: 5px;
}
.toolbar{
  margin-bottom: 15px;
  text-align: left;
}
.toolbar > button {
  margin-right: 10px;
  font-weight: 700;
}
</style>