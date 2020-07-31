<template>
  <div class="container">
    <h2 style="color: #000;">系统设置</h2>

    <div class="systemInfo_title">
      <div class="item_Add">
        <el-button type="primary" @click="Is_Show_systemInfo = true">
          <i class="el-icon-check el-icon--left"></i>
          保存
        </el-button>
      </div>
      <div class="item_Add">
        <el-button type="primary" @click="Is_Show_systemInfo = true">
          <i class="el-icon-edit el-icon--left"></i>
          重置
        </el-button>
      </div>
    </div>

    <div class="item_systemInfo">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="second">
          <el-form :model="systemInfo_form" label-width="120px">
            <el-form-item label="标题:">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-input type="text" v-model="systemInfo_form.title" placeholder="请填写系统标题"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="链接:">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-input type="text" v-model="systemInfo_form.url" placeholder="请填写系统链接"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="短信" name="first">
          <el-form :model="noteInfo_form" label-width="120px">
            <el-form-item label="短信Key:">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-input type="text" v-model="noteInfo_form.Key" placeholder="请填写系统短信Key"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="短信Secret:">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-input
                      type="text"
                      v-model="noteInfo_form.Secret"
                      placeholder="请填写系统短信Secret"
                    ></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="版本上传" name="end">
          <el-form :model="editionInfo_form" label-width="120px">
            <el-form-item label="版本号:">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-input type="text" v-model="editionInfo_form.No" placeholder="请填写系统版本号"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="版本上传:">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-input type="text" v-model="editionInfo_form.Update"></el-input>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { GetnoteInfoAttachInfo } from '@/api/oamanagement/workbench'
export default {
  data() {
    return {
      activeName: 'second',
      systemInfo_form: {
        title: '',
        url: ''
      },
      noteInfo_form: {
        Key: '',
        Secret: ''
      },
      editionInfo_form: {
        No: '',
        Update: ''
      }
    }
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
  .systemInfo_title {
    margin-top: 10px;
    .item_Add {
      display: inline-block;
      padding: 10px 20px;
    }
  }
  .block {
    text-align: right;
  }
  .item {
    margin-top: 10px;
    background-color: #fff !important;
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
  /deep/.el-tabs__item{
    color: #000 !important;
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
  /deep/.el-tabs__item {
    color: #fff;
  }
}
</style>
