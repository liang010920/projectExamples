<template>
  <div class="container">
    <div class="item_title">
      <div>
        <img src="./../../static/img/bigScreen/1.png" alt />
      </div>
      <div class="item_content">
        <img src="./../../static/img/bigScreen/size.png" alt />
      </div>
      <div>
        <img src="./../../static/img/bigScreen/2.png" alt />
      </div>
    </div>
    <div class="item_warn">
      <div class="warn">
        <img src="./../../static/img/bigScreen/3.png" alt />
        <div class="warn_qty">
          <div class="qty">
            <div>一级预警</div>
            <div class="qty_size1">{{memberIndex_total.totalWarnQty1}}人</div>
          </div>
          <div class="qty">
            <div>二级预警</div>
            <div class="qty_size2">{{memberIndex_total.totalWarnQty2}}人</div>
          </div>
          <div class="qty">
            <div>三级预警</div>
            <div class="qty_size3">{{memberIndex_total.totalWarnQty3}}人</div>
          </div>
        </div>
      </div>
    </div>

    <div class="realTime_data">
      <div class="health_data">
        <div class="health_qty">
          <img src="./../../static/img/bigScreen/left1.png" alt />
          <div class="health_qty_item">
            <div class="health_qty_item_title">健康数据统计</div>
            <div class="health_qty_item_content">
              <div class="health_qty_item_content_flex">
                <div>
                  <div>总人数</div>
                  <div class="health_qty_item_content_color1">{{memberIndex_total.totalQty1}}人</div>
                </div>
                <div>
                  <div>健康</div>
                  <div class="health_qty_item_content_color2">{{memberIndex_total.totalQty2}}人</div>
                </div>
              </div>
              <div class="health_qty_item_content_flex">
                <div>
                  <div>亚健康</div>
                  <div class="health_qty_item_content_color3">{{memberIndex_total.totalQty3}}人</div>
                </div>
                <div>
                  <div>患病</div>
                  <div class="health_qty_item_content_color4">{{memberIndex_total.totalQty4}}人</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="health_echarts">
          <img src="./../../static/img/bigScreen/left2.png" alt />
          <div class="health_echarts_item">
            <div class="health_echarts_item_title">健康数据统计</div>
            <div class="health_echarts_item_content">
              <div id="data_HealthEcharts"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="warn_data">
        <img src="./../../static/img/bigScreen/center.png" alt />
        <div class="warn_data_item">
          <div class="warn_data_item_title">预警实时数据</div>
          <div class="warn_data_item_content">
            <table>
              <tr>
                <th>姓名</th>
                <th>预警等级</th>
                <th>预警类别</th>
                <th>预警数值</th>
                <th>处理情况</th>
              </tr>
              <tr v-for="(item,index) in memberIndex_totalWarn" :key="index">
                <td>
                  <div>{{item.WarnMemberName}}</div>
                </td>
                <td>
                  <div style="color:#938fe6" v-if="item.WarnLevel =='1'">{{item.WarnLevel}}级预警</div>
                  <div style="color:#37d3b2" v-if="item.WarnLevel =='2'">{{item.WarnLevel}}级预警</div>
                  <div style="color:#ef9e1d" v-if="item.WarnLevel =='3'">{{item.WarnLevel}}级预警</div>
                </td>
                <td>
                  <div style="color:#39ac57">{{item.WarnTypeName}}</div>
                </td>
                <td>
                  <div style="color:#ef9e1d">{{item.WarnValue}}</div>
                </td>
                <td>
                  <div v-if="item.WarnStatusIsSend ==true">已处理</div>
                  <div v-if="item.WarnStatusIsSend ==false">未处理</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="analyst_data">
        <div class="analyst_data_line">
          <img src="./../../static/img/bigScreen/right1.png" alt />
          <div class="analyst_data_line_item">
            <div class="analyst_data_line_item_title">健康数据分析</div>
            <div class="analyst_data_line_item_content">
              <div id="data_HealthEcharts_line"></div>
            </div>
          </div>
        </div>
        <div class="analyst_data_pie">
          <img src="./../../static/img/bigScreen/right2.png" alt />
          <div class="analyst_data_pie_item">
            <div class="analyst_data_pie_item_title">报警处理百分比</div>
            <div class="analyst_data_pie_item_content">
              <div id="data_HealthEcharts_pie"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetMemberIndexTotal } from "@/api/oamanagement/workbench";
