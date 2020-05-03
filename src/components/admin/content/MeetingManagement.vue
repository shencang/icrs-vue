<template>
  <div>
    <el-row style="margin: 18px 1px 1px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
      <edit-form @onSubmit="loadMeeting()" ref="edit"></edit-form>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
              :data="meetings"
              stripe
              style="width: 100%"
              :max-height="tableHeight"
              :default-sort="{prop: 'startTime', order: 'descending'}">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
          <el-table-column type="expand">
              <template slot-scope="props">
                  <el-form label-position="left" inline>
                      <el-form-item>
                          <span>{{ props.row.abs }}</span>
                      </el-form-item>
                  </el-form>
              </template>
          </el-table-column>
        <el-table-column
                label="开始时间"
                sortable
                width="auto">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="结束时间"
                sortable
                width="auto">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="meetingName"
                label="会议名称"
                sortable
                width="auto">
        </el-table-column>
          <el-table-column
                  prop="roomName"
                  label="会议室">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.roomName }}</el-tag>
                  </div>
              </template>
          </el-table-column>
          <el-table-column
                  prop="numberOfParticipants"
                  label="活动人数">
          </el-table-column>
          <el-table-column
                  prop="description"
                  label="描述">
          </el-table-column>
          <el-table-column
                  prop="empName"
                  label="预定用户">
          </el-table-column>
          <el-table-column
                  prop="roomName"
                  label="预定教室">
          </el-table-column>
          <el-table-column
                  prop="canceledTime"
                  label="取消时间">
          </el-table-column>
          <el-table-column
                  prop="canceledReason"
                  label="取消原因">
          </el-table-column>
          <el-table-column
                  label="预定时间">
              <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.reservationTime }}</span>
              </template>
          </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="120">
<!--          这里修改了slot-scope -->
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="editMeeting(scope.row)"
                    type="text"
                    size="small">
              编辑
            </el-button>
            <el-button
                    @click.native.prevent="deleteMeeting(scope.row.meetingId)"
                    type="text"
                    size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
    import EditForm from "./EditFormMeeting";
  export default {
    name: 'MeetingManagement',
      components: {EditForm},

      data () {
          return {
              meetings: [],

          }
      },
      mounted: function () {
          this.loadMeeting()
      },
      methods: {
          loadMeeting() {
              const _this = this;
              this.$axios.get('/meeting').then(resp => {
                  if (resp && resp.status === 200) {
                      _this.meetings = resp.data.result
                  }
              })
          },
          deleteMeeting (meetingId) {
              console.log(meetingId)
              this.$confirm('此操作将永久删除该会议, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                      this.$axios
                          .post('/meeting/delete', {meetingId: meetingId}).then(resp => {
                          if (resp && resp.status === 200) {
                              this.loadMeeting()
                          }
                      })
                  }
              ).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  })
              })
              // alert(id)
          },
          editMeeting (item) {
              this.$refs.edit.dialogFormVisible = true;
              this.$refs.edit.form = {
                  meetingId: item.meetingId,
                  meetingName: item.meetingName,
                  reservationIsTid: item.reservationIsTid,
                  numberOfParticipants: item.numberOfParticipants,
                  startTime: item.startTime,
                  endTime: item.endTime,
                  reservationTime: item.reservationTime,
                  canceledTime:item.canceledTime,
                  description:item.description,
                  status:item.status,
                  roodId:item.roodId,
                  roomName:item.roomName,
                  empName:item.empName,
                  canceledReason:item.canceledReason

              }
          },
      },
      computed: {
          tableHeight () {
              return window.innerHeight - 320
          }
      },
  }
</script>

<style scoped>

</style>
