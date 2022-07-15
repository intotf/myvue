<template>
    <el-container style="height:100%">
        <el-aside width="auto">
          <left-menus></left-menus>
        </el-aside>
        <el-container>
            <el-header>
              <head-menus></head-menus>
            </el-header>
            <common-tag></common-tag>
              <el-main>
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.el-header{
    background-color: #308275;
}
.el-main {
 background-color: #FEFEFE;
 padding: 10px;
}
.el-aside{
    background-color: #888;
}
</style>

<script>
import LeftMenus from '../components/LeftMenus.vue'
import HeadMenus from '../components/HeadMenus.vue'
import CommonTag from '../components/CommonTag.vue'
  export default {
    components:{
      LeftMenus,
      HeadMenus,
      CommonTag
    }
  }
</script>