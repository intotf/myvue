<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#FFd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
      <el-submenu v-for="item in menus" :index="item.name" :key="item.name">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item-group v-for="subItem in item.childre" :key="subItem.name">
            <el-menu-item :index="subItem.path"  @click="chlickMenu(subItem)">{{subItem.label}}</el-menu-item>
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
  //import bus from  '../scripts/eventBus'
  export default {
    data() {
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        
      },
      handleClose(key, keyPath) {
        
      },
      handCollapse(){
         this.isCollapse = !this.isCollapse;
      },
      chlickMenu(item){
          console.log(item.name)
          this.$store.commit('selectMenu',item)
          this.$router.push({
            name:item.name
          });
      }
    },
    mounted(){
      // bus.$on("handCollapse",()=> {
      //       this.isCollapse = !this.isCollapse
      // });
    },
    computed:{
        menus(){
         this.$store.commit('getMenu')
          return this.$store.state.token.menus;
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
  }
}
</script>