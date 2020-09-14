<template>
  <div class="mechanism">
    <div class="appraisers">
      <div style="color: #000;font-weight: bold;font-size: 25px;">机构</div>
      <div class="appraisers_title">
        <!-- <div class="item_Add">
    			<el-button type="primary">添加人员<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>-->
        <div class="item_input">
          <!-- <el-form label-width="120px">
            <el-form-item label="按机构名称查询">
              <el-input placeholder="机构名称"></el-input>
            </el-form-item>
          </el-form> -->
        </div>
        <div class="item_input" style="margin:20px">
          <el-button type="primary" @click="jiGouAdd()">新增</el-button>
          <!-- <el-button type="primary">删除</el-button> -->
          <!-- <el-button type="primary">修改</el-button> -->
        </div>
      </div>
    </div>
    <el-container>
      <el-aside width="300px">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
          :expand-on-click-node="false" ref="tree" @node-click="handleNodeClick">
          <span slot-scope="{node,data}">
            <div>{{data.name}}</div>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <div class="container">

          <el-dialog title="机构编辑" :visible.sync="dialogVisible" width="50%">
            <div>
              <el-form :model="jiGouForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="机构名称" prop="name">
                  <el-input v-model="jiGouForm.UnitName"></el-input>
                </el-form-item>
                <el-form-item label="父节点" prop="name">
                  <el-input autocomplete="off" readonly="readonly" placeholder="请选择父节点" v-model="jiGouForm.UnitParentName"
                    class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="bianJi()"></el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="jiGouSave()">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="父节点" :visible.sync="dialogVisible2" width="40%">
            <div>
              <el-input placeholder="输入关键字进行过滤" v-model="filterText2"></el-input>
              <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
                :expand-on-click-node="false" ref="tree2" @node-click="handleNodeClick2">
                <span slot-scope="{node,data}">
                  <div>{{data.name}}</div>
                </span>
              </el-tree>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="parentConfirm()">确 定</el-button>
            </span>
          </el-dialog>
          <div class="item">
            <div class="item_table">
              <el-table :data="tableData" style="width: 100%;background-color: #fff !important;" height="670px">
                <el-table-column prop="UnitName" align="center" label="机构名称"></el-table-column>
                <el-table-column prop="UnitNameHierarchical" align="center" label="层级名称"></el-table-column>
                <el-table-column prop="" align="center" label="操作">
                  <template slot-scope="scope">
                    <div>
                      <span class="warnOne" style="padding-right:20px;" @click="jiGou_btn(scope.row)">编辑</span>
                      <span class="warnThree" @click="organizationBatchDelete(scope.row.ID)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {
    getOrganizationTree,
    getOrganizationList,
    organizationEdit,
    organizationBatchDelete
  } from '@/api/systemManagement/SysOrganizationApiController'
  export default {
    components: {
      // info
    },
    data() {
      const item = {
        date: "研发部门",
        name: "部门"
      }
      return {
        dialogVisible: false,
        dialogVisible2: false,
        data: [],
        filterText: "",
        filterText2: "",
        disableShow: true,
        defaultProps: {
          children: "children",
          label: "label",
        },
        panDuan: true,
        tableData: Array(20).fill(item),
        jiGouForm: {
          "ID": 0,
          "UnitName": "",
          "UnitTypeId": "0",
          "UnitLevel": "0",
          "UnitValid": true,
          "UnitOrder": 0,
          "UnitLeader": "",
          "UnitLeaderTel": "",
          UnitParentID: 0,
          UnitNameHierarchical: '',
          UnitParentName: '',
        },
        parent:[]
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      filterText2(val) {
        this.$refs.tree2.filter(val);
      },
    },
    methods: {
      //新增按钮
      jiGouAdd() {
        let t_this = this;
        t_this.dialogVisible = true;
        t_this.jiGouForm.UnitName = '';
        t_this.jiGouForm.UnitParentName = '顶级';
        t_this.jiGouForm.UnitNameHierarchical = '';
        t_this.jiGouForm.ID = 0;
        t_this.disableShow = true;
      },
      //父节点按钮
      bianJi() {
        let t_this = this;
        if (this.disableShow) {
          t_this.dialogVisible2 = true;
        } else {
          t_this.dialogVisible2 = false;
        }
      },
      //编辑
      jiGou_btn(data) {
        let t_this = this;
        t_this.dialogVisible = true;
        t_this.jiGouForm.UnitName = data.UnitName;
        t_this.jiGouForm.UnitParentID = data.UnitParentID;
        t_this.jiGouForm.ID = data.ID;
        t_this.jiGouForm.UnitNameHierarchical = data.UnitNameHierarchical;
        if(t_this.jiGouForm.UnitParentID == 0){
          t_this.jiGouForm.UnitParentName="顶级"
        }else{
          t_this.jiGouForm.UnitParentName = data.UnitParentName;
        }
        t_this.disableShow = false;
        console.log(data)
      },
      //新增修改
      jiGouSave() {
        let t_this = this;
        if (t_this.jiGouForm.UnitName == '') {
          this.$message.error('请输入机构名称')
          return;
        }
        if (t_this.jiGouForm.UnitParentName == '' || t_this.jiGouForm.UnitParentName == '请选择父节点') {
          // this.jiGouForm.UnitParentID = data.id;
          // this.jiGouForm.UnitParentName = data.name;
          this.$message.error('请输入选择父节点')
          return;
        }
        let param = t_this.jiGouForm;
        console.log(JSON.stringify(param))
        organizationEdit(param).then(res => {
          if (!res.status) {
            this.$notify.error({
              title: '温馨提示',
              message: res.info
            })
            return;
          }
          if (t_this.jiGouForm.ID == 0) {
            console.log(res)
            t_this.dialogVisible = false;
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.jiGouForm.UnitName = '';
            this.jiGouForm.UnitParentID = '';
            this.jiGouForm.UnitParentName = '';
            this.getOrganizationList();
            this.getOrganizationTree();
          } else {
            t_this.dialogVisible = false;
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.jiGouForm.UnitName = '';
            this.jiGouForm.UnitParentID = '';
            this.jiGouForm.UnitParentName = '';
            this.jiGouForm.UnitNameHierarchical = '';
            this.getOrganizationList();
            this.getOrganizationTree();
          }
        }, err => {
          this.$notify.error({
            title: '温馨提示',
            message: err.info
          })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      filterNode(value, data) {
        console.log(data);
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //展示的父节点
      handleNodeClick(showData) {
        let t_this = this;
        this.panDuan = false;
        console.log(JSON.stringify(showData));
        let param = {
          id: showData.id,
          level: showData.level,
          name: showData.name
        }
        console.log(JSON.stringify(param));
        getOrganizationList(param).then(res => {
          // console.log("组织机构树----" + JSON.stringify(res));
          t_this.tableData = res.info.list;
          console.log(t_this.tableData)
        })
      },
      //添加的父节点
      handleNodeClick2(data) {
        this.parent = data;
        console.log(JSON.stringify(data));
      },
      //选择父节点确认
      parentConfirm(){
        this.jiGouForm.UnitParentID = this.parent.id;
        this.jiGouForm.UnitParentName = this.parent.name;
        this.dialogVisible2=false;
      },
      //组织机构树
      getOrganizationTree() {
        getOrganizationTree().then(res => {
          // console.log("组织机构树----" + JSON.stringify(res.info));
          this.data = res.info;
        })
      },

      //组织机构
      getOrganizationList() {
        let param ={
          id:0,
          level:0,
          name:''
        }
        getOrganizationList(param).then(res => {
          // console.log("组织机构----" + JSON.stringify(res.info));
          this.tableData = res.info.list;
        }, err => {
          console.log(err)
        })
      },
      //组织机构删除
      organizationBatchDelete(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = {
              id: id
            }
            organizationBatchDelete(param).then(res => {
              if (res.status) {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                });
                this.getOrganizationTree();
                this.getOrganizationList();
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    mounted() {
      this.getOrganizationTree();
      this.getOrganizationList();
    },
    created() {},
  };
</script>

<style scoped lang="scss">
  .mechanism {
    background-color: transparent;
    padding: 10px;
  }

  .mechanism .el-aside {
    padding: 10px 15px;
    background-color: #fff;
  }

  .mechanism a {
    text-decoration: none;
    color: #000;
  }

  .mechanism .el-main {
    padding: 0px !important;
    color: #333;
    margin-left: 20px;
    text-align: left;
  }

  .mechanism>.el-container {
    // margin-bottom: 40px;
  }

  .mechanism .el-container:nth-child(5) .el-aside,
  .mechanism .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .mechanism .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .top {
    background-color: #fff;
    text-align: left;
  }
  .el-button {
    padding: 10px 15px !important;
    font-size: 12px !important;
    border-radius: 1px !important;
  }

  .container {
    max-width: 1680px;
    min-width: 1080px;
    // padding: 10px;
    background-color: rgb(245, 245, 245);

    .appraisers {
      color: #fff;
      text-align: left;

      .appraisers_title {
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
        width: 100%;

        .assess_style {
          width: 180px;
          overflow: hidden;
          white-space: normal nowrap;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .item_ul {
      li {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #eee;
        border-radius: 4px;
        float: left;
        margin: 5px 15px;
        cursor: pointer;
      }
      .bgcolor {
        color: #fff;
        background-color: #3e84e9;
      }
    }

    .block {
      text-align: right;
    }

    .item {
      background-color: #fff;
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
  }
</style>
