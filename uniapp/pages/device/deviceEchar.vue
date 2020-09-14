<template>
	
	<view class="qiun-columns">
		
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设备图表</block>
		</cu-custom>
		
		<view class="qiun-charts3">
		</view>
		
		<view class="pointOut_padding">
			<view class="pointOut flex_layout">
				<view class="right_pointOut">
					<swiper class="swiper" :indicator-dots="indicatorDots" :vertical="true" :autoplay="autoplay" :interval="interval" :duration="duration"> 
						<swiper-item>
							<view class="flex_layout">
								<text></text>
						“安全第一、预防为主、综合治理”</view>
						<view class="flex_layout">
								<text></text>
						“安全第一、预防为主、综合治理”</view>
						</swiper-item>
						<swiper-item>
							<view class="flex_layout">
								<text></text>
						“安全第一、预防为主、综合治理”</view>
						<view class="flex_layout">
								<text></text>
						“安全第一、预防为主、综合治理”</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">重量监测</text>
			</view>
		</view>
		
		<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas></view>
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">重量统计</text>
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
var canvaLineA = null;

var LineAData = {
	LineA: {
		categories: [],
		series: [
			{
				name: '--',
				data: [0]
			}
		],
	}
};
 
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

		this.getServerData();
	},
	mounted() {
		this.userInfo = uni.getStorageSync('userInfo')
	},
	methods: {

		getServerData() {
			let LineA = { categories: [], series: [] };
			LineA.categories = LineAData.LineA.categories;
			LineA.series = LineAData.LineA.series;
			//x轴数据
			for (var i = 60; i > 0; i--) {
				LineA.categories.push(i);
			}
			//y轴数据
			for (i = 1; i < 61; i++) {
				LineA.series[0].data.push(i);
			}
			_self.showLineA('canvasLineA', LineA);
			//定时更新数据心率
			var LineAIds = setInterval(function() {
				LineA.series[0].data.push(Math.round(Math.random() * 500));
				var j = 100;
				//如果x轴数据大于坐标，就把左边的数据清掉。
				if (LineA.series[0].data.length > 60) {
					LineA.series[0].data.shift();
				}
				j = j + 100;
				if (j > 90000) {
					clearInterval(LineAIds);
				}
				_self.showLineA('canvasLineA', LineA);
			}, 300);
			//定时更新
			
			// 柱状图
			let Column = { categories: [], series: [] };
			Column.categories = ColumnData.Column.categories;
			Column.series = ColumnData.Column.series;
			//x轴数据
			for (var i = 60; i > 0; i--) {
				Column.categories.push(i);
			}
			//y轴数据
			for (i = 1; i < 60; i++) {
				Column.series[0].data.push(i);
			}
			_self.showColumn('canvasColumn', Column);
			//定时更新柱状图
			var ColumnIds = setInterval(function() {
				Column.series[0].data.push(Math.round(Math.random() * 500));
				var j = 100;
				//如果x轴数据大于坐标，就把左边的数据清掉。
				if (Column.series[0].data.length > 60) {
					Column.series[0].data.shift();
				}
				j = j + 100;
				if (j > 90000) {
					clearInterval(ColumnIds);
				}
				_self.showColumn('canvasColumn', Column);
			}, 300);
			//定时更新
			
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
					disabled: true, //不显示x轴
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
page {
	width: 750upx;
	overflow-x: hidden;
}
.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	padding: 30upx;
	flex-wrap: nowrap;
	border-top: 30upx solid #fafafa;
}
.qiun-title-dot-light {
	border-left: 8upx solid #0d69b2;
	padding-left: 20upx;
	font-size: 32upx;
	color: #000000;
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
/* 圆弧进度样式 */
.qiun-charts3 {
	width: 750upx;
	background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
	padding: 30upx 0;
}
.charts3 {
	width: 250upx;
	height: 250upx;
	display: block;
	margin: 0 auto;
}
.zsImg {
	width: 100%;
}
.zsImg image {
	width: 100%;
	height: 30upx;
	display: block;
}
.qiun-tip {
	display: block;
	width: auto;
	overflow: hidden;
	padding: 15upx;
	height: 30upx;
	line-height: 30upx;
	margin: 10upx;
	background: #ff9933;
	font-size: 30upx;
	border-radius: 8upx;
	justify-content: center;
	text-align: center;
	border: 1px solid #dc7004;
	color: #ffffff;
}
.pointOut_padding {
	padding: 0 30upx;
	background-color: #FFFFFF;
}
.pointOut {
	background: #fff;
	border-radius: 10px;
	margin-top: -30upx;
	padding: 20upx 40upx;
	position: relative;
	z-index: 100;
}
.swiper{ height: 110upx;}
.left_pointOut image {
	display: block;
	width: 105upx;
	height: 89upx;
}
.right_pointOut {
	padding-left: 30upx;
	display: block;
	width:460upx;
	overflow: hidden;
}
.right_pointOut view {
	color: #333;
	font-size: 24upx;
	padding: 15upx 0;
}
.right_pointOut view text {
	display: inline-block;
	width: 8upx;
	height: 8upx;
	border-radius: 8upx;
	background: #333;
	margin-right: 10upx;
}
</style>
