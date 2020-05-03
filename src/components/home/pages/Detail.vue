<template>
    <div class="content">
        <div id="function" class="title">
            <h2>功能选择</h2>
            <span class="border-bottom"></span>
        </div>
        <router-link tag="div" v-for="(item, index) of list" :to='item.link' :key="item.id">
            <div
                :class="{'hoverBg':index===hoverIndex,'content-item':1}"
                @mouseover="hoverIndex = index"
                @mouseout="hoverIndex = -1"
            >
                <div class="item">
                    <span class="iconfont iconfont-item" v-html="item.font">{{item.font}}</span><br>
                    <span class="item-desc">{{item.title}}</span>
                </div>
            </div>
        </router-link>
        <div class="clear"></div>
    </div>
</template>
<script>
export default {
    name: 'HomeDetail',
    data () {
        return {
            list: [{
                'id':'1',
                'font':'&#xeb9c;',
                'title':'教室查询与预定',
                'link':'/classroom'
            },{
                'id':'2',
                'font':'&#xeba2;',
                'title':'图书系统',
                'link':'/library'
            },{
                'id':'3',
                'font':'&#xeb99;',
                'title':'个人中心',
                'link':'/personal'
            }],
            hoverIndex: -1
        }
    } 
}
</script>
<style lang="stylus" scoped>
    @import '../../../styles/varibles.styl'
    .content
        padding 50px 100px 150px 100px
        .title
            text-align  center
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
            float left
            height 200px
            width 33.33%
            text-align center
            border-bottom 3px solid transparent
            .item
                position relative
                top 50px
                .iconfont-item
                    font-size 50px
                    color $bgColor
                .item-desc
                    position relative
                    top 5px
                    font-size 22px
        .clear
            clear both
        .hoverBg
            background #eee
            border-bottom 3px solid $bgColor
            cursor pointer
</style>
