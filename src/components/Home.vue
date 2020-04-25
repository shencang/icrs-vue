<template>
  <div class="home">
    <nav-menu class="nav-menu"></nav-menu>
    <router-view></router-view>
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import NavMenu from "@/components/common/NavMenu";
export default {
  name: 'Home',
  components: {
    NavMenu
    // HelloWorld
  }
}
</script>
<style>
  .nav-menu{
    /*margin-bottom: 40px;*/
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
  }
</style>
