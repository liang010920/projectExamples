<template>
	<!-- 可滑动的导航条 -->
	<!-- 需要引入uniapp官方css -->

	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab" :style="scrollStyle">
			<block v-for="(tab,index) in tabBars" :key="tab.id">
				<view class="swiper-tab-list" :class="{'active':tabIndex==index}" @tap="tabtap(index)" :style="scrollItemStyle">
					{{tab.name}} {{tab.num?tab.num:''}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		props: {
			tabBars: Array,
			tabIndex: Number,
			scrollStyle: {
				type: String,
				default: ""
			},
			scrollItemStyle: {
				type: String,
				default: ""
			}
		},
		methods: {
			tabtap(index) {
				this.$emit('tabtap', index);
			}
		}
	}
</script>

<style scoped>
	.active .swiper-tab-line {
		color: #007AFF;
		background-color: #007AFF;
		height: 1upx;
		border: 1px solid #007AFF;
		width: 55upx;
		margin: 0 auto;
	}
</style>
