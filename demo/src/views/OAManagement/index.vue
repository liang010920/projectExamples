<template>
  <div class="container">

    <div class="item_index1">

      <div class="item_block">
        <img src="./../../../static/img/icon/5.png" class="titleImg" >
        <span class="topTitle">数据实时统计</span>
      </div>

      <div>
        <el-row class="c-bgColor2">
          <el-col :span="6">
            <el-row>
              <el-col :span="12" align="right" style="padding-right: 10px;">
                <div><img src="./../../../static/img/icon/1.png" alt ></div>
              </el-col>
              <el-col :span="12" align="left">
                <div>总人数</div>
                <div style="font-size: 20px !important;">
                  3656
                  <span style="font-size:12px;color:rgba(195,195,195)">人</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="12" align="right" style="padding-right: 10px;">
                <div><img src="./../../../static/img/icon/2.png" alt ></div>
              </el-col>
              <el-col :span="12" align="left">
                <div>总人数</div>
                <div style="font-size: 20px !important;">
                  3656
                  <span style="font-size:12px;color:rgba(195,195,195)">人</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="12" align="right" style="padding-right: 10px;">
                <div><img src="./../../../static/img/icon/3.png" alt ></div>
              </el-col>
              <el-col :span="12" align="left">
                <div>总人数</div>
                <div style="font-size: 20px !important;">
                  3656
                  <span style="font-size:12px;color:rgba(195,195,195)">人</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="12" align="right" style="padding-right: 10px;">
                <div><img src="./../../../static/img/icon/4.png" alt ></div>
              </el-col>
              <el-col :span="12" align="left">
                <div>总人数</div>
                <div style="font-size: 20px !important;">
                  3656
                  <span style="font-size:12px;color:rgba(195,195,195)">人</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row class="item_text">
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <div class="item_comme2 u-f-ac">
            <img class="item_icon titleImg" src="./../../../static/img/icon/5.png" >
            <div class="item_title topTitle">报警消息</div>
          </div>
          <el-row class="c-bgColor">
            <el-col :span="12">
              <div>
                <div class="item_center_warnning_img"><img src="./../../../static/img/icon/f.png" width="48px" height="46px"></div>
                <div class="c-fontSize">今日报警</div>
                <div class="item_center_zero">0</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <div class="item_center_thought_img"><img src="./../../../static/img/icon/g.png" ></div>
                <div class="c-fontSize">概况预览</div>
                <div class="item_center_zero">0</div>
              </div>
            </el-col>
          </el-row>
          <div class="item_comme1 u-f-ac">
            <img class="item_icon titleImg" src="./../../../static/img/icon/5.png" >
            <div class="item_title topTitle">睡眠统计</div>
          </div>
          <el-row class="">
            <el-col :span="24">
              <div id="sleep" :style="{width: '100%', height: '352px'}"/>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8" align="left" style="margin: 0 20px;">
        <div class="grid-content bg-purple-dark">
          <div class="item_comme1 u-f-ac">
            <img class="item_icon titleImg" src="./../../../static/img/icon/5.png" >
            <div class="item_title topTitle">健康咨询</div>
          </div>
          <div class="item_index2 cItem_index2">
            <!--健康资讯-->
            <el-tabs v-model="activeName">
              <el-tab-pane label="置顶消息" name="first">
                <div class="item_comter" style="height: 8rem;">
                  <div v-for="(item, index) in 18" :key="index" class="item_comter_list">
                    <div class="item_comter_title">
                      【公告】肚子上肥肉太多很烦人，哪些动作可以减掉？
                    </div>
                  </div>
                  <div class="more">更多</div>
                </div>

              </el-tab-pane>
              <el-tab-pane label="健康知识" name="second">
                <div class="item_comter" style="height: 8rem;">
                  <div v-for="(item, index) in 18" :key="index" class="item_comter_list">
                    <div class="item_comter_title">
                      【公告】夏季养生小常识合集
                    </div>
                  </div>
                  <div class="more">更多</div>
                </div>

              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="item_comme2 u-f-ac">
            <img class="item_icon titleImg" src="./../../../static/img/icon/5.png" >
            <div class="item_title topTitle">步数统计</div>
          </div>
          <el-row class="stepsPadding">
            <el-col :span="24">
              <div id="steps" :style="{width: '100%', height: '352px'}"/>
            </el-col>
          </el-row>
        </div>

      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <div class="item_comme3 u-f-ac">
            <img class="item_icon titleImg" src="./../../../static/img/icon/5.png" >
            <div class="item_title topTitle">人员导入</div>
          </div>
          <div class="item_index2">
            <!--人员导入模块-->
            <div class="item u-f-column u-f-ac c-padding">
              <div class="u-f-ac">
                <div class="item_left_img"><img src="./../../../static/img/icon/e.png"></div>
                <div class="item_info">用户信息导入</div>
              </div>
            </div>
          </div>
          <div class="item_comme2 u-f-ac">
            <img class="item_icon titleImg" src="./../../../static/img/icon/5.png" >
            <div class="item_title topTitle">数据统计</div>
          </div>
          <!-- 数据统计 -->
          <div class="item_index3">
            <div class="item u-f-column u-f-ac u-f1">
              <div class="doctor_block_left" style="width: 100%;">
                <div id="myChart" :style="{width: '100%', height: '417px'}"/>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetMemberDoctorList, MemberHealthAdd, GetMemberHealthList, GetMemberIndex, GetMemberHealthInfo_ByWarnId } from '@/api/oamanagement/workbench'
