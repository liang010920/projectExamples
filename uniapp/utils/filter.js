import Vue from 'vue'

Vue.filter('s_toStr', function(val) {
	if (!val) {
		return '暂无';
	}
	return String(val);
});

Vue.filter('isNull', function(val) {
	if (!val) {
		return '暂无';
	}
	return String(val);
});

Vue.filter('s_isFun', function(val) {
	if (!val) {
		var isFun = function() {
			console.log('这个方法没定义!');
		}
		return isFun;
	}
	return val;
});

Vue.filter('s_toNum', function(val) {
	if (typeof(val) == 'number') {
		return val;
	} else {
		return Number(val);
	}
});

Vue.filter('s_toDateTime2', function(val) {
	
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	var timeZuHe = y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;

	if (!val) {
		return '暂无';
	}
	val = val.split('-').join('/')
	try {

		val = val.replace("T", " ");

		if (Date.parse(val) <= Date.parse("2001/1/1 00:00:00")) {
			return timeZuHe;
		}

		return new Date(val).format("yyyy-MM-dd hh:mm");

	} catch (e) {
		return val;
	}

});

Vue.filter('s_dateStr', function(val) {
	if (!val) {
		return '暂无';
	}
	var vals = val;
	val = val.split('T').join(' ')
	val = val.split('-').join('/')

	if (Date.parse(vals) <= Date.parse("2001/1/1")) {
		return "";
	}
	return val;
});

// yyyy-MM-dd
Vue.filter('s_ydm', function(val) {

	if (!val) {
		return ''
	}

	if (Date.parse(val) <= Date.parse('2001-01-01T00:00:00')) {
		return ''
	}
	var val = val.split('T')[0]
	return val
})

// yyyy-MM-dd HH:mm:ss  
Vue.filter('s_toDateTime', function(val) {
	if (!val) {
		return
	}
	var vals = val;
	val = val.split('T').join(' ')
	val = val.split('-').join('/')
	return val;

});

// yyyy-MM-dd
Vue.filter('s_toDate', function(val) {

	if (!val) {
		return '暂无';
	}

	val = val.split('T').join(' ')
	val = val.split('-').join('/')

	return val.split('/').join('-').split(' ')[0];

});

Vue.filter('s_money', function(val) {
	if (typeof val === "undefined") {
		return
	} else {
		return val.toFixed(2) + "$";
	}
})
