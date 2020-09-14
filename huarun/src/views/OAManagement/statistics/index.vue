<template>
  <div
    class="container"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="heart_Rate">
      <div class="item">
        <h3 style=" display: inline-block; ">心率监测/bpm</h3>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="float:right ; margin-right: 10%"
          @click="getIs_show_memberList()"
        >人员查询</el-button>
        <!-- <el-button type="primary" icon="el-icon-share" style="float:right ; margin-right: 2%" @click="getIs_show_bMap()">运动轨迹</el-button> -->
        <span
          style="float:right ; margin-right: 5% ;font-size:22px ;line-height: 35px"
          v-if="Member_Name"
        >
          人员姓名:
          <span>{{Member_Name}}</span>
        </span>
        <el-radio-group
          v-model="tabPosition"
          style="padding:0 20px 10px"
          @change="getData_tabPosition"
        >
          <el-radio-button label="天" class="bgDay">天</el-radio-button>
          <el-radio-button label="月">月</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-if="tabPosition =='月'"
          v-model="value1"
          type="monthrange"
          :start-placeholder="dateStart"
          :end-placeholder="dateEnd"
          @change="getDateTime_animalHeat"
          placeholder="选择月"
        ></el-date-picker>
        <el-date-picker
          v-if="tabPosition =='天'"
          v-model="value1"
          type="daterange"
          :start-placeholder="dateStart"
          :end-placeholder="dateEnd"
          @change="getDateTime_animalHeat"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div id="heart_RateEcharts"></div>
    </div>

    <div class="bar_Echarts">
      <div class="sports_Monitor">
        <div class="item_list">
          <h3 style=" display: inline-block">高血压监测/mmHg</h3>
        </div>
        <div id="data_HeightEcharts"></div>
      </div>
      <div class="sleep_Monitor">
        <div class="item_list">
          <h3 style=" display: inline-block;color: #000000;">低血压监测/mmHg</h3>
        </div>
        <div id="data_LowEcharts"></div>
      </div>
    </div>
    <div class="bar_Echarts">
      <div class="sports_Monitor">
        <div class="item_list">
          <h3 style=" display: inline-block ">运动步数统计/step</h3>
        </div>
        <div id="sports_MonitorEcharts"></div>
      </div>
      <div class="sleep_Monitor">
        <div class="item_list">
          <h3 style=" display: inline-block;color:#000000;">睡眠监测/h</h3>
        </div>
        <div id="sleep_MonitorEcharts"></div>
      </div>
    </div>
    <el-dialog title="轨迹路线" :visible.sync="Is_show_bMap">
      <div id="bMap_Echarts"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Is_show_bMap = false">取 消</el-button>
        <el-button type="primary" @click="Is_show_bMap = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="筛选人员" :visible.sync="Is_show_memberList">
      <div class="pupMenber">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="人员名称">
            <el-input v-model="memberName" placeholder="请填写人员名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="人员电话">
            <el-input v-model="memberTel" placeholder="请输入人员电话"></el-input>
          </el-form-item>-->
          <el-form-item label="人员分类">
            <el-radio-group v-model="memberType">
              <el-radio label="1">员工</el-radio>
              <el-radio label="2">领导</el-radio>
              <el-radio label="3">医生</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="memberList"
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <ul>
          <li
            v-for="(item,index) in memberList"
            :key="index"
            :class="{'bgcolor' : list_index ==index}"
            @click="getMember_item(index,item.ID,item.MemberName)"
          >{{item.MemberName}}</li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Is_show_memberList = false">取 消</el-button>
        <el-button type="primary" @click="getEchartsInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  workbenchList,
  EchartsInfo,
  MemberAdd
} from '@/api/oamanagement/workbench'
export default {
  components: {},
  data() {
    return {
      value1: '',
      Is_show_bMap: false,
      Is_show_memberList: false,
      tabPosition: '天',

      chartType: 'day',
      dateStart: '',
      dateEnd: '',
      loading: false,
      loading2: false,

      HeatEcharts: '',
      RateEcharts: '',
      MonitorEcharts: '',

      form: {},
      memberList: [],
      list_index: -1,
      memberId: '',
      memberName: '',
      Member_Name: '',
      memberTel: '',
      memberType: ''
    }
  },
  created() {
    this.getNewData()
  },

  mounted() {},

  methods: {
    getNewData() {
      var t_data = this
      var myDate = new Date()
      t_data.dateStart =
        myDate.getFullYear() +
        '-' +
        (myDate.getMonth() + 1) +
        '-' +
        myDate.getDate()
      t_data.dateEnd =
        myDate.getFullYear() +
        '-' +
        (myDate.getMonth() + 1) +
        '-' +
        new Date(myDate.getTime() + 24 * 60 * 60 * 1000).getDate()
      console.log('开始时间-----------' + t_data.dateStart)
      console.log('结束时间-----------' + t_data.dateEnd)

      t_data.getEchartsInfo()
    },
    getData_tabPosition() {
      let t_data = this
      var myDate = new Date()
      if (t_data.value1 == '') {
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day'
          t_data.dateStart =
            myDate.getFullYear() +
            '-' +
            (myDate.getMonth() + 1) +
            '-' +
            myDate.getDate()
          t_data.dateEnd =
            myDate.getFullYear() +
            '-' +
            (myDate.getMonth() + 1) +
            '-' +
            new Date(myDate.getTime() + 24 * 60 * 60 * 1000).getDate()
          t_data.getEchartsInfo()
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month'
          t_data.dateStart =
            myDate.getFullYear() + '-' + (myDate.getMonth() + 1 + '-' + 1)
          t_data.dateEnd =
            myDate.getFullYear() + '-' + (myDate.getMonth() + 2 + '-' + 1)
          t_data.getEchartsInfo()
        }
      } else {
        if (t_data.tabPosition == '天') {
          t_data.chartType = 'day'
          t_data.dateStart =
            t_data.value1[0].getFullYear() +
            '-' +
            (t_data.value1[0].getMonth() + 1) +
            '-' +
            t_data.value1[0].getDate()
          t_data.dateEnd =
            t_data.value1[1].getFullYear() +
            '-' +
            (t_data.value1[1].getMonth() + 1) +
            '-' +
            new Date(t_data.value1[1].getTime() + 24 * 60 * 60 * 1000).getDate()
          t_data.getEchartsInfo()
        }
        if (t_data.tabPosition == '月') {
          t_data.chartType = 'month'
          t_data.dateStart =
            t_data.value1[0].getFullYear() +
            '-' +
            (t_data.value1[0].getMonth() + 1 + '-' + 1)
          t_data.dateEnd =
            t_data.value1[1].getFullYear() +
            '-' +
            (t_data.value1[1].getMonth() + 2 + '-' + 1)
          t_data.getEchartsInfo()
        }
      }
    },
    getEchartsInfo() {
      let t_data = this
      let param = {
        memberId: t_data.memberId,
        chartType: t_data.chartType,
        dateStart: t_data.dateStart,
        dateEnd: t_data.dateEnd
      }
      t_data.Is_show_memberList = false
      t_data.loading = true
      console.log('param----------' + JSON.stringify(param))
      EchartsInfo(param).then(res => {
        // console.log("res----------" + JSON.stringify(res));
        t_data.loading = false
        t_data.RateEcharts = res.info.chart1
        t_data.lowEcharts = res.info.chart2
        t_data.HeatEcharts = res.info.chart3
        t_data.MonitorEcharts = res.info.chart4
        t_data.Sleep_Monitor = res.info.chart5
        t_data.getHeart_RateEcharts(t_data.RateEcharts)
        t_data.getData_LowEcharts(t_data.lowEcharts)
        t_data.getData_HeightEcharts(t_data.HeatEcharts)
        t_data.getSports_MonitorEcharts(t_data.MonitorEcharts)
        t_data.getSleep_MonitorEcharts(t_data.Sleep_Monitor)
      })
    },
    getIs_show_bMap() {
      var t_data = this
      t_data.Is_show_bMap = true
      setTimeout(function() {
        t_data.getbMap_Echarts()
      }, 1000)
    },
    getIs_show_memberList() {
      var t_data = this
      t_data.Is_show_memberList = true
    },
    getbMap_Echarts() {
      let t_data = this
      let echarts = require('echarts')
      let myChart = t_data.$echarts.init(
        document.getElementById('bMap_Echarts')
      )
      app.title = '热力图与百度地图扩展'
      $.get('data/asset/data/hangzhou-tracks.json', function(data) {
        var points = [].concat.apply(
          [],
          data.map(function(track) {
            return track.map(function(seg) {
              return seg.coord.concat([1])
            })
          })
        )
        myChart.setOption(
          (option = {
            animation: false,
            bmap: {
              center: [120.13066322374, 30.240018034923],
              zoom: 14,
              roam: true
            },
            visualMap: {
              show: false,
              top: 'top',
              min: 0,
              max: 5,
              seriesIndex: 0,
              calculable: true,
              inRange: {
                color: ['blue', 'blue', 'green', 'yellow', 'red']
              }
            },
            series: [
              {
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: points,
                pointSize: 5,
                blurSize: 6
              }
            ]
          })
        )
        if (!app.inNode) {
          // 添加百度地图插件
          var bmap = myChart
            .getModel()
            .getComponent('bmap')
            .getBMap()
          bmap.addControl(new BMap.MapTypeControl())
        }
        // myChart.setOption(option);
      })
    },
    getData_LowEcharts(data) {
      let t_data = this
      let echarts = require('echarts')
      let myChart = t_data.$echarts.init(
        document.getElementById('data_LowEcharts')
      )
      let option = {
        calculable: true,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高低血压', '平均低血压', '最低低血压'],
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              width: 1,
              color: '#4164BD'
            }
          },
          data: data.dataX
        },
        yAxis: {
          axisLine: {
            //这是x轴文字颜色
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
            name: '最高低血压',
            type: 'line',
            lineStyle: {
              color: '#8E5CD0'
            },
            smooth: true,
            data: data.dataY2
          },
          {
            name: '平均低血压',
            type: 'line',
            lineStyle: {
              color: '#1890FF'
            },
            smooth: true,
            data: data.dataY3
          },
          {
            name: '最低低血压',
            type: 'line',
            lineStyle: {
              color: '#FAD95F'
            },
            smooth: true,
            data: data.dataY1
          }
        ]
      }
      myChart.setOption(option)
    },
    getData_HeightEcharts(data) {
      let t_data = this
      let echarts = require('echarts')
      let myChart = t_data.$echarts.init(
        document.getElementById('data_HeightEcharts')
      )
      let option = {
        calculable: true,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高高血压', '平均高血压', '最低高血压'],
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              width: 1,
              color: '#4164BD'
            }
          },
          data: data.dataX
        },
        yAxis: {
          axisLine: {
            //这是x轴文字颜色
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
            name: '最高高血压',
            type: 'line',
            lineStyle: {
              color: '#8E5CD0'
            },
            data: data.dataY2
          },
          {
            name: '平均高血压',
            type: 'line',
            lineStyle: {
              color: '#1890FF'
            },
            data: data.dataY3
          },
          {
            name: '最低高血压',
            type: 'line',
            lineStyle: {
              color: '#FAD95F'
            },
            data: data.dataY1
          }
        ]
      }
      myChart.setOption(option)
    },
    getHeart_RateEcharts(data) {
      let t_data = this
      let echarts = require('echarts')
      let myChart = t_data.$echarts.init(
        document.getElementById('heart_RateEcharts')
      )
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['最高心率', '平均心率', '最低心率'],
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                width: 1,
                color: '#4164BD'
              }
            },
            data: data.dataX
          }
        ],
        yAxis: [
          {
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                width: 1,
                color: '#4164BD'
              }
            },
            splitLine: {
              show: false
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '最高心率',
            type: 'line',
            lineStyle: {
              color: '#FF3950'
            },
            data: data.dataY2
          },
          {
            name: '平均心率',
            type: 'line',
            lineStyle: {
              color: '#8E5CD0' //改变折线颜色
            },
            data: data.dataY3
          },
          {
            name: '最低心率',
            type: 'line',
            lineStyle: {
              color: '#FAD95F' //改变折线颜色
            },
            data: data.dataY1
          }
        ]
      }
      myChart.setOption(option)
    },
    getSports_MonitorEcharts(data) {
      let t_data = this
      let echarts = require('echarts')
      let myChart = t_data.$echarts.init(
        document.getElementById('sports_MonitorEcharts')
      )
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['运动步数'],
          textStyle: {
            color: '#000'
          }
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
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              width: 1,
              color: '#4164BD'
            }
          },
          data: data.dataX
        },
        yAxis: {
          axisLine: {
            //这是x轴文字颜色
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
        color: ['#5DDAC5'],
        series: [
          {
            name: '运动步数',
            type: 'bar',
            barWidth: '20%',
            data: data.dataY2
          }
        ]
      }
      myChart.setOption(option)
    },
    getSleep_MonitorEcharts(data) {
      let t_data = this
      let echarts = require('echarts')
      let myChart = t_data.$echarts.init(
        document.getElementById('sleep_MonitorEcharts')
      )
      let option = {
        calculable: true,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['睡眠时长'],
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          left: '15%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              width: 1,
              color: '#4164BD'
            }
          },
          data: data.dataX
        },
        yAxis: {
          axisLine: {
            //这是x轴文字颜色
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
        color: ['#1C92FF'],
        series: [
          {
            name: '睡眠时长',
            type: 'bar',
            barWidth: '20%',
            smooth: true,
            data: data.dataY2
          }
        ]
      }
      myChart.setOption(option)
    },
    getDateTime_animalHeat() {
      let t_data = this
      if (t_data.tabPosition == '天') {
        t_data.chartType = 'day'
        t_data.dateStart =
          t_data.value1[0].getFullYear() +
          '-' +
          (t_data.value1[0].getMonth() + 1) +
          '-' +
          t_data.value1[0].getDate()
        t_data.dateEnd =
          t_data.value1[1].getFullYear() +
          '-' +
          (t_data.value1[1].getMonth() + 1) +
          '-' +
          t_data.value1[1].getDate()
      }
      if (t_data.tabPosition == '月') {
        t_data.chartType = 'month'
        t_data.dateStart =
          t_data.value1[0].getFullYear() +
          '-' +
          (t_data.value1[0].getMonth() + 1 + '-' + 1)
        t_data.dateEnd =
          t_data.value1[1].getFullYear() +
          '-' +
          (t_data.value1[1].getMonth() + 1 + '-' + 1)
      }
      t_data.getEchartsInfo()
      // setTimeout(function (){
      //   t_data.getAnimal_HeatEcharts(t_data.HeatEcharts)
      // },1000)
    },
    getDeviceList: function() {
      let t_data = this
      let param = {
        pageIndex: "",
        pageSize: "",
        memberType: t_data.memberType,
        memberName: t_data.memberName
      }
      t_data.loading2 = true
      workbenchList(param).then(res => {
        t_data.loading2 = false
        t_data.memberList = res.info.list
        // console.log(
        //   "res.info.totalRow------res-------" + JSON.stringify(res.info.list)
        // );
      })
    },
    getMember_item(index, id, name) {
      this.list_index = index
      this.memberId = id
      this.Member_Name = name
    }
  },
  watch: {
    memberName(val) {
      this.memberName = val
      this.getDeviceList()
    },
    memberType(val) {
      this.memberType = val
      this.getDeviceList()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/tabs.scss';
.container {
  max-width: 1680px;
  height: 100%;
  color: #fff;
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
  #bMap_Echarts {
    height: 230px;
    width: 100%;
  }
  .heart_Rate {
    padding-top: 20px;
    background-color: #fff;
    margin: 0 10px;
    color: #000;
    h3 {
      padding: 0 5% 0 20px;
    }
    #heart_RateEcharts {
      height: 210px;
    }
  }
  .bar_Echarts {
    display: flex;
    .sports_Monitor {
      flex: 1;
      height: 100%;
      padding-top: 10px;
      background-color: #fff;
      margin: 10px;
      h3 {
        padding: 20px 0 0 20px;
        color:#000;
      }
      #sports_MonitorEcharts {
        height: 220px;
      }
      #data_HeightEcharts {
        height: 220px;
      }
    }
    .sleep_Monitor {
      flex: 1;
      height: 100%;
      padding-top: 10px;
      background-color: #fff;
      margin: 10px;
      h3 {
        color:000;
        padding: 20px 0 0 20px;
      }
      #sleep_MonitorEcharts {
        height: 220px;
      }
      #data_LowEcharts {
        height: 220px;
      }
    }
  }
  // 弹出框
}
</style>
