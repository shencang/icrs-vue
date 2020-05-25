<template>
    <div style="margin-top: 10px">
            <h1 class="spark" >智慧教室系统</h1>
        <side-menu id="side-menu"></side-menu>
        <div class="home">
            <div id="header-div">
                <div style="height: 150px"></div>
                <carousel></carousel>
                <quick-nav style="float: right;margin-top: -450px;margin-right: 480px"></quick-nav>
            </div>
            <classroom-situation id="update-card"></classroom-situation>
            <el-card style="width: auto;">
                <home-time :list="this.list"></home-time>
                <keep-alive>
                    <home-number></home-number>
                </keep-alive>
                <home-detail></home-detail>
            </el-card>
            <slogan id="slogan" ></slogan>
            <about id="about"></about>
        </div>
    </div>
</template>

<script>
    import Carousel from './Carousel'
    import QuickNav from './QuickNav'
    import Slogan from './Slogan'
    import About from '@/components/home/About'
    import ClassroomSituation from './ClassroomSituation'
    import SideMenu from './SideMenu'
    import HomeTime from './pages/Time'
    import HomeDetail from './pages/Detail'
    import HomeNumber from './pages/Number'
    export default {
        name: 'AppIndex',
        components: {Carousel, QuickNav, Slogan, About, ClassroomSituation, SideMenu,HomeTime,
            HomeDetail,
            HomeNumber,
        }
            ,
        data(){
            return {
                list: []
            }
        },
        mounted: function () {
            this.getHomeInfo()
            this.checkUserMeetingTimeout()
            this.checkUserMeetingBegin()
            this.checkRoomIsWillUse()
        },
        methods: {
            checkUserMeetingTimeout(){
                // 用于进入系统时检查用户的会议是否过期
                const _this =this;
                this.$axios.get('/checkMeetTimeout')
                    .then(resp=>{
                        if (resp && resp.data.code ===200 ){
                            _this.$message({
                                message:'(1/3)成功更新用户状态',
                                type:  'success'
                            });
                        }
                    })
            },
            checkUserMeetingBegin(){
                // 用于进入系统时检查会议是否开始
                const _this =this;
                this.$axios.get('/checkMeetBegin')
                    .then(resp=>{
                        if (resp && resp.data.code ===200 ){
                            _this.$message({
                                message:'(2/3)成功更新会议状态',
                                type:  'success'
                            });
                        }
                    })
            },
            checkRoomIsWillUse(){
                // 检查教室是否用占用，进行状态检查并修改
                const _this =this;
                this.$axios.get('/checkRoomIsWillUse')
                    .then(resp=>{
                        if (resp && resp.data.code ===200 ){
                            _this.$message({
                                message:'(3/3)成功更新教室状态',
                                type:  'success'
                            });
                        }
                    })
            },
            getHomeInfo() {
                // axios.get('static/mock/room.json')
                // this.$axios.post('/getBoardroom')
                const _this =this;
                this.$axios.get('/rooms')
                    .then(resp=>{
                        if (resp && resp.data.code ===200 ){
                            _this.list = resp.data.result

                        }
                    })

            },
            // getHomeInfoSuccess(res) {
            //     res = res.data
            //     if (res.code === 200) {
            //         const data = res.data
            //         this.list = data
            //     }
            // },
        }
    }
</script>

<style scoped>
    .home {
        width: 1300px;
        margin-left: auto;
        margin-right: auto;
        /*margin-top: -20px;*/
        margin-top: -150px
    }

    #header-div {
        padding-bottom: 20px;
        padding-left: 5px;
        background-color: white;
    }

    #side-menu {
        position: fixed;
        margin-left: 50%;
        left: -880px;
        top: 100px;
    }
</style>
