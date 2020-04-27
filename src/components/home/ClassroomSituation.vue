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
            <el-table :data="classrooms" ref="multipleTable">
              <el-table-column type="selection" width="auto" ></el-table-column>
              <el-table-column type="index" label="序号" width="auto"></el-table-column>
              <el-table-column prop="roomName" label="教室名称" width="auto"></el-table-column>
              <el-table-column prop="capacity" label="教室容量" width="auto"></el-table-column>
              <el-table-column prop="position" label="教室位置" width="auto"></el-table-column>
              <el-table-column prop="description" label="描述与备注" width="auto"></el-table-column>
              <el-table-column type="operation" label="操作" width="auto">
                  <el-button-group>
                      <el-button>查看</el-button>
                      <el-button>预约</el-button>
                  </el-button-group>
              </el-table-column>
          </el-table>
          </el-card>
        <el-card>
          <h4>当前我已经参与的预约</h4>
            <el-table :data="classrooms" ref="multipleTable">
                <el-table-column type="selection" width="auto" ></el-table-column>
                <el-table-column type="index" label="序号" width="auto"></el-table-column>
                <el-table-column prop="roomName" label="教室名称" width="auto"></el-table-column>
                <el-table-column prop="capacity" label="教室容量" width="auto"></el-table-column>
                <el-table-column prop="position" label="教室位置" width="auto"></el-table-column>
                <el-table-column prop="description" label="描述与备注" width="auto"></el-table-column>
                <el-table-column type="operation" label="操作" width="auto">
                    <el-button-group>
                        <el-button>查看</el-button>
                        <el-button>预约</el-button>
                    </el-button-group>
                </el-table-column>
            </el-table>
        </el-card>
          <el-card>
            <h3>相关操作</h3>
              <p>
                  <el-row >
                      <el-col :span="6">
                          <el-button>查看教室</el-button>
                      </el-col>
                      <el-col :span="6">
                          <el-button>教室预约</el-button>
                      </el-col>
                      <el-col :span="6">
                          <el-button>其它操作</el-button>
                      </el-col>
                      <el-col :span="6">
                          <el-button>友情链接</el-button>
                      </el-col>
                  </el-row>

              </p>
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
              classrooms:[],

          }

      },
      mounted: function () {
          this.countByAllRoom();
          this.countByUsedRoom();
          this.countByUnusedRoom();
          this.usableRooms()
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
