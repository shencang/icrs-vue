<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight: bold;font-size: 20px">教室使用情况</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
    <div class="block">
      <el-timeline>
          <el-timeline-item v-bind:timestamp="nowTime" placement="top">
          <el-card>
            <h4>当前系统总记录教室数量</h4>
            <p v-bind:title="roomCount">{{roomCount}} 间，其中{{roomUnusedCount}} 间处于不可用状态</p>
          </el-card>
          <el-card>
            <h4>当前系统登记预定数量</h4>
              <p v-bind:title="usableMeetingCount">{{usableMeetingCount}} 有效活动，{{unUsableMeetingCount}}过期或者取消的活动 </p>
          </el-card>

          </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'ClassroomSituation',
      components:{

      },
      data() {
          return {
              nowTime: "当前页面时间：" + new Date().toLocaleString(),
              roomCount:0,
              roomUsedCount:0,
              roomUnusedCount:0,
              usableMeetingCount:0,
              unUsableMeetingCount:0,
              classrooms:[],

          }

      },
      mounted: function () {
          this.countByAllRoom();
          this.countByUsableMeeting()
          this.countByUnusedAndTimeoutMeeting()
          this.usableRooms()
          this.countByUnusedRoom()
      },

      methods: {
        countByAllRoom(){
            const _this =this;
            const url ='rooms/count'
            this.$axios.get(url).then(resp=>{
                if (resp && resp.data.code ===200 ){
                    _this.roomCount = resp.data.result
                }
            })
        },
          countByUsableMeeting(){
              const _this =this;
              const url ='meeting/get/count/classify/usable'
              this.$axios.get(url).then(resp=>{
                  if (resp && resp.data.code ===200 ){
                      _this.usableMeetingCount = resp.data.result
                  }
              })
          },
          countByUnusedAndTimeoutMeeting(){
              const _this =this;
              const url ='/meeting/get/count/classify/c&t'
              this.$axios.get(url).then(resp=>{
                  if (resp && resp.data.code ===200 ){
                      _this.unUsableMeetingCount= resp.data.result
                  }
              })

          },
          countByUnusedRoom(){
              const _this =this;
              const url ='rooms/unused-count'
              this.$axios.get(url).then(resp=>{
                  if (resp && resp.data.code ===200 ){
                      _this.roomUnusedCount = resp.data.result
                  }
              })
          },
          usableRooms(){
            const _this = this;
              const url ='rooms/usable-rooms'
            this.$axios.get(url).then(resp=>{
                if (resp&&resp.data.code===200){
                    _this.classrooms= resp.data.result;
                }
            })

          }
      }


  }
</script>

<style scoped>
  .box-card {
    margin-top: 5px;
    width: auto;
    height: auto;
    text-align: left;
  }
</style>
