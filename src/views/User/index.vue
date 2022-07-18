<template>
<div>
  <div class="search-container">
    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.name" placeholder="姓名" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>
     
     <el-form-item>
        <el-input v-model="formSearch.username" placeholder="帐号" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="toolbar">
    <el-button type="text" icon="el-icon-plus" :underline="false" @click="openFormDialog(null)">创建</el-button>
    <el-button type="text" icon="el-icon-plus" :underline="false" @click="handleDeletes">删除</el-button>
  </div>
  
  <el-table border :data="pageData" style="width: 100%" :default-sort = "{prop: 'createTime', order: 'descending'}" @sort-change="handlerSort" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column type="index" width="50" label="序号" />
    <el-table-column prop="name" label="姓名" sortable width="180" />
    <el-table-column prop="username" label="帐号" sortable />
    <el-table-column prop="createTime"  label="创建时间" sortable width="120" :formatter="formatterDate" />

     <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" @click="openFormDialog(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <div class="pagination">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formSearch.pageIndex"
        :page-size="formSearch.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
    </el-pagination>
   </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="closeFormDialog">
      <el-form :model="formData" :rules="rules" ref="dialogForm">
       <el-form-item label="帐号" :label-width="labelwidth" prop="username">
          <el-input v-model="formData.username" autocomplete="off" :disabled="isEdit" clearable></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="labelwidth"  prop="name">
          <el-input v-model="formData.name" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="登录密码" :label-width="labelwidth" prop="password" :rules="isEdit ? rules.updatepassword : rules.password">
          <el-input v-model="formData.password" type="password" autocomplete="off" clearable></el-input>
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
import api from '../../api/admin/userinfosApi.js'
import _ from 'lodash'
export default ({
    name:'user',
    data(){
        return {
            formSearch: {
              username: '',
              name: '',
              pageIndex:0,
              pageSize:10,
              obderby:''
            },
            multipleSelection: [],
            totalCount:0,
            pageData:[],
            formData: {},
            dialogTitle:'用户',
            dialogFormVisible:false,
            labelwidth:'100px',
            rules:{
                name:[
                    { required:true, message: "请输入姓名", trigger:"blur" }
                ],
                username:[
                    { required:true, message: "请输入登录名", trigger:"blur" },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password:[
                  { required:true, message: "请输入登录密码", trigger:"blur" },
                  { min: 6, message:'登录密码至少6位数',trigger: 'blur' }
                ],
                updatepassword:[
                  { required:false, message: "请输入登录密码", trigger:"blur" },
                  { min: 6, message:'密码至少6位数',trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      handleSizeChange(val) {
        this.formSearch.pageSize = val
        this.onSearch()
      },
      handleCurrentChange(val) {
        this.formSearch.pageIndex = val-1
        this.onSearch()
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      //批量删除数据
      handleDeletes(){
          if(this.multipleSelection.length <= 0){
               this.$message({
                message:'请选择数据',
                type: 'error'
              });
              return
          }
          let counter = 0
          this.$confirm('确定删除当前选中的所有记录', '删除提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                return new Promise((resolve, reject)=>{
                  this.multipleSelection.forEach(async(item)=>{
                    await api.Delete(item.id).then(res=>{
                        counter++
                        if (counter === this.multipleSelection.length){ 
                          this.onSearch()
                        }
                    })
                  })
                })
            }).catch(() => {
                return      
          });
      },
      handlerSort(column){
        if(column.order){
          this.formSearch.obderby = column.prop +' '+ column.order
        }else{
          this.formSearch.obderby = ''
        }
        this.onSearch()
      },
      formatterDate(row){
        return this.$dayjs(row.value).format('YYYY-MM-DD')
      },
      //删除单行记录
      handleDelete(row) {
        this.$confirm('确定删除当前记录', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            api.Delete(row.id).then(res=>{
             this.$message({message:'删除成功',type:'success'})
              this.onSearch()
            })
        }).catch(() => {
            return      
        });
      },
      //打开创建编辑窗口
      openFormDialog(row){
        if(row !== null){
          this.formData = _.cloneDeep(row)
          this.formData.password = ''
        }

        if(this.isEdit){
          this.dialogTitle = '编辑用户'
        } else{
          this.dialogTitle = '创建用户'
        }
        this.dialogFormVisible = true
      },
      //关闭创建编辑窗口
      closeFormDialog(){
        this.$refs.dialogForm.resetFields()
        this.formData = {}
        this.dialogFormVisible = false
      },
      //保存创建及编辑
       saveForm(){
         this.$refs.dialogForm.validate((valid) => {
            if (valid) {
                if(this.isEdit){
                   api.Update(this.formData).then(res=>{
                      this.$message({message:'操作成功',type:'success'})
                      this.onSearch()
                      this.closeFormDialog()
                  })
                }else{
                  api.Create(this.formData).then(res=>{
                      this.$message({message:'操作成功',type:'success'})
                      this.onSearch()
                      this.closeFormDialog()
                  })
                }
                
            }
        });
      },
      //搜索
      onSearch() {
        api.getPage(this.formSearch,null).then(res=>{
           this.pageData =  res.data.data.dataArray
           this.totalCount = res.data.data.totalCount
           this.formSearch.pageIndex = res.data.data.pageIndex
           this.formSearch.pageSize = res.data.data.pageSize
        });
      }
    },
     computed:{
        isEdit () {
          return this.formData.id != undefined
        }
      },
    mounted(){
         this.onSearch()
    }
})
</script>