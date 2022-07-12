<template>
    <el-container style="height:100%">
        <el-aside width="auto">
          <left-menus></left-menus>
        </el-aside>
        <el-container>
            <el-header>
              <head-menus></head-menus>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.el-header{
    background-color: #308275;
}
.el-main {
 background-color: rgb(216, 216, 216);
 padding: 10px;
}
.el-aside{
    background-color: #888;
}
</style>

<script>
import LeftMenus from '../components/LeftMenus.vue'
import HeadMenus from '../components/HeadMenus.vue';
  export default {
    components:{
      LeftMenus,
      HeadMenus
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>