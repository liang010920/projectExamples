<template>
  <div class="container health">
    <div class="record">
      <h2 style="color: #000;">健康小知识</h2>
      <div class="record_title">
        <div class="item_Add" @click="getTableInfo">
          <el-button type="primary">
            发布
            <i class="el-icon-upload el-icon--right" />
          </el-button>
        </div>
        <div class="item_name">
          <span style="color: #000;">按标题查询</span>
          <el-input v-model="newsTitle" placeholder="请输入标题" prefix-icon="el-icon-search" />
        </div>
      </div>
    </div>
    <div>
      <div v-for="(list,index) in NewsList" :key="index" class="divbox">
        <img v-if="list.NewsPhoto" :src="base_img+list.NewsPhoto" class="image" @click="IS_show_pup =true,compile_btn(list.ID)">
        <img v-else :src="url" class="image" @click="IS_show_pup =true,compile_btn(list.ID)">
        <div class="content">{{ list.NewsTitle }}</div>
        <div style="color: #000000;">{{list.NewsTagNames}}</div>
        <div class="ReleaseInfo">
          <div class="ReleaseRime">{{ list.NewsDate }}</div>
          <el-button type="primary" plain @click="IS_show_compile =true,compile_btn(list.ID)">编辑</el-button>
          <el-button type="danger" plain @click="delete_btn(list.ID)">删除</el-button>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="IS_show_pup">
      <div class="pup_info">
        <div class="pup_title">{{ NewsInfo.NewsTitle }}</div>
        <div class="pup_tagName">{{NewsInfo.NewsTagNames}}</div>
        <p class="pup_time">{{ NewsInfo.NewsDate }}</p>
        <p class="pup_content" v-html="NewsInfo.NewsContent" />
        <img v-if="NewsInfo.NewsPhoto" :src="base_img+NewsInfo.NewsPhoto" class="pup_img">
      </div>
    </el-dialog>
    <el-dialog :visible.sync="IS_show_main" title="健康发布" width="80%" id="health">
      <el-form ref="form" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="fromItem.newsTitle" placeholder="请填写健康标题" />
        </el-form-item>
        <el-form-item label="健康标签">
          <el-select v-model="health" multiple placeholder="请选择">
            <el-option v-for="item in labels" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康图片">
          <el-upload ref="imageUpload" :action="crmFileSaveUrl" :headers="httpHeader" :data="{type: 'img', batchId: batchId}"
            :limit="5" :on-preview="handleFilePreview" :before-remove="beforeRemove" :on-success="imgFileUploadSuccess"
            name="file" multiple accept="image/*" list-type="picture-card">
            <p class="add-img">
              <span class="el-icon-picture" />
              <span>添加图片</span>
            </p>
          </el-upload>
          <!-- <el-upload class="upload-demo" :action="crmFileSaveUrl" :file-list="fileList2" :before-upload="beforeAvatarUpload" accept=".jpg,.jpeg,.png,.gif"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip" style="margin-left: 10px;">只能上传jpg/png/gif文件，且不超过5M</span>
          </el-upload> -->
        </el-form-item>
        <el-form-item label="健康内容" style="height:300px">
          <quill-editor ref="myTextEditor" v-model="fromItem.newsContent" :options="editorOption" class="editor" style="height:250px" />
          <!-- <el-input type="textarea" v-model="fromItem.newsContent" :rows="7" placeholder="请填写健康内容"></el-input> -->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_main = false">取 消</el-button>
        <el-button @click="NewsSave">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="IS_show_compile" title="修改知识" width="80%">
      <el-form ref="form" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="title_New" placeholder="请填写健康标题" />
        </el-form-item>
        <el-form-item label="健康标签">
         <el-select v-model="health" multiple placeholder="请选择">
           <el-option v-for="item in labels" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
         </el-select>
        </el-form-item>
        <el-form-item v-if="!ImageList" label="健康图片">
          <el-upload ref="imageUpload" :action="crmFileSaveUrl" :headers="httpHeader" :data="{type: 'img', batchId: batchId}"
            :limit="5" :on-preview="handleFilePreview" :before-remove="beforeRemove" :on-success="imgFileUploadSuccess"
            name="file" multiple accept="image/*" list-type="picture-card">
            <p class="add-img">
              <span class="el-icon-picture" />
              <span>添加图片</span>
            </p>
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item v-else label="健康图片">
          <div style="width:150px;height:150px;border:1px solid #999 ;padding:5px;position: relative; ">
            <i style="position: absolute; top:-5px;right:0;font-size:50px;color:red;cursor: pointer;" @click="delete_Img()">×</i>
            <img :src="base_img+ImageList" alt style="width:100%;height:100%;">
          </div>
        </el-form-item>
        <el-form-item label="健康内容" style="height:300px">
          <quill-editor ref="myTextEditor" v-model="content_New" :options="editorOption" class="editor" style="height:250px" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="clear:both">
        <el-button @click="IS_show_compile = false">取 消</el-button>
        <el-button type="primary" @click="News_compile()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    crmFileSaveUrl
  } from '@/api/common'
  import {
    NewsAdd,
    GetNewsList,
    upload,
    NewsDelete,
    GetNewsInfo
  } from '@/api/oamanagement/workbench'
  import {
    guid
  } from '@/utils'
  export default {
    data() {
      return {
        fileList2: [],
        labels: [{
          value: '高血压',
          label: '高血压'
        }, {
          value: '糖尿病',
          label: '糖尿病'
        }, {
          value: '低血糖',
          label: '低血糖'
        }, {
          value: '高血糖',
          label: '高血糖'
        }, {
          value: '高血脂',
          label: '高血脂'
        }],
        health: [],
        url: './../../../../static/img/timg.jpg',
        base_img: 'http://h.subei88.com:8080/upload/',
        currentDate: new Date().toLocaleString(),
        IS_show_main: false,
        IS_show_pup: false,
        IS_show_compile: false,
        dateStart: '开始日期',
        dateEnd: '结束日期',
        fromItem: {
          newsTitle: '',
          newsContent: ''
        },
        title_New: '',
        photo_New: '',
        content_New: '',
        compile_Id: '',
        newsTitle: '',
        NewsList: [],
        NewsInfo: '',
        dialogVisible: false,
        disabled: false,
        imageFileList: [],
        ImageList: '',
        batchId: guid(),
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], // 引用  代码块
              [{
                header: 1
              }, {
                header: 2
              }], // 1、2 级标题
              [{
                list: 'ordered'
              }, {
                list: 'bullet'
              }], // 有序、无序列表
              [{
                script: 'sub'
              }, {
                script: 'super'
              }], // 上标/下标
              [{
                indent: '-1'
              }, {
                indent: '+1'
              }], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{
                size: ['small', false, 'large', 'huge']
              }], // 字体大小
              [{
                header: [1, 2, 3, 4, 5, 6, false]
              }], // 标题
              [{
                color: []
              }, {
                background: []
              }], // 字体颜色、字体背景颜色
              [{
                font: []
              }], // 字体种类
              [{
                align: []
              }], // 对齐方式
              ['clean'], // 清除文本格式
              ['link', 'image', 'video'] // 链接、图片、视频
            ] // 工具菜单栏配置
          },
          placeholder: '请在这里添加产品描述', // 提示
          readyOnly: false, // 是否只读
          theme: 'snow', // 主题 snow/bubble
          syntax: true // 语法检测
        }
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

    watch: {
      newsTitle(val) {
        this.GetNewsList(val)
      },
      dataTime(val) {
        console.log('val=' + val)
        this.GetNewsList(val)
      }
    },
    mounted() {
      this.getNewData()
      this.GetNewsList()
    },
    methods: {
      //上传图片限制
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpg';
        // const isPNG = file.type === 'image/png';
        // const isGIF = file.type === 'image/gif';
        const isLt5M = file.size / 1024 / 1024 < 5;

        // if (!isJPG || !isPNG || !isGIF) {
        //   this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
        // }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
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
      },

      // 删除
      delete_btn(id) {
        const t_data = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            const param = {
              id: id
            }
            NewsDelete(param).then(res => {
              if (res.status) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }

              t_data.GetNewsList()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },

      // 新闻详情
      compile_btn(id) {
        const t_data = this
        const param = {
          id: id
        }

        GetNewsInfo(param).then(res => {
          // console.log("res----------"+JSON.stringify(res))
          t_data.NewsInfo = res.info
          t_data.compile_Id = res.info.ID
          t_data.title_New = res.info.NewsTitle
          t_data.ImageList = res.info.NewsPhoto
          t_data.content_New = res.info.NewsContent
          let tagNames=res.info.NewsTagNames.split(',');

          t_data.health = tagNames
          // console.log(res)
        })
      },
      News_compile() {
        const t_data = this

        if (t_data.ImageList) {
          if (t_data.title_New == '') {
            this.$message.error('请上传健康标题')
            return
          }
          if (t_data.ImageList == '') {
            this.$message.error('请上传健康图片')
            return
          }
          if (t_data.content_New == '') {
            this.$message.error('请上传健康内容')
            return
          }
          var param = {
            ID: t_data.compile_Id,
            newsTitle: t_data.title_New,
            newsPhoto: t_data.ImageList,
            newsContent: t_data.content_New,
            NewsTagNames:t_data.health.toString()
          }
        } else {
          if (t_data.title_New == '') {
            this.$message.error('请上传健康标题')
            return
          }
          if (t_data.imageFileList == '') {
            this.$message.error('请上传健康图片')
            return
          }
          if (t_data.content_New == '') {
            this.$message.error('请上传健康内容')
            return
          }
          var param = {
            ID: t_data.compile_Id,
            newsTitle: t_data.title_New,
            newsPhoto: t_data.imageFileList[0].response.info,
            newsContent: t_data.content_New,
          }
        }
        console.log(param)
        t_data.loading = true
        NewsAdd(param).then(res => {
          if (!res.status) {
            this.$notify.error({
              title: '温馨提示',
              message: res.info
            })
            return
          }
          this.$notify({
            title: '温馨提示',
            message: '修改成功',
            type: 'success'
          })
          t_data.IS_show_compile = false
          t_data.imageFileList = ''
          t_data.health=[];
          t_data.GetNewsList()
        })
      },

      getTableInfo: function() {
        this.IS_show_main = true;
        this.fromItem.newsContent = '';
        this.fromItem.newsTitle = '';
        this.health = [];
        // console.log(this.health)
      },

      openPage: function(name, param) {
        this.$router.push({
          name: 'index'
        })
      },

      beforeRemove(file) {
        console.log(file)
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
        console.log('tag', JSON.stringify(fileList))
        this.imageFileList = fileList
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
        var params = {
          file: file
        }
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
              console.log('res1==' + JSON.stringify(res))
              result()
            }
          })
          .catch(() => {})
      },
      NewsSave() {
        const t_data = this
        if (t_data.fromItem.newsTitle == '') {
          this.$message.error('请上传健康标题')
          return
        }
        if (t_data.imageFileList == '') {
          this.$message.error('请上传你需要的图片')
          return
        }
        if (t_data.fromItem.newsContent == '') {
          this.$message.error('请上传健康内容')
          return
        }
        const param = {
          newsTitle: t_data.fromItem.newsTitle,
          newsPhoto: t_data.imageFileList[0].response.info,
          newsContent: t_data.fromItem.newsContent,
          NewsTagNames:t_data.health.toString()
        }
        t_data.loading = true
        NewsAdd(param).then(res => {
          if (!res.status) {
            this.$notify.error({
              title: '温馨提示',
              message: res.info
            })
            return
          }
          this.$notify({
            title: '温馨提示',
            message: '添加成功',
            type: 'success'
          })
          this.IS_show_main = false
          this.GetNewsList()
        })
      },
      GetNewsList(val) {
        console.log('val=' + val)
        const t_data = this
        if (val == undefined) {
          val = ''
        }
        const param = {
          newsTitle: t_data.newsTitle
        }
        t_data.loading = true
        GetNewsList(param).then(res => {
          t_data.totalRow = res.info.totalRow
          // console.log("123123123131======="+JSON.stringify(res.info.list))
          t_data.NewsList = res.info.list
          t_data.loading = false
          // t_data.IS_show_pup = true;
        })
      },
      // 删除图片
      delete_Img() {
        var t_data = this
        t_data.ImageList = ''
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
    // background: #fff;
    padding: 10px;

    .divbox {
      width: 300px;
      height: auto;
      background-color: #fff;
      display: inline-block;
      padding: 15px;
      margin: 10px;

      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 46px;
        color: #000;
      }

      .image {
        width: 100%;
        display: block;
        padding-bottom: 10px;
        height: 190px;
        cursor: pointer;
      }

      .ReleaseInfo {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
      }

      .ReleaseRime {
        font-size: 14px;
        color: #000;
        padding-top: 10px;
      }

      .SeeDetails {
        background-color: #dfdfdf;
        font-size: 16px;
        padding: 5px 10px;
        color: #fff;
        cursor: pointer;
      }
    }

    .record {
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
          display: inline-flex;
          align-items: center;
          padding: 10px 0px;

          span {
            width: 100px;
            text-align: center;
          }
        }

        .item_name {
          display: inline-flex;
          align-items: center;
          padding-left: 20px;

          span {
            width: 100px;
            margin-right: 10px;
          }
        }
      }

      .item_table {
        height: 100%;
      }
    }
    .pup_tagName{
      margin-top: 15px;
    }

    .pup_title {
      font-size: 26px;
      color: #000;
      font-weight: 600;
    }

    .pup_info {
      // text-align: center;
      width: auto;
      height: 629px;
      overflow-x: hidden;

      .pup_time {
        font-size: 20px;
        color: #999;
        line-height: 2.5;
      }

      .pup_content {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        padding-bottom: 20px;
        text-indent: 2em;
        text-align: justify;
        line-height: 2;
      }

      .pup_img {
        width: 400px;
        height: 400px;
      }

      .editor {
        line-height: normal !important;
        height: 800px;
      }
    }

    // 弹出框
  }
</style>
