<template>
  <el-card class="card-carousel">

    <el-carousel  class="push" :interval="4000" arrow="always" type="card">
      <el-carousel-item v-for="item in items" :key="item.id">
        <a :href=item.link target="_blank">
          <img :src=item.img alt="" class="carousel_img">
        </a>
        <h3>{{item.title}}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<style>
  .el-carousel__item h3 {
    color: black;
    font-size: 15px;
    /*line-height: 300px;*/
    bottom: 43px;
    float: left;
    position: relative;
  }

  .card-carousel {
    /*margin: 0 auto;*/
    margin-left: 20px;
    /*width: 680px;*/
    /*height: 320px;*/
  }

  .push {
    /*margin-left: -15px;*/
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .carousel_img {
    height: 100%;
    width: 100%;
    text-align: center;
  }
</style>

<script>
  export default {
    name: 'Carousel',
    data: function () {
      return {
        items: [{
          id: 1,
          title: 'How2J.cn - Java 全栈学习网站',
          img: 'https://i.loli.net/2020/02/25/NvikegKqHwzj74f.png',
          link: 'http://how2j.cn?p=50613'},
          {
            id: 2,
            title: 'Vue.js - 渐进式 JavaScript 框架',
            img: 'https://i.loli.net/2020/02/25/NvikegKqHwzj74f.png',
            link: 'https://cn.vuejs.org/'
          },
          {
            id: 3,
            title: 'element-ui - 网站快速成型工具',
            img: 'https://i.loli.net/2020/02/25/NvikegKqHwzj74f.png',
            link: 'http://element-cn.eleme.io/#/zh-CN'
          },
          {
            id: 4,
            title: 'element-ui - 网站快速成型工具',
            img: 'https://i.loli.net/2020/02/25/NvikegKqHwzj74f.png',
            link: 'http://element-cn.eleme.io/#/zh-CN'
          }]
      }
    }
  }
</script>
