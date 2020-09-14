<template>
	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的消息</block>
		</cu-custom>
		
		<view class="newsBox">
			<view class="newsTopMargin" v-for="(item,index) in newsList" :key="index">
				<view class="newsInfo">
					<view class="newsTitle">{{item.MessageTitle}}</view>
					<view>{{item.CreateDate}}</view>
				</view>
				<view class="newsContent">{{item.MessageContent}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[]
			}
		},
		mounted() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.GetSysMessageList()
		},
		methods: {
			GetSysMessageList() {
				this.$post('Common/GetSysMessageList?loginId=' + this.userInfo.ID, {}).then(res => {
					this.newsList = res.data.info
					console.log('信息列表----', JSON.stringify(res))
				})
			},
		}

	}
</script>

<style scoped lang="scss">
	.newsBox {
		color: #666;
		padding: 25upx;
		background-color: #fff;

		>view {
			margin-bottom: 10upx;
		}
		.newsTopMargin{
			margin-top: 15upx;
		}

		.newsInfo {
			display: flex;
			justify-content: space-between;
			text-align: center;
			align-items: center;

			.newsTitle {
				color: #333;
				font-size: 35upx;
				font-weight: bold;
			}
		}

		.newsContent {
			margin-top: 30upx;
			text-align: justify;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}
</style>
