<template>
<div>
  <div class="search-container">
    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.appName" placeholder="应用名称" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>
     
     <el-form-item>
        <el-input v-model="formSearch.functionName" placeholder="功能名称" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="formSearch.appId" placeholder="appId" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

       <el-form-item>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="toolbar">
    <el-button type="text" icon="el-icon-plus" :underline="false" @click="openFormDialog(null)">创建</el-button>
  </div>
  
  <el-table border :data="pageData" style="width: 100%" :default-sort = "{prop: 'createTime', order: 'descending'}" @sort-change="handlerSort">
    <el-table-column type="index" width="80" label="序号" />
    <el-table-column prop="appName" label="应用名称" sortable />
    <el-table-column prop="functionName" label="功能名称" sortable />
    <el-table-column prop="appId" label="AppId" sortable width="210" />
    <el-table-column prop="maxLicenseCount" label="最大授权数" sortable />
    <el-table-column prop="currentLicenseCount" label="当前授权数" sortable />
    <el-table-column prop="appState" label="状态" width="80" sortable >
        <template slot-scope="scope">
          <span :style="scope.row.appState ? '' : 'color:red'">{{scope.row.appState ? '启用' : '禁用'}}</span>
      </template>
    </el-table-column>
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
       <el-form-item label="应用名称" :label-width="labelwidth" prop="appName">
          <el-input v-model="formData.appName" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="功能" :label-width="labelwidth"  prop="functionId">
          <el-select v-model="formData.functionId" filterable placeholder="请选择功能" :disabled="isEdit">
            <el-option v-for="item in funcSelectItem" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="AppId" :label-width="labelwidth"  v-if="isEdit" prop="appId">
         <el-input v-model="formData.appId" autocomplete="off" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="AppSecret" :label-width="labelwidth" v-if="isEdit" prop="appSecret">
         <el-input v-model="formData.appSecret" autocomplete="off" disabled clearable></el-input>
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
import api from '../../../api/developers/functionAppsApi.js'
import _ from 'lodash'
export default ({
    name:'functionapps',
    data(){
        return {
            formSearch: {
              username: '',
              name: '',
              pageIndex:0,
              pageSize:10,
              obderby:''
            },
            funcSelectItem:[],
            totalCount:0,
            pageData:[],
            formData: {},
            dialogTitle:'用户',
            dialogFormVisible:false,
            labelwidth:'100px',
            rules:{
                appName:[
                    { required:true, message: "请输入应用名称", trigger:"blur" }
                ],
                maxLicenseCount:[
                    { required:true, message: "请输入授权最大数", trigger:"blur" },
                ],
                functionId:[
                  { required:true, message: "请选择功能", trigger:"blur" },
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
          this.dialogTitle = '编辑功能应用'
        } else{
          this.dialogTitle = '创建功能应用'
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
                  api.Create(this.formData,this.formData.developerId).then(res=>{
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
         api.GetFunctionsAll().then(res=>{
            this.funcSelectItem = res.data.data
         })
    }
})
</script>