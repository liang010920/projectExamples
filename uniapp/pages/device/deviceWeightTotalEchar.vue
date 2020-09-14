<template>

	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">重量统计</block>
		</cu-custom>

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">重量统计图表</text>
			</view>
		</view>

		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas></view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">重量统计表格</text>
			</view>
		</view>

		<view class="powerData">

			<view id="panel" class="flex-column">
				<view class="flex-cell flex-row flex-td">
					<text class="flex-cell flex-row">环数</text>
					<text class="flex-cell flex-row">土质</text>
					<text class="flex-cell flex-row flex-left">理论值</text>
					<text class="flex-cell flex-row flex-left">实际值</text>
					<text class="flex-cell flex-row flex-ll">开始日期</text>
					<text class="flex-cell flex-row flex-ll">结束日期</text>
				</view>

				<scroll-view scroll-y class="tablist" scroll-with-animation>
					<view class="flex-cell flex-row flex-tr" v-for="(item, index) in WeightList" :key="index">
						<view class="flex-cell flex-row">{{ item.DeviceWeightRing }}</view>
						<view class="flex-cell flex-row">{{item.DeviceWeightSoil}}</view>
						<view class="flex-cell flex-row flex-left">{{item.DeviceWeightPlan}}</view>
						<view class="flex-cell flex-row flex-left">{{item.DeviceWeight}}</view>
						<view class="flex-cell flex-row flex-ll">{{item.DeviceWeightStart}}</view>
						<view class="flex-cell flex-row flex-ll">{{item.DeviceWeightEnd}}</view>
					</view>
				</scroll-view>
			</view>

		</view>

	</view>

</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var _self;
	var canvaLineA = null;
	
	/*下面是服务器返回的数据格式*/


	var ColumnData = {
		Column: {
			categories: [],
			series: [{
				"name": "",
				"data": []
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

				WeightList: []
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

		computed: {
			...mapState(['deviceDataWeightList'])
		},
		mounted: function() {

			this.WeightList = this.deviceDataWeightList
			this.getServerData()

			var timer = setInterval(() => {
				this.getServerData()
			}, 1 * 10000)

		},
		methods: {


			getServerData() {
				
				this.WeightList = this.deviceDataWeightList
				
				// 柱状图
				let Column = {
					categories: [],
					series: []
				};
				_self.showColumn('canvasColumn', Column);
				Column.categories = ColumnData.Column.categories;
				Column.series = ColumnData.Column.series;
				
				
				let categories = []
				let series = []
				this.WeightList.forEach(arr => {
					categories.push(arr.DeviceWeightRing)
					series.push(arr.DeviceWeight)
				})
				
				//x轴数据
				Column.categories = categories;
				//y轴数据
				Column.series[0].data = series;
				console.log("重量统计图表数据==" + JSON.stringify(Column))
				_self.showColumn('canvasColumn', Column);
			},

			showColumn(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
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
						disabled: false, //不显示x轴
						disableGrid: false,
						type: 'grid',
						gridColor: '#f2f2f2',
						gridType: 'solid',
						dashLength: 2
					},
					yAxis: {
						disabled: true, //不显示y轴
						disableGrid: false,
						gridType: 'solid',
						gridColor: '#f2f2f2',
						dashLength: 2,
						splitNumber: 5,
						min: 10,
						max: 1000,
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

		.flex-ll {
			flex: 1.5 !important;
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
