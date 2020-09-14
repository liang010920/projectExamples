<template>
  <div class="container">
    <h2 style="color: #000000;">权限管理</h2>

    <div class="authority_title">
      <div class="item_Add">
        <el-button type="primary" @click="getAuthorityAdd()">
          添加
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    </div>
    <div class="item">
      <div class="item_authority">
        <el-table
          :header-cell-style="tableHeaderColor"
          :row-style="tableRowStyle"
          :data="tableData"
          height="670px"
          style="width: 100%"
        >
          <el-table-column prop="UserRoleName" label="角色名称" width="180" align="center"></el-table-column>
          <el-table-column prop label="角色类型" width="180" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.UserRoleLoginTypeID == 9">管理员</div>
              <div v-if="scope.row.UserRoleLoginTypeID == 3">医生</div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="角色备注"></el-table-column>
          <el-table-column width="180" label="操作" align="left">
            <template slot-scope="scope">
              <div>
                <span
                  class="warnOne"
                  style="padding-right:20px;"
                  @click="authority_btn(scope.row.ID)"
                >编辑</span>
                <span class="warnThree" @click="delete_btn(scope.row.ID)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="权限管理" :visible.sync="Is_Show_authority">
      <div class="item_Info">
        <el-form :model="authority_form" label-width="120px">
          <el-form-item label="角色名称:">
            <el-input
              type="text"
              v-model="authority_form.UserRoleName"
              :rows="7"
              placeholder="请填写角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色备注:">
            <el-input
              type="text"
              v-model="authority_form.UserRoleMemo"
              :rows="7"
              placeholder="请填写角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色类型:">
            <el-select v-model="authority_form.UserRoleType" placeholder="请选择">
              <el-option
                v-for="item in optionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单类型:" v-if="authority_form.UserRoleType ==3">
            <el-tree
              :data="doctor_List"
              show-checkbox
              default-expand-all
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="authority_form.UserRolePowerMenu"
              ref="tree"
              highlight-current
              :props="defaultProps"
            ></el-tree>
          </el-form-item>
          <el-form-item label="菜单类型:" v-if="authority_form.UserRoleType ==9">
            <el-tree
              :data="authority_List"
              show-checkbox
              default-expand-all
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="authority_form.UserRolePowerMenu"
              ref="tree"
              highlight-current
              :props="defaultProps"
            ></el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_authority = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetSysUserRoleList,
  SysUserRoleAdd,
  GetSysUserRoleInfo,
  SysUserRoleDelete
} from '@/api/oamanagement/workbench'
export default {
  data() {
    return {
      Is_Show_authority: false,
      totalRow: 0,
      pageIndex: 1,
      pageSize: 50,
      tableData: [
        {
          name: '超级管理员',
          address: ''
        }
      ],
      authority_form: {
        ID: '0',
        UserRoleName: '',
        UserRoleMemo: '',
        UserRoleType: '',
        UserRolePowerMenu: [1]
      },
      optionList: [
        {
          value: 3,
          label: '医生'
        },
        {
          value: 9,
          label: '管理员'
        }
      ],
      authority_List: [
        {
          id: 1,
          label: '首页------'
        },
        {
          id: 2,
          label: '实时监测--'
        },
        {
          id: 3,
          label: '统计分析--'
        },
        {
          id: 4,
          label: '异常预警--'
        },
        {
          id: 5,
          label: '健康评估--'
        },
        {
          id: 6,
          label: '健康档案--'
        },
        {
          id: 7,
          label: '健康知识--'
        },
        {
          id: 10,
          label: '系统管理--'
        }
      ],
      doctor_List: [
        {
          id: 1,
          label: '首页------'
        },
        {
          id: 2,
          label: '实时监测--'
        },
        {
          id: 3,
          label: '统计分析--'
        },
        {
          id: 4,
          label: '异常预警--'
        },
        {
          id: 5,
          label: '健康评估--'
        },
        {
          id: 6,
          label: '健康档案--'
        },
        {
          id: 7,
          label: '健康知识--'
        },
        {
          id: 8,
          label: '我的资料--'
        },
        {
          id: 9,
          label: '我的消息--'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.GetSysUserRoleList()
  },
  methods: {
    //获取列表
    GetSysUserRoleList() {
      let t_data = this
      let param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
        roleType: ''
      }
      GetSysUserRoleList(param).then(res => {
        t_data.totalRow = res.info.totalRow
        t_data.tableData = res.info.list
      })
    },

    //添加
    getAuthorityAdd() {
      this.Is_Show_authority = true
      this.authority_form.ID = '0'
      this.authority_form.UserRoleName = ''
      this.authority_form.UserRoleType = ''
      this.authority_form.UserRolePowerMenu = ''
    },
    //保存
    authority_save() {
      let t_data = this

      let param = t_data.authority_form
      console.log('-----------param' + JSON.stringify(param))
      SysUserRoleAdd(param).then(res => {
        if (!res.status) {
          this.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }
        if (t_data.authority_form.ID == '0') {
          t_data.Is_Show_authority = false
          t_data.authority_form.UserRoleName = ''
          t_data.authority_form.UserRoleType = ''
          t_data.authority_form.UserRolePowerMenu = ''
          t_data.GetSysUserRoleList()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          t_data.Is_Show_authority = false
          t_data.authority_form.ID = '0'
          t_data.GetSysUserRoleList()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },

    getCheckedKeys() {
      let t_data = this
      if (t_data.authority_form.UserRoleName == '') {
        this.$message.error('请输入角色名称')
        return
      }
      if (t_data.authority_form.UserRoleType == '') {
        this.$message.error('请输入角色类型')
        return
      }

      console.log(this.$refs.tree.getCheckedKeys())
      this.authority_form.UserRolePowerMenu = this.$refs.tree.getCheckedKeys()

      if (t_data.authority_form.UserRolePowerMenu == '') {
        this.$message.error('请选择菜单类型')
        return
      }

      this.authority_save()
    },
    authority_btn(id) {
      let t_data = this
      let param = {
        id: id
      }
      GetSysUserRoleInfo(param).then(res => {
        t_data.authority_form.ID = res.info.ID
        t_data.authority_form.UserRoleName = res.info.UserRoleName
        t_data.authority_form.UserRoleType = res.info.UserRoleLoginTypeID
        t_data.authority_form.UserRolePowerMenu = JSON.parse(
          res.info.UserRolePowerMenu
        )
        t_data.Is_Show_authority = true
      })
    },
    delete_btn(id) {
      let t_data = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let param = {
            id: id
          }
          SysUserRoleDelete(param).then(res => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }

            t_data.GetSysUserRoleList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'color: #000;font-size:16px; background-color: #fff;'
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #000;background-color: #fff;height:65px;'
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  max-width: 1680px;
  min-width: 1080px;
  color: #fff;
  padding: 10px;
  .authority_title {
    height: 70px;
    margin-top: 10px;
    .item_Add {
      display: inline-block;
      padding: 10px 20px;
    }
  }
  .item {
    background-color:#fff;
    padding: 20px;
  }
  /* 预警等级 */
  .warnTwo {
    color: #e6a23c;
    cursor: pointer;
  }

  .warnOne {
    color: #409eff;
    cursor: pointer;
  }

  .warnThree {
    color: #f56c6c;
    cursor: pointer;
  }

  .block {
    text-align: right;
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: #fff !important;
    border: none;
  }
  .el-table__body {
    padding: 30px;
  }
  .el-table::before {
    height: 0;
  }
  .el-table th,
  .el-table tr {
    background-color: rgba(33, 42, 85, 1) !important;
    border: none;
  }
  // 分页

}
</style>
