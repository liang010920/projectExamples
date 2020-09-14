<template>
  <div class="container">
    <div class="record">
      <h2>我的消息</h2>
      <div class="record_title">
        <div class="item_Add" @click="getTableInfo">
          <!-- <el-button type="primary">
            添加
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>-->
        </div>
        <!-- <div class="item_Add">
          <el-button type="primary" icon="el-icon-share">下载文件</el-button>
        </div>-->
        <div class="item_input">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="关键字搜索">
              <el-input v-model="search_Input" placeholder="员工姓名及报警等级搜索"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog title="添加消息" :visible.sync="IS_show_record">
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
          <el-table-column prop="CreateDate" align="center" label="日期" width="180"></el-table-column>
          <el-table-column prop="MessageType" align="center" label="消息类型" width="180"></el-table-column>
          <el-table-column label="消息标题" width="180">
            <template slot-scope="scope" align="center">
              {{scope.row.MessageTitle}}
            </template>
          </el-table-column>
          <el-table-column label="消息内容"  align="left">
            <template slot-scope="scope" align="center">
              <div>{{scope.row.MessageContent}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="left">
            <template slot-scope="scope" align="center">
              <div>
                <span class="warnOne" style="padding-right:20px;" @click="Compile_btn(scope.row.Id)">详情</span>
                <span class="greenTwo" style="padding-right:20px;">处理</span>
                <span class="warnThree" @click="delete_btn(scope.row.Id)">删除</span>
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


    <el-dialog title="消息详情" :visible.sync="Is_Show_Compile">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名:">
          <el-input
            placeholder="请搜索姓名"
            v-model="search_Input3"
            class="input-with-select"
            :disabled="true"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="描述:">
          <el-input type="textarea" v-model="attachIntro" :rows="7" placeholder="请填写报告描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_Compile = false">取 消</el-button>
        <el-button type="primary" @click="Is_Show_Compile = false">确 定</el-button>
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
  GetSysMessageList,
  SysMessageDelete,
  GetSysMessageInfo
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
      messageInfo: {
        MessageType: '',
        MessageTitle: '',
        MessageContent: '',
        CreateDate: ''
      },
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
    this.getMessageList()
  },
  methods: {
    getMessageList(val) {
      let t_data = this
      if (val == undefined) {
        val = ''
      }
      let param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
        memberId: JSON.parse(localStorage.getItem("memberInfo")).ID,
      }
      t_data.loading = true
      GetSysMessageList(param).then(res => {
        t_data.totalRow = res.info.totalRow
        t_data.tableData = res.info.list
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
          SysMessageDelete(param).then(res => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }

            t_data.getMessageList()
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
        id: id,
        memberId:JSON.parse(localStorage.getItem("memberInfo")).ID,
      }
      GetSysMessageInfo(param).then(res => {
        t_data.messageInfo.MessageType = res.info.MessageType
        t_data.messageInfo.MessageTitle = res.info.MessageTitle
        t_data.messageInfo.MessageContent = res.info.MessageContent
        t_data.messageInfo.CreateDate = res.info.CreateDate
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
        t_data.getMessageList()
      })
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'color: #fff;font-size:16px; background-color: rgba(43,51,90,1);'
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #fff;background-color: rgba(33,42,85,1);height:65px;'
    },
    // 弹出上传页面
    getTableInfo() {
      this.IS_show_record = true
    },
    getPageIndex(val) {
      this.pageIndex = val
      this.getMessageList()
    },
    getPrevPage() {
      this.pageIndex--
      this.getMessageList()
    },
    getNextPage() {
      this.pageIndex++
      this.getMessageList()
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
        t_data.getMessageList()
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
      this.getMessageList(val)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/tabs.scss';
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
    background-color: rgba(33, 42, 85, 1);
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

  .greenTwo{
    color: #0dbc79;
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
