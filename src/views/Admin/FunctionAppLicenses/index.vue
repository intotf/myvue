<template>
<div>
  <div class="search-container">
    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
     <el-form-item>
        <el-input v-model="formSearch.functionName" placeholder="功能名称" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="formSearch.appName" placeholder="应用名称" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="formSearch.developerUsername" placeholder="开发者帐号" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="formSearch.appId" placeholder="appId" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="formSearch.machineId" placeholder="设备标识符" size="small" autocomplete="on" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  
  <el-table border :data="pageData" style="width: 100%" :default-sort = "{prop: 'createTime', order: 'descending'}" @sort-change="handlerSort" >
    <el-table-column type="index" width="50" label="序号" />
    <el-table-column prop="functionName" label="功能名称" sortable width="180" />
    <el-table-column prop="appName" label="应用名称" sortable /> 
    <el-table-column prop="appId" label="appId" sortable />
    <el-table-column prop="developerUsername" label="开发者帐号" sortable /> 
    <el-table-column prop="machineId" label="设备标识符" sortable /> 
    <el-table-column prop="machineFeature" label="设备特征码" width="180"> 
        <template slot-scope="scope">
         <el-tooltip placement="top">
            <div slot="content" class="word-wrap" style="width:250px;">{{scope.row.machineFeature}}</div>
            <el-button type="text" class="white-space" style="width:120px;color: #606266;">{{scope.row.machineFeature}}</el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="machineSignature" label="设备特征签名" width="180"> 
      <template slot-scope="scope">
        <el-tooltip placement="top">
            <div slot="content" class="word-wrap" style="width:250px;">{{scope.row.machineSignature}}</div>
            <el-button type="text" class="white-space" style="width:120px;color: #606266;">{{scope.row.machineSignature}}</el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="createTime"  label="授权时间" sortable width="120" :formatter="formatterDate" />
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
  </div>
</template>

<script>
import api from '../../../api/admin/functionAppLicensesApi.js'
import _ from 'lodash'
export default ({
    name:'functionAppLicenses',
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
    mounted(){
         this.onSearch()
    }
})
</script>