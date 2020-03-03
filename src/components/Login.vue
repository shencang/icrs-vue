<template>
    <el-card id="poster">
        <el-form class="login-container" label-position="left"
                 label-width="0px">
            <h3 class="login_title">系统登录</h3>
            <el-form-item>
                <el-input type="text" v-model="loginForm.studentIdName"
                          auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>

    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    studentIdName: '1000',
                    password: '12345'
                },
                responseResult: []
            }
        },
        methods: {
            login () {
                const _this = this;
                console.log(this.$store.state);
                this.$axios
                    .post('/login', {
                        studentIdName: this.loginForm.studentIdName,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            _this.$store.commit('login',_this.loginForm);
                            const path = this.$route.query.redirect;
                            this.$router.replace({path:path === '/'
                                ||path === undefined ? '/index':path});
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
    #poster {
        background: url("../assets/acg3.png") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 1px;
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

