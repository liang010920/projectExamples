<template>
	<view>

		<view class="content">

			<view class="contentList">
				<view class="item" v-for="item in detail_DeviceData" @click="$gotoPage('video')">
					<view class="item1">
						<text></text>
						<view class="name">{{item.name}}</view>
					</view>
					<view class="item2">
						<view class="qty">{{item.DeviceWeightRing}}</view>
						<view class="name">个</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail_DeviceData: [{
						name: "中铁一号",
						DeviceWeightRing: "2"
					},
					{
						name: "中铁二号",
						DeviceWeightRing: "2"
					},
					{
						name: "中铁三号",
						DeviceWeightRing: "2"
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 15upx;

		.contentList {
			display: grid;

			.item {
				flex: 1;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 180upx;
				border-radius: 10upx;
				background-color: #ffffff;
				margin: 8upx;

				.item1 {
					font-size: 28upx;
					color: #999;
					text-align: center;

					.iconData {
						font-size: 60upx;
					}
				}

				.item2 {
					text-align: center;
					display: flex;

					.qty {
						font-size: 60upx;
						padding-right: 10rpx;
					}
				}
			}
		}

		.contentflex {
			display: flex;
			justify-content: space-between;
		}

		.name {
			color: #999;
		}
	}
</style>
