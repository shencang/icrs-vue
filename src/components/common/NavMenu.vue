<template>
    <el-menu
            :default-active="'/index'"
            router
            mode="horizontal"
            background-color="white"
            text-color="#222"
            active-text-color="red"
            style="min-width: 1300px">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
        </el-menu-item>
        <a href="#" style="color: #222;float: right;padding: 20px;">更多功能</a>
        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">测试中</span>
        <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>

    </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data () {
            return {
                navList: [
                    {name: '/index', navItem: '首页'},
                    {name: '/notice', navItem: '最近通知'},
                    {name: '/classroom', navItem: '教室查看与预定'},
                    {name: '/Personal', navItem: '个人中心'}
                ]
            }
        },
        methods:{
            logout () {
                const _this = this;
                this.$axios.get('/logout').then(resp => {
                    if (resp.data.code === 200) {
                        // 前后端状态保持一致
                        _this.$store.commit('logout');
                        _this.$router.replace('/login')
                    }
                })
            }

        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
    .el-icon-switch-button {
        cursor: pointer;
        outline:0;
    }

</style>

