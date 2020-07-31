import Vue from 'vue'

Vue.filter('s_toStr', function (val) {
  if (!val) {
    return '暂无';
  }
  return String(val);
});

Vue.filter('isNull', function (val) {
  if (!val) {
    return '暂无';
  }
  return String(val);
});

Vue.filter('s_isFun', function (val) {
  if (!val) {
    var isFun = function () {
      console.log('这个方法没定义!');
    }
    return isFun;
  }
  return val;
});

Vue.filter('s_toNum', function (val) {
  if (typeof (val) == 'number') {
    return val;
  } else {
    return Number(val);
  }
});

Vue.filter('s_toQty', function (val) {
  if (!val) {
    return '';
  }
  return val.toFixed(2);
});

Vue.filter('s_arrLength', function (val) {
  if (!val) {
    return 0;
  }
  if (JSON.stringify(val) == '[]') {
    return 0;
  }
  if (JSON.stringify(val) == '{}') {
    return 0;
  }
  return val.length;
});

// yyyy/MM/dd HH:mm:ss
Vue.filter('s_dateStr', function (val) {
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

// yyyy-MM-dd HH:mm:ss
Vue.filter('s_toDate', function (val) {
  if (!val) {
    return '暂无';
  }
  var vals = val;
  val = val.split('T').join(' ')

  if (Date.parse(vals) <= Date.parse("2001/1/1")) {
    return "暂无";
  }
  return val;
});

// yyyy-MM-dd HH:mm
Vue.filter('ymdhm', function (val) {
  if (!val) {
    return '暂无';
  }
  val = val.split('T').join(' ')
  return val.substr(0, val.length - 3);
});

// yyyy-MM-dd
Vue.filter('ymd', function (val) {
  if (!val) {
    return '暂无';
  }
  var val = val.split(' ')[0]
  return val;
});

Vue.filter('s_money', function (val) {
  if (typeof val === "undefined") {
    return
  } else {
    return val.toFixed(2) + "$";
  }
})

Vue.filter('format_date', function (val) {
  // console.log(val)
  var year = val.getFullYear();
  var month = val.getMonth() + 1;
  var day = val.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
})

Vue.filter('s_jq', function (val) {
  if (typeof val === "undefined") {
    return
  } else {
    return val.split(".")[1];
  }
})