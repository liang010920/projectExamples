<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ deviceName == '' ? '盾构机' : deviceName }}</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav flex topFixed" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center ">
				<view class="cu-item flex-sub" :class="index == tabActiveIdx ? 'text-green cur' : ''" v-for="(item, index) in tabs"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{ item.name }}
				</view>
			</view>
		</scroll-view>

		<scroll-view scroll-y scroll-with-animation>

			<view class="animation-fade" v-if="tabActiveIdx == 0">

				<view class="cu-bar bg-white" style="margin-top:45px;">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">重量监测</text>
					</view>
					<view class="action" @click="$gotoPage('deviceWeightEchar')">
						<text class="text-gray">详情</text>
						<text class="cuIcon-right text-gray text-xs"></text>
					</view>
				</view>

				<view class="content">

					<view class="contentList">

						<view class="item">
							<view class="item1">
								<text></text>
								<view class="name">当前环数</view>
							</view>
							<view class="item2">
								<view class="qty">{{detail_DeviceData.DeviceWeightRing}}</view>
								<view class="name">环</view>
							</view>
						</view>

						<view class="item">
							<view class="item1">
								<text></text>
								<view class="name">累计渣土量</view>
							</view>
							<view class="item2">
								<view class="qty">{{detail_DeviceData.DeviceWeight}}</view>
								<view class="name">吨</view>
							</view>
						</view>
					</view>

				</view>

				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">气体数据</text>
					</view>
					<view class="action" @click="$gotoPage('deviceAirEchar')">
						<text class="text-gray">详情</text>
						<text class="cuIcon-right text-gray text-xs"></text>
					</view>
				</view>

				<view class="content">

					<view class="contentflex">

						<device-item name="氨气浓度" :currentData="detail_DeviceData.DeviceAirQty1" :warning1Data="DeviceSettingWarn[2].ParamQty2"
						 :warning2Data="DeviceSettingWarn[2].ParamQty3"></device-item>

						<device-item name="可燃气体" :currentData="detail_DeviceData.DeviceAirQty2" :warning1Data="DeviceSettingWarn[3].ParamQty2"
						 :warning2Data="DeviceSettingWarn[3].ParamQty3"></device-item>

						<device-item name="二氧化硫" :currentData="detail_DeviceData.DeviceAirQty3" :warning1Data="DeviceSettingWarn[4].ParamQty2"
						 :warning2Data="DeviceSettingWarn[4].ParamQty3"></device-item>

					</view>

				</view>

				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">盾构间距</text>
					</view>
					<view class="action" @click="$gotoPage('deviceTmbEchar')">
						<text class="text-gray">详情</text>
						<text class="cuIcon-right text-gray text-xs"></text>
					</view>
				</view>

				<view class="content">

					<view class="contentList">

						<view class="item">
							<view class="item1">
								<view class="name">上间隔</view>
							</view>

							<view class="item2">
								<template v-if="detail_DeviceData.DeviceSpacingUp <= DeviceSettingWarn[1].ParamQty2">
									<view class="qty red">{{detail_DeviceData.DeviceSpacingUp}}</view>
								</template>
								<template v-else-if="detail_DeviceData.DeviceSpacingUp <= DeviceSettingWarn[1].ParamQty3">
									<view class="qty orange">{{detail_DeviceData.DeviceSpacingUp}}</view>
								</template>
								<template v-else>
									<view class="qty one">{{detail_DeviceData.DeviceSpacingUp}}</view>
								</template>
								<view class="name"></view>
							</view>
						</view>

						<view class="item">
							<view class="item1">
								<view class="name">下间隔</view>
							</view>

							<view class="item2">
								<template v-if="detail_DeviceData.DeviceSpacingDown <= DeviceSettingWarn[1].ParamQty2">
									<view class="qty red">{{detail_DeviceData.DeviceSpacingDown}}</view>
								</template>
								<template v-else-if="detail_DeviceData.DeviceSpacingDown <= DeviceSettingWarn[1].ParamQty3">
									<view class="qty orange">{{detail_DeviceData.DeviceSpacingDown}}</view>
								</template>
								<template v-else>
									<view class="qty one">{{detail_DeviceData.DeviceSpacingDown}}</view>
								</template>
								<view class="name"></view>
							</view>
						</view>

						<view class="item">
							<view class="item1">
								<view class="name">左间隔</view>
							</view>

							<view class="item2">
								<template v-if="detail_DeviceData.DeviceSpacingLeft <= DeviceSettingWarn[1].ParamQty2">
									<view class="qty red">{{detail_DeviceData.DeviceSpacingLeft}}</view>
								</template>
								<template v-else-if="detail_DeviceData.DeviceSpacingLeft <= DeviceSettingWarn[1].ParamQty3">
									<view class="qty orange">{{detail_DeviceData.DeviceSpacingLeft}}</view>
								</template>
								<template v-else>
									<view class="qty one">{{detail_DeviceData.DeviceSpacingLeft}}</view>
								</template>
								<view class="name"></view>
							</view>
						</view>

						<view class="item">
							<view class="item1">
								<view class="name">右间隔</view>
							</view>

							<view class="item2">
								<template v-if="detail_DeviceData.DeviceSpacingRight <= DeviceSettingWarn[1].ParamQty2">
									<view class="qty red">{{detail_DeviceData.DeviceSpacingRight}}</view>
								</template>
								<template v-else-if="detail_DeviceData.DeviceSpacingRight <= DeviceSettingWarn[1].ParamQty3">
									<view class="qty orange">{{detail_DeviceData.DeviceSpacingRight}}</view>
								</template>
								<template v-else>
									<view class="qty one">{{detail_DeviceData.DeviceSpacingRight}}</view>
								</template>
								<view class="name"></view>
							</view>
						</view>
					</view>

				</view>

			</view>

			<view class="animation-fade" v-if="tabActiveIdx == 1">

				<view class="cu-bar bg-white" style="margin-top:45px;">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">重量统计图表</text>
					</view>
				</view>

				<view class="qiun-charts">
					<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
				</view>

				<view class="cu-bar bg-white margin-top">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">重量统计表格</text>
					</view>
				</view>

				<view class="powerData">

					<view id="panel" class="flex-column">
						<view class="flex-cell flex-row flex-td">
							<text class="flex-cell flex-row">环数</text>
							<text class="flex-cell flex-row">土质</text>
							<text class="flex-cell flex-row flex-left">理论值</text>
							<text class="flex-cell flex-row flex-left">实际值</text>
							<text class="flex-cell flex-row flex-ll">开始日期</text>
							<text class="flex-cell flex-row flex-ll">结束日期</text>
						</view>

						<scroll-view scroll-y class="tablist" scroll-with-animation>
							<view class="flex-cell flex-row flex-tr" v-for="(item, index) in deviceDataWeightList" :key="index">
								<view class="flex-cell flex-row">{{ item.DeviceWeightRing }}</view>
								<view class="flex-cell flex-row">{{item.DeviceWeightSoil}}</view>
								<view class="flex-cell flex-row flex-left">{{item.DeviceWeightPlan}}</view>
								<view class="flex-cell flex-row flex-left">{{item.DeviceWeight}}</view>
								<view class="flex-cell flex-row flex-ll">{{item.DeviceWeightStart}}</view>
								<view class="flex-cell flex-row flex-ll">{{item.DeviceWeightEnd}}</view>
							</view>
						</scroll-view>
					</view>

				</view>
			</view>

			<view class="animation-fade" v-if="tabActiveIdx == 2">
				<view class="cu-bar bg-white solid-bottom" style="margin-top:45px;">
					<view class="action">
						<text class="cuIcon-titles text-green"></text> 设备基本信息
					</view>
				</view>
				<form>
					<view class="cu-form-group ">
						<view class="title">项目名称</view>
						{{DeviceDetail.detail_Project.ProjectName}}
						<!-- <input placeholder="请输入项目名称" type="text" readonly v-model="DeviceDetail.detail_Project.ProjectName"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">所在地点</view>
						{{DeviceDetail.detail_Project.ProjectArea1+
						DeviceDetail.detail_Project.ProjectArea2+
						DeviceDetail.detail_Project.ProjectArea3+
						DeviceDetail.detail_Project.ProjectAddress}}
						<!-- <input placeholder="请输入所在地点" name="input" v-model="DeviceDetail.detail_Project.ProjectArea1+
						DeviceDetail.detail_Project.ProjectArea2+
						DeviceDetail.detail_Project.ProjectArea3+
						DeviceDetail.detail_Project.ProjectAddress"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">项目负责人</view>
						{{DeviceDetail.detail_Project.ProjectManagerName}}
						<!-- <input placeholder="请输入项目负责人" name="input" v-model="DeviceDetail.detail_Project.ProjectManagerName"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">负责人电话</view>
						{{DeviceDetail.detail_Project.ProjectManagerTel}}
						<!-- <input placeholder="请输入负责人电话" name="input" v-model="DeviceDetail.detail_Project.ProjectManagerTel"></input> -->
					</view>

					<view class="cu-form-group">
						<view class="title">开始时间</view>
						{{DeviceDetail.detail_Project.ProjectWorkDateStart | s_toDateTime2}}
						<!-- <input placeholder="暂无" type="input" disabled="true" v-model="DeviceDetail.detail_Project.ProjectWorkDateStart"></input>
						<mx-date-picker :show="StateShowPicker" :type="StateType" :value="StateValue" :show-tips="true" :begin-text="'入住'"
						 :end-text="'离店'" :show-seconds="true" @confirm="stateSelected" @cancel="stateSelected" /> -->
					</view>
					<view class="cu-form-group">
						<view class="title">结束时间</view>
						{{DeviceDetail.detail_Project.ProjectWorkDateEnd | s_toDateTime2}}
						<!-- <input placeholder="暂无" name="input" @click="endShowDatePicker('EndDatetime')" v-model="DeviceDetail.detail_Project.ProjectWorkDateEnd"></input>
						<mx-date-picker :show="EndShowPicker" :type="EndType" :value="EndValue" :show-tips="true" :begin-text="'入住'"
						 :end-text="'离店'" :show-seconds="true" @confirm="endSelected" @cancel="endSelected" /> -->
					</view>

					<view class="cu-form-group">
						<view class="title">项目状态</view>
						{{DeviceDetail.detail_Project.ProjectStatusName}}
						<!-- <picker @change="bindStateChange" :value="num" :range="stateRadio">
							<label class="picker">
								{{stateRadio[num]}}
							</label>
						</picker> -->
					</view>
				</form>

				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-titles text-green"></text> 设备环数设置
					</view>
				</view>
				<form>
					<view class="cu-form-group">
						<view class="title">当前土质</view>
						<!-- <view class="uni-form-item uni-column">
							
						</view> -->
						{{DeviceDetail.detail_Project.ProjectStepWorkSoil}}
						<!-- <picker @change="bindPickerChange" :value="ProjectStepWorkSoilIndex" :range="array">
							<label class="picker" v-model="DeviceDetail.detail_Project.ProjectStepWorkSoil">{{array[ProjectStepWorkSoilIndex]}}</label>
						</picker> -->
						<!-- <input placeholder="请输入当前土质" name="input" v-model="DeviceDetail.detail_Project.ProjectStepWorkSoil"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">总环数</view>
						{{DeviceDetail.detail_Project.ProjectTotalWorkRing}}
						<!-- <input placeholder="请输入总环数" name="input" v-model="DeviceDetail.detail_Project.ProjectTotalWorkRing"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">当前环数</view>
						{{DeviceDetail.detail_Project.ProjectStepWorkRing}}
						<!-- <input placeholder="请输入当前环数" name="input" v-model="DeviceDetail.detail_Project.ProjectStepWorkRing"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">渣土计划重量</view>
						{{DeviceDetail.detail_Project.ProjectStepWorkWeight}}
						<!-- <input placeholder="请输入渣土计划重量" name="input" v-model="DeviceDetail.detail_Project.ProjectStepWorkWeight"></input> -->
					</view>
					<view class="cu-form-group">
						<view class="title">渣土实际重量</view>
						{{DeviceDetail.detail_Project.ProjectStepWorkWeightPlan}}
						<!-- <input placeholder="请输入渣土实际重量" name="input" v-model="DeviceDetail.detail_Project.ProjectStepWorkWeightPlan"></input> -->
					</view>
				</form>
				<!-- <view class="padding flex flex-direction">
					<button class="cu-btn bg-grey lg" @click="projectSave()">保存</button>
				</view> -->
			</view>

			<view class="animation-fade" v-if="tabActiveIdx == 3">

				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
				 :height="'calc(100vh - 240upx)'" :up="upOption" class="mh cu-card case">

					<block v-for="(item,index) in dataList" :key="item.ID">
						<view class="cu-bar bg-white" :style="index==0 ? 'margin-top:45px;' :''">
							<view class="action">
								<text class="cuIcon-titles text-green "></text>
								<text class="actionTitle">{{ item.WarnType }}</text>
							</view>
							<view class="action green" v-if="item.WarnLevel==1">一级预警</view>
							<view class="action orange" v-if="item.WarnLevel==2">二级预警</view>
							<view class="action red" v-if="item.WarnLevel==3">三级预警</view>

						</view>
						<view class="wranInfo margin-bottom">
							<view class="wrancommon">{{ item.WarnIntro }}</view>
							<view class="wranFlex">
								<view class="wranTime">
									开始时间:{{ item.WarnDateStart | s_toDateTime2 }}
								</view> 
								<view class="wranTime">
									结束时间:{{ item.WarnDateEnd | s_toDateTime2 }}
								</view>
							</view>
						</view>
					</block>

				</mescroll-body>

			</view>

			<view class="animation-fade" v-if="tabActiveIdx == 4">

				<view class="powerData" style="margin-top:45px;">

					<view id="panel" class="flex-column">
						<view class="flex-cell flex-row flex-td">
							<text class="flex-cell flex-row flex-l">报警项目</text>
							<text class="flex-cell flex-row one">一级报警值</text>
							<text class="flex-cell flex-row flex-left orange">二级报警值</text>
							<text class="flex-cell flex-row flex-left red">三级报警值</text>
						</view>
						<view class="flex-cell flex-row flex-tr" v-for="(warnItem, index) in DeviceSettingWarn" :key="index">
							<view class="flex-cell flex-row flex-l">{{ warnItem.ParamName }}</view>
							<view class="flex-cell flex-row ">
								<input placeholder="报警值" name="input" v-model="warnItem.ParamQty1"></input>
							</view>
							<view class="flex-cell flex-row flex-left">
								<input placeholder="报警值" name="input" v-model="warnItem.ParamQty2"></input>
							</view>
							<view class="flex-cell flex-row flex-left">
								<input placeholder="报警值" name="input" v-model="warnItem.ParamQty3"></input>
							</view>
						</view>
						<view class="padding flex flex-direction">
							<button class="cu-btn bg-grey lg" @click="save()">保存</button>
						</view>
					</view>
				</view>

			</view>

			<view class="animation-fade" v-if="tabActiveIdx == 5">

				<view class="cu-bar bg-white" style="margin-top:45px;">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">人仓</text>
					</view>
					<view class="action" @click="$gotoPage('../video/videoBig')">
						<text class="text-gray">全屏</text>
						<text class="cuIcon-right text-gray text-xs"></text>
					</view>
				</view>

				<view class="main">
					<view class="video">
						<view>
							<video id="myVideo" :src="video" enable-danmu danmu-btn controls></video>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-titles text-green "></text>
						<text class="actionTitle">土仓</text>
					</view>
					<view class="action" @click="$gotoPage('../video/videoBig')">
						<text class="text-gray">全屏</text>
						<text class="cuIcon-right text-gray text-xs"></text>
					</view>
				</view>
				<view class="main">
					<view class="video">
						<view>
							<video id="myVideo" :src="video" enable-danmu danmu-btn controls></video>
						</view>
					</view>
				</view>

			</view>

		</scroll-view>
		
		<view class="cu-load load-modal" v-if="loadModal" style="z-index: 99999 !important;">
			<view class="gray-text">加载中...</view>
		</view>
		
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import uCharts from '@/components/u-charts/u-charts.js';
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import DeviceItem from '@/components/device-item/device-item';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	var _self;
	var canvaLineA = null;
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				//开始日期
				StateShowPicker: false,
				StateDatetime: new Date().toLocaleString("chinese", {
					hour12: false
				}),
				StateType: 'rangetime',
				StateValue: '',

				//结束日期
				EndShowPicker: false,
				EndDatetime: new Date().toLocaleString("chinese", {
					hour12: false
				}),
				EndType: 'rangetime',
				EndValue: '',

				num: 0,
				stateRadio: ['未开工', '进行中', '已完工'],
				array: ['普通土', '坚土', '坚石'],
				ProjectStepWorkSoilIndex: 0,
				ProjectStepWorkSoilIndex2: 0,
				ProjectStepWorkSoilBool: true,
				ProjectStepWorkSoilInfo: '',
				loadModal: false,
				deviceId: "",
				deviceName: "",
				deviceImei: '',

				video: 'https://www.apple.com/105/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/films/feature/iphone-x-feature-tpl-cc-us-20170912_1920x1080h.mp4',

				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				deviceDataWeightList: [],
				// tab 切换栏
				tabs: [{
						name: '盾构实况'
					}, {
						name: '重量统计'
					},
					{
						name: '项目信息'
					},
					{
						name: '报警记录'
					},
					{
						name: '预警设置'
					},
					{
						name: '视频监控'
					}
				],
				tabActiveIdx: 0,
				scrollLeft: 0,
				DeviceDetail: {
					detail_Project: {}
				},
				detail_DeviceData: {},
				DeviceSettingWarn: [{
					ParamName: "重量偏差",
					ParamQty1: 0,
					ParamQty2: 0,
					ParamQty3: 0
				}, {
					ParamName: "盾尾报警",
					ParamQty1: 0,
					ParamQty2: 0,
					ParamQty3: 0
				}, {
					ParamName: "氨气报警",
					ParamQty1: 0,
					ParamQty2: 0,
					ParamQty3: 0
				}, {
					ParamName: "可燃气体",
					ParamQty1: 0,
					ParamQty2: 0,
					ParamQty3: 0
				}, {
					ParamName: "二氧化硫",
					ParamQty1: 0,
					ParamQty2: 0,
					ParamQty3: 0
				}],
				mescroll: null,
				downOption: {},
				upOption: {
					page: {
						size: 10
					},
					noMoreSize: 10,
					empty: {
						tip: '暂无相关数据'
					}
				},
				dataList: [],
				userInfo: ''
			};
		},
		components: {
			DeviceItem,
			MxDatePicker
		},

		onLoad(e) {
			_self = this;
			this.deviceId = e.deviceId
			this.deviceName = e.deviceName
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);

			this.GetDevice()
			var timer = setInterval(() => {
				this.GetDevice()
			}, 5 * 1000)
		},

		onHide() {
			var timer = ''
			console.log(timer)
		},

		mounted: function() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.GetDeviceDetail2()
		},

		methods: {
			...mapMutations(['getWeightjc', 'getWeight', 'getAir', 'getTmb']),
			//开始时间日期
			stateShowDatePicker(type) { //显示
				this.StateType = type;
				this.StateShowPicker = true;
				this.StateValue = this[type];
			},
			stateSelected(e) { //选择
				this.StateShowPicker = false;
				if (e) {
					this[this.StateType] = e.value;
					//选择的值
					console.log('StateValue => ' + e.value);
					this.DeviceDetail.detail_Project.ProjectWorkDateStart = e.value
					//原始的Date对象
					console.log('StateDate => ' + e.date);
				}
			},
			//结束时间日期
			endShowDatePicker(type) { //显示
				this.EndType = type;
				this.EndShowPicker = true;
				this.EndValue = this[type];
			},
			endSelected(e) { //选择
				this.EndShowPicker = false;
				if (e) {
					this[this.EndType] = e.value;
					//选择的值
					console.log('EndValue => ' + e.value);
					this.DeviceDetail.detail_Project.ProjectWorkDateEnd = e.value
					//原始的Date对象
					console.log('EndDate => ' + e.date);
				}
			},
			//项目信息保存
			projectSave() {
				// this.DeviceDetail.detail_Project.ProjectStepWorkSoil = this. ProjectStepWorkSoilInfo 
				if (!this.DeviceDetail.detail_Project.ProjectName) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '项目名称不能为空'
					})
					return
				}
				if (!this.DeviceDetail.detail_Project.ProjectManagerName) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '项目负责人不能为空'
					})
					return
				}
				var textStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
				if (!textStr.test(this.DeviceDetail.detail_Project.ProjectManagerTel)) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '手机号码不规范'
					})
					return
				}
				if (!this.DeviceDetail.detail_Project.ProjectStepWorkRing) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '当前环数不能为空'
					})
					return
				}
				if (!this.DeviceDetail.detail_Project.ProjectTotalWorkRing) {
					uni.showToast({
						duration: 1000,
						icon: 'none',
						title: '总环数不能为空'
					})
					return
				}
				let param = this.DeviceDetail.detail_Project
				// alert(this.DeviceDetail.detail_Project.ProjectStepWorkSoil)
				this.$postJSON('Project/ProjectUpdate', param, {
					loginId: this.userInfo.ID
				}).then(res => {
					if (res.data.status) {
						uni.showToast({
							duration: 1000,
							title: '保存成功'
						})
						this.GetDeviceDetail2()
						// this.GetDeviceDetail()
					}
				})
			},
			bindStateChange(e) {
				var that = this
				this.num = e.target.value
				this.DeviceDetail.detail_Project.ProjectStatus = e.target.value
				this.DeviceDetail.detail_Project.ProjectStatusName = this.stateRadio[this.num]
				// console.log("打印数据",this.DeviceDetail.detail_Project.ProjectStatus)//数组从0开始
				// console.log("打印数据",this.DeviceDetail.detail_Project.ProjectStatusName)//数组从0开始
			},
			//下拉框
			bindPickerChange: function(e) { //改变的事件名
				// console.log('picker发送选择改变，携带值为', e.target.value)   //用于输出改变索引值
				this.ProjectStepWorkSoilIndex = e.target.value //将数组改变索引赋给定义的index变量
				this.jg = this.array[this.ProjectStepWorkSoilIndex] //将array【改变索引】的值赋给定义的jg变量
				// console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
				// this.ProjectStepWorkSoilInfo = this.jg
				this.DeviceDetail.detail_Project.ProjectStepWorkSoil = this.jg
				console.log("籍贯为：", this.DeviceDetail.detail_Project.ProjectStepWorkSoil) //输出获取的籍贯值，例如：中国

			},
			//报警设置保存
			save() {
				for (var i = 0; i < this.DeviceSettingWarn.length; i++) {
					this.DeviceSettingWarn[i].ParamQty1 = parseInt(this.DeviceSettingWarn[i].ParamQty1)
					this.DeviceSettingWarn[i].ParamQty2 = parseInt(this.DeviceSettingWarn[i].ParamQty2)
					this.DeviceSettingWarn[i].ParamQty3 = parseInt(this.DeviceSettingWarn[i].ParamQty3)
				}
				let param = this.DeviceSettingWarn;
				console.log('param报警设置-----', JSON.stringify(param))
				this.$postJSON('/Data/PostDeviceSettingWarn?deviceImei=' + this.deviceImei, param).then(res => {
					console.log(res)
					if (res.data.status) {
						uni.showToast({
							title: res.data.info,
							duration: 2000
						});
					}
				})
			},

			tabSelect(e) {
				this.tabActiveIdx = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				if (this.ProjectStepWorkSoilBool) {
					this.ProjectStepWorkSoilIndex = this.ProjectStepWorkSoilIndex2
				}
				if (e.currentTarget.dataset.id == 2) {
					this.GetDeviceDetail2()
				}
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
				}, 1000)
			},

			GetDevice() {
				this.GetDeviceDetail();
				this.GetDeviceDataList();
				this.GetDeviceSettingWarn();
				this.GetDeviceDataWeightList()
			},

			//接口 -- 获取设备数据记录
			GetDeviceDataList() {
				this.$postJSON('Device/GetDeviceDataList', {
						"deviceId": this.deviceId,
						// "deviceId": '',
						// "deviceName": this.deviceName,
						"deviceName": '',
						"deviceProjectName": "",
						"deviceDateStart": "",
						"deviceDateEnd": "",
						// "loginId": this.userInfo.ID
						// loginId:this.userInfo.ID
					})
					.then(r => {
						let data = r.data.info
						// 获取当前日期
						var date = new Date();
						// 获取当前月份
						var nowMonth = date.getMonth() + 1;
						// 获取当前是几号
						var strDate = date.getDate();
						// 添加分隔符“-”
						var seperator = "-";
						// 对月份进行处理，1-9月在前面添加一个“0”
						if (nowMonth >= 1 && nowMonth <= 9) {
							nowMonth = "0" + nowMonth;
						}
						// 对月份进行处理，1-9号在前面添加一个“0”
						if (strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
						}
						// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
						var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
						//重量监测
						let weightData = []
						data.forEach(arr => {
							weightData.push({
								DeviceWeightRing: arr.DeviceWeightRing,
								DeviceWeightSoil: arr.DeviceWeightSoil,
								DeviceWeightPlan: arr.DeviceWeightPlan,
								DeviceWeight: arr.DeviceWeight,
								DeviceDate: arr.DeviceDate,
							})
						})
						this.getWeightjc(weightData)

						//气体数据
						let AirData = []
						data.forEach(arr => {
							AirData.push({
								DeviceAirQty1: arr.DeviceAirQty1,
								DeviceAirQty2: arr.DeviceAirQty2,
								DeviceAirQty3: arr.DeviceAirQty3,
								DeviceDate: arr.DeviceDate,
							})
						})
						this.getAir(AirData)

						//盾构间距
						let TmbData = []
						data.forEach(arr => {
							TmbData.push({
								DeviceSpacingLeft: arr.DeviceSpacingLeft,
								DeviceSpacingRight: arr.DeviceSpacingRight,
								DeviceSpacingUp: arr.DeviceSpacingUp,
								DeviceSpacingDown: arr.DeviceSpacingDown,
								DeviceDate: arr.DeviceDate,
							})
						})
						this.getTmb(TmbData)

					})
					.catch(() => {});
			},

			//接口 -- 获取设备详情  
			GetDeviceDetail() {
				this.$post('Device/GetDeviceDetail?deviceId=' + this.deviceId, {
						// loginId:this.userInfo.ID
					})
					.then(r => {
						// console.log('实时数据刷新', JSON.stringify(r.data.info.detail_DeviceData))
						// this.DeviceDetail = r.data.info;
						this.detail_DeviceData = r.data.info.detail_DeviceData
						this.deviceImei = r.data.info.DeviceImei
					})
					.catch(() => {});
			},

			GetDeviceDetail2() {
				this.$post('Device/GetDeviceDetail?deviceId=' + this.deviceId, {
						// loginId:this.userInfo.ID
					})
					.then(r => {
						this.DeviceDetail = r.data.info;
						if (this.DeviceDetail.detail_Project.ProjectStepWorkSoil == '普通土') {
							this.ProjectStepWorkSoilIndex = 0
						} else if (this.DeviceDetail.detail_Project.ProjectStepWorkSoil == '坚土') {
							this.ProjectStepWorkSoilIndex = 1
						} else if (this.DeviceDetail.detail_Project.ProjectStepWorkSoil == '坚石') {
							this.ProjectStepWorkSoilIndex = 2
						}

						this.num = parseInt(this.DeviceDetail.detail_Project.ProjectStatus)

						let StateTime1 = new Date(this.DeviceDetail.detail_Project.ProjectWorkDateStart).getTime()
						let StateTime2 = new Date('1901-01-01 00:00:00').getTime()
						let EndTime1 = new Date(this.DeviceDetail.detail_Project.ProjectWorkDateStart).getTime()
						let EndTime2 = new Date('1901-01-01 00:00:00').getTime()
						console.log('比较1-----', StateTime1)
						console.log('比较2-----', StateTime2)
						if (StateTime1 < StateTime2) {
							this.DeviceDetail.detail_Project.ProjectWorkDateStart = new Date().toLocaleString("chinese", {
								hour12: false
							})
						}

						if (EndTime1 < EndTime2) {
							this.DeviceDetail.detail_Project.ProjectWorkDateEnd = new Date().toLocaleString("chinese", {
								hour12: false
							})
						}
						this.EndDatetime = this.DeviceDetail.detail_Project.ProjectWorkDateEnd
						// this.ProjectStepWorkSoilIndex2 = this.ProjectStepWorkSoilIndex
					})
			},

			//接口 -- 获取设备设置
			GetDeviceSettingWarn() {
				this.$postJSON('Device/GetDeviceSettingWarn?deviceId=' + this.deviceId, {
						"deviceId": this.deviceId,
						"deviceName": this.deviceName,
						"deviceProjectName": "",
						"deviceDateStart": "",
						"deviceDateEnd": "",
						"loginId": this.userInfo.ID
						// loginId:this.userInfo.ID
					})
					.then(r => {

						if (r.data.info == "") {
							return
						}
						this.DeviceSettingWarn = r.data.info;
					})
					.catch(() => {});
			},

			//接口 -- 获取设备环数重量记录
			GetDeviceDataWeightList() {
				this.$post('Device/GetDeviceDataWeightList?deviceId=' + this.deviceId, {
						// loginId:this.userInfo.ID
					})
					.then(r => {

						let data = r.data.info

						let dataWeight = []
						data.forEach(arr => {
							if (arr.DeviceWeightRing == 0) return
							dataWeight.push(arr)
						})
						this.deviceDataWeightList = dataWeight
						this.getServerData()

						//重量统计
						this.getWeight(r.data.info)
					})
					.catch(() => {});
			},

			getServerData() {
				// 柱状图
				let Column = {
					"categories": [],
					"series": [{
						"name": "累计重量",
						"data": []
					}]
				};
				this.showColumn('canvasColumn', Column);
				let categories = []
				let series = []
				this.deviceDataWeightList.forEach(arr => {
					categories.push(arr.DeviceWeightRing)
					series.push(arr.DeviceWeight)
				})

				//x轴数据
				Column.categories = categories;
				//y轴数据
				Column.series[0].data = series;

				// let Column = {
				// 	"categories": [1, 2],
				// 	"series": [{
				// 		"name": "环数",
				// 		"data": [1.11, 0],
				// 		"color": "#1890ff",
				// 		"index": 0,
				// 		"type": "column",
				// 		"show": true,
				// 		"pointShape": "circle",
				// 		"legendShape": "rect"
				// 	}]
				// }

				// console.log("重量统计图表数据==" + JSON.stringify(Column))
				this.showColumn('canvasColumn', Column);
			},

			showColumn(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					fontSize: 11,
					legend: false,
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					xAxis: {
						// disabled: false, //不显示x轴
						disableGrid: false,
						type: 'grid',
						gridColor: '#f2f2f2',
						gridType: 'solid',
						dashLength: 2
					},
					yAxis: {
						// disabled: false, //不显示y轴
						disableGrid: false,
						gridType: 'solid',
						gridColor: '#f2f2f2',
						dashLength: 2,
						splitNumber: 5,
						min: 10,
						max: 1000,
						format: val => {
							return val.toFixed(0);
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'curve'
						}
					}
				});
			},

			//报警记录分页
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {
				let PageIndex = page.num;
				let PageSize = page.size;
				this.$postJSON('Device/GetDeviceWarnList?PageIndex=' + PageIndex + '&PageSize=' + PageSize, {
						// deviceId: 192,
						keyword: "",
						// loginId:this.userInfo.ID
					})
					.then(r => {
						let curPageData = r.data.info;
						let totalPage = r.data.pages;
						let totalSize = r.data.total;
						let curPageLen = curPageData.length;
						if (page.num == 1) this.dataList = [];

						this.dataList = this.dataList.concat(curPageData);

						// var date = new Date();
						// var y = date.getFullYear();
						// var m = date.getMonth() + 1;
						// m = m < 10 ? ('0' + m) : m;
						// var d = date.getDate();
						// d = d < 10 ? ('0' + d) : d;
						// var h = date.getHours();
						// h = h < 10 ? ('0' + h) : h;
						// var minute = date.getMinutes();
						// var second = date.getSeconds();
						// minute = minute < 10 ? ('0' + minute) : minute;
						// second = second < 10 ? ('0' + second) : second;
						// var timeZuHe = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;

						// let Time = new Date('1901-01-01 00:00:00').getTime()
						// for (var i = 0; i < r.data.info.length; i++) {
						// 	if (new Date(r.data.info[i].WarnDateStart).getTime() < Time) {
						// 		this.dataList.WarnDateStart = timeZuHe
						// 	}
						// 	if (new Date(r.data.info[i].WarnDateEnd).getTime() < Time) {
						// 		this.dataList[i].WarnDateEnd = timeZuHe
						// 	}
						// }

						this.mescroll.endBySize(curPageLen, totalSize);
						this.$nextTick(() => {
							this.mescroll.endSuccess(curPageLen);
						});
					})
					.catch(() => {
						this.mescroll.endErr();
					});
			}
		}
	};
