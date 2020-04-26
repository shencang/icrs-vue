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
            <h4>当前已被预定教室</h4>
              <p v-bind:title="roomUsedCount">{{roomUsedCount}} 间</p>
          </el-card>
          <el-card>
            <h4>可用教室分布情况</h4>
            <el-table :data="tableClassroom7day" ref="multipleTable">
              <el-table-column type="selection" width="auto" ></el-table-column>
              <el-table-column type="index" label="序号" width="auto"></el-table-column>
              <el-table-column prop="meetingName" label="会议名称" width="auto"></el-table-column>
              <el-table-column prop="classroom" label="教室" width="auto"></el-table-column>
              <el-table-column prop="beginTime" label="起始时间" width="auto"></el-table-column>
              <el-table-column prop="endTime" label="结束时间" width="auto"></el-table-column>
              <el-table-column type="operation" label="操作" width="auto"></el-table-column>
          </el-table>
              <el-button>立刻查看</el-button>
          </el-card>
        <el-card>
          <h4>当前我已经参与的预约</h4>
          <p>x</p>
        </el-card>
          <el-card>
            <h3>立刻预约教室</h3>
          </el-card>
          </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'ClassroomSituation',
      data() {
          return {
              nowTime: "当前页面时间：" + new Date().toLocaleString(),
              roomCount:0,
              roomUsedCount:0,
              roomUnusedCount:0,
              tableClassroom7day:[{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              },{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              },{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              },{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              },{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              },{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              },{
                  meetingName:'text',
                  classroom:'testRoom',
                  beginTime:'2020-3-15',
                  endTime:'2020-3-16',


              }]
          }

      },
      mounted: function () {
          this.countByAllRoom();
          this.countByUsedRoom();
          this.countByUnusedRoom();
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
          countByUsedRoom(){
              const _this =this;
              const url ='rooms/used-count'
              this.$axios.get(url).then(resp=>{
                  if (resp && resp.data.code ===200 ){
                      _this.roomUsedCount = resp.data.result
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
