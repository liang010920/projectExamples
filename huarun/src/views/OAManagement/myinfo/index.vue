<template>
  <div class="container">
    <!-- <h2>我的资料</h2> -->
    <div class="memberInfo">
      <div class="item_title">
        <div>个人资料
          <span style="color:#0dbc79" v-if="MemberDoctorInfo.MemberStatus == 1">已审核</span>
          <span style="color:#f56c6c" v-if="MemberDoctorInfo.MemberStatus == 2">已拒绝</span>
          <span style="color:#409eff" v-if="MemberDoctorInfo.MemberStatus == 0">待审核</span>
        </div>
        <span @click="Is_Show_DoctorAdd =true,compile_doctor(memberLoginType.ID)">编辑</span>
      </div>
      <div class="item">
        <span>姓名：</span>
        <span>{{MemberDoctorInfo.MemberName}}</span>
      </div>
      <div class="item">
        <span>电话：</span>
        <span>{{MemberDoctorInfo.MemberTel}}</span>
      </div>
      <div class="item">
        <span>密码：</span>
        <span>{{MemberDoctorInfo.MemberPwd}}</span>
      </div>
      <div class="item">
        <span>职位：</span>
        <span>{{MemberDoctorInfo.MemberDoctorJob}}</span>
      </div>
      <div class="item">
        <span>省市区：</span>
        <span>{{MemberDoctorInfo.MemberArea1}}{{MemberDoctorInfo.MemberArea2}}{{MemberDoctorInfo.MemberArea3}}</span>
      </div>
      <div class="item">
        <span>详细地址：</span>
        <span>{{MemberDoctorInfo.MemberAddress}}</span>
      </div>
      <div class="item">
        <span>专长:</span>
        <el-input
          class="item_input"
          type="textarea"
          rows="4"
          placeholder="请输入内容"
          v-model="MemberDoctorInfo.MemberIntro1"
        ></el-input>
      </div>
      <div class="item">
        <span>简介:</span>
        <el-input
          class="item_input"
          type="textarea"
          rows="4"
          placeholder="请输入内容"
          v-model="MemberDoctorInfo.MemberIntro"
        ></el-input>
      </div>
      <div class="item">
        <span>身份证信息：</span>
        <img :src="base_img + ruleForm2.memberPhotoCard" alt="" v-if="ruleForm2.memberPhotoCard != undefined">
      </div>
      <div class="item">
        <span>执业医师证件：</span>
        <img :src="base_img + ruleForm2.memberPhotoDoctor" alt="" v-if="ruleForm2.memberPhotoDoctor != undefined">
      </div>
      <div class="item">
        <span>审核描述：</span>
        <span class="data">{{MemberDoctorInfo.MemberAuditIntro}}</span>
      </div>
      <div class="item">
        <span>审核时间：</span>
        <span class="data">{{MemberDoctorInfo.MemberAuditDate}}</span>
      </div>
    </div>

    <el-dialog :visible.sync="Is_Show_DoctorAdd">
      <div class="Add_Object">
        <div class="item">
          <el-form
            :model="ruleForm2"
            :rules="rules2"
            ref="ruleForm2"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="医生名称" prop="name_doctor">
              <el-input v-model="ruleForm2.name_doctor" placeholder="请输入人员名称"></el-input>
            </el-form-item>
            <el-form-item label="医生电话" prop="memberTel_doctor">
              <el-input type="number" v-model="ruleForm2.memberTel_doctor" placeholder="请输入人员电话"></el-input>
            </el-form-item>
            <el-form-item label="账号密码" prop="memberPwd_doctor">
              <el-input type="text" v-model="ruleForm2.memberPwd_doctor" placeholder="请输入账号密码"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" prop="memberDoctorJob">
              <el-input type="text" v-model="ruleForm2.memberDoctorJob" placeholder="请输入职位名称"></el-input>
            </el-form-item>
            <el-form-item label="人员地址">
              <v-distpicker
                :province="memberArea1"
                :city="memberArea2"
                :area="memberArea3"
                @selected="onSelected"
              ></v-distpicker>
            </el-form-item>
            <el-form-item label="人员详细地址" prop="address_doctor">
              <el-input v-model="ruleForm2.address_doctor" placeholder="请输入人员详细地址"></el-input>
            </el-form-item>
            <el-form-item label="医生专长" prop="memberIntro1">
              <el-input
                type="textarea"
                v-model="ruleForm2.memberIntro1"
                :rows="4"
                placeholder="请输入医生专长"
              ></el-input>
            </el-form-item>
            <el-form-item label="医生简介" prop="desc_doctor">
              <el-input
                type="textarea"
                v-model="ruleForm2.desc_doctor"
                :rows="4"
                placeholder="请输入医生简介"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传身份证信息">
              <el-upload
                ref="imageUpload"
                :action="crmFileSaveUrl"
                :headers="httpHeader"
                name="file"
                :data="{type: 'img', batchId: batchId}"
                multiple
                :limit="1"
                accept="image/*"
                :file-list="fileList1"
                list-type="picture-card"
                :before-remove="beforeRemove1"
                :on-success="imgFileUploadSuccess1"
              >
                  <p class="add-img">
                    <span class="el-icon-picture"></span>
                    <span>添加图片</span>
                  </p>
              </el-upload>
            </el-form-item>

            <el-form-item label="上传执业医师证">
              <el-upload
                ref="imageUpload"
                :action="crmFileSaveUrl"
                :headers="httpHeader"
                name="file"
                :data="{type: 'img', batchId: batchId}"
                multiple
                :limit="1"
                accept="image/*"
                :file-list="fileList2"
                list-type="picture-card"
                :before-remove="beforeRemove2"
                :on-success="imgFileUploadSuccess2"
              >
                  <p class="add-img">
                    <span class="el-icon-picture"></span>
                    <span>添加图片</span>
                  </p>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm2('ruleForm2')">立即修改</el-button>
              <el-button @click="resetForm2('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { GetMemberDoctorInfo,MemberDoctorAdd } from "@/api/oamanagement/workbench";
