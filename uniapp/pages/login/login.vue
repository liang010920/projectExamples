<template>
	<view>
		<scroll-view scroll-y show-scrollbar="false">
			<view>
				<view class="logoImg">
					<image src="../../static/demo/topicpic/16.jpeg"></image>
				</view>
				<view class="title">盾构机</view>
				<view class="logon">
					<view class="inputLgoin">
						<text class="cuIcon-profile"></text>
						<input class="loginInput" type="text" placeholder="请输入账号" v-model="memberTel" />
					</view>
					<view class="inputLgoin">
						<text class="cuIcon-unlock"></text>
						<input class="loginInput" :type="showPassword ? 'password' : 'text'" placeholder="请输入密码" v-model="password" />
						<text :class="showPassword ? 'cuIcon-attentionfill' : 'cuIcon-attention'" @click="_isShowPass"></text>
					</view>
				</view>
			</view>

			<view class="padding flex flex-direction margin-top" style="padding-left: 70upx;padding-right: 70upx;">
				<button class="cu-btn bg-blue round margin-tb-sm lg" @click="submit">登录</button>
			</view>

			<!-- <navigator url="register" class="footer u-f-ac u-f-jsb" hover-class="none">
				<view class="text-gray" open-type="navigate">注册账号</view>
			</navigator> -->
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				memberTel: '',
				password: '',
				showPassword: true
			};
		},
		mounted: function() {
			this.memberTel = "15273010682"
			this.password = "123456"
		},
		methods: {

			...mapMutations(['loginUserInfo']),

			submit() {

				if (this.memberTel == '') {
					this.$base.showToast('账号不能为空');
					return;
				}
				if (this.password == '') {
					this.$base.showToast('密码不能为空');
					return;
				}
				this.$base.showLoading('登录中...');

				this.$postJSON('Member/MemberLogin', {

						companyId: 0,
						memberTel: this.memberTel,
						memberPwd: this.password,

					}).then(r => {
						if (r.data.status) {
							this.$base.hideLoading();
							this.loginUserInfo(r.data.info)

							this.$base.showToast("登陆成功");

							setTimeout(() => {
								this.$base.redirectTo('../index/index')
							}, 500);
						}
						this.$base.showToast(r.data.info);
					})
					.catch(() => {});
			},

			_isShowPass() {
				this.showPassword = !this.showPassword
			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.logoImg {
		width: 218upx;
		height: 218upx;
		overflow: hidden;
		box-shadow: 0upx 8upx 8upx #dfdfdf;
		border-radius: 30upx;
		margin: 230rpx auto 15rpx;
	}

	.logoImg image {
		width: 100%;
		height: 100%;
	}

	.title {
		text-align: center;
		font-size: 45upx;
		color: #4f4f4f;
	}

	.footer {
		margin: 0 auto;
		width: 80%;
	}

	.logon {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;


		.inputLgoin {
			display: flex;
			align-items: center;
			border: 1upx solid #0081ff;
			margin-top: 40rpx;
			border-radius: 50rpx;
			height: 90rpx;
			line-height: 90rpx;
			width: 80%;
			padding-left: 30rpx;
			padding-right: 30rpx;

			text {
				color: #0081ff;
				font-size: 38upx;
			}

			.loginInput {
				width: 92%;
				font-size: 30upx;
				padding-left: 10rpx;
				border: 0;
			}
		}
	}
</style>
