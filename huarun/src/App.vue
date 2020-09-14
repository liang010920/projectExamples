<template>
  <div id="app">
    <router-view class="router-view" />
    <vue-picture-viewer :imgData="previewImgs" :select-index="previewIndex" v-if="showPreviewImg" @close-viewer="showPreviewImg=false"></vue-picture-viewer>
  </div>
</template>

<script>
  /** 常用图片预览创建组件 */
  // import VuePictureViewer from '@/components/vuePictureViewer/index'
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "App",
    // components: {
    //   VuePictureViewer
    // },
    data() {
      return {
        showPreviewImg: false,
        previewIndex: 0,
        previewImgs: []
      };
    },
    computed: {
      ...mapGetters(["activeIndex"])
    },
    watch: {
      $route(to, from) {
        this.showPreviewImg = false; //切换页面隐藏图片预览
        let paths = to.path.split("/");
        if (to.meta.menuIndex) {
          this.$store.commit("SET_ACTIVEINDEX", to.meta.menuIndex);
        } else if (paths.length >= 3) {
          this.$store.commit(
            "SET_ACTIVEINDEX",
            paths.slice(2, paths.length).join("/")
          );
        }
      }
    },
    mounted() {
      this.addBus();
    },
    methods: {
      addBus() {
        var self = this;
        this.$bus.on("preview-image-bus", function(data) {
          self.previewIndex = data.index;
          self.previewImgs = data.data;
          self.showPreviewImg = true;
        });
      }
    }
  };
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
    color: #fff;
    background-color: rgb(245, 245, 245);
  }

  #health .el-dialog__body {
    overflow-y: scroll;
    height: 700px;
  }

  .is-active .el-radio-button__inner {
    background-color: #FB8D0F !important;
    border-color: #FB8D0F !important;
  }

  .is-top .is-active {
    color: #FB8D0F;
  }

  .el-tabs__item:hover {
    color: #FB8D0F;
  }

  .el-tabs__active-bar {
    background-color: #FB8D0F !important;
  }

  .el-button--primary {
    color: #fff !important;
    background-color: #FB8D0F !important;
    border-color: #FB8D0F !important;
  }

  .el-menu-vertical {
    background-color: #fff !important;
  }

  .health .el-select {
    width: 100%;
  }

  .mechanism .el-tree {
    margin-top: 10px;
  }

  .el-dialog__header {
    text-align: left;
  }

  .is-scrolling-none {
    background-color: #fff !important;
  }

  .el-dialog__wrapper .el-dialog {
    margin-top: 7vh !important;
  }


  .el-submenu__title i {
    color: #000000 !important;
    font-weight: bold;
    font-size: 17px;
  }

  .el-submenu__icon-arrow {
    top: 43% !important;
    right: 30px !important;
    color: #000000 !important;
    font-size: 17px;
  }

  .mechanism .el-tree-node__expand-icon {
    color: #ccc !important;
  }

  .mechanism .el-tree-node__expand-icon.is-leaf {
    color: transparent !important;
  }

  .el-tabs__content {
    overflow: hidden;
    position: relative;
  }

  .day {
    color: #000 !important;
  }

  /* flex布局 */
  .u-f,
  .u-f-ac,
  .u-f-ajc {
    display: flex;
  }

  .u-f-ac,
  .u-f-ajc {
    align-items: center;
  }

  .u-f-ajc {
    justify-content: center;
  }

  .u-f-jsb {
    justify-content: space-between;
  }

  .u-f1 {
    flex: 1;
  }

  .u-f-column {
    flex-direction: column;
  }

  .u-f-row {
    flex-direction: row;
  }
</style>
