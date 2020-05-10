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
          title: '校园一角-美丽的校园',
          img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1055359103,165000690&fm=26&gp=0.jpg',
          link: 'http://how2j.cn?p=50613'},
          {
            id: 2,
            title: '校园一角-美丽的校园',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588996443154&di=50d03675f2637cd7c81369590197e859&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c84b5823d3c2a84a0d304f197810.jpg%40900w_1l_2o_100sh.jpg',
            link: 'https://cn.vuejs.org/'
          },
          {
            id: 3,
            title: '校园一角-美丽的校园',
            img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2199967377,2651947956&fm=26&gp=0.jpg',
            link: 'http://element-cn.eleme.io/#/zh-CN'
          },
          {
            id: 4,
            title: '校园一角-美丽的校园',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588996562855&di=6d5d4bf51e323926ccfc3a1dcb7602bc&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe90b16417e79bdc34262239c49e3f041.jpeg',
            link: 'http://element-cn.eleme.io/#/zh-CN'
          }]
      }
    }
  }
</script>
