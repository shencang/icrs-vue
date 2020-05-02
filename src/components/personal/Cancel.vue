<template>
    <el-card class="container">
        <h1 align="left">目前有效预订活动</h1>
        <el-table
                :data="table"
                style="width: 100%"
                :default-sort="{prop: 'startTime', order: 'descending'}"
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
                    label="预定时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.reservationTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="剩余时间">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{surplusTime(scope.row.startTime) }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">取消预订</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1 align="left">已经取消的活动</h1>
        <el-table
                :data="tableCancel"
                style="width: 100%"
                :default-sort="{prop: 'startTime', order: 'descending'}"
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
                    label="预定时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.reservationTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="取消时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.canceledTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="canceledReason"
                    label="取消原因">
            </el-table-column>
        </el-table>
        <h1 align="left">超时过期活动：</h1>
        <el-table
                :data="tableTimeout"
                style="width: 100%"
                :default-sort="{prop: 'startTime', order: 'descending'}"
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
                    label="预定时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.reservationTime }}</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>
<script>
    import moment from "moment";

    export default {
        name: 'Cancel',
        props: {
            list: Array
        },
        data() {
            return {
                table: [{
                    meetingId:'',
                    meetingName: '',
                    roomId: '',
                    numberOfParticipants: '',
                    reservationTime: '',
                    empName: '',
                    roomName: '',
                    startTime: '',
                    endTime: '',
                    description: '',
                    reservationIsTid: '',
                    status: '',
                }],
                tableCancel: [{
                    meetingId:'',
                    meetingName: '',
                    roomId: '',
                    numberOfParticipants: '',
                    reservationTime: '',
                    empName: '',
                    roomName: '',
                    startTime: '',
                    endTime: '',
                    description: '',
                    reservationIsTid: '',
                    status: '',
                    canceledReason:'',//取消原因
                    canceledTime:''//取消时间
                }],
                tableTimeout: [{
                    meetingId:'',
                    meetingName: '',
                    roomId: '',
                    numberOfParticipants: '',
                    reservationTime: '',
                    empName: '',
                    roomName: '',
                    startTime: '',
                    endTime: '',
                    description: '',
                    reservationIsTid: '',
                    status: '',
                }],
                search: ''
            }
        },
        mounted() {
            this.loadMeetingListOfUser()
            this.loadMeetingListOfUserCancel()
            this.loadMeetingListOfUserTimeout()

        },
        methods: {

            handleDelete(index, row) {
                console.log(index, row);
               // _this = this;deleteRoom (roomId) {
                this.$prompt('此操作将立刻取消预订, 是否继续?如果继续,请输入取消原因。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(({ value }) => {
                        this.$axios
                            .post('/meeting/cancel', {
                                meetingId: row.meetingId,
                                canceledTime:moment().format("YYYY-MM-DD HH:mm:ss"),
                                canceledReason:value.toString(),

                            }).then(resp => {
                            if (resp && resp.status === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '取消预订成功!'
                                });
                                this.loadMeetingListOfUser()
                                this.loadMeetingListOfUserCancel()
                                this.loadMeetingListOfUserTimeout()
                            }
                        })
                    }
                ).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    })
                })
                // alert(id)
            },


            deleteRow(index, rows, data) {
                let params = new URLSearchParams();
                params.append('boardroomId', rows.boardroomId,);
                params.append('date', rows.date,);
                this.$axios.post('/deleteReservationById', params)
                    .then((res) => {
                        if (res.data === 'success') {
                            data.splice(index, 1);
                        } else {
                            this.message({
                                message: '删除失败',
                                type: 'warning'
                            })
                        }
                    }).catch((error) => {
                    console.log(error)
                })
            }, surplusTime(startTime) {
                return moment(startTime, "YYYY-MM-DD  HH:mm:ss").fromNow();
            },

            loadMeetingListOfUser() {
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
            },
            loadMeetingListOfUserCancel() {
                console.log(sessionStorage.getItem("DIS_username"))
                const _this = this
                this.$axios.post('meeting/get/user_cancel', {
                    username: sessionStorage.getItem("DIS_username")
                }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            _this.tableCancel = resp.data.result;

                        }
                    }
                )
            },
            loadMeetingListOfUserTimeout() {
                console.log(sessionStorage.getItem("DIS_username"))
                const _this = this
                this.$axios.post('meeting/get/user_timeout', {
                    username: sessionStorage.getItem("DIS_username")
                }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            _this.tableTimeout = resp.data.result;

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
        padding 0 100px
</style>
