<template>

	<view class="Div_Body">

		<view class="cu-list menu sm-border">

			<view class="cu-item">
				<view class="content face">
					<text class="cuIcon-pic text-black"></text>
					<text class="text-black">头像</text>
				</view>

				<view class="cu-form-group headClearPadding">
					<view class="headPortrait col-4 grid-square flex-sub">
						<view class="bg-img " @click="ChooseImage">
							<image :src="apiUrl + userInfoList.MemberPhoto" mode="aspectFill"></image>
						</view>
					</view>
				</view>

			</view>

			<view class="cu-item textRight">
				<view class="content">
					<text class="cuIcon-friend text-black"></text>
					<text class="text-black">姓名</text>
				</view>
				<input type="text" @blur="MemberNameBlur(userInfoList.MemberName)" @focus="MemberNameFocus(userInfoList.MemberName)"
				 :placeholder="userInfoList.MemberName" v-model="userInfoList.MemberName">
			</view>

			<view class="cu-item textRight">
				<view class="content">
					<text class="cuIcon-phone text-black"></text>
					<text class="text-black">手机号码</text>
				</view>
				<input type="text" @blur="MemberTelBlur(userInfoList.MemberTel)" @focus="MemberTelFocus(userInfoList.MemberTel)"
				 :placeholder="userInfoList.MemberTel" v-model="userInfoList.MemberTel">
			</view>

		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg SaveBgColor" @click="userInfoSave()">保存</button>
		</view>

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
				apiUrl: 'http://tbm.subei88.com',
				userInfo: "",
				userInfoList: {},
				cunMemberName: '',
				cunMemberTel: '',
				imgList: "",
				imgLoclahost: '',
				saveBool: false,
			};
		},

		mounted() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.GetMember()
		},

		methods: {
			...mapMutations(['logOut']),
			userInfoSave() {
				this.$postJSON('Member/MemberInfoUpdate', {
					"memberId": this.userInfo.ID,
					"memberName": this.userInfoList.MemberName,
					"memberTel": this.userInfoList.MemberTel,
					"memberPhoto": this.userInfoList.MemberPhoto
				}).then(res => {
					if (res.data.status) {
						uni.showToast({
							duration: 1000,
							title: '保存成功'
						})
						setTimeout(function(){
							uni.redirectTo({
								url: '../home/home'
							})
						},1000)
					}
					
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.UploadPhoto(res);
					}
				});
			},
			UploadPhoto(res) {
				let t_data = this;
				const tempFilePaths = res.tempFilePaths;

				for (let i = 0; i < tempFilePaths.length; i++) {
					uni.uploadFile({
						url: 'http://tbm.subei88.com/api/Common/UploadPhoto?type=member ', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[i],
						name: 'file',
						formData: {
							type: 'asset'
						},
						success(res) {
							if (res.statusCode == 200 && res.errMsg == 'uploadFile:ok') {
								let ret = JSON.parse(res.data);
								t_data.userInfoList.MemberPhoto = ret.info
							}
						}
					});
				}
			},

			MemberNameBlur(value) {
				if (!value) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '姓名不能为空'
					})
					this.userInfoList.MemberName = this.cunMemberName
					return
				}

			},
			MemberNameFocus(value) {
				this.cunMemberName = value
			},
			MemberTelBlur(value) {
				var textStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
				if (!textStr.test(value)) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '手机号码不规范'
					})
					this.userInfoList.MemberTel = this.cunMemberTel
					return
				}

			},
			MemberTelFocus(value) {
				this.cunMemberTel = value
			},
			PayMent: function() {
				this.$base.showModal('确认退出吗?', () => {
					this.logOut();
					this.$base.showToast("退出成功")
					// setTimeout(()=>{

					// 	this.$base.navigateBack();
					// },1000)
					uni.redirectTo({
						url: '../login/login'
					})

				});
			},
			GetMember() {
				this.$getJSON('Member/GetMember?memberId=' + this.userInfo.ID, {}).then(res => {
					this.userInfoList = res.data.info
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.SaveBgColor {
		background-color: #007AFF;
	}

	.headClearPadding {
		padding: 0 !important;
	}

	.headPortrait {
		position: relative !important;

		.bg-red {
			position: absolute !important;
			right: 0 !important;
			background-color: #574A50;
			padding: 0px 3px !important;
			height: 16px !important;
		}
	}

	.test {
		text-align: center;
		padding: 10px 0;
	}

	button {
		margin: 20upx;
		font-size: 28upx;
	}

	.Div_Body {
		.face {
			padding: 40rpx 0 40rpx 0;
		}
	}

	image {
		width: 100rpx;
		height: 100rpx;
	}
</style>
