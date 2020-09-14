<template>

	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">盾尾间隔</block>
		</cu-custom>

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">盾尾间隔图表</text>
			</view>
		</view>

		<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas></view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">盾尾间隔表格</text>
			</view>
		</view>

		<view class="powerData">

			<view id="panel" class="flex-column">
				<view class="flex-cell flex-row flex-td">
					<text class="flex-cell flex-row">左间隔</text>
					<text class="flex-cell flex-row">右间隔</text>
					<text class="flex-cell flex-row">上间隔</text>
					<text class="flex-cell flex-row">下间隔</text>
					<text class="flex-cell flex-row">日期</text>
				</view>

				<scroll-view scroll-y class="tablist" scroll-with-animation>
					<view class="flex-cell flex-row flex-tr" v-for="(item, index) in tmbData" :key="index">
						<view class="flex-cell flex-row ">{{item.DeviceSpacingLeft}}</view>
						<view class="flex-cell flex-row ">{{item.DeviceSpacingRight}}</view>
						<view class="flex-cell flex-row">{{item.DeviceSpacingUp}}</view>
						<view class="flex-cell flex-row ">{{ item.DeviceSpacingDown }}</view>
						<view class="flex-cell flex-row flex-ll">{{ item.DeviceDate }}</view>
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

				tmbData: []
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
			...mapState(['deviceDataTmbList'])
		},
		mounted: function() {

			this.tmbData = this.deviceDataTmbList
			this.getServerData()

			var timer = setInterval(() => {
				this.getServerData()
			}, 1 * 10000)

		},
		methods: {

			getServerData() {
				
				let data1 = []
				let data2 = []
				let data3 = []
				let data4 = []
				let data = []
				this.tmbData.forEach(arr => {
					data1.push(arr.DeviceSpacingLeft+500)
					data2.push(arr.DeviceSpacingRight+300)
					data3.push(arr.DeviceSpacingUp+100)
					data4.push(arr.DeviceSpacingDown)
					data.push(arr.DeviceDate)
				})
				let chartData = {
					categories: data,
					series: [{
						name: '左间隔',
						data: data1,
						color: '#000000'
					}, {
						name: '右间隔', 
						data: data2
					}, {
						name: '上间隔',
						data: data3
					}, {
						name: '下间隔',
						data: data4
					}]
				}
				
				// console.log("盾构图表数据==" + JSON.stringify(chartData))
				
				_self.showLineA('canvasLineA', chartData);

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
						line:{
							type:'curve'
						}
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
