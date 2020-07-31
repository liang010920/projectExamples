<template>
  <div class="container">
    <div class="record">
      <h2 style="color: #000000;">人员健康档案</h2>
      <div class="record_title">
        <div class="item_Add" @click="getTableInfo">
          <el-button type="primary">
            添加
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
        <!-- <div class="item_Add">
          <el-button type="primary" icon="el-icon-share">下载文件</el-button>
        </div>-->
        <div class="item_input">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="按人员名称查询">
              <el-input v-model="search_Input" placeholder="人员名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog title="添加健康文档" :visible.sync="IS_show_record">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名:">
          <el-input
            placeholder="请搜索姓名"
            v-model="search_Input3"
            class="input-with-select"
            :disabled="true"
          >
            <el-button slot="append" icon="el-icon-search" @click="isShow = true"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="类型:">
          <el-radio-group v-model="type_radio">
            <el-radio label="1">病例报告</el-radio>
            <el-radio label="2">体检报告</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="档案:">
          <el-upload
            ref="fileUpload"
            :action="crmFileSaveUrl"
            :headers="httpHeader"
            name="file"
            :data="{type: 'file', batchId: batchId}"
            multiple
            :limit="1"
            accept="*.*"
            :on-success="imgFileUploadSuccess"
          >
            <p>
              <img src="@/assets/img/relevance_file.png" alt />
              添加档案
            </p>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述:">
          <el-input type="textarea" v-model="attachIntro" :rows="7" placeholder="请填写报告描述"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_record = false">取 消</el-button>
        <el-button type="primary" @click="HealthRecord_save()">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择人员" :visible.sync="isShow">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="人员名称">
            <el-input v-model="search_Input2" placeholder="请填写人员名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="memberList"
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
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
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="item">
      <div class="item_table">
        <el-table
          :data="tableData"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          style="width: 100%"
          height="670px"
          @@selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="AttachDate" align="center" label="日期" width="180"></el-table-column>
          <el-table-column prop="AttachMemberName" align="center" label="姓名" width="100"></el-table-column>
          <el-table-column prop="AttachMemberTel" align="center" label="电话" width="200"></el-table-column>
          <!-- 病例档案   检查档案 -->
          <el-table-column label="档案类型" width="200" align="center">
            <template slot-scope="scope" align="center">
              <div>
                <div v-if="scope.row.AttachType == 1">病例报告</div>
                <div v-if="scope.row.AttachType == 2">体检报告</div>
              </div>
            </template>
          </el-table-column>
          <!-- pdf   word -->
          <el-table-column label="文档类型" width="200" align="center">
            <template slot-scope="scope" align="center">
              <div>{{scope.row.AttachName | s_jq}}</div>
            </template>
          </el-table-column>
          <el-table-column label="文档名称">
            <template slot-scope="scope" align="center">
              <a
                :href="'/Upload/'+scope.row.AttachPath"
                style="color:#09f"
                target="_blank"
                v-if="scope.row.AttachPath"
              >{{scope.row.AttachName}}</a>
              <a v-else>{{scope.row.AttachName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="left">
            <template slot-scope="scope" align="center">
              <div>
                <span
                  class="warnOne"
                  style="padding-right:20px;"
                  @click="Compile_btn(scope.row.ID)"
                >编辑</span>
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
    <el-dialog title="修改健康档案" :visible.sync="Is_Show_Compile">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名:">
          <el-input
            placeholder="请搜索姓名"
            v-model="search_Input3"
            class="input-with-select"
            :disabled="true"
          >
            <el-button slot="append" icon="el-icon-search" @click="isShow = true"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="类型:">
          <el-radio-group v-model="type_radio">
            <el-radio label="1">病例报告</el-radio>
            <el-radio label="2">体检报告</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="档案:" v-if="!fileList_name">
          <el-upload
            ref="fileUpload"
            :action="crmFileSaveUrl"
            :headers="httpHeader"
            name="file"
            :data="{type: 'file', batchId: batchId}"
            multiple
            :limit="1"
            accept="*.*"
            :on-success="imgFileUploadSuccess"
          >
            <p>
              <img src="@/assets/img/relevance_file.png" alt />
              添加档案
            </p>
          </el-upload>
        </el-form-item>
        <el-form-item label="档案:" v-else>
          <div
            style="width:80%;height:40px;line-height:40px;border:1px solid #999 ;padding:0 5px;position: relative; "
          >
            <i
              style="position: absolute; top:-18px;right:-5px;font-size:40px;color:red;cursor: pointer;"
              @click="delete_Img()"
            >×</i>
            {{fileList_name}}
          </div>
        </el-form-item>

        <el-form-item label="描述:">
          <el-input type="textarea" v-model="attachIntro" :rows="7" placeholder="请填写报告描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_Compile = false">取 消</el-button>
        <el-button type="primary" @click="Compile_save()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { objDeepCopy } from '@/utils'
import { s_jq } from './../../../utils/filter'
// API
import axios from 'axios'
import { crmFileSave, crmFileDelete, crmFileSaveUrl } from '@/api/common'
import { guid } from '@/utils'
import {
  GetMemberAttachList,
  upload,
  MemberAttachAdd,
  MemberAttachDelete,
  workbenchList,
  GetMemberAttachInfo
} from '@/api/oamanagement/workbench'
export default {
  components: {},
  data() {
    return {
      isShow: false,
      IS_show_record: false,
      Is_Show_Compile: false,
      dataTime: '',
      pageIndex: 1,
      pageSize: 20,
      tableData: [],
      menberInfo: {
        MemberName: '',
        MemberDataT02Height: '',
        MemberDataT02Low: '',
        MemberLocation: ''
      },
      options: [
        { value: '0', label: '病例报告' },
        { value: '1', label: '体检报告' }
      ],
      value: '',
      totalRow: 0,
      loading: false,
      form: {
        name: ''
      },
      search_Input: '',
      search_Input2: '',
      search_Input3: '',
      Compile_Id: '',
      fileList_name: '',
      fileList_response: '',
      multipleSelection: [],
      imageFileList: [],
      attachIntro: '',
      fileList: [],
      batchId: guid(),

      memberList: [],
      list_index: -1,
      memberId: '',
      type_radio: '',
      loading2: false
    }
  },
  computed: {
    crmFileSaveUrl() {
      return crmFileSaveUrl
    },
    httpHeader() {
      return {
        'Admin-Token': axios.defaults.headers['Admin-Token']
      }
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
        memberName: val
      }
      t_data.loading = true
      GetMemberAttachList(param).then(res => {
        t_data.totalRow = res.info.totalRow
        t_data.tableData = res.info.list
        t_data.loading = false
      })
    },
    GetWorkbenchList(val) {
      let t_data = this
      if (val == undefined) {
        val = ''
      }
      let param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
        memberName: val
      }
      t_data.loading = true
      workbenchList(param).then(res => {
        t_data.memberList = res.info.list
        t_data.loading = false
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
          MemberAttachDelete(param).then(res => {
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

    Compile_btn(id) {
      let t_data = this
      t_data.Is_Show_Compile = true
      let param = {
        id: id
      }
      GetMemberAttachInfo(param).then(res => {
        t_data.Compile_Id = res.info.ID
        t_data.memberId = res.info.AttachMemberId
        t_data.search_Input3 = res.info.AttachMemberName
        t_data.type_radio = res.info.AttachType
        t_data.attachIntro = res.info.AttachIntro
        t_data.fileList_name = res.info.AttachName
        t_data.fileList_response = res.info.AttachPath
      })
    },
    Compile_save() {
      let t_data = this
      if (t_data.fileList_name) {
        if (t_data.memberId == '') {
          this.$message.error('请选择人员')
          return
        }
        if (t_data.type_radio == '') {
          this.$message.error('请选择档案类型')
          return
        }
        if (t_data.fileList_name == '') {
          this.$message.error('请上传文档')
          return
        }
        if (t_data.attachIntro == '') {
          this.$message.error('请上传文档描述')
          return
        }
        var param = {
          ID: t_data.Compile_Id,
          AttachMemberID: t_data.memberId,
          AttachType: t_data.type_radio,
          AttachName: t_data.fileList_name,
          AttachPath: t_data.fileList_response,
          AttachIntro: t_data.attachIntro
        }
      } else {
        if (t_data.memberId == '') {
          this.$message.error('请选择人员')
          return
        }
        if (t_data.type_radio == '') {
          this.$message.error('请选择档案类型')
          return
        }
        if (t_data.fileList == '') {
          this.$message.error('请上传文档')
          return
        }
        if (t_data.attachIntro == '') {
          this.$message.error('请上传文档描述')
          return
        }
        var param = {
          ID: t_data.Compile_Id,
          AttachMemberID: t_data.memberId,
          AttachType: t_data.type_radio,
          AttachName: t_data.fileList[0].name,
          AttachPath: t_data.fileList[0].response.info,
          AttachIntro: t_data.attachIntro
        }
      }
      MemberAttachAdd(param).then(res => {
        if (!res.status) {
          t_data.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }
        t_data.$notify({
          title: '温馨提示',
          message: '添加成功',
          type: 'success'
        })

        t_data.Is_Show_Compile = false
        t_data.fileList = ''
        t_data.getMemberList()
      })
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'color: #000;font-size:16px; background-color: #fff;'
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #000;background-color: #fff;height:65px;'
    },
    // 弹出上传页面
    getTableInfo() {
      this.IS_show_record = true
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

    beforeRemove(file) {},

    getMember_item(index, id, name) {
      this.list_index = index
      this.memberId = id
      this.search_Input3 = name
    },

    // 查看图片
    handleFilePreview(file) {
      if (file.response || file.fileId) {
        let perviewFile
        if (file.response) {
          perviewFile = file.response
        } else {
          perviewFile = {
            url: file.filePath,
            name: file.name
          }
        }
        this.$bus.emit('preview-image-bus', {
          index: 0,
          data: [perviewFile]
        })
      }
    },
    imgFileUploadSuccess(response, file, fileList) {
      this.fileList = fileList
    },
    /** 图片选择出发 */
    uploadFile(event) {
      var files = event.target.files
      if (files.length) {
        var type = event.target.accept == 'image/*' ? 'img' : 'file'
        var firstFile = files[0]
        this.sendFileRequest(firstFile, type, () => {
          for (let index = 1; index < files.length; index++) {
            const file = files[index]
            this.sendFileRequest(file, type)
          }
          event.target.value = ''
        })
      }
    },
    // 发送请求
    sendFileRequest(file, result) {
      var params = { file: file }
      if (this.batchId) {
        params.batchId = this.batchId
      }
      upload(params)
        .then(res => {
          if (this.batchId == '') {
            this.batchId = res.batchId
          }
          res.size = fileSize(res.size)
          this.dataValue.push(res)
          this.$emit('value-change', {
            index: this.index,
            value: this.dataValue
          })
          if (result) {
            result()
          }
        })
        .catch(() => {})
    },
    HealthRecord_save() {
      let t_data = this
      if (t_data.memberId == '') {
        this.$message.error('请选择人员')
        return
      }
      if (t_data.type_radio == '') {
        this.$message.error('请选择档案类型')
        return
      }
      if (t_data.fileList == '') {
        this.$message.error('请上传文档')
        return
      }
      if (t_data.attachIntro == '') {
        this.$message.error('请上传文档描述')
        return
      }
      var param = {
        ID: '0',
        AttachMemberID: t_data.memberId,
        AttachType: t_data.type_radio,
        AttachName: t_data.fileList[0].name,
        AttachPath: t_data.fileList[0].response.info,
        AttachIntro: t_data.attachIntro
      }
      MemberAttachAdd(param).then(res => {
        if (!res.status) {
          t_data.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }
        t_data.$notify({
          title: '温馨提示',
          message: '添加成功',
          type: 'success'
        })

        t_data.IS_show_record = false
        t_data.getMemberList()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delete_Img() {
      this.fileList_name = ''
    }
  },
  watch: {
    search_Input(val) {
      this.getMemberList(val)
    },
    search_Input2(val) {
      this.GetWorkbenchList(val)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/tabs.scss';
.el-form-item i{
    top: 0 !important;
    right: 0 !important;
    margin-right: 10px;
}
.container {
  max-width: 1680px;
  min-width: 1080px;
  height: 100%;
  // background: #fff;
  padding: 10px;
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
  .record {
    color: #fff;
    .record_title {
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
      height: 100%;
    }
  }
  .block {
    text-align: right;
  }
  .item {
    background-color: #fff;
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
    background-color: rgba(33, 42, 85, 1) !important;
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
    background-color: #fff !important;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 10px;
  }
  /deep/.el-pagination .btn-prev,
  /deep/.el-pagination .btn-next {
    background-color: #fff !important;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 10px;
  }
  /deep/.el-pager li {
    background-color: #fff !important;
    color: #000;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 2px;
  }
  /deep/.el-table__body-wrapper{
    background-color: #f9f9f9;
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
    background-color: #fff !important;
    padding: 30px;
    color: #000;
  }
  /deep/.el-dialog__title {
    color: #000;
  }
  /deep/.el-radio__label{
    color: #000;
  }
  /deep/.el-form-item__label {
    color: #fff;
  }
  /deep/.el-radio {
    color: #fff;
  }
  /deep/.el-textarea__inner {
    background-color: #fff !important;
    color: #000;
    border: 1px solid #ccc;
  }
  /deep/.el-dialog__body {
    color: #f56c6c;
  }
  /deep/.el-input-group__append,
  .el-input-group__prepend {
    background-color: #3e84e9 !important;
    color: #fff;
    border: none;
  }
}
</style>
