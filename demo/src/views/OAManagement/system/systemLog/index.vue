<template>
  <div class="container">
    <h2 style="color: #000000;">操作日志</h2>
    <div class="item">
      <div class="item_member">
        <el-table
          :header-cell-style="tableHeaderColor"
          :row-style="tableRowStyle"
          :data="tableData"
          height="670px"
          style="width: 100%"
        >
          <el-table-column prop="date" label="操作时间" width="180"></el-table-column>
          <el-table-column prop="type" label="操作类型" width="180"></el-table-column>
          <el-table-column prop="info" label="操作信息">
            <template slot-scope="scope">
              <h3 style="font-weight:700;color:#f40">{{scope.row.info}}</h3>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="操作状态" width="180"></el-table-column>
          <el-table-column prop="name" label="操作人" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { GetMemberAttachInfo } from '@/api/oamanagement/workbench'
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          type: '查询',
          info:
            'http://subei-iot-2019-staticelectricity.subei88.com/Home/Login/?rnd=0.5249102480921051',
          status: '成功',
          name: '管理员'
        },
        {
          date: '2016-05-02',
          type: '查询',
          info:
            'http://subei-iot-2019-staticelectricity.subei88.com/Home/Login/?rnd=0.5249102480921051',
          status: '成功',
          name: '管理员'
        },
        {
          date: '2016-05-02',
          type: '查询',
          info:
            'http://subei-iot-2019-staticelectricity.subei88.com/Home/Login/?rnd=0.5249102480921051',
          status: '成功',
          name: '管理员'
        },
        {
          date: '2016-05-02',
          type: '查询',
          info:
            'http://subei-iot-2019-staticelectricity.subei88.com/Home/Login/?rnd=0.5249102480921051',
          status: '成功',
          name: '管理员'
        }
      ]
    }
  },
  created() {},
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'color: #000;font-size:16px; background-color:#fff;'
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #000;background-color:#fff;height:65px;'
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
  .item_member {
    padding: 20px 0;
  }
  .item {
    margin-top: 10px;
    background-color: #fff !important;
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
  /deep/.el-form-item__label {
    color: #fff !important;
  }
  /deep/.el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid rgba(43, 51, 90, 1);
  }
  /deep/.el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid rgba(43, 51, 90, 1);
  }
  /deep/.el-table__body-wrapper{
    background-color: #fff;
  }
  /deep/.el-table tbody tr:hover > td {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
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

  /deep/.el-pagination button:disabled {
    background-color: rgba(43, 51, 90, 1) !important;
    margin: 0 10px;
  }
  /deep/.el-pagination .btn-prev,
  /deep/.el-pagination .btn-next {
    background-color: rgba(43, 51, 90, 1) !important;
    margin: 0 10px;
    color: #fff;
  }
  /deep/.el-pager li {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
    margin: 0 2px;
  }
  // 弹出框
  /deep/.memberList {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
  }
  /deep/.el-input__inner {
    background-color: rgba(43, 51, 90, 1) !important;
    color: #fff;
    border: none;
  }
  /deep/.el-dialog {
    background-color: rgba(33, 42, 85, 1) !important;
    padding: 30px;
  }
  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-form-item__label {
    color: #fff;
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
