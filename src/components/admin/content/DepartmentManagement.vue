<template>
  <div>
    <el-row style="margin: 18px 1px 1px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
      <edit-form @onSubmit="loadDepartment()" ref="edit"></edit-form>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
              :data="departments"
              stripe
              style="width: 100%"
              :max-height="tableHeight"
              :default-sort="{prop: 'departmentId', order: 'descending'}">
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
                prop="departmentId"
                label="组织ID"
                sortable
                width="auto">
        </el-table-column>
          <el-table-column
                  prop="departmentName"
                  label="组织名称">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.departmentName }}</el-tag>
                  </div>
              </template>
          </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="120">
<!--          这里修改了slot-scope -->
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="editDepartment(scope.row)"
                    type="text"
                    size="small">
              编辑
            </el-button>
            <el-button
                    @click.native.prevent="deleteDepartment(scope.row.departmentId)"
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
    import EditForm from "./EditFormDepartment";
  export default {
    name: 'DepartmentManagement',
      components: {EditForm},

      data () {
          return {
              departments: [],

          }
      },
      mounted: function () {
          this.loadDepartment()
      },
      methods: {
          loadDepartment() {
              const _this = this;
              this.$axios.get('/department').then(resp => {
                  if (resp && resp.status === 200) {
                      _this.departments = resp.data.result
                  }
              })
          },
          deleteDepartment (departmentId) {
              this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                      this.$axios
                          .post('/department/delete', {departmentId: departmentId}).then(resp => {
                          if (resp && resp.status === 200) {
                              this.loadDepartment()
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
          editDepartment (item) {
              this.$refs.edit.dialogFormVisible = true;
              this.$refs.edit.form = {
                  departmentId: item.departmentId,
                  departmentName: item.departmentName,
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
