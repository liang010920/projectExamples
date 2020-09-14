<template>

	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设备列表</block>
		</cu-custom>

		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索" v-model="searchName">
			</view>
		</view>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :height="'calc(100vh - 240upx)'" :up="upOption" class="mh cu-card case">
			<block v-for="item in dataList" :key="item.ID">
				<view class="docotList animation-fade" @click="$gotoPage('deviceDetails?deviceId='+item.ID+'&deviceName='+item.DeviceName)">
					<view class="item bg_background-color">

						<view class="item_left">
							<image src="../../static/demo/topicpic/13.jpeg" mode="widthFix"></image>
						</view>

						<view class="item_right">
							<view class="gasName mainColor">{{ item.DeviceName == '' ? '未命名' : item.DeviceName }}</view>
							<view class="gasNum">编号 {{ item.DeviceNo }}</view>
							<view class="gasNum">地址：{{item.DeviceArea1}} {{item.DeviceArea2}} {{item.DeviceArea3}} {{ item.DeviceAddress }}</view>
							<view class="bg-white u-f-ac">
								<view class="gasNum" style="width: 25%;">
									进度：
								</view>
								<view class="cu-progress radius striped active">
									<view class="bg-cyan" :style="[{ width:loading?((item.ProjectStepWorkRing/item.ProjectTotalWorkRing)*100)+'%':''}]">{{item.ProjectStepWorkRing}}</view>
								</view>
							</view>
						</view>

						<view class="angleStart">
							<view :class="item.DeviceType == 0 ? 'start start_bg2_color' : 'start start_bg1_color'">{{item.DeviceType == 0 ? '异常':'在线'}}</view>
						</view>
					</view>
				</view>
			</block>

		</mescroll-body>
	</view>

</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				searchName: '',
				loading: false,
				dataList: [],
				mescroll: null,

				downOption: {},
				upOption: {
					page: {
						size: 10
					},
					noMoreSize: 10,
					empty: {
						tip: '暂无相关数据'
					}
				},
				userInfo:''
			}
		},

		onLoad() {
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
			this.userInfo = uni.getStorageSync('userInfo');
		},
		watch: {
			searchName() {
				this.$postJSON('Device/GetDeviceList', {
					deviceType: 0,
					deviceProjectId: 0,
					keyword: this.searchName,
					// loginId:this.userInfo.ID
 				}).then(r => {
					this.dataList = r.data.info;
				})
			}
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			downCallback() {
				this.mescroll.resetUpScroll();
			},

			upCallback(page) {
				let PageIndex = page.num;
				let PageSize = page.size;
				this.$postJSON('Device/GetDeviceList?PageIndex=' + PageIndex + '&PageSize=' + PageSize, {
						deviceType: 0,
						deviceProjectId: 0,
						keyword: this.searchName,
						// loginId:this.userInfo.ID
					})
					.then(r => {
						let curPageData = r.data.info;
						let totalPage = r.data.pages;
						let totalSize = r.data.total;
						let curPageLen = curPageData.length;
						if (page.num == 1) this.dataList = [];

						this.dataList = this.dataList.concat(curPageData);

						this.mescroll.endBySize(curPageLen, totalSize);
						this.$nextTick(() => {
							this.mescroll.endSuccess(curPageLen);
						});
					})
					.catch(() => {
						this.mescroll.endErr();
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.docotList {
		margin: 20upx;
		flex-wrap: wrap;
		display: flex;
		align-items: center;

		.item {
			flex: 1;
			background-color: #FFFFFF;
			border-radius: 10upx;
			padding: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			overflow: hidden;
		}

		.item_left>image {
			width: 150upx;
			height: 150upx;
			border-radius: 10upx;
		}

		.item_right {
			flex: 1;
			text-align: left;
			padding-left: 15upx;
		}

		.gasName {
			font-size: 30upx;
			color: #333;
			padding-bottom: 10upx;
		}

		.gasNum {
			font-size: 26upx;
			color: #999;
			line-height: 1.5;
		}
	}
</style>
