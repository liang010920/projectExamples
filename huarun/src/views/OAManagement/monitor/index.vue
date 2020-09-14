<template>
  <div class="container">
    <div class="title_search_navbar" @click="Is_Show_Navbar = !Is_Show_Navbar">
      监护系统
      <i class="el-icon-s-unfold"></i>
    </div>
    <div class="item_Navbar" v-if="Is_Show_Navbar">
      <h1>监护系统</h1>
      <h4 :class="{ h4_active: tabIndex == 1 }" @click="(tabIndex = 1), (Is_Show_Navbar = false), getDeviceList()">监护对象</h4>
      <h4 :class="{ h4_active: tabIndex == 3 }" @click="(tabIndex = 3), (Is_Show_Navbar = false), GetMemberDoctorList()"
        v-if="memberLoginType.MemberType == '9'">监护医生</h4>
      <h4 :class="{ h4_active: tabIndex == 2 }" @click="emptyData()" v-if="memberLoginType.MemberType == '9'">添加监护对象</h4>
    </div>
    <div class="item_content" v-if="tabIndex == 1">
      <div class="content_title">
        <div class="title_search">
          <span style="margin: 0 10px;font-size:16px;display: inline-block;color:#000000;">按人员姓名查询</span>
          <input type="text" style="color: #000 !important;" placeholder="搜索" v-model="search_Input" />
          <el-button size="mini" type="primary" class="export" @click="Is_show_member = true" style="margin-left:30px;">
            导入人员
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
      <div class="content_item" style="overflow-y: scroll;height: 750px;">
        <div class="loading"></div>
        <ul>
          <li v-for="(item, index) in deviceList" :key="index" @click="open(item.ID)">
            <!-- <div class="title_name">
              <p>{{item.MemberDataT03}}/步</p>
              <p style="font-size:18px;">{{item.MemberName}}</p>
            </div>
            <div class="item_data">
              <p>{{item.MemberDataT01}}/bpm</p>
              <span>{{item.MemberDataT04}}/h</span>
            </div>
            <div class="item_time">
              <span>血压:{{item.MemberDataT02Height}}/{{item.MemberDataT02Low}}</span>
            </div>-->
            <div class="content_item_Name" :class="['status' + item.MemberStatusHealth]">
              <div class="content_item_Name_img" :class="['status' + item.MemberStatusHealth]"><img src="../../../../static/img/userpic/16.jpg"
                  style="width: 90px;height: 80px;border-radius: 50%;" /></div>
              <span>{{ item.MemberName }}</span>
            </div>
            <!-- <div class="content_item_qty">
              <div class="content_item_qty_info">
                <div style="color:#46AEC5">{{ item.MemberDataT03 }}</div>
                <span>步数</span>
                <span>(步)</span>
              </div>
              <div class="content_item_qty_info">
                <div style="color:#DE656C">{{ item.MemberDataT01 }}</div>
                <span>心跳</span>
                <span>(次/分)</span>
              </div>
              <div class="content_item_qty_info">
                <div style="color:#1983E9">{{ item.MemberDataT04 }}</div>
                <span>睡眠</span>
                <span>(h)</span>
              </div>
              <div class="content_item_qty_info">
                <div style="color:#DBBF5D">{{ item.MemberDataT02Height }}</div>
                <span>血压</span>
                <span>(mmHg)</span>
              </div>
            </div> -->
          </li>
        </ul>
      </div>
      <div class="block">
        <el-pagination layout="prev, pager, next" :page-size="pageSize" @current-change="getPageIndex" @prev-click="getPrevPage"
          @next-click="getNextPage" :total="totalRow"></el-pagination>
        <span style="margin:6px">共: {{ totalRow }} /人</span>
      </div>
    </div>
    <div class="Add_TutelageObject" v-if="tabIndex == 2 && memberLoginType.MemberType == '9'">
      <h1 style="color: #000000;">添加监护人员</h1>
      <div class="Add_Object">
        <!-- <h2>录入信息:</h2> -->
        <div class="item">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="人员名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入人员名称"></el-input>
            </el-form-item>
            <el-form-item label="人员电话" prop="memberTel">
              <el-input type="number" v-model="ruleForm.memberTel" placeholder="请输入人员电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="memberEmail">
              <el-input type="text" v-model="ruleForm.memberEmail" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="设备编号" prop="memberImei">
              <el-input type="number" v-model="ruleForm.memberImei" placeholder="请输入设备编号"></el-input>
            </el-form-item>
            <el-form-item label="人员地址">
              <v-distpicker :province="memberArea1" :city="memberArea2" :area="memberArea3" @selected="onSelected"></v-distpicker>
            </el-form-item>
            <el-form-item label="人员详细地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入人员详细地址"></el-input>
            </el-form-item>
            <el-form-item label="人员分类" prop="memberType">
              <el-radio-group v-model="ruleForm.memberType">
                <el-radio label="1">员工</el-radio>
                <el-radio label="2">领导</el-radio>
                <el-radio label="3">医生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="重大病史" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="0">有</el-radio>
                <el-radio label="1">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="过往病史" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" :rows="5" placeholder="请输入过往病史"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="item">
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="紧急联系人">
              <el-input type="text" v-model="ruleForm.memberContactMan1Name" placeholder="紧急联系人"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人电话">
              <el-input type="text" v-model="ruleForm.memberContactMan1Tel" placeholder="紧急联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="第二联系人">
              <el-input type="text" v-model="ruleForm.memberContactMan2Name" placeholder="第二联系人"></el-input>
            </el-form-item>
            <el-form-item label="第二联系人电话">
              <el-input type="text" v-model="ruleForm.memberContactMan2Tel" placeholder="第二联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="监护医生:">
              <el-input placeholder="请搜索姓名" v-model="ruleForm.memberContactMan3Name" class="input-with-select"
                :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="(isShow = true), GetMemberDoctorList()"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="监护医生电话">
              <el-input type="text" v-model="ruleForm.memberContactMan3Tel" placeholder="监护医生电话" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="item_content" v-if="tabIndex == 3 && memberLoginType.MemberType == '9'">
      <div class="content_title">
        <div class="title_search">
          <span style="margin: 0 10px;font-size:16px;color:#000;">按医生姓名查询</span>
          <input type="text" placeholder="搜索" v-model="search_Input2" />
          <span style="margin: 0 10px;font-size:16px;color:#000;">按审核状态查询</span>
          <el-select v-model="auditStatus" @change="change_auditStatus()" placeholder="请选择">
            <el-option v-for="item in auditStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button size="mini" @click="reset_status()" type="primary" style="margin: 0 20px;">重置</el-button>
          <el-button size="mini" type="primary" @click="memberDoctor_Add()" style="margin-left:30px;">添加监护医生</el-button>
        </div>
      </div>
      <div class="item">
        <div class="content_item">
          <div class="loading" v-loading="loading_Doctor"></div>
          <el-table :data="doctorList" :header-cell-style="tableHeaderColor" :row-style="tableRowStyle">
            <el-table-column prop="MemberDateUpdate" label="日期" width="180"></el-table-column>
            <el-table-column prop="MemberName" label="医生姓名" width="180"></el-table-column>
            <el-table-column prop="MemberTel" label="电话" width="220"></el-table-column>
            <el-table-column prop="MemberName" label="审核状态">
              <template slot-scope="scope">
                <div>
                  <span class="warnTwo" v-if="scope.row.MemberStatus == 1">已审核</span>
                  <span class="warnThree" v-if="scope.row.MemberStatus == 0">待审核</span>
                  <span class="warnOne" v-if="scope.row.MemberStatus == 2">已拒绝</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <div>
                  <span class="warnOne" style="padding-right:20px;" @click="compile_doctor(scope.row.ID)">详情</span>
                  <span class="warnTwo" style="padding-right:20px;" @click="getAuditStatus(scope.row)">审核</span>
                  <span class="warnThree" @click="delete_btn_doctor(scope.row.ID)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block">
        <el-pagination layout="prev, pager, next" :page-size="pageSize_Doctor" @current-change="getPageIndex_Doctor"
          @prev-click="getPrevPage_Doctor" @next-click="getNextPage_Doctor" :total="totalRow_Doctor"></el-pagination>
        <span style="margin:6px;color:#000;">共: {{ totalRow_Doctor }} /人</span>
      </div>
    </div>

    <el-dialog :visible.sync="IS_show_ECG">
      <el-tabs v-model="activeName2">

        <el-tab-pane label="实时数据" name="zero">
          <el-row style="height: 549px;">
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">99</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>脉搏</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>次/min</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">90</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>低血压</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>mmol/L</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">140</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>高血压</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>mmol/L</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="6" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">9999</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>步数</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>--</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">7</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>睡眠</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>--</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">85</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>平均动脉压</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>mmHg</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">75</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>心输出量</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>L/min</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="6" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">30</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>外周总阻力</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>mmHg*min/L</div>
               </el-col>
             </el-row>
           </el-col>
           <el-col span="5" align='center' class="kuang">
             <el-row>
               <el-col span="12" align="center">
                 <div><img src="../../../../static/img/user.png" style="width: 30px;height: 30px;"></div>
               </el-col>
               <el-col span="12" align="center">
                 <div class="value">115</div>
               </el-col>
             </el-row>
             <el-row class="data_margin">
               <el-col span="12" align="center">
                 <div>血液黏性</div>
               </el-col>
               <el-col span="12" align="center">
                 <div>Pa*s</div>
               </el-col>
             </el-row>
           </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="数据统计" name="first">
          <el-tabs style="padding:20px 0;" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="心率变化图(bpm)" name="first">
              <div class="day" v-if="tabPosition == '天'">
                <span>按天查询:</span>
                <el-date-picker v-model="value1" type="daterange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDateTime_ECG"></el-date-picker>
              </div>
              <div class="month" v-if="tabPosition == '月'">
                <span>按月查询:</span>
                <el-date-picker v-model="value1" type="monthrange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDateTime_ECG"></el-date-picker>
              </div>
              <el-radio-group v-model="tabPosition" style="margin:10px 10% 0 0;display: inline-block; float:right;"
                @change="getData_tabPosition">
                <el-radio-button label="天">天</el-radio-button>
                <el-radio-button label="月">月</el-radio-button>
              </el-radio-group>
              <div id="Device_Echert_ECG"></div>
            </el-tab-pane>
            <el-tab-pane label="高血压变化图(mmHg)" name="second">
              <div class="day" v-if="tabPosition == '天'">
                <span>按天查询:</span>
                <el-date-picker v-model="value1" type="daterange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDateTime_Blood"></el-date-picker>
              </div>
              <div class="month" v-if="tabPosition == '月'">
                <span>按月查询:</span>
                <el-date-picker v-model="value1" type="monthrange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDateTime_Blood"></el-date-picker>
              </div>
              <el-radio-group v-model="tabPosition" style="margin:10px 10% 0 0;display: inline-block; float:right;"
                @change="getData_tabPosition">
                <el-radio-button label="天">天</el-radio-button>
                <el-radio-button label="月">月</el-radio-button>
              </el-radio-group>
              <div id="Device_Echert_Blood"></div>
            </el-tab-pane>
            <el-tab-pane label="低血压变化图(mmHg)" name="third">
              <div class="day" v-if="tabPosition == '天'">
                <span>按天查询:</span>
                <el-date-picker v-model="value1" type="daterange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDevice_lowBlood"></el-date-picker>
              </div>
              <div class="month" v-if="tabPosition == '月'">
                <span>按月查询:</span>
                <el-date-picker v-model="value1" type="monthrange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDevice_lowBlood"></el-date-picker>
              </div>
              <el-radio-group v-model="tabPosition" style="margin:10px 10% 0 0;display: inline-block; float:right;"
                @change="getData_tabPosition">
                <el-radio-button label="天">天</el-radio-button>
                <el-radio-button label="月">月</el-radio-button>
              </el-radio-group>
              <div id="Device_Echert_lowBlood"></div>
            </el-tab-pane>
            <el-tab-pane label="步数变化图(步)" name="fourth">
              <div class="day" v-if="tabPosition == '天'">
                <span>按天查询:</span>
                <el-date-picker v-model="value1" type="daterange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDevice_step"></el-date-picker>
              </div>
              <div class="month" v-if="tabPosition == '月'">
                <span>按月查询:</span>
                <el-date-picker v-model="value1" type="monthrange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDevice_step"></el-date-picker>
              </div>
              <el-radio-group v-model="tabPosition" style="margin:10px 10% 0 0;display: inline-block; float:right;"
                @change="getData_tabPosition">
                <el-radio-button label="天">天</el-radio-button>
                <el-radio-button label="月">月</el-radio-button>
              </el-radio-group>
              <div id="Device_Echert_step"></div>
            </el-tab-pane>
            <el-tab-pane label="睡眠变化图(h)" name="end">
              <div class="day" v-if="tabPosition == '天'">
                <span>按天查询:</span>
                <el-date-picker v-model="value1" type="daterange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDevice_sleep"></el-date-picker>
              </div>
              <div class="month" v-if="tabPosition == '月'">
                <span>按月查询:</span>
                <el-date-picker v-model="value1" type="monthrange" :start-placeholder="dateStart" :end-placeholder="dateEnd"
                  @change="getDevice_sleep"></el-date-picker>
              </div>
              <el-radio-group v-model="tabPosition" style="margin:10px 10% 0 0;display: inline-block; float:right;"
                @change="getData_tabPosition">
                <el-radio-button label="天">天</el-radio-button>
                <el-radio-button label="月">月</el-radio-button>
              </el-radio-group>
              <div id="Device_Echert_sleep"></div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="人员信息" name="third">
          <div class="Add_Object">
            <div class="item" style="height: 549px;overflow-y: scroll;">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="人员名称">
                  <el-input v-model="ruleForm.name" placeholder="请输入人员名称"></el-input>
                </el-form-item>
                <el-form-item label="人员电话">
                  <el-input type="number" v-model="ruleForm.memberTel" placeholder="请输入人员电话"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址">
                  <el-input type="text" v-model="ruleForm.memberEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人">
                  <el-input type="text" v-model="ruleForm.memberContactMan1Name" placeholder="紧急联系人"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人电话">
                  <el-input type="text" v-model="ruleForm.memberContactMan1Tel" placeholder="紧急联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="第二联系人">
                  <el-input type="text" v-model="ruleForm.memberContactMan2Name" placeholder="第二联系人"></el-input>
                </el-form-item>
                <el-form-item label="第二联系人电话">
                  <el-input type="text" v-model="ruleForm.memberContactMan2Tel" placeholder="第二联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="监护医生:">
                  <el-input placeholder="请搜索姓名" v-model="ruleForm.memberContactMan3Name" class="input-with-select"
                    :disabled="true">
                    <el-button slot="append" icon="el-icon-search" @click="(isShow = true), GetMemberDoctorList()"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="监护医生电话">
                  <el-input type="text" v-model="ruleForm.memberContactMan3Tel" placeholder="监护医生电话" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="设备编号">
                  <el-input v-model="ruleForm.memberImei" placeholder="请输入设备编号"></el-input>
                </el-form-item>
                <el-form-item label="人员地址">
                  <v-distpicker :province="memberArea1" :city="memberArea2" :area="memberArea3" @selected="onSelected"></v-distpicker>
                </el-form-item>
                <el-form-item label="人员详细地址">
                  <el-input v-model="ruleForm.address" placeholder="请输入人员详细地址"></el-input>
                </el-form-item>
                <el-form-item label="人员分类">
                  <el-radio-group v-model="ruleForm.memberType">
                    <el-radio label="1">员工</el-radio>
                    <el-radio label="2">领导</el-radio>
                    <el-radio label="3">医生</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="重大病史">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="0">有</el-radio>
                    <el-radio label="1">无</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="过往病史">
                  <el-input type="textarea" v-model="ruleForm.desc" :rows="5" placeholder="请输入过往病史"></el-input>
                </el-form-item>
              </el-form>
            </div>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </div>
        </el-tab-pane>

        <el-tab-pane label="历史评估" name="fourth">
          <div class="item">
            <div class="memberAssess" style="overflow-x: hidden">
              <el-table :data="tableData_Assess" :header-cell-style="tableHeaderColor" :row-style="tableRowStyle" style="width: 100%">
                <el-table-column prop="healthDate" label="日期" width="215"></el-table-column>
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
          </div>
        </el-tab-pane>

        <el-tab-pane label="历史档案" name="five">
          <div class="item">
            <div class="memberAssess" style="overflow-x: hidden">
              <el-table :data="tableData_Record" :header-cell-style="tableHeaderColor" :row-style="tableRowStyle" style="width: 100%">
                <el-table-column prop="AttachDate" label="日期" width="180"></el-table-column>
                <el-table-column label="档案类型" width="150" align="center">
                  <template slot-scope="scope">
                    <div>
                      <div v-if="scope.row.AttachType == 1">病例报告</div>
                      <div v-if="scope.row.AttachType == 2">体检报告</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="文档名称">
                  <template slot-scope="scope">
                    <a :href="'/Upload/' + scope.row.AttachPath" style="color:#06f" target="_blank" v-if="scope.row.AttachPath">{{ scope.row.AttachName }}</a>
                    <a v-else>{{ scope.row.AttachName }}</a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_ECG = false">取 消</el-button>
        <el-button type="primary" v-if="activeName2 == 'third'" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" v-if="activeName2 != 'third'" @click="delete_btn(memberInfo.ID)">删除监护对象</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="Is_Show_DoctorAdd" title="添加监护医生">
      <div class="Add_Object">
        <div class="item" style="overflow-y: scroll;height: 600px;">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
            <el-form-item label="医生名称" prop="name_doctor">
              <el-input v-model="ruleForm2.name_doctor" placeholder="请输入人员名称"></el-input>
            </el-form-item>
            <el-form-item label="医生电话" prop="memberTel_doctor">
              <el-input type="number" v-model="ruleForm2.memberTel_doctor" placeholder="请输入人员电话"></el-input>
            </el-form-item>
            <el-form-item label="账号密码" prop="memberPwd_doctor">
              <el-input type="text" v-model="ruleForm2.memberPwd_doctor" placeholder="请输入账号密码"></el-input>
            </el-form-item>
            <el-form-item label="角色类型：">
              <el-select v-model="ruleForm2.memberRoleId" placeholder="请选择">
                <el-option key="3" label="医生" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位名称">
              <el-input type="text" v-model="ruleForm2.memberJob_doctor" placeholder="请输入职位名称"></el-input>
            </el-form-item>
            <el-form-item label="人员地址">
              <v-distpicker :province="memberArea1" :city="memberArea2" :area="memberArea3" @selected="onSelected"></v-distpicker>
            </el-form-item>
            <el-form-item label="人员详细地址" prop="address_doctor">
              <el-input v-model="ruleForm2.address_doctor" placeholder="请输入人员详细地址"></el-input>
            </el-form-item>
            <el-form-item label="医生专长">
              <el-input type="textarea" v-model="ruleForm2.memberIntro1" :rows="4" placeholder="请输入医生简介"></el-input>
            </el-form-item>
            <el-form-item label="医生简介" prop="desc_doctor">
              <el-input type="textarea" v-model="ruleForm2.desc_doctor" :rows="5" placeholder="请输入医生简介"></el-input>
            </el-form-item>

            <el-form-item label="上传身份证信息">
              <el-upload ref="imageUpload" :action="crmFileSaveUrl" :headers="httpHeader" name="file" :data="{ type: 'img', batchId: batchId }"
                multiple :limit="1" accept="image/*" :file-list="fileList1" list-type="picture-card" :before-remove="beforeRemove1"
                :on-success="imgFileUploadSuccess1">
                <p class="add-img">
                  <span class="el-icon-picture"></span>
                  <span>添加图片</span>
                </p>
              </el-upload>
            </el-form-item>

            <el-form-item label="上传执业医师证">
              <el-upload ref="imageUpload" :action="crmFileSaveUrl" :headers="httpHeader" name="file" :data="{ type: 'img', batchId: batchId }"
                multiple :limit="1" accept="image/*" :file-list="fileList2" list-type="picture-card" :before-remove="beforeRemove2"
                :on-success="imgFileUploadSuccess2">
                <p class="add-img">
                  <span class="el-icon-picture"></span>
                  <span>添加图片</span>
                </p>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="addAndReset">
          <el-button type="primary" @click="submitForm2('ruleForm2')" v-if="member_doctorId == 0">立即添加</el-button>
          <!-- <el-button type="primary" @click="submitForm2('ruleForm2')" v-else>立即修改</el-button> -->
          <el-button @click="resetForm2('ruleForm2')" v-if="member_doctorId == 0">重置</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="导入人员信息" :visible.sync="Is_show_member">
      <div class="item_Info">
        <el-form :model="MemberInfo_form" label-width="120px">
          <el-form-item label="参考Excel文件:"><a href="javascript:void(0)" style="color:red;">点击查看参考文档</a></el-form-item>
          <el-form-item label="上传Excel文件:">
            <el-upload class="upload-demo" :action="crmFileSaveUrl" :headers="httpHeader" :on-preview="handlePreview"
              :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="imgFileUploadSuccess" multiple
              :limit="1" :on-exceed="handleExceed" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" style="color:#09f;">只能上传Excel文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_show_member = false">取 消</el-button>
        <el-button type="primary" @click="MemberExportIn()">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择人员" :visible.sync="isShow">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="人员名称">
            <el-input v-model="search_Input3" placeholder="请填写人员名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="memberList" v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <ul>
          <li v-for="(item, index) in doctorList" :key="index" :class="{ bgcolor: list_index == index }" @click="getMember_item(index, item)">
            {{ item.MemberName }}
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="(isShow = false),getMember_confirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="医生审核" :visible.sync="IsShow_AuditInfo">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="审核状态">
          <ul class="item_ul">
            <li :class="{ bgcolor: AuditInfo.status == '1' }" @click="AuditInfo.status = 1">通过</li>
            <li :class="{ bgcolor: AuditInfo.status == '0' }" @click="AuditInfo.status = 0">拒绝</li>
          </ul>
        </el-form-item>
        <el-form-item label="审核描述">
          <el-input type="textarea" :rows="4" v-model="AuditInfo.intro" placeholder="请输入审核描述"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IsShow_AuditInfo = false">取 消</el-button>
        <el-button type="primary" @click="auditAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // API
  import axios from 'axios';
  import {
    crmFileSave,
    crmFileDelete,
    crmFileSaveUrl
  } from '@/api/common';
  import {
    workbenchList,
    EchartsInfo,
    MemberAdd,
    MemberDelete,
    MemberDoctorDelete,
    MemberInfo,
    MemberDoctorAdd,
    GetMemberHealthList,
    GetMemberAttachList,
    GetMemberDoctorList,
    GetMemberDoctorInfo,
    GetSysUserRoleList,
    MemberDoctorAudit,
    MemberExportIn
  } from '@/api/oamanagement/workbench';
  import {
    ymd
  } from '@/utils/filter';
  import {
    guid
  } from '@/utils';
  import VDistpicker from 'v-distpicker';
  export default {
    components: {
      VDistpicker
    },
    data() {
      return {
        IsShow_AuditInfo: false,
        isShow: false,
        list_index: -1,
        Is_Show_Navbar: false,
        tabIndex: 1,
        Is_show_member: false,
        fileList: [],
        fileList_path: '',
        IS_show_ECG: false,
        activeName: 'first',
        activeName2: 'first',
        Is_Show_succeed: false,
        Is_Show_DoctorAdd: false,
        pageIndex: 1,
        pageSize: 20,
        totalRow: 0,
        pageIndex_Doctor: 1,
        pageSize_Doctor: 20,
        totalRow_Doctor: 0,
        MemberDoctorInfo: '',
        member_doctorId: '',
        memberLoginType: JSON.parse(localStorage.getItem('memberInfo')),

        tableData_Assess: [],
        tableData_Record: [],
        deviceList: [],
        doctorList: [],
        memberInfo: '',
        search_Input: '',
        search_Input2: '',
        search_Input3: '',
        loading: false,
        loading2: false,
        loading_Doctor: false,

        tabPosition: '天',
        value1: '',
        chartType: 'day',
        dateStart: '2019-06-01',
        dateEnd: '2019-06-02',

        memberArea1: '',
        memberArea2: '',
        memberArea3: '',
        Echarts_ECG: '',
        Echarts_lowBlood: '',
        Echarts_heightBlood: '',
        Echarts_step: '',
        Echarts_sleep: '',

        formLabelAlign: {},
        labelPosition: 'right',
        MemberInfo_form: {},

        fileList1: [],
        fileList2: [],
        batchId: guid(),

        auditStatus: '',
        auditStatusList: [{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '已审核'
        }, {
          value: '2',
          label: '已拒绝'
        }],
        AuditInfo: {
          id: '',
          status: '',
          intro: ''
        },

        ruleForm: {
          iD: 0,
          name: '',
          memberTel: '',
          memberEmail: '',
          memberImei: '',
          address: '',
          memberType: '',
          resource: '',
          desc: '',
          memberContactMan1Name: '',
          memberContactMan1Tel: '',
          memberContactMan2Name: '',
          memberContactMan2Tel: '',
          memberContactMan3Name: '',
          memberContactMan3Tel: ''
        },
        ruleForm2: {
          name_doctor: '',
          memberTel_doctor: '',
          memberPwd_doctor: '',
          memberRoleId: '3',
          select_value: '',
          memberJob_doctor: '',
          address_doctor: '',
          memberIntro1: '',
          memberPhotoCard: '',
          memberPhotoDoctor: '',
          desc_doctor: ''
        },
        optionList: [],

        rules: {
          name: [{
            required: true,
            message: '请输入人员名称',
            trigger: 'blur'
          }],
          memberTel: [{
            required: true,
            message: '请输入人员电话',
            trigger: 'blur'
          }]
          // memberImei: [
          //   { required: true, message: '请输入设备编号', trigger: 'blur' }
          // ],
          // address: [
          //   { required: true, message: '请输人员详细地址', trigger: 'blur' }
          // ],
          // memberType: [
          //   { required: true, message: '请选择人员类型', trigger: 'change' }
          // ],
          // resource: [
          //   { required: true, message: '请选择有无重大病史', trigger: 'change' }
          // ],
          // desc: [{ required: true, message: '请填写过往病史', trigger: 'blur' }]
        },
        rules2: {
          name_doctor: [{
            required: true,
            message: '请输入医生名称',
            trigger: 'blur'
          }],
          memberTel_doctor: [{
            required: true,
            message: '请输入医生电话',
            trigger: 'blur'
          }],
          memberPwd_doctor: [{
            required: true,
            message: '请输入账号密码',
            trigger: 'blur'
          }],
          memberJob_doctor: [{
            required: true,
            message: '请输入工作职责',
            trigger: 'blur'
          }],
          address_doctor: [{
            required: true,
            message: '请输人员详细地址',
            trigger: 'blur'
          }],
          memberIntro1: [{
            required: true,
            message: '请输医生专长',
            trigger: 'blur'
          }],
          desc_doctor: [{
            required: true,
            message: '请输医生简介',
            trigger: 'blur'
          }]
        },
        chooseAoctor:[],
      };
    },

    computed: {
      crmFileSaveUrl() {
        return crmFileSaveUrl;
      },
      httpHeader() {
        return {
          'Admin-Token': axios.defaults.headers['Admin-Token']
        };
      }
    },
    mounted() {
      var height = document.body.clientWidth;
      console.log('-----------------------' + height);
      if (height >= 1920) {
        this.pageSize = 25;
      } else {
        this.pageSize = 20;
      }
      this.getNewData();
      this.getDeviceList();
      window.addEventListener("scroll", this.handleScroll, true);
    },
    methods: {
      handleScroll(e) {
        console.log(e.target.scrollTop);
        let top = e.target.scrollTop;
        if (top > 20) {
          this.Is_Show_Navbar = false;
        } else {
          this.Is_Show_Navbar = false;
        }
      },
      //医生审核
      getAuditStatus(row) {
        this.AuditInfo.id = row.ID;
        this.IsShow_AuditInfo = true;
      },
      auditAdd() {
        let t_data = this;

        let param = t_data.AuditInfo;

        MemberDoctorAudit(param).then(res => {
          if (!res.status) {
            this.$message({
              type: 'error',
              message: '审核失败!'
            });
            return;
          }

          this.$message({
            type: 'success',
            message: '审核成功!'
          });

          t_data.IsShow_AuditInfo = false;
          t_data.GetMemberDoctorList();
        });
      },
      //重置
      reset_status() {
        this.search_Input2 = '';
        this.auditStatus = '';
        this.GetMemberDoctorList();
      },

      change_auditStatus() {
        this.search_Input2 = '';
        this.GetMemberDoctorList();
      },

      tableHeaderColor({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        return 'color: #000;font-size:16px; background-color: #fff;';
      },
      // 修改table tr行的背景色
      tableRowStyle({
        row,
        rowIndex
      }) {
        return 'color: #000;background-color: #fff;height:65px;';
      },
      MemberExportIn() {
        let t_data = this;
        let param = {
          path: t_data.fileList_path[0].response.info
        };
        MemberExportIn(param).then(res => {
          if (!res.status) {
            this.$message.error(res.info);
            return;
          }
          this.$message.success(res.info);
          t_data.Is_show_member = false;
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file, fileList) {
        console.log(file, fileList);
      },
      imgFileUploadSuccess(response, file, fileList) {
        this.fileList_path = fileList;
        console.log('fileList---' + JSON.stringify(fileList));
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      getNewData() {
        var t_data = this;
        var myDate = new Date();
        t_data.dateStart = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
        t_data.dateEnd = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + new Date(myDate.getTime() + 24 *
          60 * 60 * 1000).getDate();
        console.log('开始时间-----------' + t_data.dateStart);
        console.log('结束时间-----------' + t_data.dateEnd);
      },
      getData_tabPosition() {
        let t_data = this;
        var myDate = new Date();
        if (t_data.value1 == '') {
          if (t_data.tabPosition == '天') {
            t_data.chartType = 'day';
            t_data.dateStart = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
            t_data.dateEnd = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + new Date(myDate.getTime() +
              24 * 60 * 60 * 1000).getDate();
            t_data.open();
          }
          if (t_data.tabPosition == '月') {
            t_data.chartType = 'month';
            t_data.dateStart = myDate.getFullYear() + '-' + (myDate.getMonth() + 1 + '-' + 1);
            t_data.dateEnd = myDate.getFullYear() + '-' + (myDate.getMonth() + 2 + '-' + 1);
            t_data.open();
          }
        } else {
          if (t_data.tabPosition == '天') {
            t_data.chartType = 'day';
            t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[
              0].getDate();
            t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + new Date(
              t_data.value1[1].getTime() + 24 * 60 * 60 * 1000).getDate();
            t_data.open();
          }
          if (t_data.tabPosition == '月') {
            t_data.chartType = 'month';
            t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1 + '-' + 1);
            t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 2 + '-' + 1);
            t_data.open();
          }
        }
      },
      getDeviceList: function(val) {
        let t_data = this;
        if (val == undefined) {
          val = '';
        }
        let param = {
          pageIndex: t_data.pageIndex,
          pageSize: t_data.pageSize,
          memberType: '',
          memberName: val
        };
        t_data.loading = true;
        workbenchList(param).then(res => {
          t_data.totalRow = res.info.totalRow;
          t_data.deviceList = res.info.list;
          t_data.loading = false;
          // console.log(
          //   "res.info.totalRow------res-------" + JSON.stringify(res.info.list)
          // );
        });
      },
      getMember_confirm(){
        let t_this = this;
        t_this.search_Input3 = t_this.chooseAoctor.MemberName;
        t_this.ruleForm.memberContactMan3Id = t_this.chooseAoctor.ID;
        t_this.ruleForm.memberContactMan3Name = t_this.chooseAoctor.MemberName;
        t_this.ruleForm.memberContactMan3Tel = t_this.chooseAoctor.MemberTel;
      },
      getMember_item(index, row) {
        this.chooseAoctor = row;
        // console.log(this.chooseAoctor)
        this.list_index = index;
        // this.search_Input3 = row.MemberName;
        // this.ruleForm.memberContactMan3Id = row.ID;
        // this.ruleForm.memberContactMan3Name = row.MemberName;
        // this.ruleForm.memberContactMan3Tel = row.MemberTel;
      },

      beforeRemove1(file) {
        console.log(file);
      },

      beforeRemove2(file) {
        console.log(file);
      },

      imgFileUploadSuccess1(response, file, fileList) {
        this.ruleForm2.memberPhotoCard = fileList[0].response.info;
      },

      imgFileUploadSuccess2(response, file, fileList) {
        this.ruleForm2.memberPhotoDoctor = fileList[0].response.info;
      },

      GetSysUserRoleList() {
        let t_data = this;
        let param = {
          roleType: '3'
        };

        GetSysUserRoleList(param).then(res => {
          t_data.optionList = res.info.list;
        });
      },

      GetMemberDoctorList(val) {
        let t_data = this;
        if (val == undefined) {
          val = '';
        }
        let param = {
          pageIndex: t_data.pageIndex_Doctor,
          pageSize: t_data.pageSize_Doctor,
          memberStatus: t_data.auditStatus,
          memberName: val
        };
        t_data.loading_Doctor = true;
        GetMemberDoctorList(param).then(res => {
          t_data.totalRow_Doctor = res.info.totalRow;
          t_data.doctorList = res.info.list;
          t_data.loading_Doctor = false;
          // console.log(
          //   "res.info.totalRow------res-------" + JSON.stringify(res.info.list)
          // );
        });
      },

      open(Id) {
        this.Is_Show_Navbar = false;
        let t_data = this;
        t_data.IS_show_ECG = true;
        t_data.activeName2 = 'first';
        if (Id == undefined) {
          Id = window.localStorage.getItem('memberId');
        }
        window.localStorage.setItem('memberId', Id);
        let param = {
          memberId: Id,
          chartType: t_data.chartType,
          dateStart: t_data.dateStart,
          dateEnd: t_data.dateEnd
        };
        t_data.loading2 = true;
        console.log('open参数----------' + JSON.stringify(param));
        EchartsInfo(param).then(res => {
          t_data.loading2 = false;
          t_data.Echarts_ECG = res.info.chart1;
          t_data.Echarts_lowBlood = res.info.chart2;
          t_data.Echarts_heightBlood = res.info.chart3;
          t_data.Echarts_step = res.info.chart4;
          t_data.Echarts_sleep = res.info.chart5;
          if (t_data.activeName == 'first') {
            setTimeout(function() {
              t_data.getDevice_Echert_ECG(t_data.Echarts_ECG);
            }, 500);
          }
          if (t_data.activeName == 'second') {
            setTimeout(function() {
              t_data.getDevice_Echert_Blood(t_data.Echarts_heightBlood);
            }, 500);
          }
          if (t_data.activeName == 'third') {
            setTimeout(function() {
              t_data.getDevice_Echert_lowBlood(t_data.Echarts_lowBlood);
            }, 500);
          }
          if (t_data.activeName == 'fourth') {
            setTimeout(function() {
              t_data.getDevice_Echert_step(t_data.Echarts_step);
            }, 500);
          }
          if (t_data.activeName == 'end') {
            setTimeout(function() {
              t_data.getDevice_Echert_sleep(t_data.Echarts_sleep);
            }, 500);
          }
          t_data.getMemberInfo();
          // t_data.GetMemberHealthList();
          // t_data.GetMemberAttachList();
          // console.log("deviceList------res-------"+JSON.stringify(t_data.deviceList))
        });
      },
      //删除人员
      delete_btn(id) {
        let t_data = this;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            let param = {
              id: id
            };
            MemberDelete(param).then(res => {
              if (res.status) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
              t_data.IS_show_ECG = false;
              t_data.getDeviceList();
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },

      memberDoctor_Add() {
        this.Is_Show_DoctorAdd = true;
        this.member_doctorId = 0;
        this.ruleForm2.name_doctor = '';
        this.ruleForm2.memberTel_doctor = '';
        this.ruleForm2.memberPwd_doctor = '';
        this.ruleForm2.address_doctor = '';
        this.ruleForm2.memberJob_doctor = '';
        this.ruleForm2.desc_doctor = '';
        this.ruleForm2.memberIntro1 = '';
        this.fileList1 = [];
        this.fileList2 = [];
      },
      //删除医生
      delete_btn_doctor(id) {
        let t_data = this;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            let param = {
              id: id
            };
            MemberDoctorDelete(param).then(res => {
              if (res.status) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
              t_data.GetMemberDoctorList();
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },

      //编辑医生
      compile_doctor(id) {
        let t_data = this;
        t_data.Is_Show_DoctorAdd = true;
        t_data.fileList1 = [];
        t_data.fileList2 = [];
        let param = {
          id: id
        };
        GetMemberDoctorInfo(param).then(res => {
          if (res.status) {
            t_data.MemberDoctorInfo = res.info;
            t_data.member_doctorId = res.info.ID;

            t_data.ruleForm2.memberPhotoCard = res.info.MemberPhotoCard;
            t_data.ruleForm2.memberPhotoDoctor = res.info.MemberPhotoDoctor;

            t_data.ruleForm2.name_doctor = res.info.MemberName;
            t_data.ruleForm2.memberTel_doctor = res.info.MemberTel;
            t_data.ruleForm2.memberPwd_doctor = res.info.MemberPwd;
            t_data.memberArea1 = res.info.MemberArea1;
            t_data.memberArea2 = res.info.MemberArea2;
            t_data.memberArea3 = res.info.MemberArea3;
            t_data.ruleForm2.memberJob_doctor = res.info.MemberDoctorJob;
            t_data.ruleForm2.address_doctor = res.info.MemberAddress;
            t_data.ruleForm2.desc_doctor = res.info.MemberIntro;
            t_data.ruleForm2.memberIntro1 = res.info.MemberIntro1;

            console.log('===============' + t_data.ruleForm2.memberPhotoCard + '------------' + t_data.ruleForm2.memberPhotoDoctor);

            if (t_data.fileList1 == '' && t_data.ruleForm2.memberPhotoCard != undefined) {
              t_data.fileList1.push({
                url: 'http://java1.subei88.com:8080/upload/' + t_data.ruleForm2.memberPhotoCard
              });
            }

            if (t_data.fileList2 == '' && t_data.ruleForm2.memberPhotoDoctor != undefined) {
              t_data.fileList2.push({
                url: 'http://java1.subei88.com:8080/upload/' + t_data.ruleForm2.memberPhotoDoctor
              });
            }
          }
          console.log(JSON.stringify(res.info.MemberIntro));
        });
      },

      getMemberInfo() {
        let t_data = this;
        let param = {
          id: window.localStorage.getItem('memberId')
        };
        MemberInfo(param).then(res => {
          t_data.memberInfo = res.info;

          t_data.ruleForm.iD = res.info.ID;
          t_data.ruleForm.name = res.info.MemberName;
          t_data.ruleForm.memberTel = res.info.MemberTel;
          t_data.ruleForm.memberEmail = res.info.MemberEmail;
          t_data.ruleForm.memberImei = res.info.MemberMacId;
          t_data.memberArea1 = res.info.MemberArea1;
          t_data.memberArea2 = res.info.MemberArea2;
          t_data.memberArea3 = res.info.MemberArea3;
          t_data.ruleForm.address = res.info.MemberAddress;
          t_data.ruleForm.memberType = res.info.MemberType + '';
          t_data.ruleForm.resource = res.info.MemberType + '';
          t_data.ruleForm.desc = res.info.MemberIntro;
          t_data.ruleForm.memberContactMan1Name = res.info.MemberContactMan1Name;
          t_data.ruleForm.memberContactMan1Tel = res.info.MemberContactMan1Tel;
          t_data.ruleForm.memberContactMan2Name = res.info.MemberContactMan2Name;
          t_data.ruleForm.memberContactMan2Tel = res.info.MemberContactMan2Tel;
          t_data.ruleForm.memberContactMan3Name = res.info.MemberContactMan3Name;
          t_data.ruleForm.memberContactMan3Tel = res.info.MemberContactMan3Tel;

          console.log('memberInfo------res-------' + JSON.stringify(res.info));
        });
      },

      GetMemberHealthList() {
        let t_data = this;
        let param = {
          memberName: t_data.memberInfo.MemberName
        };
        GetMemberHealthList(param).then(res => {
          t_data.tableData_Assess = res.info.list;
          // console.log("res.info.totalRow------res-------"+JSON.stringify( res.info.list))
        });
      },

      GetMemberAttachList() {
        let t_data = this;
        let param = {
          memberName: t_data.memberInfo.MemberName
        };
        GetMemberAttachList(param).then(res => {
          t_data.tableData_Record = res.info.list;
        });
      },
      getPageIndex(val) {
        // console.log("val----------" + JSON.stringify(val));
        this.pageIndex = val;
        this.getDeviceList();
      },
      getPrevPage() {
        this.pageIndex--;
        this.getDeviceList();
      },
      getNextPage() {
        this.pageIndex++;
        this.getDeviceList();
      },
      getPageIndex_Doctor(val) {
        // console.log("val----------" + JSON.stringify(val));
        this.pageIndex_Doctor = val;
        this.GetMemberDoctorList();
      },
      getPrevPage_Doctor() {
        this.pageIndex_Doctor--;
        this.GetMemberDoctorList();
      },
      getNextPage_Doctor() {
        this.pageIndex_Doctor++;
        this.GetMemberDoctorList();
      },

      handleClick(tab, event) {
        // console.log(tab, event);
        let t_data = this;
        t_data.open();
      },
      handleClick2(tab, event) {
        // console.log(tab, event);
        let t_data = this;
        if (t_data.activeName2 == 'first') {
          t_data.open();
        }
        if (t_data.activeName2 == 'second') {
          t_data.getMemberInfo();
        }
        if (t_data.activeName2 == 'third') {
          t_data.GetMemberHealthList();
        }
        if (t_data.activeName2 == 'fourth') {
          t_data.GetMemberAttachList();
        }
      },
      getDevice_Echert_ECG(data) {
        let t_data = this;
        let echarts = require('echarts');
        let myChart = t_data.$echarts.init(document.getElementById('Device_Echert_ECG'));
        let option = {
          backgroundColor: '#fff',
          calculable: true,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高心率', '平均心率', '最低心率'],
            textStyle: {
              color: '#bdc7da'
            },
            y: '20px'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            },
            data: data.dataX
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            }
          },
          series: [{
              name: '最高心率',
              type: 'line',
              smooth: true,
              data: data.dataY2
            },
            {
              name: '平均心率',
              type: 'line',
              smooth: true,
              data: data.dataY3
            },
            {
              name: '最低心率',
              type: 'line',
              smooth: true,
              data: data.dataY1
            }
          ]
        };
        myChart.setOption(option);
      },
      getDevice_Echert_Blood(data) {
        let t_data = this;
        let echarts = require('echarts');
        let myChart = t_data.$echarts.init(document.getElementById('Device_Echert_Blood'));
        let option = {
          backgroundColor: '#fff',
          calculable: true,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高高血压', '平均高血压', '最低高血压'],
            textStyle: {
              color: '#bdc7da'
            },
            y: '20px'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            },
            data: data.dataX
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            }
          },
          series: [{
              name: '最高高血压',
              type: 'line',
              smooth: true,
              data: data.dataY2
            },
            {
              name: '平均高血压',
              type: 'line',
              smooth: true,
              data: data.dataY3
            },
            {
              name: '最低高血压',
              type: 'line',
              smooth: true,
              data: data.dataY1
            }
          ]
        };
        myChart.setOption(option);
      },
      getDevice_Echert_lowBlood(data) {
        let t_data = this;
        let echarts = require('echarts');
        let myChart = t_data.$echarts.init(document.getElementById('Device_Echert_lowBlood'));
        let option = {
          backgroundColor: '#fff',
          calculable: true,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高低血压', '平均低血压', '最低低血压'],
            textStyle: {
              color: '#bdc7da'
            },
            y: '20px'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            },
            data: data.dataX
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            }
          },
          series: [{
              name: '最高低血压',
              type: 'line',
              smooth: true,
              data: data.dataY2
            },
            {
              name: '平均低血压',
              type: 'line',
              smooth: true,
              data: data.dataY3
            },
            {
              name: '最低低血压',
              type: 'line',
              smooth: true,
              data: data.dataY1
            }
          ]
        };
        myChart.setOption(option);
      },
      getDevice_Echert_step(data) {
        let t_data = this;
        let echarts = require('echarts');
        let myChart = t_data.$echarts.init(document.getElementById('Device_Echert_step'));
        let option = {
          backgroundColor: '#fff',
          calculable: true,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['运动步数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            },
            data: data.dataX
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            }
          },
          series: [{
            name: '运动步数',
            type: 'line',
            smooth: true,
            data: data.dataY2
          }]
        };
        myChart.setOption(option);
      },
      getDevice_Echert_sleep(data) {
        let t_data = this;
        let echarts = require('echarts');
        let myChart = t_data.$echarts.init(document.getElementById('Device_Echert_sleep'));
        let option = {
          backgroundColor: '#fff',
          calculable: true,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['睡眠时长'],
            textStyle: {
              color: '#bdc7da'
            },
            y: '20px'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            },
            data: data.dataX
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#bdc7da' // x坐标轴颜色
              }
            }
          },
          series: [{
            name: '睡眠时长',
            type: 'line',
            smooth: true,
            data: data.dataY2
          }]
        };
        myChart.setOption(option);
      },

      getDateTime_ECG() {
        let t_data = this;
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[
            0].getDate();
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + t_data.value1[
            1].getDate();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + 1;
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1 + '-' + 1);
        }
        console.log('开始时间---------' + t_data.dateStart);
        console.log('结束时间---------' + t_data.dateEnd);
        t_data.open();
      },
      getDateTime_Blood() {
        let t_data = this;
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[
            0].getDate();
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + t_data.value1[
            1].getDate();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + 1;
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + 1;
        }
        t_data.open();
      },
      getDevice_lowBlood() {
        let t_data = this;
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[
            0].getDate();
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + t_data.value1[
            1].getDate();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + 1;
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + 1;
        }
        t_data.open();
      },
      getDevice_step() {
        let t_data = this;
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[
            0].getDate();
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + t_data.value1[
            1].getDate();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + 1;
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + 1;
        }
        t_data.open();
      },
      getDevice_sleep() {
        let t_data = this;
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + t_data.value1[
            0].getDate();
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + t_data.value1[
            1].getDate();
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month';
          t_data.dateStart = t_data.value1[0].getFullYear() + '-' + (t_data.value1[0].getMonth() + 1) + '-' + 1;
          t_data.dateEnd = t_data.value1[1].getFullYear() + '-' + (t_data.value1[1].getMonth() + 1) + '-' + 1;
        }
        t_data.open();
      },

      //获取地址
      onSelected(data) {
        // alert(JSON.stringify(data) )
        this.memberArea1 = data.province.value;
        this.memberArea2 = data.city.value;
        this.memberArea3 = data.area.value;
      },

      emptyData() {
        this.tabIndex = 2;
        this.Is_Show_Navbar = false;
        this.ruleForm.name = '';
        this.ruleForm.memberTel = '';
        this.ruleForm.memberEmail = '';
        this.ruleForm.memberImei = '';
        this.memberArea1 = '';
        this.memberArea2 = '';
        this.memberArea3 = '';
        this.ruleForm.address = '';
        this.ruleForm.memberType = '';
        this.ruleForm.resource = '';
        this.ruleForm.desc = '';
        this.ruleForm.memberContactMan1Name = '';
        this.ruleForm.memberContactMan1Tel = '';
        this.ruleForm.memberContactMan2Name = '';
        this.ruleForm.memberContactMan2Tel = '';
        this.ruleForm.memberContactMan3Name = '';
        this.ruleForm.memberContactMan3Tel = '';
      },

      submitForm(formName) {
        let t_data = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            var reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
            var ret = reg.test(t_data.ruleForm.memberTel);
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var ret2 = filter.test(t_data.ruleForm.memberEmail);
            if (!ret) {
              this.$message.error('手机号码格式不正确');
              return;
            }
            if (!ret2 && t_data.ruleForm.memberEmail !== '') {
              this.$message.error('邮箱格式不正确');
              return;
            }
            if (!t_data.memberArea3) {
              this.$message.error('请选择地址信息');
              return;
            }
            var params = {
              iD: t_data.ruleForm.iD,
              memberName: t_data.ruleForm.name,
              memberTel: t_data.ruleForm.memberTel,
              memberEmail: t_data.ruleForm.memberEmail,
              memberImei: t_data.ruleForm.memberImei,
              memberType: t_data.ruleForm.memberType,
              memberArea1: t_data.memberArea1,
              memberArea2: t_data.memberArea2,
              memberArea3: t_data.memberArea3,
              memberAddress: t_data.ruleForm.address,
              memberIsIllness: t_data.ruleForm.resource,
              memberIntro: t_data.ruleForm.desc,
              memberContactMan1Name: t_data.ruleForm.memberContactMan1Name,
              memberContactMan1Tel: t_data.ruleForm.memberContactMan1Tel,
              memberContactMan2Name: t_data.ruleForm.memberContactMan2Name,
              memberContactMan2Tel: t_data.ruleForm.memberContactMan2Tel,
              memberContactMan3Name: t_data.ruleForm.memberContactMan3Name,
              memberContactMan3Tel: t_data.ruleForm.memberContactMan3Tel
            };
            console.log('params------------' + JSON.stringify(params));
            MemberAdd(params).then(res => {
              console.log('MemberAdd------res-------' + JSON.stringify(res));

              if (!res.status) {
                this.$notify.error({
                  title: '温馨提示',
                  message: res.info
                });
                return;
              }
              if (t_data.ruleForm.iD == 0) {
                this.$confirm('添加人员成功, 是否继续添加?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '继续添加',
                    type: 'success'
                  })
                  .then(() => {
                    t_data.tabIndex = 1;
                    t_data.getDeviceList();
                  })
                  .catch(() => {
                    t_data.ruleForm.name = '';
                    t_data.ruleForm.memberTel = '';
                    t_data.ruleForm.memberEmail = '';
                    t_data.ruleForm.memberImei = '';
                    t_data.ruleForm.address = '';
                    t_data.ruleForm.desc = '';
                    t_data.ruleForm.memberContactMan1Name = '';
                    t_data.ruleForm.memberContactMan1Tel = '';
                    t_data.ruleForm.memberContactMan2Name = '';
                    t_data.ruleForm.memberContactMan2Tel = '';
                    t_data.ruleForm.memberContactMan3Name = '';
                    t_data.ruleForm.memberContactMan3Tel = '';
                  });
              }

              if (t_data.ruleForm.iD != 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                t_data.getMemberInfo();
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //添加医生
      submitForm2(formName, val) {
        var t_data = this;
        if (val == undefined) {
          val = '0';
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            var reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
            var ret = reg.test(t_data.ruleForm2.memberTel_doctor);
            if (!ret) {
              this.$message.error('手机号码格式不正确');
              return;
            }
            if (!t_data.memberArea3) {
              this.$message.error('请选择地址信息');
              return;
            }
            var param = {
              ID: t_data.member_doctorId,
              memberName: t_data.ruleForm2.name_doctor,
              memberTel: t_data.ruleForm2.memberTel_doctor,
              memberPwd: t_data.ruleForm2.memberPwd_doctor,
              memberRoleId: t_data.ruleForm2.memberRoleId,
              memberArea1: t_data.memberArea1,
              memberArea2: t_data.memberArea2,
              memberArea3: t_data.memberArea3,
              memberAddress: t_data.ruleForm2.address_doctor,
              memberIntro: t_data.ruleForm2.desc_doctor,
              memberPhotoCard: t_data.ruleForm2.memberPhotoCard,
              memberPhotoDoctor: t_data.ruleForm2.memberPhotoDoctor,
              memberDoctorJob: t_data.ruleForm2.memberJob_doctor,
              memberIntro1: t_data.ruleForm2.memberIntro1
            };
            console.log('param------------' + JSON.stringify(param));
            MemberDoctorAdd(param).then(res => {
              console.log('MemberAdd------res-------' + JSON.stringify(res));
              if (!res.status) {
                this.$notify.error({
                  title: '温馨提示',
                  message: res.info
                });
                return;
              }

              if (t_data.member_doctorId == '0') {
                this.$confirm('添加医生成功, 是否继续添加?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '继续添加',
                    type: 'success'
                  })
                  .then(() => {
                    t_data.Is_Show_DoctorAdd = false;
                    t_data.GetMemberDoctorList();
                  })
                  .catch(() => {
                    t_data.ruleForm2.name_doctor = '';
                    t_data.ruleForm2.memberTel_doctor = '';
                    t_data.ruleForm2.memberPwd_doctor = '';
                    t_data.ruleForm2.address_doctor = '';
                    t_data.ruleForm2.desc_doctor = '';
                    t_data.ruleForm2.memberIntro1 = '';
                    t_data.ruleForm2.memberJob_doctor = '';

                    t_data.fileList1 = [];
                    t_data.fileList2 = [];
                    t_data.GetMemberDoctorList();
                  });
              } else {
                t_data.Is_Show_DoctorAdd = false;

                t_data.fileList1 = [];
                t_data.fileList2 = [];
                t_data.GetMemberDoctorList();
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetForm2(formName) {
        this.$refs[formName].resetFields();
        this.fileList1 == [];
        this.fileList2 == [];
      }
    },
    watch: {
      search_Input(val) {
        this.getDeviceList(val);
      },
      search_Input2(val) {
        this.GetMemberDoctorList(val);
      },
      search_Input3(val) {
        this.GetMemberDoctorList(val);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../styles/tabs.scss';
  .data_margin{
    margin-top: 10px;
  }
  .addAndReset{
    text-align: right;
    margin-top: 15px;
  }
  .kuang {
    background-color: #F5F5F5;
    padding: 20px 10px;
    border-radius: 10px;
    margin-top: 15px;
    margin-left: 15px;
    color: #5b5b5b;
    font-size: 16px;
    // line-height: 30px;
  }
  .kuang .value{
    font-size: 30px;
    color: #000;
  }

  .el-pager>.number {
    color: #000 !important;
    background: #fff;
  }

  .export {
    color: #000;
    background-color: #fff;
    border-color: #ccc;
    border-radius: 5px !important;
  }

  .container {
    position: relative;
    display: flex;
    height: 100%;

    .title_search_navbar {
      position: absolute;
      float: right;
      font-size: 16px;
      display: inline-block;
      background-color: #fff;
      padding: 0 20px;
      margin: 15px 20px;
      height: 45px;
      border: 1px solid #ccc;
      line-height: 45px;
      border-radius: 6px;
      color: #000;
      cursor: pointer;
    }

    .item_Navbar {
      position: absolute;
      z-index: 99999;
      float: left;
      width: 240px;
      height: 90%;
      background-color: #fff;
      margin-top: 80px;

      h1 {
        text-align: center;
        height: 280px;
        color: #000;
        line-height: 280px;
      }

      h4 {
        text-align: center;
        line-height: 65px;
        cursor: pointer;
        color: #000;
      }

      .h4_active {
        border-left: 6px #fdab46 solid;
        background-color: #f9cda1;
      }
    }

    .item_content {
      height: 750px;
      float: right;
      flex: 1;
      // overflow-x: hidden;
      margin-left: 10px;

      .content_title {
        height: 80px;
        line-height: 80px;

        .title_search {
          text-align: right;
          padding-right: 4%;

          input {
            background-color: #fff;
            border: 1px solid #ccc;
            height: 35px;
            line-height: 35px;
            width: 280px;
            padding: 10px;
            color: #000;
            border-radius: 7px;
          }
        }
      }

      .content_item {
        .loading {
          position: absolute;
          width: 100%;
          font-size: 25px;
          width: 100px;
          transform: translate(-50%);
          left: 50%;
          top: 40%;
        }

        .status4 {
          background-color: #f87c7c;
        }

        .status3 {
          background-color: #fbc9c9;
        }

        .status2 {
          background-color: #f3d9ab;
        }

        .status1 {
          background-color: #f9c9a1;

        }

        .item_doctor {
          color: #333;
          background-color: #eee;
          // border: 1px solid #000;
        }

        ul li {
          width: 190px;
          height: 160px;
          float: left;
          color: #000;
          display: flex;
          margin: 15px;
          border-radius: 8px;
          cursor: pointer;

          .content_item_Name {
            padding: 20px;
            width: 100%;
            text-align: center;
            border-radius: 8px;

            .content_item_Name_img {
              // width: 50px;
              // height: 50px;
              // background-color: #fff;
              // border-radius: 50%;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            span {
              line-height: 50px;
              font-size: 19px;
            }
          }

          .content_item_qty {
            width: 225px;
            display: flex;

            .content_item_qty_info {
              flex: 1;
              font-size: 20px;
              line-height: 25px;
              padding: 10px 5px;
              text-align: center;

              span {
                font-size: 13px;
              }
            }
          }

          .title_name {
            display: flex;
            justify-content: space-between;
            padding: 5px;
          }

          .item_data {
            padding: 5px;
            text-align: center;

            p {
              font-size: 15px;
            }
          }

          .item_time {
            padding: 5px;
            text-align: center;
          }
        }
      }

      .block {
        position: absolute;
        bottom: 3%;
        right: 3%;
        color:#000 !important;
        display: flex;
      }
    }

    .Add_TutelageObject {
      width: 1200px;
      margin-left: 10px;

      h1 {
        color: #fff;
        margin-left: 43%;
      }

      .Add_Object {
        float: left;
        width: 100%;
        flex: 1;
        margin-left: 10px;
        border-radius: 6px;
        margin: 10px;
        display: flex;

        h2 {
          color: #fff;
        }

        .item {
          flex: 0.7;
        }
      }
    }

    .day {
      padding: 11px 0 0 50px;
      display: inline-block;
      color: #000 !important;
    }

    .month {
      padding: 11px 0 0 50px;
      display: inline-block;
    }

    #Device_Echert_ECG {
      height: 400px;
      width: 100%;
    }

    #Device_Echert_Blood {
      height: 400px;
      width: 100%;
    }

    #Device_Echert_lowBlood {
      height: 400px;
      width: 100%;
    }

    #Device_Echert_step {
      height: 400px;
      width: 100%;
    }

    #Device_Echert_sleep {
      height: 400px;
      width: 100%;
    }

    .memberInfo {
      height: 509px;

      .item_memberInfo {
        display: flex;
      }
    }

    .memberAssess {
      height: 509px;
      background: #fff;
    }

    .block {
      text-align: right;
    }

    .item {
      background-color: #fff;
      padding: 20px;
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

    .warnTwo {
      color: #0dbc79;
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

    // 弹出框
  }
</style>
