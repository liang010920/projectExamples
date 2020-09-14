<template>
	<view class="home-data u-f-ac">
		<block v-for="(item, index) in homeData" :key="index">
			<view class="u-f-ac u-f1 u-f-column">
				<view class="homeNum">{{ item.num }}</view>
				<view class="homeName">{{ item.name }}</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		homeData: Array
	},
	data() {
		return {};
	}
};
</script>

<style scoped>
.home-data {
	padding: 20upx 0;
}

.home-data > view {
	font-size: 26upx;
	line-height: 1;
}
.homeNum {
	color: #333333;
	font-size: 40upx;
}
.homeName {
	padding-top: 15upx;
	color: #949494;
	font-size: 26upx;
}
</style>
