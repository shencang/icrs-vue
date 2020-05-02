<template>
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
  </el-table>

<!--  <el-table :data="list" style="width: 100%;padding-top: 15px;">-->
<!--    <el-table-column label="Donate_No" min-width="200">-->
<!--      <template slot-scope="scope">-->
<!--        {{ scope.row.order_no | orderNoFilter }}-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column label="amount" width="195" align="center">-->
<!--      <template slot-scope="scope">-->
<!--        ¥{{ scope.row.price | toThousandFilter }}-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column label="Status" width="100" align="center">-->
<!--      <template slot-scope="{row}">-->
<!--        <el-tag :type="row.status | statusFilter">-->
<!--          {{ row.status }}-->
<!--        </el-tag>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--  </el-table>-->
</template>

<script>
// import { transactionList } from '@/api/remote-search'


export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter (str) {
      return str.substring(0, 30)
    }
  },
  data () {
    return {
      list: null,
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
    }
  },
  created () {
    this.fetchData()
  },
  mounted() {
    this.loadMeetingListOfUser()
  },
  methods: {
    fetchData () {
      // transactionList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
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

    }
  }
}
</script>
