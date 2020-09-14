<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">报警管理</block>
		</cu-custom>
		<view class="animation-fade">

			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :height="'calc(100vh - 240upx)'" :up="upOption" class="mh cu-card case">

				<block v-for="item in dataList" :key="item.ID">
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-titles text-green "></text>
							<text class="actionTitle">{{ item.WarnType }}</text>
						</view>
						<view class="action green" v-if="item.WarnLevel==1">一级预警</view>
						<view class="action orange" v-if="item.WarnLevel==2">二级预警</view>
						<view class="action red" v-if="item.WarnLevel==3">三级预警</view>

					</view>
					<view class="wranInfo margin-bottom">
						<view class="wrancommon">{{ item.WarnIntro }}</view>
						<view class="wranFlex">
							<view class="wranTime">
								开始时间：{{ item.WarnDateStart | s_toDateTime2 }}
							</view>
							<view class="wranTime">
								结束时间：{{ item.WarnDateEnd | s_toDateTime2}}
							</view>
						</view>
					</view>
				</block>

			</mescroll-body>

		</view>

	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
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
				dataList: [],
			};
		},
		mounted: function() {},
		
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
				this.$postJSON('Device/GetDeviceWarnList?PageIndex=' + PageIndex + '&PageSize=' + PageSize, {
						// deviceId: 192,
						keyword: "",
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wranInfo {
		background-color: #ffffff;
		padding: 0 30upx 15upx 60upx;

		// .wranFlex {
		// 	display: flex;
		// }

		.wrancommon {
			padding-bottom: 15px;
			text-align: left;
			font-size: 22px;
		}

		.wranTime {
			text-align: right;
		}
	}

	.wranInfo .wranTime:first-child {
		margin-right: 0px;
	}
</style>
