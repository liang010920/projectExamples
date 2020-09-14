<template>
	<!-- 下拉加载 -->
	<view class="load-more">{{loadtext}}</view>
</template>

<script>
	export default {
		props: {
			loadtext: String
		},
	}
</script>

<style scoped>
	.load-more {
		text-align: center;
		padding: 15upx;
		color: #AAAAAA;
	}
</style>
