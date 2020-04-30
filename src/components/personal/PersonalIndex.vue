<template>
    <div >
        <div class="content">
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="个人中心">
                    <person :list="list"></person>
                </el-tab-pane>
                <el-tab-pane label="预定进程">
                    <process :list="processList"></process>
                </el-tab-pane>
                <el-tab-pane label="取消预定">
                    <cancel :list="cancelList"></cancel>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Person from './Person'
    import Process from './Process'
    import Cancel from './Cancel'
    export default {
        name: 'PersonalIndex',
        components: {Person,Process,Cancel},
        data() {
            return {
                tabPosition: 'left',
                list:[],
                processList:[],
                cancelList:[],
                jobId:''
            };},
        methods:{
            // getCenterInfo(){
            //     // this.jobId = this.$store.state.job_id
            //     // var params = new URLSearchParams();
            //     // params.append('jobId',this.jobId);
            //     // axios.get('static/mock/center.json')
            //     axios.post('/privateCenter')
            //         .then(this.getCenterInfoSucc)
            // },
            // getCenterInfoSucc(res){
            //     res = res.data
            //     if(res.code == 200)
            //     {
            //         const data= res.data
            //         this.list = data.list
            //     }
            // },
            // getDeleteInfo(){
            //     //  axios.get('static/mock/delete.json')
            //     axios.post('/deleteReservation')
            //         .then(this.getDeleteInfoSucc)
            // },
            // getDeleteInfoSucc(res){
            //     res = res.data
            //     if(res.code == 200)
            //     {
            //         const data= res.data
            //         this.cancelList = data.tableData
            //     }
            // }
        },
        mounted(){
            // this.getCenterInfo()
            // this.getDeleteInfo()
        },
    }

</script>

<style lang="stylus" scoped>
    .content
        padding 40px 40px
</style>
