<template>
    <el-card id="paper">
    <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="login_title">用户注册</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.studentIdName"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="loginForm.phone"
                      auto-complete="off" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="loginForm.email"
                      auto-complete="off" placeholder="E-Mail"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
        </el-form-item>
    </el-form>
    </el-card>
</template>
<script>
    export default{
        data () {
            return {
                rules:{
                    studentIdName: [{required: true, message: '学号不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                checked: true,
                loginForm: {
                    studentIdName: '',
                    password: '',
                    username: '',
                    phone: '',
                    email: ''
                },
                loading: false
            }
        },
        methods: {
            register () {
                const _this = this;
                this.$axios
                    .post('/register-stu', {
                        studentIdName: this.loginForm.studentIdName,
                        password: this.loginForm.password,
                        username: this.loginForm.username,
                        phone: this.loginForm.phone,
                        email: this.loginForm.email

                    })
                    .then(resp => {
                        if (resp.data.code === 200) {
                            this.$alert('注册成功', '提示', {
                                confirmButtonText: '确定'
                            });
                            _this.$router.replace('/login')
                        } else {
                            this.$alert(resp.data.message, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                    .catch(failResponse => {
                        failResponse.errors
                    })
            }
        }
    }
</script>
<style>
    #paper {
        background: url("../assets/acg2.png") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: -5px 1px;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title {
        margin: 1px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>

