<template>
	<view>
		<view class="powerData">
			
			<view id="panel" class="flex-column">
				<view class="flex-cell flex-row flex-td">
					<text class="flex-cell flex-row flex-l">环数</text>
					<text class="flex-cell flex-row">一级报警值</text>
					<text class="flex-cell flex-row flex-left">二级报警值</text>
					<text class="flex-cell flex-row flex-left">三级报警值</text>
				</view>
				<view class="flex-cell flex-row flex-tr" v-for="(item, index) in DeviceSettingWarn" :key="index">
					<view class="flex-cell flex-row flex-l">{{ item.ParamName }}</view>
					<view class="flex-cell flex-row ">
						<view class="">{{item}}</view>
					</view>
					<view class="flex-cell flex-row flex-left">
						<input placeholder="报警值" name="input" v-model="warnItem.ParamQty2"></input>
					</view>
					<view class="flex-cell flex-row flex-left">
						<input placeholder="报警值" name="input" v-model="warnItem.ParamQty3"></input>
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
				
			};
		}
	}
</script>

<style lang="scss" scoped>

	
	/* //表格 */
	.powerData {
	
		.flex-row {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	
		.flex-right {
			justify-content: flex-end;
			padding-right: 15upx;
		}
	
		.flex-l {
			flex: 1.2 !important;
		}
	
		.flex-left {
			justify-content: flex-start;
			padding-left: 15upx;
		}
	
		#panel {
			overflow-x: auto;
		}
	
		.flex-cell {
			flex: 1;
			flex-wrap: nowrap;
		}
	
		.flex-td {
			color: #333;
			height: 80upx;
			line-height: 80upx;
		}
	
		.flex-tr {
			background-color: #f5f5f5;
			color: #666;
			height: 80upx;
			line-height: 80upx;
		}
	
		.flex-td text {
			font-size: 28upx;
			border-right: 1upx solid #DFDFDF;
			border-bottom: 1upx solid #DFDFDF;
		}
	}
</style>