export default {
  data() {
    return {
      Is_Show_assess: false,
      Is_Show_doctor: false,
      Is_Show_MyAssessInfo: false,
      doctorList: [],
      doctor_InputValue: '',
      list_index: '-1',
      tableData_AssessInfo: [],
      memberIndexInfo_total: '',
      memberIndexInfo_totalWarn: [],
      memberIndexInfo_totalChart: '',
      activeName: 'second',
      member_form: {
        ID: 0,
        WarnMemberId: '',
        HealthMemberDoctorId: '',
        HealthWarnId: '',
        HealthLevel: '',
        textarea_assess: '',
        memberInfo: '',
        memberName: '',
        blood_price: '',
        heart_price: '',
        doctor_SearchInput: '',
        memberInform: ''
      }
    }
  },
  watch: {
    doctor_InputValue(val) {
      this.GetMemberDoctorList(val)
    }
  },
  mounted() {
    this.GetMemberIndex()
    // 绘制图表数据统计
    this.dataLine()
    // 步数统计
    this.steps()
    // 睡眠统计
    this.sleep()
    console.log('用户信息---------------' + localStorage.getItem('memberInfo'))
    console.log('用户id----------------' + localStorage.getItem('memberID'))
  },
  methods: {
    // 绘制图表数据统计
    dataLine() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = this.$echarts.init(document.getElementById('myChart'))
            var cost = [0.5, 0.201, 0.6, 0.7, 0.301, 0.301, 0.4, 0.2]// 本期比上期（大于1按1处理）
            var dataCost = [10.01, 200, 200, 1000.01, 200000, 200, 200000, 1000]// 真是的金额
            var totalCost = [1, 1, 1, 1, 1, 1]// 比例综合
            var visits = [10, 20, 30, 40, 50, 60, 92, 100]// 本期占总的百分比*100
            var grade = ['心脏病', '糖尿病', '高血压', '高血压', '高血脂', '高血脂']
            var myColor = ['#f9d2a4']
            var data = {
                grade: grade,
                cost: cost,
                totalCost: totalCost,
                visits: visits,
                dataCost: dataCost
            }

            myChart.setOption({
                 // backgroundColor: '#05274C',
                    title: {
                        top: '2%'
                    },
                    grid: {
                        left: '130',
                        right: '100'
                    },
                    xAxis: {
                        show: false
                    },
                    yAxis: {

                        type: 'category',
                        axisLabel: {
                            margin: 30,
                            show: true,
                            color: '#000',
                            fontSize: 14
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        data: data.grade
                    },
                    series: [{
                        type: 'bar',
                        barGap: '-65%',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                color: '#000',
                                fontSize: 14,
                                formatter:
                                function(param) {
                                    return data.visits[param.dataIndex] + '%'
                                }
                            }
                        },
                        barWidth: '30%',
                        itemStyle: {
                            normal: {
                                borderColor: '#f9d2a4',
                                borderWidth: 2,
                                barBorderRadius: 15,
                                color: 'rgba(102, 102, 102,0)'
                            }
                        },
                        z: 1,
                        data: data.totalCost
                        // data: da
                    }, {
                        type: 'bar',
                        barGap: '-85%',
                        barWidth: '21%',
                        itemStyle: {
                             normal: {
                                barBorderRadius: 16,
                                color: function(params) {
                                    var num = myColor.length
                                    return myColor[params.dataIndex % num]
                                }
                            }
                        },
                        max: 1,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{c}%'
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        z: 2,
                        data: data.cost
                    }]
            })
    },
    // 步数统计
    steps() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('steps'))
      myChart.setOption({
            title: {},
               backgroundColor: "#fff",
               tooltip: {},
               grid: {
                   top: '10%',
                   left: '3%',
                   right: '3%',
                   bottom: '4%',
                   containLabel: true
               },
               legend: {
                   itemGap: 50,
                   data: ['人员出入总数'],
                   textStyle: {
                       color: '#f9f9f9',
                       borderColor: '#fff'
                   }
               },
               xAxis: [{
                   type: 'category',
                   boundaryGap: true,
                   axisLine: { // 坐标轴轴线相关设置。数学上的x轴
                       show: true,
                       lineStyle: {
                           color: '#000'
                       }
                   },
                   axisLabel: { // 坐标轴刻度标签的相关设置
                       textStyle: {
                           color: '#000',
                           margin: 15
                       }
                   },
                   axisTick: {
                       show: false
                   },
                   data: ['2020-7-11', '2020-7-12', '2020-7-13', '2020-7-14', '2020-7-15', '2020-7-16', '2020-7-17']
               }],
               yAxis: [{
                   type: 'value',
                   min: 0,
                   max: 30000,
                   splitNumber: 7,
                   splitLine: {
                       show: true,
                       lineStyle: {
                           color: '#000'
                       }
                   },
                   axisLine: {
                       show: false
                   },
                   axisLabel: {
                       margin: 20,
                       textStyle: {
                           color: '#000'

                       }
                   },
                   axisTick: {
                       show: false
                   }
               }],
               series: [{
                   name: '注册总量',
                   type: 'line',
                   smooth: true, // 是否平滑曲线显示
                   // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                   showAllSymbol: true,
                   symbol: 'emptyCircle',
                   symbolSize: 6,
                   lineStyle: {
                       normal: {
                           color: "#f9d2a4" // 线条颜色
                       },
                       borderColor: '#f0f'
                   },
                   label: {
                       show: true,
                       position: 'top',
                       textStyle: {
                           color: '#000'
                       }
                   },
                   itemStyle: {
                       normal: {
                           color: "#28ffb3"

                       }
                   },
                   tooltip: {
                       show: false
                   },
                   areaStyle: { // 区域填充样式
                       normal: {
                           // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                           color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                   offset: 0,
                                   color: '#f9d2a4'
                               },
                               {
                                   offset: 1,
                                   color: '#ffa337'
                               }
                           ], false)
                           // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                           // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                       }
                   },
                   data: [5000, 1200, 11010, 26000, 7000, 13000, 15000]
                }]
      })
    },

    // 睡眠统计
    sleep() {
      const sleepEcharts = this.$echarts.init(document.getElementById('sleep'))

      sleepEcharts.setOption({
          backgroundColor: '#fff',
              title: {
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c}%"
              },

              legend: {
                  data: ['20:00-21:00', '22:00', '23:00-00:00', '01:00-02:00', '03:00'],
                  x: 'center',
                  y: '92%',
                  textStyle: {
                      color: '#000'
                  }
              },
              color: ['#c2c1bd', '#00a1e5', '#23c768', '#e5ce10', '#ff7e00', '#fe0000'],
              series: [
                  {
                      name: '睡眠时间',
                      type: 'funnel',
                      left: 'center',
                      width: '80%',
                      sort: 'ascending',
                      label: {
                          normal: {
                              formatter: '{b}'
                          }
                      },
                      labelLine: {
                          normal: {
                              show: true,
                              length: 30
                          }
                      },
                      itemStyle: {
                          normal: {
                              opacity: 0.3
                          }
                      },
                      tooltip: {
                          show: false
                      },
                      data: [{
                              value: 10,
                              name: '20:00-21:00'
                          }, {
                              value: 20,
                              name: '22:00'
                          },
                          {
                              value: 40,
                              name: '23:00-00:00'
                          },
                          {
                              value: 60,
                              name: '01:00-02:00'
                          },
                          {
                              value: 80,
                              name: '03:00'
                          }
                      ]
                  },

                  {
                      name: '睡眠时间',
                      type: 'funnel',
                      left: 'center',
                      width: '80%',
                      maxSize: '80%',
                      sort: 'ascending',
                      label: {
                          normal: {
                              position: 'inside',
                              formatter: '{c}%',
                              textStyle: {
                                  color: '#fff',
                                  fontSize: 14
                              }
                          },
                          emphasis: {
                              position: 'inside',
                              formatter: '{b}: {c}%'
                          }
                      },
                      itemStyle: {
                          normal: {
                              opacity: 0.8,
                              borderColor: 'rgba(12, 13, 43, .9)',
                              borderWidth: 3,
                              shadowBlur: 5,
                              shadowOffsetX: 0,
                              shadowOffsetY: 5,
                              shadowColor: 'rgba(0, 0, 0, .6)'
                          }
                      },

                      data: [{
                              value: 2,
                              name: '20:00-21:00'
                          }, {
                              value: 5,
                              name: '22:00'
                          },
                          {
                              value: 12,
                              name: '23:00-00:00'
                          },
                          {
                              value: 18,
                              name: '01:00-02:00'
                          },
                          {
                              value: 25,
                              name: '03:00'
                          }
                      ]
                  }
              ]
      })
    },
    GetMemberIndex() {
      const t_data = this
      const param = {
        memberId: ''
      }
      GetMemberIndex(param).then(res => {
        if (res.status) {
          t_data.memberIndexInfo_total = res.info.total
          t_data.memberIndexInfo_totalWarn = res.info.totalWarn
          t_data.memberIndexInfo_totalChart = res.info.totalChart
          t_data.getData_HeightEcharts(res.info.totalChart)
          t_data.data_earlyEcharts(res.info.totalChartPre)
          t_data.data_warnInfo_Echarts(res.info.totalWarnChart)
        }
      })
    },

    getEarlyWarning(id) {
      const t_data = this
      const param = {
        id: id
      }
      GetMemberHealthInfo_ByWarnId(param).then(res => {
        t_data.Is_Show_assess = true
        t_data.member_form.WarnMemberId = res.info.healthMemberId
        t_data.member_form.HealthMemberDoctorId = res.info.healthMemberDoctorId
        t_data.member_form.memberName = res.info.HealthMemberName
        t_data.member_form.doctor_SearchInput = res.info.HealthMemberDoctorName
        t_data.member_form.HealthWarnId = res.info.healthWarnId
        t_data.member_form.memberInform = res.info.healthIntro
      })
    },

    GetMemberDoctorList(val) {
      const t_data = this
      if (val == undefined) {
        val = ''
      }
      const param = {
        memberName: val
      }
      GetMemberDoctorList(param).then(res => {
        t_data.doctorList = res.info.list
      })
    }, // 保存评估信息
    save_assess() {
      const t_data = this
      if (t_data.member_form.HealthMemberDoctorId == '') {
        this.$message.error('请选择医生')
        return
      }
      if (t_data.member_form.HealthLevel == '') {
        this.$message.error('请选择评估健康状态')
        return
      }
      if (t_data.member_form.textarea_assess == '') {
        this.$message.error('请填写评估内容')
        return
      }
      const param = t_data.member_form
      console.log('params---------------' + param)
      MemberHealthAdd(param).then(res => {
        if (res.status) {
          this.$notify({
            title: '温馨提示',
            message: '评估成功',
            type: 'success'
          })
        }

        t_data.Is_Show_assess = false
        t_data.member_form.HealthLevel = ''
        t_data.member_form.textarea_assess = ''
        t_data.GetMemberIndex()
      })
    },

    // 个人评估记录
    GetMemberHealthList() {
      const t_data = this
      const param = {
        memberName: t_data.member_form.memberName
      }
      t_data.Is_Show_MyAssessInfo = true
      GetMemberHealthList(param).then(res => {
        t_data.tableData_AssessInfo = res.info.list
      })
    },

    getDocto_item(index, id, name) {
      this.list_index = index
      this.member_form.HealthMemberDoctorId = id
      this.member_form.doctor_SearchInput = name
    },

    getData_HeightEcharts(data) {
      const t_data = this
      const echarts = require('echarts')
      const myChart = t_data.$echarts.init(document.getElementById('data_HeightEcharts'))
      const option = {
        calculable: true,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          data: data.name
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            // 这是x轴文字颜色
            lineStyle: {
              width: 1,
              color: '#4164BD'
            }
          },
          data: data.dataX
        },
        yAxis: {
          axisLine: {
            // 这是x轴文字颜色
            lineStyle: {
              width: 1,
              color: '#4164BD'
            }
          },
          splitLine: {
            show: false
          },
          type: 'value'
        },
        series: [
          {
            name: '健康人数',
            type: 'line',
            smooth: true,
            symbolSize: 1,
            itemStyle: {
              normal: { color: '#50CDE1' }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(80,205,225,0.5)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(80,205,225,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(80,205,225,0.1)'
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: data.dataY1
          },
          {
            name: '亚健康人数',
            type: 'line',
            smooth: true,
            symbolSize: 1,
            itemStyle: {
              normal: { color: '#FAD95F' }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(250,217,95,0.5)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(250,217,95,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(250,217,95,0.1)'
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: data.dataY2
          },
          {
            name: '患病人数',
            type: 'line',
            smooth: true,
            symbolSize: 1,
            itemStyle: {
              normal: { color: '#FF7070' }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255,112,112,0.5)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255,112,112,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,112,112,0.1)'
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: data.dataY3
          }
        ]
      }
      myChart.setOption(option)
    },
    data_earlyEcharts(data) {
      const t_data = this
      const echarts = require('echarts')
      const myChart = t_data.$echarts.init(document.getElementById('data_earlyEcharts'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: data.name,
          textStyle: {
            color: '#fff'
          }
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '45%',
            style: {
              text: '百分比',
              textAlign: 'center',
              fill: '#fff',
              width: 30,
              height: 30,
              fontSize: 18
            }
          }
        ],
        color: ['#39ac57', '#37d3b2', '#ef9e1d'],
        series: [
          {
            name: '健康数据统计',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['50%', '45%'],
            data: [{ value: data.dataY[0], name: data.dataX[0] }, { value: data.dataY[1], name: data.dataX[1] }, { value: data.dataY[2], name: data.dataX[2] }]
          }
        ]
      }

      myChart.setOption(option)
    },
    data_warnInfo_Echarts(data) {
      const t_data = this
      const echarts = require('echarts')
      const myChart = t_data.$echarts.init(document.getElementById('data_warnInfo_Echarts'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: data.dataX,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        color: ['#4F6DCD', '#37d3b2', '#ef9e1d'],
        series: [
          {
            name: '报警处理百分比',
            type: 'pie',
            radius: [0, 85],
            center: ['50%', '40%'],
            // roseType: "area",
            data: [{ value: data.dataY[0], name: '未处理' }, { value: data.dataY[1], name: '已处理' }]
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
  .c-fontSize{
    font-size: 18px;
  }
  .c-bgColor2{
    background-color: #fff;
    color: #000;
    line-height: 30px;

  }
  .c-bgColor2>div{
    padding: 20px 0;
  }
.stepsPadding{
    // margin: 0 20px;
}
.u-f-ac {
}
.doctor_block_left>div{
  // margin: 57px 0;
}
.c-padding{
  height: 5rem !important;
  padding: 5px 20px!important;
}
.c-margin {
  margin: 0 auto;
}
.c-bgColor {
  line-height: 30px;
  padding: 40px 0px;
  background: #fff;
  color: #000;
  height:13rem;
  text-align: center;
}
.c-lineHeight {
  line-height: 35px;
}
.topTitle {
  padding-left: 0 !important;
  color: black !important;
  font-size: 20px !important;
}
.titleImg {
  height: 50px;
}
.item_text {
}
.item_block {
}
.container {
  background-color: rgb(245, 245, 245);
  color: #fff;
  margin: auto;

  .item_center_zero {
    font-size: 30px;
    color: rgb(212, 157, 101);
  }

  .item_index1 {
    // margin: auto 9rem;
    h2 {
      color: black;
      font-size: 16px;
    }
    .item_block {
      display: flex;
      align-items: center;
    }
    .item_block > span {
      font-size: 20px;
      color: black;
      padding-left: 15px;
    }
    .item_title {
      display: flex;
      height: 11rem;
      color: black;
      .item_all {
        flex: 1;
        display: flex;
        background-color: #fff;
        margin: auto;
        padding: 1.5rem 5rem;
        font-size: 2.5rem;

        .item_all_img {
          padding: 1rem 1rem;
          img {
            width: 130%;
            height: 100%;
          }
        }
        .item_all_qty_word {
          margin-bottom: 5px;
          font-size: 1rem;
        }
        .item_block_first {
          margin-left: 400px;
        }
        .item_block_seconde {
          margin-left: 800px;
        }
        .item_all_qty {
          flex: 1;
          padding: 30px 0px;
          margin-left: 20px;
          height: 30px;
          span {
            font-size: 1.5rem;
            color: black;
          }
        }
      }
    }
  }
  .item_text {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item_comme1 {
      color: black;
    }
    .item_comme2 {
      // margin-left: 9rem;
      color: black;
    }
    .item_comme3 {
      color: black;
    }
  }
  .item_comter_title{
    margin: 7px 0;
  }
  .cItem_index2{
    height: 13rem;
  }
  .item_index2 {
    //margin: 10px 9rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    color: #000;
    padding: 10px;
    .item {
      color: #333;
      height: 13rem;
      width: 100%;
      padding: 1rem;
      align-items: flex-start;
      background-color: #fff;
      min-width: 300px;
    }

    & > :nth-child(1) {
      flex: 1;
      .item_comter {
        overflow: hidden;
        overflow-y: scroll;
        // margin: 0 4rem;
        .item_comter_list {
          padding: 0.5rem;
        }
      }

      .more {
        color: #ed9237;
        font-weight: bold;
        margin-top: 15px;
      }
    }

    & > :nth-child(2) {
      flex: 0.7;
      margin: 0 1.5rem;

      .item_icon {
        margin-left: 2rem;
      }
      .item_center {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }

    & > :nth-child(3) {
      flex: 0.5;
      height: 10rem;

      .item_left_img {
        margin-left: 1rem;
        margin-top: 1rem;
      }
      .item_info {
        margin-top: 1.6rem;
        font-size: 35px;
      }
    }
  }

  .item_index3 {
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
    .item {
      color: #333;
      // height: 18rem;
      width: 100%;
      padding: 1rem;
      align-items: flex-start;
      background-color: #fff;
      min-width: 300px;
    }

    & > :nth-child(1) {
      .item_comter {
        flex: 1;
      }

      .doctor_block_right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .doctor_block_right_first {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      .doctor_block_right_seconde {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    & > :nth-child(2) {
      flex: 0.7;
      margin: 0 1.5rem;
      .item_center {
        width: 100%;
      }
      .doctor_block_center {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .doctor_block_center_first {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      .doctor_block_center_seconde {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
    }

    & > :nth-child(3) {
      flex: 0.5;
      background: #fff;
      overflow: hidden;
      overflow-y: scroll;
      .doctor_block_left {
        width: 100%;
      }
      .doctor_block {
        display: flex;
        align-items: center;
      }
      .el-row {
        margin: 2rem 0;
      }
      p {
        font-size: 12px;
      }
    }
  }

  .item_comme {
    display: flex;
    justify-content: space-between;
    .item_icon {
      width: 1rem;
      height: 1.8rem;
      vertical-align: middle;
    }
    .item_title {
      font-size: 1rem;
      height: 1.8rem;
      line-height: 2rem;
      color: #333;
      padding-left: 0.5rem;
    }
  }
}
</style>
