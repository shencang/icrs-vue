<template>
    <el-card id="index">
        <h1 class="system_title">欢迎访问教室预约管理系统</h1>

        <el-form class="index-container" label-position="left"
                 label-width="0px">
            <el-form-item>
                欢迎您，!
            </el-form-item>
            <el-form-item style="">
                当前系统登记教室有：
                <router-link to="/classroom"> 1</router-link>
                个
            </el-form-item>
            <el-form-item>
                可预约的教室有：
                <el-link >
                1
            </el-link>
                个
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 50%;background: #505458;border: none" v-on:click="login">立 刻 预 约
                </el-button>
            </el-form-item>
            <el-form-item>
               <h2>未来7天我要预约的会议:</h2>
                <el-table :data="tableClassroom7day" ref="multipleTable">
                    <el-table-column type="selection" width="auto" ></el-table-column>
                    <el-table-column type="index" label="序号" width="auto"></el-table-column>
                    <el-table-column prop="meetingName" label="会议名称" width="auto"></el-table-column>
                    <el-table-column prop="classroom" label="教室" width="auto"></el-table-column>
                    <el-table-column prop="beginTime" label="起始时间" width="auto"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="auto"></el-table-column>
                    <el-table-column type="operation" label="操作" width="auto"></el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <h2>已取消的会议:</h2>
                <el-table :data="tableClassroom7day" ref="multipleTable">
                    <el-table-column type="selection" width="auto" ></el-table-column>
                    <el-table-column type="index" label="序号" width="auto"></el-table-column>
                    <el-table-column prop="meetingName" label="会议名称" width="auto"></el-table-column>
                    <el-table-column prop="classroom" label="教室" width="auto"></el-table-column>
                    <el-table-column prop="beginTime" label="起始时间" width="auto"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="auto"></el-table-column>
                    <el-table-column prop="cancelReason" label="取消原因" width="auto"></el-table-column>
                    <el-table-column type="operation" label="操作" width="auto"></el-table-column>
                </el-table>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script>
    export default {
        name: "AppIndexBK",
        data(){
            return {
                tableClassroom7day:[{
                    meetingName:'text',
                    classroom:'testRoom',
                    beginTime:'2020-3-15',
                    endTime:'2020-3-16',


                }]
            }
        }
    }
</script>

<style scoped>
    #index {
        background: url("../../assets/bg.jpg") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
</style>