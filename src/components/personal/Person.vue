<template>
    <div class="container">
        <el-card>
            <el-form :data="userInfo">
                <el-form-item label="账号:" :label-width="formLabelWidth" prop="roomNum">
                    <el-form-item v-model="userInfo.username">{{userInfo.username}}</el-form-item>
                </el-form-item>
                <el-form-item label="姓名:" :label-width="formLabelWidth" prop="roomName">
                    <el-form-item v-model="userInfo.name">{{userInfo.name}}</el-form-item>
                </el-form-item>
                <el-form-item label="手机号码:" :label-width="formLabelWidth" prop="description">
                    <el-form-item v-model="userInfo.phone">{{userInfo.phone}}</el-form-item>
                </el-form-item>
                <el-form-item label="账号状态:" :label-width="formLabelWidth" prop="status">
                    <el-form-item v-model="userInfo.enabled" v-if="userInfo.enabled===true">启用</el-form-item>
                    <el-form-item v-model="userInfo.enabled" v-if="userInfo.enabled===false">停用</el-form-item>

                </el-form-item>
                <el-form-item label="电子邮件:" :label-width="formLabelWidth" prop="position">
                    <el-form-item v-model="userInfo.email">{{userInfo.email}}</el-form-item>
                </el-form-item>
                <el-form-item label="所属组织:" :label-width="formLabelWidth" prop="position">
                    <el-form-item v-model="userInfo.departmentId">{{userInfo.departmentId}}</el-form-item>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'Person',
        props: {
            // list:Array
        },
        data() {
            return {
                formLabelWidth: '100px',
                //   list:[]
                // data () {
                //     return{

                userInfo: {
                    id: '',
                    username: '',
                    name: '',
                    phone: '',
                    email: '',
                    enabled: '',
                    departmentId: ''


                },
            }

        }, mounted() {
            this.loadUserInfo()
        },
        methods: {
            loadUserInfo() {
                console.log(sessionStorage.getItem("DIS_username"))
                const _this = this
                this.$axios.post('info/userInfo', {
                    username: sessionStorage.getItem("DIS_username")
                }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            _this.userInfo = resp.data.result;
                        }
                    }
                )
            }
        }


    }
</script>
<style lang="stylus" scoped>
    @import '../../styles/varibles.styl'
    .container
        padding 0 20px

        .list
            height 50px
            line-height 50px
            padding-left 100px

            .list-item
                display inline-block
                width 150px
                height 50px
                line-height 50px
                textStyle()
                color #ADADAD

                .pos-center
                    height 50px
                    line-height 50px
                    margin-right 5px
</style>
