<template>
	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">中铁</block>
		</cu-custom>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">人仓</text>
			</view>
		</view>

		<view class="main">
			<view class="video">
				<view>
					<video id="myVideo" :src="video" autoplay="true" enable-danmu danmu-btn controls></video>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green "></text>
				<text class="actionTitle">土仓</text>
			</view>
		</view>
		<view class="main">
			<view class="video">
				<view>
					<video id="myVideo" :src="video"  enable-danmu danmu-btn controls></video>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				video: 'https://www.apple.com/105/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/films/feature/iphone-x-feature-tpl-cc-us-20170912_1920x1080h.mp4',

				danmuValue: ''
			}
		},

		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 500upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.video {
			color: #999;
		}
	}
</style>
