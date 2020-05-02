<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加组织</el-button>
    <el-dialog
            title="修改组织信息"
            :visible.sync="dialogFormVisible"
            @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="组织名称" :label-width="formLabelWidth" prop="departmentName">
          <el-input v-model="form.departmentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.departmentId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditForm',
    data () {
      return {
        dialogFormVisible: false,
        form: {
          departmentId: '',
          departmentName: '',

        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear () {
        this.form = {
          departmentId: '',
          departmentName: '',

        }
      },
      onSubmit () {
        this.$axios
                .post('/department/save', {
                  departmentId: this.form.departmentId,
                  departmentName: this.form.departmentName,

                }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false;
            this.$emit('onSubmit')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
</style>


