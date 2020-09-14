<template>

	<view>
		<scroll-view scroll-y show-scrollbar="false">

			<view>

				<view class="reghear">
					<image class="reg-logo" src="../../static/demo/topicpic/16.jpeg" mode="aspectFill"></image>
				</view>

				<view class="logon">
					<view class="inputLgoin">
						<text class="cuIcon-profile"></text>
						<input class="loginInput" type="text" placeholder="请输入账户" v-model="mobile" />
					</view>
					<view class="inputLgoin">
						<text class="cuIcon-unlock"></text>
						<input class="loginInput" type="password" password="true" placeholder="请输入密码" v-model="pwd" />
						<!-- <text :class="showPassword ? 'iconfont icon03zichanbuxianshifuzhi' : 'iconfont iconxianshi'" @click="_isShowPass"></text> -->
					</view>
				</view>

			</view>

			<view class="padding flex flex-direction margin-top" style="padding-left: 70upx;padding-right: 70upx;" @click="MemberAdd()">
				<button class="cu-btn round bg-blue lg">注册</button>
			</view>

			<navigator url="login" class="footer u-f-ac u-f-jsb" hover-class="none">
				<view class="btn btn-g btn-square text-gray">已有账号，立即登录</view>
			</navigator>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '', // 用户手机号
				pwd: '', // 用户密码
			};
		},

		methods: {
			MemberAdd: function() {

				if (this.mobile == '') {
					this.$base.showToast('账号不能为空');
					return;
				}
				if (this.pwd == '') {
					this.$base.showToast('密码不能为空');
					return;
				}
				this.$base.showLoading('注册中...');

				this.$postJSON('Member/MemberReg', {
						companyId: 0,
						memberTel: this.mobile,
						memberPwd: this.pwd
					}).then(r => {
						if (!r.data.status) {
							this.$base.showToast(r.data.info);
							return
						}
						this.$base.showToast("注册成功");
						this.$base.hideLoading();
						setTimeout(() => {
							this.$base.navigateBack()
						}, 1000);
					})
					.catch(() => {});
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.reghear {
		text-align: center;
		padding: 50upx 0;
		margin-top: 180rpx;
	}

	.reg-logo {
		width: 180upx;
		height: 180upx;
		border-radius: 20upx;
		background-color: #f8f8f8;
	}

	.logon {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.inputLgoin {
		display: flex;
		align-items: center;
		border: 1upx solid #0081ff;
		margin-top: 40rpx;
		border-radius: 50rpx;
		height: 90rpx;
		line-height: 90rpx;
		width: 80%;
		left: 10%;
		padding-left: 30rpx;

		text {
			padding-right: 10upx;
			color: #0081ff;
			font-size: 38upx;
		}
	}

	.loginInput {
		width: 92%;
		font-size: 30upx;
		padding-left: 10rpx;
	}

	.footer {
		margin: 0 auto;
		width: 80%;
	}
</style>
