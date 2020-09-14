<template>
	<view>
		<uni-section title="基本资料" type="line"></uni-section>

		<view class="u-from u-f-ac">
			<view class="u-left-title u-ellipsis-1">
				负责人
			</view>
			<input class="u-right-title" type="text" placeholder="请输入负责人" focus="true" />
		</view>
		
		<view class="u-from u-f-ac">
			<view class="u-left-title">
				电话
			</view>
			<input class="u-right-title" type="number" placeholder="请输入电话" />
		</view>

		<!-- <uni-section title="类型" type="line"></uni-section> -->

		<!-- <view class="u-from u-f-ac">
			<view class="u-left-title">
				设备类型
			</view>
			<view class="u-right-title">
				<picker @change="bindPickerChange" :value="irepairIndex" :range="repairItem" range-key="repirName">
					<view class="u-f-ac u-f-jsb">
						<view>{{repairItem[irepairIndex].repirName}}</view>
						<view>
							<icon class="icon iconfont iconjiantou2"></icon>
						</view>
					</view>
				</picker> 
			</view>
		</view>
		<view class="btn"> -->
			
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" role="button" aria-disabled="false" >确 认</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repairItem: [{
						repirName: '请选择设备类型',
						id: 0
					},
					{
						repirName: '区域报警器0',
						id: 1
					},
					{
						repirName: '区域报警器1',
						id: 2
					},
					{
						repirName: '区域报警器2',
						id: 3
					},
					{
						repirName: '区域报警器3',
						id: 4
					}
				],
				irepairIndex: 0,
				
				imageList:[]
			}
		},
		mounted() {
			// 接收值
			uni.$on("update", (data) => {
				console.log(data)
				this.userTitle = data.msg.text
			})
		},
		
		methods: {
			// 跳转选择框
			openText() {
				uni.navigateTo({
					url: 'item'
				})
			},
			
			// 普通选择框
			bindPickerChange(e) {
				this.irepairIndex = e.detail.value
			},
		}
	}
</script>

<style>
	.u-from {
		padding: 30upx;
		font-size: 32upx;
		border: 1upx solid #f5f5f5;
		background-color: #FFFFFF;
	}

	.u-left-title {
		color: #666;
		width: 150upx;
	}

	/*自动隐藏文字*/

	.u-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.u-right-title {
		color: #333;
		flex: 1;
	}

	.u-title-height {
		line-height: 1.5;
	}
	.btn{
		margin: 30upx;
	}
	
</style>
