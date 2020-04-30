<template>
    <div class="container">
      <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      label="会议室"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click.native.prevent="deleteRow(scope.$index,scope.row, list)">取消预定</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Cancel',
    props:{
      list: Array
    },

      methods: {
      deleteRow(index, rows, data) {
          let params = new URLSearchParams();
          params.append('boardroomId',rows.boardroomId,);
          params.append('date',rows.date,);
          axios.post('/deleteReservationById',params)
                .then((res) => {
                    if(res.data === 'success'){
                        data.splice(index, 1);
                    }else{
                        this.message({
                            message:'删除失败',
                            type:'warning'
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                }) 
      }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../styles/varibles.styl'
    .container
        padding 0 100px
</style>
