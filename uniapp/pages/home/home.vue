<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人中心</block>
		</cu-custom>
		<view class="topic-bg">
			<image src="../../static/demo/topicpic/5.jpeg" mode="aspectFill" lazy-load></image>
		</view>
		<view class="homeData">
			<template v-if="IsLogin">
				<!-- 未登录 -->
				<view class="u-f-ajc">登陆仿app,体验更多功能</view>
				<!-- 第三方登陆 -->
				<!-- 账号密码登陆 -->
				<view class="u-f-ac u-f-ajc" @tap="openLogin">
					账号密码登陆
					<view class="icon iconfont iconshebei2"></view>
				</view>
			</template>
			<template v-else>
				<!-- 登陆 -->
				<view class="home-info u-f-ac border-bottom">
					<img :src="apiUrl+homeInfoList.MemberPhoto" mode="widthFix" lazy-load class="headImg">
					<view class="u-f1">
						<view>{{ homeInfoList.MemberName }}</view>
						<view>{{homeInfoList.MemberTel}}</view>
					</view>
					<view class="icon iconfont iconjiantou1"></view>
				</view>
			</template>

			<!-- 数据 -->
			<!-- <home-data :homeData="homeData"></home-data> -->
		</view>

		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="item in homelist" :key="item.index" @click="openPage(item.index)">
				<view class="content">
					<text class="cuIcon-friend text-black"></text>
					<text class="text-black">{{item.name}}</text>
				</view>
			</view>
		</view>

		<view class="padding flex flex-direction PayBgColor">
			<button class="cu-btn bg-red margin-tb-sm lg PayBgColor2" @click="PayMent">退出</button>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
	import homeData from '../../components/home/home-data.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			homeData,
			uniStatusBar
		},
		computed: {
			...mapState(['IsLogin', ''])
		},
		data() {
			return {
				apiUrl: 'http://tbm.subei88.com',
				homelist: [{
					name: "个人中心",
					url: 'memberInfo',
					index: 0,
				}, {
					name: "我的消息",
					url: 'news',
					index: 1,
				}],

				userInfo: '',
				homeInfoList: {}
			};
		},
		
		mounted() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.GetMember()
		},
		methods: {
			...mapMutations(['logOut']),
			PayMent: function() {
				this.$base.showModal('确认退出吗?', () => {
					this.logOut();
					this.$base.showToast("退出成功")
					uni.redirectTo({
						url: '../login/login'
					})

				});
			},
			GetMember() {
				this.$getJSON('Member/GetMember?memberId=' + this.userInfo.ID, {}).then(res => {
					this.homeInfoList = res.data.info
				})
			},
			openPage(index) {
				switch (index) {
					case 0:
						uni.redirectTo({
							url:'memberInfo'
						})
						break;
					case 1:
						uni.redirectTo({
							url:'news'
						})
						break;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.headImg {
		width: 50px !important;
		height: 50px !important;
		border-radius: 50%;
		margin-right: 10upx;
	}

	.PayBgColor {
		background-color: #F1F1F1;
	}

	.PayBgColor2 {
		background-color: #FAFAFA !important;
		color: #4C5363;
		font-weight: bold;
	}

	view {
		background-color: #FFFFFF;
	}

	.topic-bg {
		width: 100%;
		height: 250upx;
		position: relative;
		overflow: hidden;
	}

	.topic-bg>image {
		width: 100%;
		position: absolute;
		filter: blur(2px);
	}

	.homeData {
		margin: 30upx;
		border-radius: 20upx;
		padding: 10upx;
		position: absolute;
		top: 280upx;
		left: 0;
		right: 0;
		box-shadow: 0px 3px 20px #aaa;
	}

	.home-lists {
		padding-top: 150upx;
	}

	.home-adv {
		width: 660upx;
		height: 260upx;
		overflow: hidden;
		margin: 0 auto;
	}

	.home-adv>image {
		border-radius: 20upx;
		width: 100%;
		height: 100%;
	}

	.home-list {
		padding: 20upx 30upx;
	}

	.home-list-hover {
		background-color: #ffffff;
	}

	.iconxinbaniconshangchuan-,
	.icondanyehuaban {
		margin-right: 10upx;
	}

	.home-info {
		padding: 20upx 40upx;
	}

	.home-info>image {
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		margin-right: 15upx;
		flex-shrink: 0;
	}

	.home-info>view>view:last-child {
		color: #949494;
		font-size: 26upx;
	}

	.cu-list {
		padding-top: 90rpx;
	}
</style>
