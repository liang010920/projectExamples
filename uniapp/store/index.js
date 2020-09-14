import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		IsLogin: false, //用户是否登陆
		userInfo: {},
		deviceDataWeightList: [],
		deviceDataWeightjcList:[],
		deviceDataAirList:[],
		deviceDataTmbList:[],
	},
	mutations: {
		
		getWeight(state, provider) {
			state.deviceDataWeightList = provider;
		},
		getWeightjc(state, provider) {
			state.deviceDataWeightjcList = provider;
		},
		getAir(state, provider) {
			state.deviceDataAirList = provider;
		},
		getTmb(state, provider) {
			state.deviceDataTmbList = provider;
		},
		
		loginUserInfo(state, provider) {
			state.userInfo = provider; //将请求中res.data.user对象存入userInfo
			uni.setStorageSync('userInfo', provider);
			console.log("vuex---userInfo" + JSON.stringify(state.userInfo));
		},
		
		logOut(state, provider) {
			state.IsLogin = false;
			state.userInfo = provider; //将请求中res.data.user对象存入userInfo
			uni.clearStorageSync("userInfo")
		},
	}
})

export default store
