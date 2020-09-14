<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
	

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			// 网路监听（用户目前断网，切换wifi）
			this.lib.NetWork.On();
			// 初始化用户状态
			// this.User.__init();
			// #ifdef APP-PLUS
			// 更新检测
			// this.lib.Update();
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style> 
	/*每个页面公共css */
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'colorui/common.css';
	@import 'colorui/animation.css';
	
	.page {
		height: 100vh;
	}
	.red {
		color: red;
	}
	
	.orange {
		color: orange;
	}
	.textRight .uni-input-input{
		text-align: right !important;
	}
	.green {
		color: greed;
	}
	
	.one {
		color: #aaaaaa;
	}
</style>
