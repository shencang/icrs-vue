<template>
    <el-card id="index">
        <h3 class="system_title">欢迎访问教室预约管理系统</h3>

        <el-form class="index-container" label-position="left"
                 label-width="0px">
            <el-form-item>
                欢迎您，！
            </el-form-item>
            <el-form-item>
                当前系统登记教室有：个
            </el-form-item>
            <el-form-item>
                可预约的教室有：个
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 50%;background: #505458;border: none" v-on:click="login">立 刻 预 约
                </el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script>
    export default {
        name: "AppIndex"
    }
</script>

<style scoped>
    #index {
        background: url("../assets/bg.jpg") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
</style>