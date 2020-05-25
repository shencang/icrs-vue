<template>
  <div>
    <el-row class="box-card" >
      <el-col :span="8" >
        <a href="https://shencangblue.com" target="_blank" >
          <img src="../../assets/img/icon/icon6.png" alt="" class="git-link">
        </a>
      </el-col>
      <el-col :span="8">
        <div style="font-size: 45px;color: azure;white-space: nowrap">智慧教室系统</div>
      </el-col>

      <el-col :span="8">
        <a href="https://blog.csdn.net/Neuf_Soleil" target="_blank">
          <img src="../../assets/img/icon/csdn.png" alt="" class="csdn-link">
        </a>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Slogan'
  }
</script>

<style scoped>
  .box-card {
    width: 100%;
    height: 50px;
    background-color: #222;
    text-align:center;
    margin-top: 5px;
  }

  .slogan {
    width: 100%;
  }

  .git-link {
    width: 40px;
    /*position: absolute;*/
  }

  .csdn-link {
    width: 35px;
    /*position: absolute;*/
    margin-bottom: 7px;
    margin-left: 20px;
  }
</style>
