function reLaunch(url) {
	uni.reLaunch({
		url: url,
	})
}

function showModal(info,callback) {
	uni.showModal({
		title: '提示', 
		content: info,
		success: function(res) {
			if (res.confirm) {
				callback()
			} else {
				console.log('用户点击取消');
			}
		}
	});
}

function navigateTo(url) {
	uni.navigateTo({
		url: url,
	})
}

function navigateBack(delta = 1) {
	uni.navigateBack({
		delta: delta, //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
	})
}

function redirectTo(url) {
	uni.redirectTo({
		url: url
	})
}

function showToast(info) {
	uni.showToast({
		title: info,
		icon: "none",
		duration: 1000, //提示的延迟时间，单位毫秒，默认：1500 
		mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 
	})
}

function showLoading(info = "加载中...") {
	uni.showLoading({
		title: info ,
		mask: true
	})
}

function hideLoading() {
	uni.hideLoading()
}


//取值
function get(key, sync = true) {
	try {
		if (sync) {
			return uni.getStorageSync(key);
		} else {
			let data = '';
			uni.getStorage({
				key: key,
				success: function(res) {
					data = res.data;
				}
			});
			return data;
		}
	} catch (e) {
		return false;
	}
}

//赋值
function set(key, value, sync = true) {
	try {
		if (sync) {
			return uni.setStorageSync(key, value);
		} else {
			uni.setStorage({
				key: key,
				data: value
			});
		}
	} catch (e) {

	}
}

//移除
function del(key, sync = true) {
	try {
		if (sync) {
			return uni.removeStorageSync(key);
		} else {
			uni.removeStorage({
				key: key
			});
		}
	} catch (e) {
		return false;
	}
}

//清空
function clear(sync = true) {
	try {
		if (sync) {
			return uni.clearStorageSync();
		} else {
			uni.clearStorage();
		}
	} catch (e) {
		return false;
	}
}


function getUrlKey(path, name) {

	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");

	if (reg.test(path))

		return unescape(RegExp.$2.replace(/\+/g, " "));

	return "";

}
 

module.exports = {
	// ----设置和跳转页面
	reLaunch, // 关闭所有页面打开指定页面
	navigateTo, // 保存当前页面并打开新页面
	navigateBack, // 回退到指定的页面栈，指定的索引如果不在页面栈将回到首页。默认参数值为1
	redirectTo, // 关闭当前页，跳到指定页

	// ----提示等信息
	showToast, // 弹出提示
	showLoading, // 打开遮罩，显示加载icon
	showModal, // 询问框
	hideLoading, // 关闭遮罩

	// ----本地缓存
	get, // 获取指定的key的本地缓存
	set, // 设置一个参数将其以键值对的方式存入指定缓存, sync是否同步异步
	del, // 删除指定key的本地缓存
	clear, // 清除所有本地缓存
	getUrlKey,
}
