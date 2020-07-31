<template>
  <div class="container" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="报警统计" name="first">
        <el-radio-group v-model="tabPosition" style="padding:0 20px 10px" @change="getData_tabPosition">
          <el-radio-button label="天">天</el-radio-button>
          <el-radio-button label="月">月</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-if="tabPosition == '月'"
          v-model="value1"
          type="monthrange"
          :start-placeholder="dateStart"
          :end-placeholder="dateEnd"
          @change="getDateTime_Warn"
          placeholder="选择月"
        ></el-date-picker>
        <el-date-picker
          v-if="tabPosition == '天'"
          v-model="value1"
          type="daterange"
          :start-placeholder="dateStart"
          :end-placeholder="dateEnd"
          @change="getDateTime_Warn"
          placeholder="选择日期"
        ></el-date-picker>
        <div class="item_flex">
          <div class="blood_Pressure">
            <div class="item_title"><h3>预警次数统计</h3></div>
            <div id="blood_PressureEcharts"></div>
          </div>
          <div class="item">
            <div class="table_Status">
              <h3>报警记录</h3>
              <el-table :header-cell-style="tableHeaderColor" :row-style="tableRowStyle" :data="tableData" style="width: 100% ;height:630px">
                <el-table-column prop="WarnDate" align="center" label="日期" width="180"></el-table-column>
                <el-table-column prop="WarnMemberName" align="center" label="姓名" width="80"></el-table-column>
                <el-table-column prop="WarnValue" label="血压指标" align="center" width="120"></el-table-column>
                <el-table-column prop="WarnLevel" label="预警等级" width="150">
                  <template slot-scope="scope" align="center">
                    <div class="warnOne" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.WarnLevel == '1'">{{ scope.row.WarnLevel }}级预警</div>
                    <div class="warnTwo" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.WarnLevel == '2'">{{ scope.row.WarnLevel }}级预警</div>
                    <div class="warnThree" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.WarnLevel == '3'">{{ scope.row.WarnLevel }}级预警</div>
                  </template>
                </el-table-column>
                <el-table-column prop="WarnIntro" label="通知信息" width="250">
                  <template slot-scope="scope">
                    <el-popover placement="right" title="评估内容" width="240" trigger="hover" :content="scope.row.WarnIntro">
                      <div slot="reference" style="width:240px;overflow:hidden;white-space:nowrap ;text-overflow:ellipsis;">{{ scope.row.WarnIntro }}</div>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
      </el-tab-pane>
      <el-tab-pane label="报警处理" name="second">
        <div class="item_input">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <el-form label-width="120px">
                  <el-form-item label="按人员名称查询"><el-input v-model="search_Input" placeholder="人员名称"></el-input></el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-dark">
                <el-form label-width="120px">
                  <el-form-item label="按评估状态查询">
                    <el-select v-model="value_select_option" @change="change_Warn_status(value_select_option)" placeholder="请选择">
                      <el-option v-for="(item, index) in status_assess_option" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-dark">
                <el-form label-width="120px">
                  <el-form-item label="按报警通知查询">
                    <el-select v-model="value_select_police" @change="change_Police_status(value_select_police)" placeholder="请选择">
                      <el-option v-for="(item, index) in status_police_option" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-dark" style="margin:5px 20px"><el-button size="mini" @click="reset_status()" type="primary">重置</el-button></div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-table :header-cell-style="tableHeaderColor" :row-style="tableRowStyle" :data="tableData" style="width: 100% ;height:630px">
            <el-table-column prop="WarnDate" label="日期" width="180"></el-table-column>
            <el-table-column prop="WarnMemberName" label="姓名" width="130"></el-table-column>
            <el-table-column prop="WarnLevel" label="预警等级" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="info" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.WarnLevel == '1'">{{ scope.row.WarnLevel }}级预警</el-button>
                <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.WarnLevel == '2'">{{ scope.row.WarnLevel }}级预警</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.WarnLevel == '3'">{{ scope.row.WarnLevel }}级预警</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="WarnTypeName" label="提醒类别" width="100" align="center"></el-table-column>
            <el-table-column prop="WarnValue" label="指标数据" width="150" align="center"></el-table-column>
            <el-table-column label="评估状态" width="100">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain v-if="!scope.row.WarnStatusIsHealth" @click="Warn_assess_No(scope.$index, scope.row)">未评估</el-button>
                <el-button size="mini" type="primary" v-if="scope.row.WarnStatusIsHealth" @click="Warn_assess_Yes(scope.$index, scope.row)">已评估</el-button>
              </template>
            </el-table-column>
            <el-table-column label="短信通知" width="180" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain v-if="!scope.row.WarnStatusIsSend" @click="Warn_inform_No(scope.row)">未通知</el-button>
                <el-button size="mini" type="info" v-if="scope.row.WarnStatusIsSend" @click="Warn_inform_Yes(scope.$index, scope.row)">已通知</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="电话通知" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="Warn_PhoneTel_No(scope.$index, scope.row)"
              >未通知</el-button>
            </template>
            </el-table-column>-->

            <el-table-column prop="WarnIntro" label="通知信息">
              <template slot-scope="scope">
                <el-popover placement="right" title="通知" width="200" trigger="hover" :content="scope.row.WarnIntro">
                  <div slot="reference" style="width:220px;overflow:hidden;white-space:nowrap ;text-overflow:ellipsis;">{{ scope.row.WarnIntro }}</div>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column width="200" label="操作" align="left">
              <template slot-scope="scope" align="center">
                <div>
                  <span class="warnOne" style="padding-right:20px;" @click="getTableInfo(scope.row)">详情</span>
                  <span class="warn2" style="padding-right:20px;" @click="getTableInfo2(scope.row)">处理</span>
                  <span class="warnThree" @click="delete_btn(scope.row.ID)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      </el-tab-pane>
      <el-tab-pane label="报警设置" name="setting">
        <div v-for="(item, index) in WarnSettingList" :key="item.DeviceId">
          <el-form ref="form" :model="form2" label-width="120px">
            <el-row>
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <el-form-item label="预警等级:">{{ item.WarnLevel }}</el-form-item>
                </div>
              </el-col>
              <el-col :span="4" v-if="item.WarnField == 'T01'">
                <div class="grid-content bg-purple">
                  <el-form-item label="血压值">
                    <el-input type="text" v-model="input_price_blood[index]" placeholder="请输入血压值" @change="getInput_price_blood(index)"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4" v-else>
                <div class="grid-content bg-purple">
                  <el-form-item label="心率值">
                    <el-input type="text" v-model="input_price_blood[index]" placeholder="请输入心率值" @change="getInput_price_blood(index)"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">
                  <el-form-item label="报警内容"><el-input type="text" v-model="input_warnInfo[index]" readonly="readonly"></el-input></el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-row>
          <el-col :span="14" style="text-align:center;margin-top:50px;">
            <div class="grid-content bg-purple">
              <el-button @click="reset_btn_warn()">重置</el-button>
              <el-button type="primary" style="margin:0 30px;" @click="save_setting()">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- <div id="transform" v-if="Is_show_health ==true">
      <h3>健康预警</h3>
      <div class="flex">
        <span>小马:</span>
        <span>2019-05-05</span>
      </div>
      <p>血压53mmHg低于预警值</p>
      <div class="manage_btn" @click="Is_show_health =false">处理</div>
    </div>-->
    <el-dialog title="人员信息评估" :visible.sync="Is_Show_assess">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-form label-width="120px">
                <el-form-item label="人员名称"><el-input v-model="memberName" readonly="readonly"></el-input></el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-dark" style="margin:5px 20px">
              <el-form label-width="120px"><el-button size="mini" type="primary" @click="GetMemberHealthList()">个人评估记录</el-button></el-form>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <el-form label-width="120px">
                <el-form-item label="血压值"><el-input v-model="blood_price" placeholder="血压值" readonly="readonly"></el-input></el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <el-form label-width="120px">
                <el-form-item label="心率值"><el-input v-model="heart_price" placeholder="心率值" readonly="readonly"></el-input></el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-form label-width="120px">
                <el-form-item label="医生姓名:">
                  <el-input placeholder="请搜索姓名" v-model="doctor_SearchInput" class="input-with-select" :disabled="true">
                    <el-button slot="append" icon="el-icon-search" @click="(Is_Show_doctor = true), GetMemberDoctorList()"></el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="人员通知"><el-input v-model="memberInform" readonly="readonly"></el-input></el-form-item>
        <el-form-item label="健康状态">
          <ul class="item_ul">
            <li :class="{ bgcolor: HealthLevel == '1' }" @click="HealthLevel = 1">健康</li>
            <li :class="{ bgcolor: HealthLevel == '2' }" @click="HealthLevel = 2">亚健康</li>
            <li :class="{ bgcolor: HealthLevel == '3' }" @click="HealthLevel = 3">患病</li>
          </ul>
        </el-form-item>
        <el-form-item label="人员评估"><el-input type="textarea" v-model="textarea_assess" :rows="7" placeholder="请给出人员评估"></el-input></el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_assess = false">取 消</el-button>
        <el-button type="primary" @click="save_assess()">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="个人评估记录" :visible.sync="Is_Show_MyAssessInfo">
      <div class="memberAssess" style="overflow-x: hidden">
        <el-table :data="tableData_AssessInfo" stripe style="width: 100%">
          <el-table-column prop="healthDate" label="日期" width="180"></el-table-column>
          <el-table-column prop="MemberStatusHealth" label="健康状态" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" v-if="scope.row.healthLevel == '3'">患&nbsp;&nbsp; 病</el-button>
              <el-button size="mini" type="warning" v-if="scope.row.healthLevel == '2'">亚健康</el-button>
              <el-button size="mini" type="primary" v-if="scope.row.healthLevel == '1'">健&nbsp;&nbsp; 康</el-button>
            </template>
          </el-table-column>
          <el-table-column label="评估内容">
            <template slot-scope="scope">
              <el-popover placement="right" title="评估内容" width="200" trigger="hover" :content="scope.row.healthIntro">
                <div slot="reference" style="width:250px;overflow:hidden;white-space:nowrap ;text-overflow:ellipsis;">{{ scope.row.healthIntro }}</div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_MyAssessInfo = false">取 消</el-button>
        <el-button type="primary" @click="Is_Show_MyAssessInfo = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="医生查询" :visible.sync="Is_Show_doctor">
      <div>
        <el-form label-width="80px">
          <el-form-item label="医生名称"><el-input v-model="doctor_InputValue" placeholder="请填写人员名称"></el-input></el-form-item>
        </el-form>
      </div>
      <div class="memberList" v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <ul>
          <li v-for="(item, index) in doctorList" :key="index" :class="{ bgcolor: list_index == index }" @click="getDocto_item(index, item.ID, item.MemberName)">
            {{ item.MemberName }}
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_doctor = false">取 消</el-button>
        <el-button type="primary" @click="Is_Show_doctor = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="消息详情" :visible.sync="IS_show_warn">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="设备名称"><el-input v-model="warnInfo.WarnDeviceName"></el-input></el-form-item>
        <el-form-item label="消息内容"><el-input v-model="warnInfo.WarnIntro"></el-input></el-form-item>
        <el-form-item label="预警人员"><el-input v-model="warnInfo.WarnMemberName"></el-input></el-form-item>
        <el-form-item label="人员电话"><el-input v-model="warnInfo.WarnMemberTel"></el-input></el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_warn = false">取 消</el-button>
        <el-button type="primary" @click="IS_show_warn = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="消息处理" :visible.sync="IS_show_warn2">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="设备名称"><el-input v-model="warnInfo.WarnDeviceName"></el-input></el-form-item>
        <el-form-item label="消息内容"><el-input v-model="warnInfo.WarnIntro"></el-input></el-form-item>
        <el-form-item label="通知人员">
          <ul class="item_ul">
            <li :class="{ bgcolor: warnMember == '1' }" @click="getWarnMemberTel(1)">紧急联系人</li>
            <li :class="{ bgcolor: warnMember == '2' }" @click="getWarnMemberTel(2)">第二联系人</li>
            <li :class="{ bgcolor: warnMember == '3' }" @click="getWarnMemberTel(3)">监护医生</li>
          </ul>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_warn2 = false">取 消</el-button>
        <el-button type="primary" @click="Warn_inform_No(memberWarnInfo)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  workbenchList,
  WarnList,
  WarnSettingList,
  UpdateWarnSettingList,
  MemberHealthAdd,
  GetMemberHealthList,
  GetDeviceWarnChart,
  GetMemberHealthInfo_ByWarnId,
  GetMemberDoctorList,
  SendSms,
  MemberInfo,
  DeviceWarnDelete,
  SendTel
} from '@/api/oamanagement/workbench';
import { ymd } from '@/utils/filter';
export default {
  components: {},
  data() {
    return {
      IS_show_warn: false,
      IS_show_warn2: false,
      warnMember: '',
      Is_show_health: true,
      Is_Show_MyAssessInfo: false,
      Is_Show_doctor: false,
      pageIndex: 1,
      pageSize: 20,
      tableData: [],
      tableData_AssessInfo: [],

      doctorList: '',
      list_index: '-1',
      doctor_SearchInput: '',
      doctor_InputValue: '',
      HealthMemberDoctorId: '',

      tabPosition: '月',
      value1: '',
      dateStart: '',
      dateEnd: '',
      memberStatusHealth: '',
      memberStatusSend: '',

      totalRow: 0,
      loading: false,
      loading2: false,
      activeName: 'first',
      Is_Show_assess: false,
      HealthLevel: '',
      search_Input: '',
      memberWarnInfo: {
        ID: '',
        WarnMemberTel: '',
        WarnType: '',
        WarnValue: ''
      },
      warnInfo: {
        WarnMemberId: '',
        WarnDeviceName: '',
        WarnIntro: '',
        WarnMemberName: '',
        WarnMemberTel: ''
      },

      form: {},
      form2: {},
      HealthWarnId: '',
      WarnMemberId: '',
      memberName: '',
      memberInform: '',
      textarea_assess: '',

      WarnSettingList: [],
      input_price_blood: '',
      input_warnInfo: '',

      blood_price: '',
      heart_price: '',

      textarea_Inform: '',
      value_select_police: '',
      status_police_option: [{ value: '0', label: '未通知' }, { value: '1', label: '已通知' }],
      value_select_option: '',
      status_assess_option: [{ value: '0', label: '未评估' }, { value: '1', label: '已评估' }],

      options: [
        {
          value: '选项1',
          label: '一级预警',
          color:'#000'
        },
        {
          value: '选项2',
          label: '二级预警'
        },
        {
          value: '选项3',
          label: '三级预警'
        },
      ]
    };
  },
  created() {},

  mounted() {
    this.getWarnSettingInfo();
    this.getNewData();
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'color: #000;font-size:16px; background-color: #fff;';
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #000;background-color: #fff;height:65px;';
    },
    getNewData() {
      var t_data = this;
      var myDate = new Date();
      t_data.dateStart = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + 1;
      t_data.dateEnd = myDate.getFullYear() + '-' + (myDate.getMonth() + 2) + '-' + 1;
      // console.log("开始时间-----------" + t_data.dateStart);
      // console.log("结束时间-----------" + t_data.dateEnd);
      this.getWarnList();
      this.GetDeviceWarnChart();
    },
    getDateTime_Warn() {
      let t_data = this;
      if (t_data.tabPosition == '天') {
        t_data.chartType = 'day';
        t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[0].getDate();
        t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + t_data.value1[1].getDate();
      }
      if (t_data.tabPosition == '月') {
        t_data.chartType = 'month';
        t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1 + '-' + 1);
        t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1 + '-' + 1);
      }
      this.getWarnList();
      this.GetDeviceWarnChart();
    },
    getData_tabPosition() {
      let t_data = this;
      var myDate = new Date();
      if (t_data.value1 == '') {
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
          t_data.dateEnd = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + new Date(myDate.getTime() + 24 * 60 * 60 * 1000).getDate();
          this.getWarnList();
          this.GetDeviceWarnChart();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = myDate.getFullYear() + '-' + (myDate.getMonth() + 1 + '-' + 1);
          t_data.dateEnd = myDate.getFullYear() + '-' + (myDate.getMonth() + 2 + '-' + 1);
          this.getWarnList();
          this.GetDeviceWarnChart();
        }
      } else {
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[0].getDate();
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + new Date(t_data.value1[1].getTime() + 24 * 60 * 60 * 1000).getDate();
          this.getWarnList();
          this.GetDeviceWarnChart();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1 + '-' + 1);
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 2 + '-' + 1);
          this.getWarnList();
          this.GetDeviceWarnChart();
        }
      }
    },

    //预警详情
    getTableInfo(row) {
      // console.log("row-----------" + JSON.stringify(row));
      this.warnInfo.WarnDeviceName = row.WarnDeviceName;
      this.warnInfo.WarnIntro = row.WarnIntro;
      this.warnInfo.WarnMemberName = row.WarnMemberName;
      this.warnInfo.WarnMemberTel = row.WarnMemberTel;
      this.warnInfo.WarnMemberId = row.WarnMemberId;

      this.IS_show_warn = true;
    },
    //预警处理
    getTableInfo2(row) {
      // console.log("row-----------" + JSON.stringify(row));
      this.warnInfo.WarnMemberId = row.WarnMemberId;
      this.warnInfo.WarnDeviceName = row.WarnDeviceName;
      this.warnInfo.WarnIntro = row.WarnIntro;
      this.memberWarnInfo.ID = row.ID;
      this.memberWarnInfo.WarnType = row.WarnType;
      this.memberWarnInfo.WarnValue = row.WarnValue;

      this.getMemberInfo();

      this.IS_show_warn2 = true;
    },
    getWarnMemberTel(index) {
      this.warnMember = index;

      if (index == 1) {
        this.memberWarnInfo.WarnMemberTel = this.memberInfo.MemberContactMan1Tel;
      }
      if (index == 2) {
        this.memberWarnInfo.WarnMemberTel = this.memberInfo.MemberContactMan2Tel;
      }
      if (index == 3) {
        this.memberWarnInfo.WarnMemberTel = this.memberInfo.MemberContactMan3Tel;
      }
    },

    getMemberInfo() {
      let t_data = this;
      let param = {
        id: t_data.warnInfo.WarnMemberId
      };
      MemberInfo(param).then(res => {
        t_data.memberInfo = res.info;
      });
    },

    //获取报警数据
    getWarnList(val) {
      let t_data = this;
      if (val == undefined) {
        val = '';
      }
      let param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
        memberName: val,
        dateStart: t_data.dateStart,
        dateEnd: t_data.dateEnd,
        memberStatusHealth: t_data.memberStatusHealth,
        memberStatusSend: t_data.memberStatusSend
      };

      t_data.loading = true;
      WarnList(param).then(res => {
        t_data.totalRow = res.info.totalRow;
        t_data.tableData = res.info.list;
        t_data.loading = false;
      });
    },

    GetMemberDoctorList(val) {
      let t_data = this;
      if (val == undefined) {
        val = '';
      }
      let param = {
        memberName: val
      };
      t_data.loading2 = true;
      GetMemberDoctorList(param).then(res => {
        t_data.doctorList = res.info.list;
        t_data.loading2 = false;
      });
    },
    getDocto_item(index, id, name) {
      this.list_index = index;
      this.HealthMemberDoctorId = id;
      this.doctor_SearchInput = name;
    },

    //获取报警设置信息
    getWarnSettingInfo() {
      let t_data = this;

      WarnSettingList().then(res => {
        t_data.WarnSettingList = res.info;
        var blood = [];
        var warnInfo = [];

        for (let i = 0; i < t_data.WarnSettingList.length; i++) {
          blood.push(t_data.WarnSettingList[i].WarnValue2);
          warnInfo.push(t_data.WarnSettingList[i].WarnLevelName);
        }

        t_data.input_price_blood = blood;
        t_data.input_warnInfo = warnInfo;
      });
    },

    //个人评估记录
    GetMemberHealthList() {
      let t_data = this;
      let param = {
        memberName: t_data.memberName
      };
      t_data.Is_Show_MyAssessInfo = true;
      GetMemberHealthList(param).then(res => {
        t_data.tableData_AssessInfo = res.info.list;
      });
    },

    //分页
    getPageIndex(val) {
      this.pageIndex = val;
      this.getWarnList();
    },
    getPrevPage() {
      this.pageIndex--;
      this.getWarnList();
    },
    getNextPage() {
      this.pageIndex++;
      this.getWarnList();
    },

    //tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    handleDelete(index, row) {
      // console.log(index, row);
    },

    Warn_assess_No(index, row) {
      // console.log(index, row);
      this.Is_Show_assess = true;
      this.HealthWarnId = row.ID;
      this.WarnMemberId = row.WarnMemberId;
      this.memberName = row.WarnMemberName;
      if (row.WarnTypeName == '血压') {
        this.blood_price = row.WarnValue;
      } else {
        this.heart_price = row.WarnValue;
      }
      this.memberInform = row.WarnIntro;
      this.HealthLevel = '';
      this.textarea_assess = '';
    },
    Warn_assess_Yes(index, row) {
      // console.log(index, row);
      let t_data = this;
      t_data.Is_Show_assess = true;
      t_data.HealthWarnId = row.ID;
      t_data.WarnMemberId = row.WarnMemberId;
      t_data.memberName = row.WarnMemberName;
      t_data.memberInform = row.WarnIntro;
      let param = {
        warnId: row.ID
      };
      GetMemberHealthInfo_ByWarnId(param).then(res => {
        t_data.HealthLevel = res.info.healthLevel;
        t_data.textarea_assess = res.info.healthIntro;
      });
    },

    delete_btn(id) {
      let t_data = this;
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let param = {
            id: id
          };
          DeviceWarnDelete(param).then(res => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }

            t_data.getWarnList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    //报警通知
    Warn_inform_No(row) {
      let t_data = this;
      if (row.WarnMemberTel == '') {
        this.$message.error('请选择通知人员');
        return;
      }
      let param = {
        warnId: row.ID,
        memberTel: row.WarnMemberTel,
        memberFieldName: row.WarnType,
        memberFieldValue: row.WarnValue
      };
      SendSms(param).then(res => {
        this.$notify({
          title: '温馨提示',
          message: '通知成功',
          type: 'success'
        });
        t_data.getWarnList();
        t_data.IS_show_warn2 = false;
      });
    },

    //报警通知
    Warn_inform_Yes() {
      this.$message({
        message: '亲，这条记录已经通知过了哦',
        type: 'success'
      });
    },

    //电话通知
    Warn_PhoneTel_No(index, row) {
      // console.log(index, row);
      let t_data = this;
      let param = {
        warnId: row.ID,
        memberTel: '15690658201',
        memberFieldName: row.WarnType,
        memberFieldValue: row.WarnValue
      };
      SendTel(param).then(res => {
        this.$notify({
          title: '温馨提示',
          message: '通知成功',
          type: 'success'
        });
        t_data.getWarnList();
      });
    },

    //重置报警设置内容
    reset_btn_warn() {
      this.memberStatusHealth = '';
      this.memberStatusSend = '';
      this.input_price_blood = [];
    },

    //重置查询条件
    reset_status() {
      this.search_Input = '';
      this.value_select_police = '';
      this.value_select_option = '';
      (this.memberStatusHealth = ''), (this.memberStatusSend = ''), this.getWarnList();
    },
    //按评估状态查询
    change_Warn_status(val) {
      this.memberStatusHealth = val;
      this.getWarnList();
    },
    //按评估状态查询
    change_Police_status(val) {
      this.memberStatusSend = val;
      this.getWarnList();
    },

    //修改报警设置
    save_setting() {
      let t_data = this;
      let param = t_data.WarnSettingList;

      UpdateWarnSettingList(param).then(res => {
        if (res.status) {
          this.$notify({
            title: '温馨提示',
            message: '保存成功',
            type: 'success'
          });
        }
      });
    },

    //修改血压
    getInput_price_blood(index) {
      let t_data = this;
      for (var i = 0; i < t_data.WarnSettingList.length; i++) {
        if (i == index) {
          t_data.WarnSettingList[index].WarnValue2 = t_data.input_price_blood[index];
        }
      }
    },

    //保存评估信息
    save_assess() {
      let t_data = this;
      if (t_data.HealthMemberDoctorId == '') {
        this.$message.error('请选择医生');
        return;
      }
      if (t_data.HealthLevel == '') {
        this.$message.error('请选择评估健康状态');
        return;
      }
      if (t_data.textarea_assess == '') {
        this.$message.error('请填写评估内容');
        return;
      }
      let param = {
        ID: 0,
        HealthMemberId: t_data.WarnMemberId,
        HealthMemberDoctorId: t_data.HealthMemberDoctorId,
        HealthWarnId: t_data.HealthWarnId,
        HealthLevel: t_data.HealthLevel,
        HealthIntro: t_data.textarea_assess
      };
      MemberHealthAdd(param).then(res => {
        if (res.status) {
          this.$notify({
            title: '温馨提示',
            message: '评估成功',
            type: 'success'
          });
        }

        t_data.Is_Show_assess = false;
        t_data.HealthLevel = '';
        t_data.textarea_assess = '';
        t_data.getWarnList();
      });
    },
    GetDeviceWarnChart() {
      let t_data = this;
      let param = {
        dateStart: t_data.dateStart,
        dateEnd: t_data.dateEnd
      };

      GetDeviceWarnChart(param).then(res => {
        // console.log("res.info.chart1" + JSON.stringify(res.info.chart1));

        t_data.getBlood_PressureEcharts(res.info.chart1);
      });
    },

    //统计报警次数
    getBlood_PressureEcharts(data) {
      let t_data = this;
      let echarts = require('echarts');
      let myChart = t_data.$echarts.init(document.getElementById('blood_PressureEcharts'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['一级预警', '二级预警', '三级预警'],
          textStyle: {
            fontSize: 18, //字体大小
            color: '#000' //字体颜色
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              fontSize: 18, //字体大小
              color: '#bdc7da' // x坐标轴颜色
            }
          },
          data: data.dataX
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              fontSize: 18, //字体大小
              color: '#bdc7da' // x坐标轴颜色
            }
          }
        },
        series: [
          {
            name: '一级预警',
            type: 'bar',
            barWidth: 130,
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: data.dataY1
          },
          {
            name: '二级预警',
            type: 'bar',
            barWidth: 130,
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: data.dataY2
          },
          {
            name: '三级预警',
            type: 'bar',
            barWidth: 130,
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: data.dataY3
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  watch: {
    search_Input(val) {
      this.getWarnList(val);
    },
    doctor_InputValue(val) {
      this.GetMemberDoctorList(val);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/tabs.scss';
.container {
  max-width: 1680px;
  min-width: 1080px;
  height: 100%;
  // background: #fff;
  .memberList {
    height: 250px;
    margin: 0 30px;
    overflow-x: hidden;
    background-color: #eee;
    .bgcolor {
      color: #fff;
      background-color: #3e84e9;
    }
    ul li {
      width: 100px;
      height: 35px;
      line-height: 35px;
      color: #333;
      background-color: #f5f5f5;
      border-radius: 6px;
      margin: 10px;
      overflow: hidden;
      float: left;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
    }
  }
  #transform {
    position: fixed;
    bottom: 15px;
    right: 25px;
    width: 300px;
    height: 250px;
    border: 1px solid #333;
    background-color: #fff;
    animation: bounceInRight 1.2s;
    font-size: 15px;
    h3 {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: #eee;
    }
    p {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
    }
    .manage_btn {
      width: 70px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin: 20px auto 0;
      color: #fff;
      background-color: #c23531;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .item_flex {
    display: flex;
    .blood_Pressure {
      flex: 1;
      .item_title {
        color: #000;
        padding: 20px 0 0 30px;
      }
      #blood_PressureEcharts {
        height: 550px;
        width: 100%;
      }
    }
    .table_Status {
      position: relative;
      flex: 1;
      margin-left: 10px;
      color: #fff;
      h3 {
        height: 35px;
      }
      .warnGrade_btn {
        color: #fff;
        background-color: #333;
      }
      .block {
        position: absolute;
        bottom: 0;
        left: 20px;
      }
    }
  }
  .item_ul {
    li {
      width: 80px;
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
  .memberAssess {
    padding-top: 10px;
    height: 509px;
    background: #fff;
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
  .warn2 {
    color: #0dbc79;
    cursor: pointer;
  }

  .warnThree {
    color: #f56c6c;
    cursor: pointer;
  }
  /deep/.el-form-item__label {
    color: #000 !important;
  }
  /deep/.el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid rgba(43, 51, 90, 1);
  }
  /deep/.el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid rgba(43, 51, 90, 1);
  }
  /deep/.el-table tbody tr:hover > td {
    background-color: rgba(43, 51, 90, 1) !important;
    color:#fff;
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: #fff !important;
    color:#000;
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

  /deep/.el-pagination button:disabled {
    background-color: #fff !important;
    border: 1px solid #ccc;
    margin: 0 10px;
  }
  /deep/.el-pagination .btn-prev,
  /deep/.el-pagination .btn-next {
    background-color: #fff !important;
    margin: 0 10px;
    color: #000;
  }
  /deep/.el-pager li {
    background-color: #fff !important;
    border: 1px solid #ccc;
    color: #000;
    margin: 0 2px;
  }
  /deep/.el-pager>li.active{
    background-color: #3e84e9;
  }
  /deep/.el-tabs__item {
    color: #000;
  }

  /deep/.el-tabs__content{
    background-color: #fff;
    padding-top: 20px;
  }
  /deep/.el-form-item__content{
    color: #000 !important;
  }

  // 弹出框
  /deep/.memberList {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
  }
  /deep/.el-input__inner {
    background-color: #fff !important;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  /deep/.el-dialog {
    background-color: rgba(33, 42, 85, 1) !important;
    padding: 30px;
  }
  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-form-item__label {
    color: #000;
  }
  /deep/.el-radio {
    color: #fff;
  }
  /deep/.el-textarea__inner {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
    border: none;
  }
  /deep/.el-dialog__body {
    color: #f56c6c;
  }
  /deep/.el-input-group__append,
  .el-input-group__prepend {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
    border: none;
  }
}
</style>
