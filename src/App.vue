<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  import {mapState,mapGetters} from "vuex"
  import addRoute from '@/common/addRoute'
  export default {
    name: 'App',
    computed: {
      ...mapState([]),
      ...mapGetters([
        'ROUTE',
        'TOKEN',
        "MODULES"
      ])
    },
    async mounted() {
      //页面刷新加载路由
      let token = await this.TOKEN
      if( this.$route.path !== '/login' && this.token !== ""){ //除了login页面 或 token 不存在
        let modules = await this.MODULES
        addRoute( modules )
        this.$router.push({ path: this.$route.path })
      }
    },
    watch:{
      //全局详细，监听vuex，实现页面显示
      "globalMessage":function(newVal){
        if(newVal !== ''){
          this.$message[newVal.level](newVal.message)
          this.$store.state.globalMessage = ''
        }
      },
      //全局同步服务器时间与本地时间是否存在30分钟以上的时差，提示客户端对时
      "serverDatetime":function(newVal){
        const timestamp = parseInt(new Date().getTime())
        // 1583376636 1583976636
        if (Math.abs(timestamp-newVal) > 6000){
          this.$store.commit('SET_MESSAGE',{
            "message" : '注意:您的本机时间与服务器时间差距较大',
            "level" : "warn"
          })
        }
      },
      // 监听 全局用户配置修改
      "SETUSERCONFIG":function(newVal){
        this.$store.commit("SET_STATE", {key:"SETUSERCONFIG.pageCount", value:newVal.pageCount})
      }
    }
  }
</script>
