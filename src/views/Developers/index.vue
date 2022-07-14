<template>
<div>
    
  <el-table border :data="resultData.dataArray" style="width: 100%" :default-sort = "{prop: 'createTime', order: 'descending'}">
    <el-table-column type="index" width="50" label="序号" />
    <el-table-column prop="username" sortable label="登录账号" />
    <el-table-column prop="name" label="姓名" sortable width="180" />
    <el-table-column prop="company" sortable label="公司名称" />
    <el-table-column prop="phone" sortable label="联系电话" />
    <el-table-column prop="createTime"  label="创建时间" sortable width="150" :formatter="formatterDate" />
    <el-table-column prop="lastModifyTime"  label="最后更新时间" sortable width="150" :formatter="formatterDate" />
     <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
   </div>
</template>

<script>
import { getPageDevelopers } from '../../api/admin/developersApi'
export default ({
    name:'user',
    data(){
        return {
            pageInfo:{
                pageIndex:0,
                pageSize:10
            },
            resultData:{}
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted(){
         getPageDevelopers(this.pageInfo,null).then(res=>{
           this.resultData =  res.data.data
        });
    }
})
</script>
