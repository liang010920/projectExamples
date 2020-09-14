<template>
  <div class="container">
    <h2 style="color: #000000;">标签管理</h2>

    <div class="member_title">
      <div class="item_Add">
        <el-button type="primary" @click="getMemberAdd()">
          添加
          <i class="el-icon-upload el-icon--right"/>
        </el-button>
      </div>
    </div>
    <div class="item">
      <div class="item_member">
        <div
          v-loading="loading"
          class="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        />
        <el-table
          :header-cell-style="tableHeaderColor"
          :row-style="tableRowStyle"
          :data="tableData"
          height="670px"
          style="width: 100%"
        >
          <el-table-column prop="MemberDateUpdate" label="日期" width="180" align="center"/>
          <el-table-column prop="MemberName" label="姓名" width="180" align="center"/>
          <el-table-column prop="MemberTel" label="账号" width="180"/>
          <el-table-column prop="MemberType" label="角色类型" align="left">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.MemberType == 9">管理员</span>
                <span v-if="scope.row.MemberType == 3">医生</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="180" label="操作" align="left">
            <template slot-scope="scope">
              <div>
                <span
                  class="warnOne"
                  style="padding-right:20px;"
                  @click="Member_btn(scope.row.ID)"
                >编辑</span>
                <span class="warnThree" @click="delete_btn(scope.row.ID)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            :page-size="pageSize"
            :total="totalRow"
            layout="prev, pager, next"
            @current-change="getPageIndex"
            @prev-click="getPrevPage"
            @next-click="getNextPage"
          />
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="Is_Show_Member" title="标签管理">
      <div class="item_Info">
        <el-form :model="member_form" label-width="120px">
          <el-form-item label="标签名称:">
            <el-input v-model="member_form.memberName" type="text" placeholder="请填写标签名称"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_Member = false">取 消</el-button>
        <el-button type="primary" @click="Member_save()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetMemberAdminList,
  MemberAdminAdd,
  GetMemberAdminInfo,
  MemberAdminDelete,
  GetSysUserRoleList,
  GetSysUserRoleInfo
} from '@/api/oamanagement/workbench'
export default {
  data() {
    return {
      Is_Show_Member: false,
      loading: false,
      totalRow: 0,
      pageIndex: 1,
      pageSize: 20,
      member_form: {
        ID: '0',
        memberName: '',
        memberTel: '',
        memberPwd: '',
        select_value: '',
        memberIntro: '',
        memberroleid: '9'
      },
      optionList: [],
      tableData: []
    }
  },
  created() {
    this.GetSysUserRoleList()
    this.GetMemberAdminList()
  },
  methods: {
    getmemberIntro() {
      const t_data = this
      const param = {
        id: t_data.member_form.select_value
      }
      GetSysUserRoleInfo(param).then(res => {
        if (res.status) {
          t_data.member_form.memberIntro = res.info.UserRolePowerMenu
        }
      })
    },
    GetMemberAdminList(val) {
      const t_data = this
      if (val == undefined) {
        val = ''
      }
      const param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
        memberName: val
      }
      t_data.loading = true
      GetMemberAdminList(param).then(res => {
        t_data.totalRow = res.info.totalRow
        t_data.tableData = res.info.list
        t_data.loading = false
      })
    },

    GetSysUserRoleList() {
      const t_data = this
      const param = {
        roleType: '9'
      }

      GetSysUserRoleList(param).then(res => {
        t_data.optionList = res.info.list
      })
    },
    getMemberAdd() {
      this.Is_Show_Member = true
      this.member_form.ID = '0'
      this.member_form.memberName = ''
      this.member_form.memberTel = ''
      this.member_form.memberPwd = ''
    },
    Member_save() {
      const t_data = this

      if (t_data.member_form.memberName == '') {
        this.$message.error('请输入人员姓名')
        return
      }
      if (t_data.member_form.memberTel == '') {
        this.$message.error('请输入人员账号')
        return
      }
      if (t_data.member_form.memberPwd == '') {
        this.$message.error('请输入人员密码')
        return
      }

      const param = t_data.member_form
      console.log('-----------param' + JSON.stringify(param))
      MemberAdminAdd(param).then(res => {
        if (!res.status) {
          this.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }
        if (t_data.member_form.ID == '0') {
          t_data.Is_Show_Member = false
          t_data.member_form.memberName = ''
          t_data.member_form.memberTel = ''
          t_data.member_form.memberPwd = ''
          t_data.GetMemberAdminList()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          t_data.Is_Show_Member = false
          t_data.member_form.ID = '0'
          t_data.GetMemberAdminList()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    Member_btn(id) {
      const t_data = this
      t_data.Is_Show_Member = true
      const param = {
        id: id
      }
      GetMemberAdminInfo(param).then(res => {
        t_data.member_form.ID = res.info.ID
        t_data.member_form.memberName = res.info.MemberName
        t_data.member_form.memberTel = res.info.MemberTel
        t_data.member_form.memberPwd = res.info.MemberPwd
        t_data.member_form.memberIntro = res.info.MemberIntro
      })
    },
    delete_btn(id) {
      const t_data = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const param = {
            id: id
          }
          MemberAdminDelete(param).then(res => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }

            t_data.GetMemberAdminList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    getPageIndex(val) {
      this.pageIndex = val
      this.GetMemberAdminList()
    },
    getPrevPage() {
      this.pageIndex--
      this.GetMemberAdminList()
    },
    getNextPage() {
      this.pageIndex++
      this.GetMemberAdminList()
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
  height: 100%;
  padding: 10px;
  .member_title {
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
