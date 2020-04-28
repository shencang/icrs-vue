<template>
  <el-card class="admin-header">
    <a href="/index">
      <img src="../../assets/logo.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">I.C.R.S</span>
    <el-button-group style="float: right">
      <el-button type="info" plain icon="el-icon-edit">待定按钮</el-button>
      <el-button type="info" plain icon="el-icon-monitor" v-on:click="backHome">返回首页</el-button>
      <el-button type="info" plain icon="el-icon-switch-button" v-on:click="logout" >退出登录</el-button>
    </el-button-group>
    </el-card>
</template>

<script>
  import {createRouter} from '@/router'

  export default {
    name: 'Header',
    methods: {
      logout () {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp.data.code === 200) {
            _this.$store.commit('logout')
            _this.$router.replace('/index')
            // 清空路由，防止路由重复加载
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
          }
        }).catch(failResponse => {
          failResponse.errors
        })
      },
      backHome(){
        const _this =this;
        _this.$router.replace('/index');
      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 70px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