import { guid } from '@/utils';
import { crmFileSave, crmFileDelete, crmFileSaveUrl } from '@/api/common';
import VDistpicker from "v-distpicker";
export default {
  data() {
    return {
      textarea1: "",
      textarea2: "",
      Is_Show_DoctorAdd: false,
      memberArea1: "",
      memberArea2: "",
      memberArea3: "",

      base_img: 'http://java1.subei88.com:8080/upload/',
      fileList1:[],
      fileList2:[],
      batchId: guid(),
      MemberDoctorInfo:"",
      memberLoginType: JSON.parse(localStorage.getItem('memberInfo')),
      ruleForm2: {
        name_doctor: "",
        memberTel_doctor: "",
        memberPwd_doctor: "",
        memberDoctorJob:"",
        address_doctor: "",
        memberIntro1:"",
        memberPhotoCard:"",
        memberPhotoDoctor:"",
        desc_doctor: ""
      },
      rules2: {
        name_doctor: [
          { required: true, message: "请输入医生名称", trigger: "blur" }
        ],
        memberTel_doctor: [
          { required: true, message: "请输入医生电话", trigger: "blur" }
        ],
        memberPwd_doctor: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        memberDoctorJob: [
          { required: true, message: "请输入职位名称", trigger: "blur" }
        ],
        address_doctor: [
          { required: true, message: "请输人员详细地址", trigger: "blur" }
        ],
        memberIntro1:[
          { required: true, message: "请输医生专长", trigger: "blur" }
        ],
        desc_doctor: [
          { required: true, message: "请输医生简介", trigger: "blur" }
        ]
      }
    };
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
  created() {
    this.compile_doctor(this.memberLoginType.ID)
  },
  methods: {
    //获取地址
    onSelected(data) {
      // alert(JSON.stringify(data) )
      this.memberArea1 = data.province.value;
      this.memberArea2 = data.city.value;
      this.memberArea3 = data.area.value;
    },

    //医生详情
    compile_doctor(id) {
      let t_data = this
      t_data.fileList1 = []
      t_data.fileList2 = []
      let param = {
        id: id
      }
      GetMemberDoctorInfo(param).then(res => {
        if (res.status) {
          t_data.MemberDoctorInfo = res.info
          t_data.member_doctorId = res.info.ID

          t_data.ruleForm2.memberPhotoCard = res.info.MemberPhotoCard
          t_data.ruleForm2.memberPhotoDoctor = res.info.MemberPhotoDoctor

          t_data.ruleForm2.name_doctor = res.info.MemberName
          t_data.ruleForm2.memberTel_doctor = res.info.MemberTel
          t_data.ruleForm2.memberPwd_doctor = res.info.MemberPwd
          t_data.memberArea1 = res.info.MemberArea1
          t_data.memberArea2 = res.info.MemberArea2
          t_data.memberArea3 = res.info.MemberArea3
          t_data.ruleForm2.address_doctor = res.info.MemberAddress
          t_data.ruleForm2.memberDoctorJob = res.info.MemberDoctorJob
          t_data.ruleForm2.desc_doctor = res.info.MemberIntro
          t_data.ruleForm2.memberIntro1 = res.info.MemberIntro1

          console.log('===============' +t_data.ruleForm2.memberPhotoCard + "------------"+ t_data.ruleForm2.memberPhotoDoctor)

          if(t_data.fileList1 == '' && t_data.ruleForm2.memberPhotoCard != undefined){

            t_data.fileList1.push({url:'http://java1.subei88.com:8080/upload/'+t_data.ruleForm2.memberPhotoCard})

          }

          if(t_data.fileList2 == '' && t_data.ruleForm2.memberPhotoDoctor != undefined){

            t_data.fileList2.push({url:'http://java1.subei88.com:8080/upload/'+t_data.ruleForm2.memberPhotoDoctor})

          }
        }
        console.log(JSON.stringify(res.info.MemberIntro))
        
      })
    },


    submitForm2(formName, val) {
      var t_data = this;
      if (val == undefined) {
        val = "0";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          var reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
          var ret = reg.test(t_data.ruleForm2.memberTel_doctor);
          if (!ret) {
            this.$message.error("手机号码格式不正确");
            return;
          }
          if (!t_data.memberArea3) {
            this.$message.error("请选择地址信息");
            return;
          }
          var param = {
            ID: t_data.member_doctorId,
            memberName: t_data.ruleForm2.name_doctor,
            memberTel: t_data.ruleForm2.memberTel_doctor,
            memberPwd: t_data.ruleForm2.memberPwd_doctor,
            memberDoctorJob: t_data.ruleForm2.memberDoctorJob,
            memberRoleId: 3,
            memberArea1: t_data.memberArea1,
            memberArea2: t_data.memberArea2,
            memberArea3: t_data.memberArea3,
            memberAddress: t_data.ruleForm2.address_doctor,
            memberIntro: t_data.ruleForm2.desc_doctor,
            memberIntro1: t_data.ruleForm2.memberIntro1,
            memberPhotoCard:t_data.ruleForm2.memberPhotoCard,
            memberPhotoDoctor:t_data.ruleForm2.memberPhotoDoctor,
          };
          console.log("param------------" + JSON.stringify(param));
          MemberDoctorAdd(param).then(res => {
            console.log("MemberAdd------res-------" + JSON.stringify(res));
            if (!res.status) {
              this.$notify.error({
                title: "温馨提示",
                message: res.info
              });
              return;
            }
            t_data.Is_Show_DoctorAdd = false;
            t_data.compile_doctor(t_data.memberLoginType.ID)
            this.$message({
              message: "修改成功",
              type: "success"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    beforeRemove1(file) {
      console.log(file)
    },

    beforeRemove2(file) {
      console.log(file)
    },
    
    imgFileUploadSuccess1(response, file, fileList) {
      this.ruleForm2.memberPhotoCard = fileList[0].response.info
    },

    imgFileUploadSuccess2(response, file, fileList) {
      this.ruleForm2.memberPhotoDoctor = fileList[0].response.info
    },

    resetForm2(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  max-width: 1680px;
  min-width: 1080px;
  padding: 10px;
  color: #fff;
  .memberInfo {
    margin: 25px 0;
    padding: 20px;
    width: 65%;
    background-color: #1f2a57;
    .item_title {
      font-size: 25px;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 16px;
        color: red;
        cursor: pointer;
        line-height: 15px;
      }
    }
    .item {
      margin: 18px 0;
      font-size: 15px;
      display: flex;
      .data{
        flex: 1;
      }
      img{
        width: 80px;
        height: 80px;
      }
      .item_input {
        flex: 1;
        margin-left: 10px;
        background-color: #1f2a57;
      }
    }
  }
  
  // 弹出框
}
</style>