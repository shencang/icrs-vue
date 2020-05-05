<template>
    <div class="content">
        <div class="title">
            <h2>当前教室使用情况</h2>
            <span class="border-bottom"></span>

        </div>
        <div
                class="content-item"
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
                v-for="(item, index) of list"
                :key="item.roomId"
        >
            <div class="item">

<!--                <img class="item-img" :src="item.img">-->
                <img class="item-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588310273728&di=fc56a2c63cd3d20719f1f1d14da74f70&imgtype=0&src=http%3A%2F%2Fwww.jlgsjs.com%2Fupfile%2Fimage%2F20150525%2F20150525170099919991.jpg" alt="">
            </div>
            <div class="item item-black"></div>

            <div class="item item-face">
                <span class="iconfont iconfont-item">&#xe60a;</span><br>
                <span class="item-desc">{{item.roomName}}</span>
                <span class="ifUse">
                        <span :class="{'points':1,'green':item.status!==2,'red':item.status===2}"></span>
                        {{ifUsable(item.status)}}
                    </span>

                <div class="item item-face">
                    <input class="showBtn"
                           v-show="index===hoverIndex"
                           type="button"
                           :key="item.roomId"
                           :value="showValue(item.status)"
                           @click="handClickBtn(item.roomId)"
                    >
                </div>

            </div>

        </div>
        <div class="clear"></div>
    </div>
</template>
<script>
    export default {
        name: 'HomeTime',
        props: {
            list: Array ,
        },
        data() {
            return {

                hoverIndex: -1,
            }
        },
        mounted: function () {console.log(this.list)},
        methods: {
            showValue(el) {
                if (el === 1) {
                    return "查看详情"
                } else return "预定"
            },
            ifUsable(el) {
                if (el === 2) {
                    return "使用中"
                } return "空闲中"
            },
            // handClickBtn(value) {
            //     this.$router.push({
            //         name: 'ClassRoom',
            //         params: {
            //             roomId: value,
            //         }
            //     })
            // }
            //todo 临时跳转到classroom界面
            handClickBtn(roomId) {
                this.$router.push({
                    name: 'GetPhoto',
                    params:roomId
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import '../../../styles/varibles.styl'
    .content
        padding 100px 100px 50px 100px

        .title
            text-align center

        h2
            font-size 28px
            font-weight 600
            margin-bottom 10px

        .border-bottom
            position relative
            display block
            width 100px
            left 0
            right 0
            margin auto
            margin-bottom 50px
            border-bottom 1px solid #000

        .content-item
            position relative
            float left
            height 175px
            width 46%
            margin 10px 20px
            text-align center
            background-color #eee
            border-radius 4px
            overflow hidden
            display flex
            align-items center

            .item
                position absolute

                .item-img
                    width 100%

                .iconfont-item
                    display block
                    font-size 50px
                    color $bgColor

                .item-desc
                    display block
                    top 5px
                    font-size 22px

                .ifUse
                    position relative
                    float right
                    top -120px
                    margin-right 10px

                    .points
                        display inline-block
                        height 10px
                        width 10px
                        border-radius 5px
                        margin-right 10px

                    .green
                        background-color green

                    .red
                        background-color red

                .showBtn
                    margin-top 10px
                    height 25px
                    width 100px
                    border-radius 5px
                    color #fff
                    font-weight bold
                    cursor pointer
                    background-color $bgColor

            .item-face
                width 100%
                color white

            .item-black
                height 200px
                width 100%
                background-color rgba(0, 0, 0, .4)

        .clear
            clear both

        .hoverBg
            cursor pointer
</style>
