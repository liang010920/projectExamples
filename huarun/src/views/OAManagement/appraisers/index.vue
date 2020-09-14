<template>
  <div class="container">
    <div class="appraisers">
      <h2 style="color: #000;">人员健康评估</h2>
      <div class="appraisers_title">
        <!-- <div class="item_Add">
          <el-button type="primary">添加人员<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>-->
        <div class="item_input">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="按人员名称查询">
              <el-input v-model="search_Input" placeholder="人员名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="item_input">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="按健康状态查询">
              <el-select
                v-model="health_status"
                @change="change_health_status(health_status)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in health_Option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="item_input">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="按评估状态查询">
              <el-select
                v-model="assess_status"
                @change="change_assess_status(assess_status)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in assessStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="item_input" style="margin:0 20px">
          <el-button size="mini" @click="reset_status()" type="primary">重置</el-button>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item_table">
        <el-table
          :header-cell-style="tableHeaderColor"
          :row-style="tableRowStyle"
          :data="tableData"
          style="width: 100%;background-color: #fff !important;"
          height="670px"
        >
          <el-table-column prop="healthDate" align="center" label="日期" width="220"></el-table-column>
          <el-table-column prop="HealthMemberName" align="center" label="姓名" width="150"></el-table-column>
          <el-table-column prop="HealthMemberTel" align="center" label="电话" width="180"></el-table-column>
          <el-table-column label="评估医生" width="150" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.HealthMemberDoctorName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="评估医生电话" align="center" width="180">
            <template slot-scope="scope">
              <div>{{ scope.row.HealthMemberDoctorTel}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="MemberStatusHealth" align="center" label="健康状态" width="150">
            <template slot-scope="scope" align="center">
              <div class="warnOne" v-if="scope.row.healthLevel =='3'">患&nbsp;&nbsp; 病</div>
              <div class="warnTwo" v-if="scope.row.healthLevel =='2'">亚健康</div>
              <div class="warnThree" v-if="scope.row.healthLevel =='1'">健&nbsp;&nbsp; 康</div>
            </template>
          </el-table-column>
          <el-table-column label="评估内容" align="left">
            <template slot-scope="scope">
              <el-popover title="评估内容" width="150" trigger="hover" :content="scope.row.healthIntro">
                <div
                  slot="reference"
                  style="width:200px;overflow:hidden;white-space:nowrap ;text-overflow:ellipsis;"
                >{{ scope.row.healthIntro }}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="120" label="操作" align="left">
            <template slot-scope="scope" align="center">
              <div>
                <span
                  class="warnOne"
                  style="padding-right:20px;"
                  @click="getTableInfo(scope.row)"
                >详情</span>
                <span class="warnThree" @click="delete_btn(scope.row.ID)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="getPageIndex"
            @prev-click="getPrevPage"
            @next-click="getNextPage"
            :total="totalRow"
          ></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="人员信息评估" :visible.sync="IS_show_appraisers">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="人员名称">
          <el-input v-model="memberName" placeholder="请填写人员名称"></el-input>
        </el-form-item>
        <el-form-item label="人员电话">
          <el-input v-model="memberTel" placeholder="请填写人员电话"></el-input>
        </el-form-item>
        <el-form-item label="评估医生">
          <el-input v-model="HealthMemberDoctorName" placeholder="请填写评估医生"></el-input>
        </el-form-item>
        <el-form-item label="医生电话">
          <el-input v-model="HealthMemberDoctorTel" placeholder="请填写医生电话"></el-input>
        </el-form-item>
        <el-form-item label="健康状态">
          <ul class="item_ul">
            <li :class="{bgcolor : healthLevel == '1'}" @click="healthLevel =1">健康</li>
            <li :class="{bgcolor : healthLevel == '2'}" @click="healthLevel =2">亚健康</li>
            <li :class="{bgcolor : healthLevel == '3'}" @click="healthLevel =3">患病</li>
          </ul>
        </el-form-item>
        <el-form-item label="评估详情">
          <el-input type="textarea" v-model="HealthIntro" :rows="7" placeholder="请给出人员评估"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_appraisers = false">取 消</el-button>
        <el-button type="primary" @click="save()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { objDeepCopy } from '@/utils'

// API
import {
  workbenchList,
  MemberHealthAdd,
  GetMemberHealthList,
  MemberHealthDelete
} from '@/api/oamanagement/workbench'
export default {
  components: {},
  data() {
    return {
      IS_show_appraisers: false,
      search_Input: '',
      health_status: '',
      assess_status:'',

      id: '',
      healthMemberId: '',
      healthMemberDoctorId: '',
      memberName: '',
      memberTel: '',
      healthLevel: '',
      HealthIntro: '',
      HealthMemberDoctorName: '',
      HealthMemberDoctorTel: '',

      memberAddress: '暂无',
      medical_History: '暂无',
      pageIndex: 1,
      pageSize: 20,
      tableData: [],
      totalRow: 0,
      loading: false,
      form: {},
      health_Option: [
        { value: '1', label: '健康' },
        { value: '2', label: '亚健康' },
        { value: '3', label: '患病' }
      ],
      assessStatusList: [
        { value: '0', label: '待评估' },
        { value: '1', label: '已评估' }
      ]
    }
  },
  mounted() {
    this.getMemberList()
  },
  methods: {
    getMemberList(val) {
      let t_data = this
      if (val == undefined) {
        val = ''
      }
      let param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
        healthLevel: t_data.health_status,
        healthStatus: t_data.assess_status,
        memberName: val
      }
      t_data.loading = true
      GetMemberHealthList(param).then(res => {
        t_data.totalRow = res.info.totalRow
        t_data.tableData = res.info.list
        t_data.loading = false
        // console.log("res.info.totalRow------res-------"+JSON.stringify( res.info.list))
      })
    },

    save() {
      let t_data = this
      var params = {
        ID: t_data.id,
        HealthMemberId: t_data.healthMemberId,
        HealthMemberDoctorId: t_data.healthMemberDoctorId,
        HealthLevel: t_data.healthLevel,
        HealthIntro: t_data.HealthIntro
      }

      console.log('params------------' + JSON.stringify(params))

      MemberHealthAdd(params).then(res => {
        t_data.IS_show_appraisers = false
        console.log('MemberHealthAdd------res-------' + JSON.stringify(res))

        if (!res.status) {
          this.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }
        this.$notify({
          title: '温馨提示',
          message: '保存成功',
          type: 'success'
        })
        t_data.getMemberList()
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
          MemberHealthDelete(param).then(res => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }

            t_data.getMemberList()
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
      return 'color: #000;font-size:16px; background-color:#fff;'
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #000;background-color:#fff;height:65px;'
    },
    getPageIndex(val) {
      this.pageIndex = val
      this.getMemberList()
    },
    getPrevPage() {
      this.pageIndex--
      this.getMemberList()
    },
    getNextPage() {
      this.pageIndex++
      this.getMemberList()
    },
    reset_status() {
      this.search_Input = ''
      this.health_status = ''
      this.assess_status = ''
      this.getMemberList()
    },
    change_health_status(val) {
      this.health_status = val
      this.getMemberList()
    },
    change_assess_status(val){
      this.assess_status = val
      this.getMemberList()
    },

    getTableInfo(row) {
      console.log('row-----------' + JSON.stringify(row))
      this.id = row.ID
      this.healthMemberId = row.healthMemberId
      this.healthMemberDoctorId = row.healthMemberDoctorId
      this.healthLevel = row.healthLevel
      this.memberName = row.HealthMemberName
      this.memberTel = row.HealthMemberTel
      this.HealthIntro = row.healthIntro
      this.HealthMemberDoctorName = row.HealthMemberDoctorName
      this.HealthMemberDoctorTel = row.HealthMemberDoctorTel
      this.IS_show_appraisers = true
    }
  },
  watch: {
    search_Input(val) {
      this.getMemberList(val)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/tabs.scss';
.container {
  max-width: 1680px;
  min-width: 1080px;
  padding: 10px;
  .appraisers {
    color: #fff;
    .appraisers_title {
      height: 70px;
      margin-top: 10px;

      .item_Add {
        display: inline-block;
        padding: 10px 20px;
      }
      .item_dataTime {
        display: inline-block;
        padding: 10px 20px;
      }
      .item_input {
        display: inline-block;
        padding: 10px 0;
      }
    }
    .item_table {
      width: 100%;
      .assess_style {
        width: 180px;
        overflow: hidden;
        white-space: normal nowrap;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .item_ul {
    li {
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #eee;
      border-radius: 4px;
      float: left;
      margin: 5px 15px;
      cursor: pointer;
    }
    .bgcolor {
      color: #fff;
      background-color: #3e84e9;
    }
  }
  .block {
    text-align: right;
  }
  .item {
    background-color:#fff;
    color: #000;
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
  .el-table,
  .el-table__expanded-cell {
    background-color: rgba(33, 42, 85, 1) !important;
    border: none;
  }
  .el-table__body {
    padding: 30px;
  }
  .el-table th,
  .el-table tr {
    background-color: rgba(33, 42, 85, 1) !important;
    border: none;
  }
  .el-table::before {
    height: 0;
  }
  // 分页
}
</style>
