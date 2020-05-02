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

        },
        mounted(){

        },
    }

</script>

<style lang="stylus" scoped>
    .content
        padding 40px 40px
</style>
