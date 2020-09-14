<template>

	<view class="item">
		<view class="item1">
			<view class="name">{{name}}</view>
		</view>

		<view class="item2">
			<template v-if="currentData <= warning1Data">
				<view class="qty one ">{{currentData}}</view>
			</template>
			<template v-else-if="currentData <= warning2Data">
				<view class="qty orange">{{currentData}}</view>
			</template>
			<template v-else>
				<view class="qty red">{{currentData}}</view>
			</template>
			<view class="name"></view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			currentData: {
				type: Number,
				default: 0
			},
			warning1Data: {
				type: Number,
				default: 0
			},
			warning2Data: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	.red {
		color: red;
	}

	.orange {
		color: orange;
	}

	.green {
		color: greed;
	}

	.one {
		color: #aaaaaa;
	}

	.item {
		flex: 1;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
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
</style>