</script>

<style lang="less" scoped="true">
	/*  #ifdef  APP-VUE */
	.topFixed {
		position: fixed;
		
		top: 75px;
		z-index: 9999;
		left: 0;
	}
	
	
	/*  #endif  */

	.test {
		text-align: center;
		padding: 10px 0;
	}

	button {
		margin: 20upx;
		font-size: 28upx;
	}

	.settingSave {
		padding: 7px 10px;
		margin: 20px auto;
		text-align: center;
		color: #fff;
		width: 20%;
		background-color: #FFA501;
	}

	.wranInfo .wranTime:first-child {
		margin-right: 0px;
	}

	.wranInfo {
		background-color: #ffffff;
		padding: 0 30upx 15upx 60upx;

		// .wranFlex {
		// 	display: flex;
		// }

		.wrancommon {
			padding-bottom: 15px;
			text-align: left;
			font-size: 22px;
		}

		.wranTime {
			text-align: right;
		}
	}

	.bg-white:first {
		margin-top: 45px !important;
	}

	.content {
		padding: 15upx;

		.contentList {
			display: grid;
			grid-template-columns: repeat(2, 50%);

			.item {
				flex: 1;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;
				height: 180upx;
				border-radius: 10upx;
				background-color: #ffffff;
				margin: 8upx;

				.item1 {
					font-size: 28upx;
					color: #999;
					text-align: center;

					.iconData {
						font-size: 60upx;
					}
				}

				.item2 {
					text-align: center;
					display: flex;

					.qty {
						font-size: 60upx;
						padding-right: 10rpx;
					}
				}
			}
		}

		.contentflex {
			display: flex;
			justify-content: space-between;
		}

		.name {
			color: #999;
		}
	}

	.main {
		display: flex;
		justify-content: center;
		align-items: center;

		.video {
			color: #999;
		}
	}

	.tablist {
		overflow-y: scroll;
		height: 82vh;
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

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

		.flex-ll {
			flex: 1.5 !important;
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
		}

		.flex-td text {
			font-size: 28upx;
			border-right: 1upx solid #DFDFDF;
			border-bottom: 1upx solid #DFDFDF;
		}
	}
</style>
