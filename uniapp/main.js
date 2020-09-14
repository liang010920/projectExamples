import Vue from 'vue'
import App from './App'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import cuCustom from './colorui/components/cu-custom.vue'
import request from './utils/request.js'
import './utils/filter.js'
import lib from "./utils/lib.js"
Vue.prototype.lib=lib


Vue.prototype.$post = request.post 
Vue.prototype.$postJSON = request.postJSON
Vue.prototype.$get = request.get
Vue.prototype.$getJSON = request.getJSON
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$BASE_URL = request.BASE_URL
Vue.prototype.$deleteJSON = request.deleteJSON 

Vue.prototype.$gotoPage = (url) => {
	uni.navigateTo({
		url: url, 
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}
Vue.prototype.$gotoBack = (delta) => {
	uni.navigateBack({
		delta
	});
}
Vue.component('cu-custom',cuCustom)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import store from "./store";
Vue.prototype.$store = store;

//引入base.js 把$base定义成全局提示信息
import base from "utils/base.js"
Vue.prototype.$base = base

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
