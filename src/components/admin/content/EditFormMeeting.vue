<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加会议</el-button>
    <el-dialog
            title="修改活动信息"
            :visible.sync="dialogFormVisible"
            @close="clear">
      <el-form v-model="form" :rules="rules"   style="text-align: left" ref="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="meetingName">
          <el-input v-model="form.meetingName" autocomplete="off" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="房间名" :label-width="formLabelWidth" prop="roomName">
          <el-input v-model="form.roomName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="form.status" disabled>
          <el-radio :label='0' autocomplete="off">已取消</el-radio>
          <el-radio :label='1' autocomplete="off">已预定</el-radio>
          <el-radio  :label='2' autocomplete="off">正在进行</el-radio>
            <el-radio  :label='-1' autocomplete="off">已经过期</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="使用时间" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.startTime"
                              style="width: 100%;" ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.endTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="使用人数" :label-width="formLabelWidth" prop="numberOfParticipants">
          <el-input type="number" v-model="form.numberOfParticipants" autocomplete="off" placeholder="正整数"></el-input>
        </el-form-item>
        <el-form-item label="预定人" :label-width="formLabelWidth" prop="empName">
          <el-input v-model="form.empName" autocomplete="off" placeholder="预订人"></el-input>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.meetingId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: 'EditForm',
    data () {
      const checkStartTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("时间不能为空"));
        }
        setTimeout(() => {
          if (moment(value,"YYYY-MM-DD HH:mm:ss").isBefore(moment())) {
            return callback(new Error("开始时间不能早于现在"));
          } else {
            callback();
          }
        }, 1000);

      };
      const checkEndTimeToStart = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("时间不能为空"));
        }
        setTimeout(() => {
          if (moment(value,"YYYY-MM-DD HH:mm:ss").isBefore(moment(this.form.startTime,"YYYY-MM-DD HH:mm:ss"))) {
            return callback(new Error("结束时间不能早于开始时间"));
          } else {
            console.log(moment(value,"YYYY-MM-DD HH:mm:ss").diff(moment(this.form.startTime,"YYYY-MM-DD HH:mm:ss")))
            if (moment(value,"YYYY-MM-DD HH:mm:ss").diff(moment(this.form.startTime,"YYYY-MM-DD HH:mm:ss"), "hours") > 6) {
              return callback(new Error("不能预定超过6个小时的活动"));
            }else {
              callback();
            }
          }
        }, 1000);
      };

      const checkNumberOfParticipants = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('人数不能为空'));
        }
        setTimeout(() => {
          if (value<=0) {
            callback(new Error('不为0或者负数的值'));
          } else {
            callback();
          }
        }, 1000);
      };

      return {
        rules: {
          meetingName: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          startTime: [
            {validator:checkStartTime,type: 'date', trigger: 'change'}
          ],
          endTime: [
            {validator:checkEndTimeToStart,type: 'date', trigger: 'change'}
          ],
          numberOfParticipants: [
            {validator: checkNumberOfParticipants, trigger: 'change'}
          ],
          description: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        dialogFormVisible: false,
        form: {

        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear () {
        this.form = []
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
                    .post('/meeting/save', {
                      meetingId: this.form.meetingId,
                      meetingName: this.form.meetingName,
                      reservationIsTid: this.form.reservationIsTid,
                      numberOfParticipants: this.form.numberOfParticipants,
                      startTime: this.form.startTime,
                      endTime: this.form.endTime,
                      reservationTime: this.form.reservationTime,
                      canceledTime: this.form.canceledTime,
                      description: this.form.description,
                      status: this.form.status,
                      roodId: this.form.roodId,
                      roomName: this.form.roomName,
                      empName: this.form.empName,
                      canceledReason: this.form.canceledReason,

                    }).then(resp => {
              if (resp && resp.status === 200) {
                this.dialogFormVisible = false;
                this.$emit('onSubmit')
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
</style>


