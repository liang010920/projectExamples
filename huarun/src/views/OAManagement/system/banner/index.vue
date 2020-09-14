<template>
  <div class="container">
    <h2 style="color: #000;">Banner管理</h2>

    <div class="member_title">
      <div class="item_Add">
        <el-button type="primary" @click="getMemberAdd()">
          添加
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    </div>
    <div class="item">
      <div class="item_member">
        <div
          class="loading"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        ></div>
        <el-table
          :header-cell-style="tableHeaderColor"
          :row-style="tableRowStyle"
          :data="tableData"
          height="670px"
          style="width: 100%;background-color: #fff !important;"
        >
          <el-table-column prop="BannerTitle" label="标题" width="180" align="center"></el-table-column>
          <el-table-column prop="BannerPath" label="banner图片" width="220">
            <template slot-scope="scope">
              <div>
                <img :src="base_img+scope.row.BannerPath" alt style="width:100%;height:100%;" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="BannerRemark" label="描述" align="left"></el-table-column>
          <el-table-column width="180" label="操作" align="left">
            <template slot-scope="scope">
              <div>
                <span
                  class="warnOne"
                  style="padding-right:20px;"
                  @click="Banner_btn(scope.row.ID)"
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

    <el-dialog title="Banner管理" :visible.sync="Is_Show_Banner">
      <div class="item_Info">
        <el-form :model="bannerInfo" label-width="120px">
          <el-form-item label="标题:">
            <el-input type="text" v-model="bannerInfo.BannerTitle" placeholder="请填写标题"></el-input>
          </el-form-item>
          <el-form-item label="Banner图片">
            <el-upload
              ref="imageUpload"
              :action="crmFileSaveUrl"
              :headers="httpHeader"
              name="file"
              :data="{type: 'img', batchId: batchId}"
              multiple
              :limit="1"
              accept="image/*"
              :file-list="fileList"
              list-type="picture-card"
              :before-remove="beforeRemove"
              :on-success="imgFileUploadSuccess"
            >
                <p class="add-img">
                  <span class="el-icon-picture"></span>
                  <span>添加图片</span>
                </p>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input type="textarea" v-model="bannerInfo.BannerRemark" :rows="5" placeholder="请填写描述"></el-input>
          </el-form-item>
          <el-form-item label="排序号:">
            <el-input type="number" v-model="bannerInfo.BannerOrder" placeholder="请填写排序号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="Is_Show_Banner = false,fileList = []">取 消</el-button>
        <el-button type="primary" @click="Banner_Save()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetSysBannerList,
  SysBannerAdd,
  GetSysBannerInfo,
  SysBannerDelete
} from '@/api/oamanagement/workbench'
import axios from 'axios'
import { guid } from '@/utils'
import { crmFileSaveUrl } from '@/api/common'
export default {
  data() {
    return {
      base_img: 'http://h.subei88.com:8080/upload/',
      Is_Show_Banner: false,
      loading: false,
      totalRow: 0,
      pageIndex: 1,
      pageSize: 20,
      fileList:[],
      batchId: guid(),
      bannerInfo:{
          ID: 0,
          BannerType:"1",
          BannerTitle:"",
          BannerRemark:"",
          BannerPath:"",
          BannerOrder:"",
      },
      tableData: []
    }
  },
  created() {
    this.GetSysBannerList()
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
  methods: {

    GetSysBannerList() {
      let t_data = this
      let param = {
        pageIndex: t_data.pageIndex,
        pageSize: t_data.pageSize,
      }
      t_data.loading = true
      GetSysBannerList(param).then(res => {

        t_data.totalRow = res.info.totalRow
        t_data.tableData = res.info.list
        t_data.loading = false
      })
    },
    getMemberAdd() {
      this.Is_Show_Banner = true
      this.fileList = []
      this.bannerInfo.ID = 0
      this.bannerInfo.BannerTitle = ''
      this.bannerInfo.BannerRemark = ''
      this.bannerInfo.BannerPath = ''
      this.bannerInfo.BannerOrder = ''
    },
    Banner_Save() {
      let t_data = this

      if (t_data.bannerInfo.BannerTitle == '') {
        this.$message.error('请输入banner标题')
        return
      }
      if (t_data.bannerInfo.BannerPath == '') {
        this.$message.error('请选择图片')
        return
      }
      if (t_data.bannerInfo.BannerRemark == '') {
        this.$message.error('请输入描述')
        return
      }
      if (t_data.bannerInfo.BannerOrder == '') {
        this.$message.error('请输入排序号')
        return
      }

      let param = t_data.bannerInfo
      console.log('-----------param' + JSON.stringify(param))
      SysBannerAdd(param).then(res => {
        if (!res.status) {
          this.$notify.error({
            title: '温馨提示',
            message: res.info
          })
          return
        }
        if (t_data.bannerInfo.ID == 0) {
          t_data.Is_Show_Banner = false
          t_data.bannerInfo.BannerTitle = ''
          t_data.bannerInfo.BannerRemark = ''
          t_data.bannerInfo.BannerPath = ''
          t_data.bannerInfo.BannerOrder = ''
          t_data.fileList = []
          t_data.GetSysBannerList()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          t_data.Is_Show_Banner = false
          t_data.bannerInfo.ID = 0
          t_data.fileList = []
          t_data.GetSysBannerList()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    Banner_btn(id) {
      let t_data = this
      t_data.fileList = []
      t_data.Is_Show_Banner = true

      let param = {
        id: id
      }
      GetSysBannerInfo(param).then(res => {
        t_data.bannerInfo.ID = res.info.ID
        t_data.bannerInfo.BannerTitle = res.info.BannerTitle
        t_data.bannerInfo.BannerRemark = res.info.BannerRemark
        t_data.bannerInfo.BannerPath = res.info.BannerPath
        t_data.bannerInfo.BannerOrder = res.info.BannerOrder

        if(t_data.fileList == ''){

           t_data.fileList.push({url:'http://h.subei88.com:8080/upload/'+t_data.bannerInfo.BannerPath})

        }

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
          SysBannerDelete(param).then(res => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }

            t_data.GetSysBannerList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    beforeRemove(file) {
      console.log(file)
    },

    imgFileUploadSuccess(response, file, fileList) {
      this.bannerInfo.BannerPath = fileList[0].response.info
    },

    getPageIndex(val) {
      this.pageIndex = val
      this.GetSysBannerList()
    },
    getPrevPage() {
      this.pageIndex--
      this.GetSysBannerList()
    },
    getNextPage() {
      this.pageIndex++
      this.GetSysBannerList()
    },

    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'color: #000;font-size:16px; background-color:#fff;'
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #000;background-color: #fff;height:65px;'
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  max-width: 1680px;
  min-width: 1080px;
  color: #fff;
  height: 100%;
  padding: 10px;
  .member_title {
    height: 70px;
    margin-top: 10px;
    .item_Add {
      display: inline-block;
      padding: 10px 20px;
    }
  }
  .item {
    background-color: #fff !important;
    padding: 20px;
    color: #000;
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
