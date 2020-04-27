<template>
    <div class="quick-nav">
<!--        <img src="../../assets/img/face/idea.jpg" alt="" class="monster">-->
        <a href="https://github.com/Antabot/White-Jotter/blob/master/README.md" target="_blank">
<!--            <img src="../../assets/img/icon/icon5.png" alt="" class="readme">-->
        </a>
<!--        <img src="../../assets/img/icon/icon7.png" alt="" class="spark">-->
<!--        <img src="../../assets/img/icon/logo.png" alt="" class="logo">-->



    </div>
</template>

<script>
    export default {
        name: 'QuickNav',
        data () {
            return {
                username:''
        }},
        mounted: function () {
        },
        methods: {
        }
    }
</script>

<style scoped>
    .quick-nav {
        width: auto;
        height: auto;
        background-color: transparent;
    }
    .monster {
        width: 280px;
        height: 260px;
        /*position: absolute;*/
        /*top: 150px;*/
        /*left: 700px;*/
    }

    .readme {
        width: 300px;
        height: 285px;
        position: absolute;
        margin-left: 50%;
        top: 300px;
        left: 230px;
    }

    /*.spark {*/
    /*    font-size: 55px;*/
    /*    position: absolute;*/
    /*    left: auto;*/
    /*    !*margin-left: 25%;*!*/
    /*    top: 30px;*/
    /*    !*left: 1px;*!*/
    /*    font-weight: bold;*/
    /*}*/
    /*.title{*/
    /*    position: absolute;*/
    /*    padding-top: 40px;*/
    /*    !*margin-left: -10%;*!*/
    /*    font-size: 20px;*/
    /*    font-weight: bold;*/
    /*}*/
    /*.name{*/
    /*    position: absolute;*/
    /*    padding-top: 40px;*/
    /*    !*margin-left: -15%;*!*/
    /*    font-size: 20px;*/
    /*    font-weight: bold;*/
    /*}*/

    .logo {
        width: 280px;
        position: absolute;
        margin-left: 50%;
        top: 50px;
        left: 210px;
    }

</style>
