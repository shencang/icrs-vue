<template>
    <div>
        <el-menu
                :default-active="path"
                router
                mode="horizontal"
                background-color="white"
                text-color="#222"
                active-text-color="red"
                style="min-width: 1300px">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                {{ item.navItem }}
            </el-menu-item>
            <span style="position: absolute;padding-top: 20px;right: 35%;font-size: 15px;font-weight: bold"
            >{{username}}，欢迎访问系统</span>
            <el-input
                    placeholder="快速搜索..."
                    prefix-icon="el-icon-search"
                    size="medium"
                    style="width: 300px;position:absolute;margin-top: 12px;right: 18%"
                    v-model="keyword">
            </el-input>
        </el-menu>
    </div>
</template>


<script>
    export default {
        name: 'NavMenu',
        data() {
            return {
                navList: [
                    {name: '/index', navItem: '首页'},
                    {name: '/notice', navItem: '最近通知'},
                    {name: '/classroom', navItem: '教室查看与预定'},
                    {name:'/personal',navItem: "个人中心"},
                    {name: '/library', navItem: '图书系统'},
                    {name: '/admin/dashboard', navItem: '管理系统'},
                ],
                username:'',
                keyword: '',
                path: ''
            }
        }, mounted: function () {
            // 获得第一级路由，以设置导航栏高亮
            var x = this.$route.path.indexOf('/', 1)
            if (x !== -1) {
                this.path = this.$route.path.substring(0, x)
            } else {
                this.path = this.$route.path
            }
            this.getNameByUsername()
        },
        computed: {
            hoverBackground() {
                return '#ffd04b'
            }
        },

        methods: {
            getNameByUsername(){
                const _this =this
                this.$axios.post('info/name',{
                    username:sessionStorage.getItem("DIS_username")
                })
                    .then(resp=>{
                        if (resp.data.code ===200){
                            _this.username=resp.data.result
                        }
                    }).catch(failResponse =>{
                    failResponse.errors
                })
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }

</style>

