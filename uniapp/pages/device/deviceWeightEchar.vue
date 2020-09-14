<template>

	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">重量监测</block>
		</cu-custom>

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">重量监测图表</text>
			</view>
		</view>

		<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas></view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">重量监测表格</text>
			</view>
		</view>

		<view class="powerData">

			<view id="panel" class="flex-column">
				<view class="flex-cell flex-row flex-td">
					<text class="flex-cell flex-row">环数</text>
					<text class="flex-cell flex-row">土质</text>
					<text class="flex-cell flex-row flex-left">理论值</text>
					<text class="flex-cell flex-row flex-left">实际值</text>
					<text class="flex-cell flex-row flex-l">称重日期</text>
				</view>

				<scroll-view scroll-y class="tablist" scroll-with-animation>
					<view class="flex-cell flex-row flex-tr" v-for="(item, index) in deviceWeightData" :key="index">
						<view class="flex-cell flex-row">{{ item.DeviceWeightRing }}</view>
						<view class="flex-cell flex-row ">{{item.DeviceWeightSoil}}</view>
						<view class="flex-cell flex-row flex-left">{{item.DeviceWeightPlan}}</view>
						<view class="flex-cell flex-row flex-left">{{item.DeviceWeight}}</view>
						<view class="flex-cell flex-row flex-l">{{item.DeviceDate}}</view>
					</view>
				</scroll-view>
			</view>

		</view>

	</view>

</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	var xAxisData = [];
	var yAxisData = [];
	import {
		mapState,
		mapMutations
	} from 'vuex';
	/*下面是服务器返回的数据格式*/

	var LineAData = {
		LineA: {
			categories: [],
			series: [{
				name: '--',
				data: [0]
			}]
		}
	};

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,

				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,

				deviceWeightData: []
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
		},
		onHide() {
			var timer = ''
			console.log(timer)
		},
		computed: {
			...mapState(['deviceDataWeightjcList'])
		},
		mounted: function() {

			this.deviceWeightData = this.deviceDataWeightjcList
			this.getServerData()

			var timer = setInterval(() => {
				this.getServerData()
			}, 1 * 1000)

		},
		methods: {
			// getDeviceDataList() {
			// 	this.$postJSON('Device/GetDeviceDataList', {}).then(res => {
			// 		console.log(''+res)
			// 	})
			// },
			getServerData() {
				let LineA = {
					categories: [],
					series: []
				};
				LineA.categories = LineAData.LineA.categories;
				LineA.series = LineAData.LineA.series;
				//x轴数据
				LineA.categories.push(this.deviceWeightData[0].DeviceDate);
				//y轴数据
				LineA.series[0].data.push(this.deviceWeightData[0].DeviceWeight);
				console.log("重量监测图表数据==" + JSON.stringify(LineA))
				_self.showLineA('canvasLineA', LineA);

			},

			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: false,
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					xAxis: {
						disabled: true, //不显示x轴
						disableGrid: false,
						type: 'grid',
						gridColor: '#f2f2f2',
						gridType: 'solid',
						dashLength: 2
					},
					yAxis: {
						disabled: false, //不显示y轴
						disableGrid: false,
						gridType: 'solid',
						gridColor: '#f2f2f2',
						dashLength: 2,
						splitNumber: 5,
						min: 0,
						max: 30,
						format: val => {
							return val.toFixed(0);
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						lineStyle: 'straight'
					}
				});
			},

		}
	};
</script>

<style lang="scss" scoped>
	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.tablist {
		overflow-y: scroll;
		height: 50vh;
	}

	/* //表格 */
	.powerData {

		.flex-row {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.flex-right {
			justify-content: flex-end;
			padding-right: 15upx;
		}

		.flex-l {
			flex: 1.2 !important;
		}

		.flex-left {
			justify-content: flex-start;
			padding-left: 15upx;
		}

		#panel {
			overflow-x: auto;
		}

		.flex-cell {
			flex: 1;
			flex-wrap: nowrap;
		}

		.flex-td {
			color: #333;
			height: 80upx;
			line-height: 80upx;
		}

		.flex-tr {
			background-color: #f5f5f5;
			color: #666;
			height: 80upx;
		}

		.flex-td text {
			font-size: 28upx;
			border-right: 1upx solid #DFDFDF;
			border-bottom: 1upx solid #DFDFDF;
		}
	}
</style>
