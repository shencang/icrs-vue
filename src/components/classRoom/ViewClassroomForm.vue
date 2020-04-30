<template>
    <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="房间号码:" :label-width="formLabelWidth" prop="roomNum">
            <el-form-item v-model="form.roomNum">{{form.roomNum}}</el-form-item>
        </el-form-item>
        <el-form-item label="房间名:" :label-width="formLabelWidth" prop="roomName">
            <el-form-item v-model="form.roomName">{{form.roomName}}</el-form-item>
        </el-form-item>
        <el-form-item label="描 述:" :label-width="formLabelWidth" prop="description">
            <el-form-item v-model="form.description">{{form.description}}</el-form-item>
        </el-form-item>
        <el-form-item label="状 态:" :label-width="formLabelWidth" prop="status">
            <el-form-item v-model="form.status" v-if="form.status===1">已被预约</el-form-item>
            <el-form-item v-model="form.status" v-if="form.status===0">未被预约</el-form-item>
            <el-form-item v-model="form.status" v-if="form.status===-1">不可用</el-form-item>
        </el-form-item>
        <el-form-item label="位 置:" :label-width="formLabelWidth" prop="position">
            <el-form-item v-model="form.position">{{form.position}}</el-form-item>
        </el-form-item>
        <el-form-item label="容 量:" :label-width="formLabelWidth" prop="capacity">
            <el-form-item v-model="form.capacity">{{form.capacity}}</el-form-item></el-form-item>
        <el-form-item prop="id" style="height: 0">
            <el-input type="hidden" v-model="form.roomId" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "ViewClassroomForm",
        data () {
            return {
                dialogFormVisible: false,
                form: {
                    roomId: '',
                    roomNum: '',
                    roomName: '',
                    capacity: '',
                    status: '',
                    position: '',
                    description: '',
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            clear () {
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
            onSubmit () {
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