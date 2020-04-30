<template>
    <el-card  class="container">
        <el-table
                :data="table"
                style="width: 100%"
                :default-sort = "{prop: 'startTime', order: 'descending'}"
        >
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
                    prop="reservationTime"
                    label="预定时间">
            </el-table-column>
            <el-table-column
                    prop="surplusTime"
                    label="测试">
            </el-table-column>
            <el-table-column
                    label="剩余时间">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.reservationTime }}</el-tag>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>

import moment from "moment";

export default {
    name: 'Process',
    props:{
      list:Array
    },
    data() {
      return {
        reverse: true,
          table:[{
              meetingName:'',
              roomId:'',
              numberOfParticipants:'',
              reservationTime:'',
              empName:'',
              roomName:'',
              startTime:'',
              endTime:'',
              description:'',
              reservationIsTid:'',
              status:'',
              surplusTime:''
          }],
      };
    },
    mounted(){
        this.loadMeetingListOfUser()
    },
    methods: {
        surplusTimeQ(startTime){
            this.surplusTime = moment().format("YYYY-MM-DD HH:mm:ss")
            const times = this.surplusTime.diff(startTime);
            console.log(times)
            return times;
        },

        loadMeetingListOfUser(){
                console.log(sessionStorage.getItem("DIS_username"))
                const _this = this
                this.$axios.post('meeting/get/user_used', {
                    username: sessionStorage.getItem("DIS_username")
                }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            _this.table = resp.data.result;

                        }
                    }
                )

        }
    },
}
</script>
<style lang="stylus" scoped>
    @import '../../styles/varibles.styl'
    .container
        padding 0 20px
        .list
            padding 0 100px
            textStyle()
            .title
                color $bgColor
                font-size 15px
            .el-timeline
                margin-top 10px
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
