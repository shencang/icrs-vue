<template>
    <el-card class="container">
        <h1 align="left">近一周内有效预定活动：</h1>
        <el-table
                :data="tableSevenDay"
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
        </el-table>
        <h1 align="left">所有有效预定活动：</h1>
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
        </el-table>
    </el-card>
</template>
<script>

    import moment from "moment";

    export default {
        name: 'Process',
        props: {
            list: Array
        },
        data() {
            return {
                reverse: true,
                table: [{
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
                tableSevenDay: [{
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
                }]
            };
        },
        mounted() {
            this.loadMeetingListOfUser()
            this.loadMeetingListOfUserSevenDay()
        },
        methods: {
            surplusTime(startTime) {
                return moment(startTime, "YYYY-MM-DD  HH:mm:ss").fromNow();
            },

            loadMeetingListOfUser() {
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

            loadMeetingListOfUserSevenDay() {
                const _this = this
                this.$axios.post('/querySevenDayMeetOfUser', {
                    username: sessionStorage.getItem("DIS_username")
                }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            _this.tableSevenDay = resp.data.result;
                            console.log(_this.tableSevenDay)

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
