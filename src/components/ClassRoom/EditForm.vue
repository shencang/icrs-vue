<template>
    <div>
        <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>
        <el-dialog
                title="修改图书信息"
                :visible.sync="dialogFormVisible"
                @close="clear">
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="房间号码" :label-width="formLabelWidth" prop="roomNum">
                    <el-input v-model="form.roomNum" autocomplete="off" placeholder="获取用参数"></el-input>
                </el-form-item>
                <el-form-item label="房间名" :label-width="formLabelWidth" prop="roomName">
                    <el-input v-model="form.roomName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                    <el-input v-model="form.status" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="位置" :label-width="formLabelWidth" prop="position">
                    <el-input v-model="form.position" autocomplete="off" placeholder="字符串"></el-input>
                </el-form-item>
                <el-form-item label="容量" :label-width="formLabelWidth" prop="capacity">
                    <el-select v-model="form.capacity" placeholder="请选择分类">
                        <el-option label="50人" value="50"></el-option>
                        <el-option label="100人" value="100"></el-option>
                        <el-option label="150人" value="150"></el-option>
                        <el-option label="200人" value="200"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="id" style="height: 0">
                    <el-input type="hidden" v-model="form.roomId" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'EditForm',
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
            }
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


