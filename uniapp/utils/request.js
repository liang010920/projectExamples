import SystemConfig from './config.js'
const BASE_URL = SystemConfig.SERVER_BASE_URL
const request = {
	BASE_URL,
	post(url, params = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: params,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	},
	postJSON(url, params = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: params,
				header: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	},
	get(url, params = {}) {
		let result = ''
		Object.keys(params).forEach((key) => {
			if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
				result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
			}
		})
		if (result.length > 0) {
			url = url.includes('?') ? (url + "&" + result) : (url + "?" + result)
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: {},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'GET',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	},
	getJSON(url, params = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: params,
				header: {
					'Content-Type': 'application/json'
				},
				method: 'GET',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	},
	put(url, params) {
		let result = ''
		Object.keys(params).forEach((key) => {
			if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
				result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
			}
		})
		if (result.length > 0) {
			url = url.includes('?') ? (url + "&" + result) : (url + "?" + result)
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: params,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'PUT',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	},
	delete(url, params) {
		let result = ''
		Object.keys(params).forEach((key) => {
			if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
				result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
			}
		})
		if (result.length > 0) {
			url = url.includes('?') ? (url + "&" + result) : (url + "?" + result)
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: params,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'DELETE',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	}, 
	deleteJSON(url, params) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				data: params,
				header: {
					'Content-Type': 'application/json'
				},
				method: 'DELETE',
				success: (res) => {
					if (res && res.statusCode == 200) {
						resolve(res)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message || '系统异常',
							mask: true
						});
						reject(res)
					}
				}
			})
		})
	}
}

export default request
