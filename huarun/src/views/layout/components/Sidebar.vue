<template>
  <div class="container">
    <div class="create-button-container">
      <el-popover v-if="createButtonTitle != ''" placement="right" :offset="addOffset" popper-class="no-padding-popover"
        :visible-arrow="false" trigger="hover" class="navBgColor">
        <slot name="add"></slot>
        <div slot="reference" @click="quicklyCreate" class="create-button" :style="{ 'background-color': createButtonBackgroundColor }">
          <div v-show="!buttonNameCollapse" class="button-name">{{createButtonTitle}}</div>
          <div v-show="!buttonNameCollapse" class="button-line"></div>
          <i class="button-mark" :class="createButtonIcon"></i>
        </div>
      </el-popover>
    </div>
    <el-menu :default-active="activeIndex" :style="{'border-right-color': backgroundColor, 'padding-top': createButtonTitle != '' ? '90px' : '40px'}"
      class="el-menu-vertical " :text-color="textColor" background-color="#fff" :active-text-color="activeTextColor"
      :collapse="collapse" unique-opened>
      <template v-for="(item, index) in items" v-if="!item.hidden">
        <router-link v-if="!item.children" :key="index" :to="'/' + mainRouter + '/' + item.path">
          <el-menu-item :index="item.path" class="menu-item-defalt" :class="{'menu-item-select': activeIndex == item.path}">
            <i class="wukong" :class="'wukong-' + item.meta.icon" :style="{ 'color': activeIndex == item.path ? activeTextColor : textColor}"></i>
            <span slot="title">{{item.meta.title}}<span class="el-icon-arrow-right floatRight"></span></span>
            <el-badge v-if="item.meta.num && item.meta.num > 0" :max="99" :value="item.meta.num"></el-badge>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :key="index" :index="item.path">
          <template slot="title" v-if="!item.hidden">
            <i class="wukong" :class="'wukong-' + item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <router-link v-for="(subitem, subindex) in item.children" v-if="!item.hidden" :key="subindex" :to="'/' + mainRouter + '/' + subitem.path">
            <el-menu-item :index="subitem.path" class="menu-item-defalt" :class="{'menu-item-select': activeIndex == subitem.path }">{{subitem.meta.title}}</el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
    <div class="sidebar-bottom" :style="{ 'background-color':'#fff' }">
      <div class="sidebar-container">
        <img class="collapse-button" :style="{ 'right': buttonNameCollapse ? '3px' : '0' }" src="@/assets/img/collapse_white.png"
          alt @click="toggleSideBarClick" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Sidebar',
    data() {
      return {
        collapse: false, //菜单开关
        buttonNameCollapse: false,
      }
    },
    watch: {
      collapse: function(val) {
        if (val) {
          this.buttonNameCollapse = val
        } else {
          setTimeout(() => {
            this.buttonNameCollapse = val
          }, 300)
        }
      }
    },
    computed: {
      ...mapGetters(['activeIndex'])
    },
    props: {
      mainRouter: {
        type: String,
        default: ''
      },
      addOffset: {
        type: Number,
        default: 70
      },
      /** 选择项目 */
      items: {
        type: Array,
        default: []
      },
      backgroundColor: {
        type: String,
        default: 'rgb(250,248,248)'
      },
      activeTextColor: {
        type: String,
        default: 'rgb(249,201,161)'
      },
      textColor: {
        type: String,
        default: 'black'
      },
      selectLineColor: {
        type: String,
        default: '#3E84E9'
      },
      selectBackgroundColor: {
        type: String,
        default: '#454E57'
      },
      createButtonTitle: {
        type: String,
        default: ''
      },
      createButtonBackgroundColor: {
        type: String,
        default: '#3E84E9'
      },
      createButtonIcon: {
        type: String,
        default: 'el-icon-arrow-right'
      }
    },
    mounted() {},
    methods: {
      toggleSideBarClick() {
        this.collapse = !this.collapse
      },
      // 快速创建
      quicklyCreate() {
        this.$emit('quicklyCreate')
      },

    }
  }
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .floatRight {
    float: right;
    line-height: 45px;
  }

  .navBgColor {
    background-color: #fff;
  }

  .container {
    position: relative;
    height: 100%;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 300px;
    min-height: 400px;
  }

  .el-menu-vertical {
    height: 100%;
    overflow: auto;
    background-color: #fff !important;
    padding-bottom: 48px;

    .el-submenu.is-active {
      .el-submenu__title {
        .wukong {
          color: #000;
        }

        span {
          color: #000;
        }
      }
    }
  }

  .menu-item-icon-container {
    display: inline-block;
    margin-right: 10px;

    .menu-item-icon-flex {
      width: 22px;
      height: 22px;
      position: relative;

      .menu-item-icon {
        display: block;
      }
    }
  }

  .menu-item-defalt {
    border-left: 2px solid transparent;
    height: 46px;
    // font-weight: bold;
    line-height: 46px;
  }

  .menu-item-select {
    border-left: 2px solid rgb(250, 248, 248);
    background-color: rgb(250, 248, 248) !important;
  }

  .create-button-container {
    // padding: 15px 12px 15px 12px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // z-index: 2;

    .create-button {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 15px;
      height: 36px;
      border-radius: 4px;

      .button-name {
        flex: 1;
      }

      .button-line {
        height: 10px;
        background-color: white;
        width: 1px;
        margin: 0 20px 0 10px;
        opacity: 0.3;
      }

      .button-mark {
        width: 12px;
      }
    }
  }

  .side-bar {
    height: 32px;
    padding: 0 16px 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
  }

  .sidebar-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;

    .sidebar-container {
      position: relative;
      height: 48px;
    }
  }

  .collapse-button {
    position: absolute;
    top: 0;
    padding: 18px 20px;
  }

  .wukong {
    margin-right: 8px;
  }

  // 消息数
  .el-badge {
    position: absolute;
    right: 15px;
    top: 5px;

    /deep/ .el-badge__content {
      border-width: 0;
    }
  }
</style>
