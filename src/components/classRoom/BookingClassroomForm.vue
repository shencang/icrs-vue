<template>
    <div>
        <i class="el-icon-circle-plus-outline" @click="dialogFormVisible = true"></i>
        <el-dialog
                title="预定教室-活动预约"
                :visible.sync="dialogFormVisible"
                @close="clear">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="meetingName">
                    <el-input v-model="ruleForm.meetingName"></el-input>
                </el-form-item>
                <el-form-item label="地点" prop="region">
                    <el-input v-model="form.roomName" autocomplete="off" placeholder="活动区域" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item label="使用时间" required>
                    <el-col :span="11">
                        <el-form-item prop="startTime">
                            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="ruleForm.startTime"
                                            style="width: 100%;" ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime">
                            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="ruleForm.endTime"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="参与人数" prop="numberOfParticipants">
                        <el-input type="number" v-model="ruleForm.numberOfParticipants"></el-input>
                </el-form-item>
                <el-form-item label="预定人" prop="username" >
                    <el-input type="textarea" v-model="username" disabled >{{username}}</el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置输入</el-button>
                <el-button @click="dialogFormVisible = false">取消预定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: 'BookClassroomForm',
        data() {
            return {
                dialogFormVisible: false,
                username:'',
                form: {
                    roomId: '',
                    roomNum: '',
                    roomName: '',
                    capacity: '',
                    status: '',
                    position: '',
                    description: '',
                },
                formLabelWidth: '120px',
                ruleForm: {
                    meetingName: '',
                    startTime: '',
                    endTime: '',
                    reservationTime:0,
                    numberOfParticipants: 0,
                    delivery: false,
                    type: [],
                    stuName: '',
                    description: ''
                },
                rules: {
                    meetingName:  [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    startTime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    endTime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    numberOfParticipants: [
                        { required: true, message: '请填写人数', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted: function () {
            this.getNameByUsername()
        },
        methods: {
            clear() {
                this.form = {
                    roomId: '',
                    roomNum: '',
                    roomName: '',
                    capacity: '',
                    status: '',
                    position: '',
                    description: '',
                }
            },
            onSubmit() {

                this.$axios
                    .post('/rooms/save', {
                        roomId: this.form.roomId,
                        roomNum: this.form.roomNum,
                        roomName: this.form.roomName,
                        capacity: this.form.capacity,
                        status: this.form.status,
                        position: this.form.position,
                        description: this.form.description,
                    }).then(resp => {
                    if (resp && resp.status === 200) {
                        this.dialogFormVisible = false;
                        this.$emit('onSubmit')
                    }
                })
            },
            submitForm(formName) {
                // console.log(this.ruleForm.endTime)
                // console.log(this.ruleForm.startTime)
                // console.log(moment(this.ruleForm.endTime).format("YYYY-MM-DD HH:mm:ss"))
                // console.log(moment(this.ruleForm.startTime).format("YYYY-MM-DD HH:mm:ss"))
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/meeting/save',{
                            meetingName:this.ruleForm.meetingName,
                            roomId:this.form.roomId,
                            numberOfParticipants:this.ruleForm.numberOfParticipants,
                            reservationTime:moment().format("YYYY-MM-DD HH:mm:ss"),
                            empName: sessionStorage.getItem("DIS_username"),
                            roomName:this.form.roomName,
                            startTime:moment(this.ruleForm.startTime).format("YYYY-MM-DD HH:mm:ss"),
                            endTime:moment(this.ruleForm.endTime).format("YYYY-MM-DD HH:mm:ss"),
                            description:this.ruleForm.description,
                            reservationIsTid:8,
                            status:1
                            }).then(resp =>{
                            if (resp && resp.status === 200) {
                                this.dialogFormVisible = false;
                                this.$emit('onSubmit')
                                alert('提交成功');
                            }else {
                                alert('提交失败');
                            }
                        });


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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
            },

        }

    }
</script>

<style scoped>
    .el-icon-circle-plus-outline {
        margin: 50px 0 0 20px;
        font-size: 100px;
        float: left;
        cursor: pointer;
    }
</style>