<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>教室管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
      <edit-form @onSubmit="loadRooms()" ref="edit"></edit-form>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
              :data="rooms"
              stripe
              style="width: 100%"
              :max-height="tableHeight">
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
                prop="roomName"
                label="教室名称"
                fit>
        </el-table-column>
        <el-table-column
                prop="roomNum"
                label="教室号码"
                fit>
        </el-table-column>
        <el-table-column
                prop="capacity"
                label="教室容量"
                fit>
        </el-table-column>
          <el-table-column
                  prop="position"
                  label="教室位置"
                  fit>
          </el-table-column>
          <el-table-column
                  prop="description"
                  label="描述与备注"
                  fit>

          </el-table-column>
          <el-table-column
                  label="状态"
                  fit>
              <template slot-scope="scope">
                  <span v-if="scope.row.status===1">房间存在预约</span>
                  <span v-if="scope.row.status===0">房间没有预约</span>
                  <span v-if="scope.row.status===-1">房间不可用</span>
              </template>
          </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="120">
<!--          这里修改了slot-scope -->
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="editRoom(scope.row)"
                    type="text"
                    size="small">
              编辑
            </el-button>
            <el-button
                    @click.native.prevent="deleteRoom(scope.row.roomId)"
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
    import EditForm from "./EditFormRoom";
  export default {
    name: 'RoomManagement',
      components: {EditForm},

      data () {
          return {
              rooms: [],

          }
      },
      mounted: function () {
          this.loadRooms()
      },
      methods: {
          loadRooms() {
              const _this = this;
              this.$axios.get('/rooms').then(resp => {
                  if (resp && resp.status === 200) {
                      _this.rooms = resp.data.result
                  }
              })
          },
          deleteRoom (roomId) {
              this.$confirm('此操作将永久删除该教室, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                      this.$axios
                          .post('/rooms/delete', {roomId: roomId}).then(resp => {
                          if (resp && resp.status === 200) {
                              this.loadRooms()
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
          editRoom (item) {
              this.$refs.edit.dialogFormVisible = true;
              this.$refs.edit.form = {
                  roomId: item.roomId,
                  roomNum: item.roomNum,
                  roomName: item.roomName,
                  capacity: item.capacity,
                  status: item.status,
                  position: item.position,
                  description: item.description,

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