export default {
  data() {
    return {
      memberIndex_total:"",
      memberIndex_totalWarn:[],
    };
  },
  mounted() {
    this.GetMemberIndexTotal();
    this.getHealthEchartsInfo();
    this.data_HealthEcharts_line();
    this.data_HealthEcharts_pie();
  },
  methods: {
    GetMemberIndexTotal(){
      let t_data =this
      let param ={
        memberId: localStorage.getItem("memberID")
      }
      console.log("大屏幕人员登录ID-------------"+JSON.stringify(param))
      GetMemberIndexTotal(param).then(res=>{
        if(res.status){
          console.log("大屏幕人员登录信息-------------"+JSON.stringify(res.info))
          t_data.memberIndex_total = res.info.total
          t_data.memberIndex_totalWarn = res.info.totalWarn
          t_data.memberIndex_totalWarnChart = res.info.totalWarnChart
        }
      })

    },
    getHealthEchartsInfo() {
      let t_data = this;
      let echarts = require("echarts");
      let myChart = t_data.$echarts.init(
        document.getElementById("data_HealthEcharts")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["健康", "亚健康", "患病"],
          textStyle: {
            color: "#fff"
          }
        },
        graphic: [
          {
            type: "text",
            left: "center",
            top: "45%",
            style: {
              text: "百分比",
              textAlign: "center",
              fill: "#fff",
              width: 30,
              height: 30,
              fontSize: 18
            }
          }
        ],
        color: ["#39ac57", "#37d3b2", "#ef9e1d"],
        series: [
          {
            name: "健康数据统计",
            type: "pie",
            radius: ["50%", "65%"],
            center: ["50%", "45%"],
            data: [
              { value: 335, name: "健康" },
              { value: 310, name: "亚健康" },
              { value: 234, name: "患病" }
            ]
          }
        ]
      };

      myChart.setOption(option);
    },
    data_HealthEcharts_line() {
      let t_data = this;
      let echarts = require("echarts");
      let myChart = t_data.$echarts.init(
        document.getElementById("data_HealthEcharts_line")
      );
      let option = {
        legend: {
          x: "center",
          y: "bottom",
          data: ["患病", "亚健康", "健康"],
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          top: "5%",
          left: "6%",
          right: "10%",
          bottom: "18%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                width: 1,
                color: "#4164BD"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              //这是y轴文字颜色
              lineStyle: {
                width: 1,
                color: "#4164BD"
              }
            }
          }
        ],
        series: [
          {
            name: "患病",
            type: "line",
            itemStyle: {
              normal: { color: "#ef9e1d" }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "亚健康",
            type: "line",
            itemStyle: {
              normal: { color: "#37d3b2" }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "健康",
            type: "line",
            itemStyle: {
              normal: { color: "#39ac57" }
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      };

      myChart.setOption(option);
    },
    data_HealthEcharts_pie() {
      let t_data = this;
      let echarts = require("echarts");
      let myChart = t_data.$echarts.init(
        document.getElementById("data_HealthEcharts_pie")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["总报警", "未处理", "已处理"],
          textStyle: {
            color: "#fff"
          }
        },
        calculable: true,
        color: ["#4F6DCD", "#37d3b2", "#ef9e1d"],
        series: [
          {
            name: "报警处理百分比",
            type: "pie",
            radius: [0, 85],
            center: ["50%", "40%"],
            roseType: "area",
            data: [
              { value: 7, name: "总报警" },
              { value: 8, name: "未处理" },
              { value: 15, name: "已处理" }
            ]
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  background: url("./../../static/img/bigScreen/bgcolor.png") no-repeat;
  color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
  .item_title {
    display: flex;
    justify-content: space-between;
    height: 7.2%;
    .item_content {
      padding: 37px 4% 0 4%;
    }
  }
  .item_warn {
    margin-top: 10px;
    padding: 25px 35px 0 35px;
    .warn {
      height: 9%;
      position: relative;
      .warn_qty {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-evenly;
        .qty {
          text-align: center;
          padding-top: 30px;
          font-size: 21px;
          line-height: 36px;
          .qty_size1 {
            font-size: 28px;
            font-weight: 700;
            color: #938fe6;
          }
          .qty_size2 {
            font-size: 28px;
            font-weight: 700;
            color: #37d3b2;
          }
          .qty_size3 {
            font-size: 28px;
            font-weight: 700;
            color: #ef9e1d;
          }
        }
      }
    }
  }
  .realTime_data {
    display: flex;
    margin-top: 30px;
    .health_data {
      flex: 0.5;
      .health_qty {
        position: relative;
        height: 380px;
        .health_qty_item {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 30px 70px 40px 50px;
          .health_qty_item_title {
            color: #fff;
            text-align: center;
            height: 65px;
            line-height: 65px;
            font-size: 18px;
          }
          .health_qty_item_content {
            height: 235px;
            .health_qty_item_content_flex {
              display: flex;
              justify-content: space-around;
              height: 117px;
              line-height: 30px;
              padding-top: 20px;
              text-align: center;
              .health_qty_item_content_color1 {
                color: #938fe6;
                font-size: 26px;
                font-weight: 700;
              }
              .health_qty_item_content_color2 {
                color: #39ac57;
                font-size: 26px;
                font-weight: 700;
              }
              .health_qty_item_content_color3 {
                color: #37d3b2;
                font-size: 26px;
                font-weight: 700;
              }
              .health_qty_item_content_color4 {
                color: #ef9e1d;
                font-size: 26px;
                font-weight: 700;
              }
            }
          }
        }
      }
      .health_echarts {
        position: relative;
        height: 380px;
        .health_echarts_item {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px 40px;
          .health_echarts_item_title {
            color: #fff;
            text-align: center;
            height:45px;
            line-height:45px;
            font-size: 18px;
          }
          .health_echarts_item_content {
            height: 235px;
            #data_HealthEcharts {
              height: 235px;
              width: 100%;
            }
          }
        }
      }
    }
    .warn_data {
      flex: 1;
      position: relative;
      height: 760px;
      .warn_data_item {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 40px;
        .warn_data_item_title {
          font-size: 28px;
          text-align: left;
          height: 75px;
          line-height: 75px;
        }
        .warn_data_item_content{
          padding: 0 40px;
          display: flex;
          height: 560px;
          overflow-x: auto;
          table, th{
            font-size: 20px;
            text-align: center;
            padding-bottom: 20px;
            flex: 1;
          }
          table, td{
            font-size: 15px;
            text-align: center;
            padding: 10px 0;
            flex: 1;
          }
        }
      }
    }
    .analyst_data {
      flex: 0.5;
      .analyst_data_line {
        position: relative;
        height: 380px;
        .analyst_data_line_item {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 50px 40px;
          .analyst_data_line_item_title {
            color: #fff;
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
          }
          .analyst_data_line_item_content {
            height: 235px;
            #data_HealthEcharts_line {
              height: 235px;
              width: 100%;
            }
          }
        }
      }
      .analyst_data_pie {
        position: relative;
        height: 380px;
        .analyst_data_pie_item {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 30px 40px 40px;
          .analyst_data_pie_item_title {
            color: #fff;
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
          }
          .analyst_data_pie_item_content {
            height: 235px;
            #data_HealthEcharts_pie {
              height: 235px;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>