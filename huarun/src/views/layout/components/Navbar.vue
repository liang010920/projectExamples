<template>
  <div class="navbar">
    <!-- <img class="logo" :src="logo" /> -->
    <div class="item_title">
      <!-- <div class="item_title_img">
        <img src="static/img/icon/7.png">
      </div>
      <div class="item_title_img2">
       <img src="static/img/icon/a3.png">
      </div> -->
      <div class="item_tltle_text">
        <p>智慧健康</p>
        <p>zhihuijiankang</p>
      </div>
    </div>
    <div class="nav-items-container">
      <div class="item_memberInfo">
        <span class="item_banner" @click="getBannerInfo()">
          <a href="http://localhost:8090/" target="_blank">大屏幕</a>
        </span>
        <span v-if="memberInfo.MemberType =='3'">医生</span>
        <span v-if="memberInfo.MemberType =='9'">管理员</span>
      </div>
    </div>
    <el-popover
      :visible-arrow="false"
      placement="bottom"
      popper-class="no-padding-popover"
      width="200"
      trigger="click"
    >
      <div class="handel-items">
        <!-- <div class="handel-item"
        ><i class="wukong wukong-personcenter"></i>{{memberInfo}}</div>-->
        <div class="handel-item">
          <router-link to="/workbench/member/index">
            <img src="../../../../static/img/user.png" style="width: 13px;height: 15px;margin-right: 8px;">个人信息
          </router-link>
        </div>
        <div class="handel-item" @click="handleClick('goout')">
          <i class="wukong wukong-goout"/>退出登录
        </div>
        <!-- <div class="handel-item hr-top"
             style="pointer-events: none;"
        :style="{'margin-bottom': manage ? '15px' : '0'}"><i class="wukong wukong-versions"></i>版本 V9.0.2.190628</div>-->
        <div v-if="manage" class="handel-box">
          <!-- <el-button @click="enterSystemSet()"
                     type="primary"
          class="handel-button">进入企业管理后台</el-button>-->
        </div>
      </div>
      <div slot="reference" class="user-container">
        <div
          v-photo="userInfo"
          v-lazy:background-image="$options.filters.filterUserLazyImg(userInfo.img)"
          :key="userInfo.img"
          class="user-img div-photo"
        />
        <i class="el-icon-caret-bottom mark"/>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'

export default {
  filters: {
    langName: function(value) {
      if (value) {
        return { cn: '中文', en: 'English' }[value]
      } else {
        return '中文'
      }
    }
  },
  components: {},
  props: {
    navIndex: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      navIndexChild: 0,
      memberInfo: JSON.parse(localStorage.getItem('memberInfo'))
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'lang', 'logo', 'crm', 'bi', 'manage']),
    items() {
      var tempsItems = []
      // tempsItems.push({
      //   title: '办公',
      //   type: 0,
      //   path: '/workbench',
      //   icon: 'workbench'
      // })
      // if (this.crm) {
      //   tempsItems.push({
      //     title: '客户管理',
      //     type: 1,
      //     path: '/crm',
      //     icon: 'customer'
      //   })
      // }
      // if (this.bi) {
      //   tempsItems.push({
      //     title: '商业智能',
      //     type: 5,
      //     path: '/bi',
      //     icon: 'statistics'
      //   })
      // }
      // if (this.manage) {
      //   tempsItems.push({
      //     title: '速贝科技',
      //     type: 0,
      //     path: '/crm',
      //     icon: 'statistics'
      //   })
      // }
      return tempsItems
    }
  },
  mounted() {
    this.navIndexChild = this.navIndex
  },
  methods: {
    getBannerInfo() {
      const routeData = this.$router.resolve({
        path: '/bigScreen'
      })

      window.open(routeData.href, '_blank')
    },
    navItemsClick(type) {
      this.navIndexChild = type
      this.$store.commit('SET_NAVACTIVEINDEX', type)
      this.$emit('nav-items-click', type)
    },
    enterSystemSet() {
      this.$router.push({
        name: 'manager'
      })
    },
    handleClick(type) {
      if (type === 'goout') {
        this.$confirm('退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var loading = Loading.service({
              target: document.getElementById('#app')
            })
            this.$store
              .dispatch('LogOut')
              .then(() => {
                location.reload()
                loading.close()
              })
              .catch(() => {
                location.reload()
                loading.close()
              })
          })
          .catch(() => {})
      } else if (type === 'person') {
        this.$router.push({
          name: 'person'
        })
      }
    },
    switchLang(item) {
      this.$store.commit('SET_LANG', item.lang)
      this.langName = item.name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  color:#333;

  // height: 60px;
  min-height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30px 0 15px;
  .item_title {
    font-size: 12px;
    font-weight: 700;
    color: rgb(76,60,60);
    height: 15px;

    line-height: 15px;
    display: flex;
    align-items: center;
    .item_title_img{
    margin-left:2rem;
  }
  .item_title_img2{
    margin-top: .5rem;
  }
  .item_tltle_text{
    margin-left:.5rem;
     margin-top: .5rem;
  }
  }

  .logo {
    width: 150px;
    height: 40px;
    display: block;
    flex-shrink: 0;
    margin-right: 15px;
  }
  .nav-items-container {
    flex: 1;
    display: flex;
    min-width: 500px;
    height: 100%;
    line-height: 60px;
    font-size: 15px;
    .item_memberInfo {
      text-align: right;
      flex: 1;
      padding-right: 1rem;
      .item_banner {
        color: red;
        padding: 0 1rem;
        cursor: pointer;
      }
    }
  }

  .user-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    .user-img {
      display: block;
      width: 32px;
      min-width: 32px;
      min-height: 32px;
      height: 32px;
      margin-right: 8px;
      border-radius: 50%;
    }
    .mark {
      font-size: 15px;
      color: #1890ff;
    }
  }

  .user-container:hover {
    .mark {
      color: #2486e4;
    }
  }
}

.nav-item {
  padding: 0 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-item-img {
  width: 24px;
  height: 24px;
  display: block;
  margin-right: 5px;
}

.handel-items {
  padding: 10px 0 18px 0;
  .handel-item {
    padding: 5px 20px;
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
    i {
      margin-right: 8px;
      font-size: 15px;
    }
  }
  .handel-item:hover {
    background-color: #f7f8fa;
    color: #3e84e9;
  }
  .handel-box {
    padding: 0 15px;
    .handel-button {
      width: 100%;
      border-radius: 4px;
      border-color: #009df0;
      background-color: #009df0;
    }
  }
}
.hr-top {
  margin-top: 8px;
  border-top: 1px solid #f4f4f4;
  padding-top: 3px;
}

.nav-lang {
  cursor: pointer;
  color: #888;
  padding: 20px;
  &:hover {
    color: #3e84e9;
  }
  &.active {
    font-weight: bold;
    color: #3e84e9;
  }
}
</style>
