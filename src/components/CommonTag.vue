<template>
    <div class="tabs">
        <el-tag 
            size="small" 
            v-for="(tag,index) in tags" 
            :key="tag.label" 
            :closable="tag.name !== 'home'" 
            :effect="$route.name === tag.name ?  'dark' : 'plain'"
            @click="changeMenu(tag)"
            @close="closeMenu(tag,index)">
            {{tag.label}}
        </el-tag>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default{
    name:'CommonTag',
    data(){
        return{}
    },
    methods:{
        ...mapMutations({
            closeTag:'closeTag'
        }),
        changeMenu(item){
            this.$router.push({name:item.name})
        },
        closeMenu(tag,index){
            const length = this.tags.length
            this.closeTag(tag)
            if(tag.name !== this.$router.name){
                return
            }
            if(index === length){
                this.$router.push({
                    name : this.tags[index -1].name
                })
            }else{
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    },
    computed: {
        routerName(){
            return this.$router.name
        },
        ...mapState({
            tags:state=> state.tab.tabList
        })
    }
    
}
</script>

<style lang="less" scoped>
    .tabs {
         text-align: left;
         margin: 10px;
         border-bottom: 1px solid #F0F0F0 ;
         padding-bottom: 10px;
    }

    .el-tag{
        cursor: pointer;
    }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 4;
    padding-bottom: 4;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
