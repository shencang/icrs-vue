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
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587987636992&di=8d8f8198461f7c207d196c358b6d04ba&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fdbb44aed2e738bd44b8c9f3fa08b87d6277ff90b.jpg',
          link: 'http://how2j.cn?p=50613'},
          {
            id: 2,
            title: 'Vue.js - 渐进式 JavaScript 框架',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587987636990&di=b054f0dac5a021111fa9f0cc8862c53d&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-77a685b26fd7e3e460b7bb0ea3f2dee8_hd.jpg',
            link: 'https://cn.vuejs.org/'
          },
          {
            id: 3,
            title: 'element-ui - 网站快速成型工具',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587987636990&di=5aa776627e9578a1aa4870acfd6cdd01&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F279759ee3d6d55fbe20ea6f36d224f4a21a4dd1f.jpg',
            link: 'http://element-cn.eleme.io/#/zh-CN'
          },
          {
            id: 4,
            title: 'element-ui - 网站快速成型工具',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587987816655&di=52fe650c0f91bdaafba22a3fa2edeeb1&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F38dbb6fd5266d016bdeb8e0a932bd40735fa3525.jpg',
            link: 'http://element-cn.eleme.io/#/zh-CN'
          }]
      }
    }
  }
</script>
