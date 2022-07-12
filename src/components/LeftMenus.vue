<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#FFd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
      <el-submenu v-for="item in menus" :index="item.path" :key="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.group}}</span>
          </template>
          <el-menu-item-group v-for="subItem in item.items" :key="subItem.path">
            <el-menu-item :index="subItem.path"  @click="chlickMenu(subItem)">{{subItem.name}}</el-menu-item>
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
        //isCollapse:false,
        menus:[
            {
                "group": "系统管理",
                "path": "system",
                "items": [
                    {
                        "groupName": "系统管理",
                        "name": "用户信息",
                        "class": null,
                        "path": "user",
                        "relativePath": "api/talkbackadmin/userinfos",
                        "enable": true
                    },
                    {
                        "groupName": "系统管理",
                        "name": "设备升级",
                        "class": null,
                        "path": "packages",
                        "relativePath": "api/talkbackadmin/packages",
                        "enable": true
                    },
                    {
                        "groupName": "系统管理",
                        "name": "地址授权码",
                        "class": null,
                        "path": "addresses",
                        "relativePath": "api/talkbackadmin/addresses",
                        "enable": true
                    }
                ]
            },
            {
                "group": "小区管理",
                "path": "community",
                "items": [
                    {
                        "groupName": "小区管理",
                        "name": "小区信息",
                        "class": null,
                        "path": "communities",
                        "relativePath": "api/talkbackadmin/communities",
                        "enable": true
                    },
                    {
                        "groupName": "小区管理",
                        "name": "小区结构",
                        "class": null,
                        "path": "communitystructs",
                        "relativePath": "api/talkbackadmin/communitystructs",
                        "enable": true
                    },
                    {
                        "groupName": "小区管理",
                        "name": "房间信息",
                        "class": null,
                        "path": "rooms",
                        "relativePath": "api/talkbackadmin/rooms",
                        "enable": true
                    }
                ]
            }
        ]
      };
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
          console.log(item.path)
          this.$router.push({
            name:item.path
          });
      }
    },
    mounted(){
      // bus.$on("handCollapse",()=> {
      //       this.isCollapse = !this.isCollapse
      // });
    },
    computed:{
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
    }
  }
</script>