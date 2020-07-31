<template>
  <div id="app">
    <router-view class="router-view" />
    <vue-picture-viewer
      :imgData="previewImgs"
      :select-index="previewIndex"
      v-if="showPreviewImg"
      @close-viewer="showPreviewImg=false"
    ></vue-picture-viewer>
  </div>
</template>

<script>
/** 常用图片预览创建组件 */
// import VuePictureViewer from '@/components/vuePictureViewer/index'
import { mapGetters } from "vuex";

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
  background-color: rgb(245,245,245);
}

#app /deep/.aside-container {
  border-right: rgb(245,245,245) 1px solid;
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
.u-f-row{
  flex-direction: row;
}
</style>
