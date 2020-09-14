<template>
	<view>
		<view class="docotList animated fadeIn fast" v-for="(item, index) in dataList" :key="index" @tap="openDetail(index)">
			<view class="item bg_background-color">
				<view class="item_left"><image src="../../static/demo/topicpic/13.jpeg" mode="widthFix"></image></view>
				<view class="item_right">
					<view class="gasName mainColor">{{ item.name }}</view>
					<view class="gasNum">气源个数 {{ item.AricCount }} 区域个数 {{ item.GroupCount }}</view>
					<view class="gasNum">公司地址</view>
				</view>
				<view class="status" v-if="index == 1"><view class="start1 start1Item">异常</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['searchName'],
	data() {
		return {
			dataList: [
				{ name: '湖南湘雅医院', AricCount: 10, GroupCount: 20, address: '长沙' },
				{ name: '湖南湘雅医院1', AricCount: 10, GroupCount: 20, address: '长沙' },
				{ name: '湖南湘雅医院2', AricCount: 10, GroupCount: 20, address: '长沙' },
			]
		};
	},
	watch: {},
	methods: {
		openDetail(index) {
			this.$emit('chang', index);
		},
		searchNameGetList: function(dataName){ // 条件搜索
			
		}
	},
};
</script>

<style scoped>
.docotList {
	padding: 10upx;
	flex-wrap: wrap;
	display: flex;
	align-items: center;
}

.item {
	flex: 1;
	height: 150upx;
	background-color: rgb(248, 248, 248);
	border-radius: 10upx;
	padding: 0 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
}

.item_left > image {
	width: 100upx;
	height: 100upx;
	border-radius: 10upx;
}

.item_right {
	flex: 1;
	text-align: left;
	padding-left: 15upx;
}

.gasName {
	font-size: 28upx;
	color: #333;
}

.gasNum {
	font-size: 26upx;
	color: #eee;
}
</style>
