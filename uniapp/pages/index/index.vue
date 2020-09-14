<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">首页</block>
		</cu-custom>

		<!-- <swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
			</swiper-item>
		</swiper> -->

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-green"></text> 功能板块
			</view>
		</view>
		<view class="home-info u-f-ac u-f-jsb ">
			<block v-for="item in homeInfo" :key="item.id">
				<view class="u-f-ac u-f-column u-f1" @click="$gotoPage(item.url)">
					<image :src="item.img" mode="widthFix" class="img"></image>
					<view class="title">{{ item.name }}</view>
				</view>
			</block>
		</view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text> 盾构机排行榜
			</view>
		</view>

		<view class="padding-bottom bg-white">
			<view v-for="(item, index) in projectList" :key="index">
				<view class="indexBox">
					<view class="indexTitle">
						{{item.projectName}}：
					</view>
					<view class="cu-progress radius striped active">
						<view class="bg-cyan" :style="{ width:loading ? ((item.projectRingStep/item.projectRingTotal)*100+'%') : ''}">{{item.projectRingStep}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text> 异常报警分析
			</view>
		</view>

		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
		</view>


	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				projectWidth: '',
				pixelRatio: 1,
				memberId: 0,
				projectWarnList: [],
				projectList: [],
				projectTotal: [],

				loading: false,

				cardCur: 0,
				swiperList: [{
						id: 0,
						type: 'image',
						url: '../../static/demo/datapic/1.jpg'
					},
					{
						id: 1,
						type: 'image',
						url: '../../static/demo/datapic/2.jpg'
					},
					{
						id: 2,
						type: 'image',
						url: '../../static/demo/datapic/3.jpg'
					}
				],
				dotStyle: false,

				homeInfo: [{
						id: 0,
						name: '设备管理',
						url: '../device/device',
						img: 'http://t.subei88.com/trashImg/home_icon1.jpg'
					},
					{
						id: 1,
						name: '报警管理',
						url: '../home/warnlist',
						img: 'http://t.subei88.com/trashImg/home_icon2.jpg'
					},
					{
						id: 2,
						name: '视频监控',
						url: '../video/videolist',
						img: 'http://t.subei88.com/trashImg/home_icon3.jpg'
					},
					{
						id: 3,
						name: '个人中心',
						url: '../home/home',
						img: 'http://t.subei88.com/trashImg/home_icon4.jpg'
					}
				],
				userInfo:''
			};
		},

		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

			setTimeout(() => {
				this.loading = true
			}, 500)
			this.GetIndexTotal()
		},
		mounted() {
			this.userInfo = uni.getStorageSync('userInfo');
			console.log("获取用户信息---"+JSON.stringify(this.userInfo))
		},
		methods: {

			//接口 -- 获取首页信息
			GetIndexTotal() {
				this.$post('Index/GetIndexTotal?memberId=' + this.userInfo.ID, {})
					.then(r => {
						this.projectList = r.data.info.projectList
						this.projectTotal = r.data.info.projectTotal
						// this.projectWidth = r.data.info.projectWeight
						// console.log('进度',r.data.info.projectList.projectWeight)
						//报警信息
						this.projectWarnList = r.data.info.projectWarnList
						this.getServerData();
					})
					.catch(() => {});
			},

			getServerData() {
				// 饼状图
				let chartPieData = {
					series: []
				};
				this.projectWarnList.forEach(arr => {
					chartPieData.series.push({
						name: arr.warnType,
						data: arr.warnCount
					})
				})
				console.log("饼状图参数=" + JSON.stringify(chartPieData))
				_self.showColumn('canvasColumn', chartPieData);

			},

			showColumn(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						borderWidth: 1
					},
					dataLabel: true,
					dataPointShape: true,
					background: '#000',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						pie: {
							lableWidth: 15
						},
						// lineStyle: 'straight'
					}
				});
			},

		}
	};
</script>

<style lang="scss" scoped>
	.home-info {
		background-color: #ffffff;
		padding: 30upx;

		.img {
			width: 100upx;
			height: 100upx;
		}

		.title {
			font-size: 28upx;
			color: #333333;
			padding-top: 15upx;
		}
	}

	.indexBox {
		padding: 10rpx 60rpx;

		.indexTitle {
			padding: 5rpx 0;
			color: #333;
			font-size: 28rpx;
		}
	}

	.qiun-charts {
		width: 750upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}
</style>
