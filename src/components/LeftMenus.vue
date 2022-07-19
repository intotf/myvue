<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#FFd04b" :collapse="isCollapse">
      <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
      <el-submenu v-for="item in menus" :index="item.name" :key="item.name">
          <template slot="title">
            <i :class="'fa fa-'+ item.class+' fa-lg'"></i> &nbsp; <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item-group v-for="subItem in item.childre" :key="subItem.name">
            <el-menu-item :index="subItem.path"  @click="chlickMenu(subItem)">
              • {{subItem.label}}
            </el-menu-item>
          </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
    text-align: left;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 23px;
    }
  }
</style>

<script>
  import api from '../api/tokenApi.js'
  export default {
    data() {
      return {
        menus:[]
      }
    },
    methods: {
      chlickMenu(item){
          this.$store.commit('selectMenu',item)
          this.$router.push({
            name:item.name
          });
      }
    },
    mounted(){
       this.$store.commit('getUserInfo')
       // 发送 POST 请求
      api.getMenu(this.$store.state.token.userInfo.role).then(res=>{
          const menusArray = [];
          res.data.data.forEach(item => {
            const itemArray = [];
            if(item.items){
                itemArray.childre = item.items.map((it)=> {
                    return {
                        groupName : it.groupName,
                        name : it.path,
                        label : it.name,
                        path: '/'+it.path
                    }
                })
                itemArray.groupName = item.group
                itemArray.name = item.path
                itemArray.label = item.group
                itemArray.path = '/'+item.path,
                itemArray.class = item.class
            }
            menusArray.push(itemArray);
          })
          this.menus = menusArray;
      })
    },
    computed:{
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
    }
}
</script>