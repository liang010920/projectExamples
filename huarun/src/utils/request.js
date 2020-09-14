import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import {
  removeAuth
} from '@/utils/auth'
import qs from 'qs'

var showLoginMessageBox = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let flag = config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('application/json') !== -1
    if (!flag) {
      let mult = config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('multipart/form-data') !== -1
      if (mult) {
        config.data = config.data
      } else {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // console.log("response----"+JSON.stringify(response.status))
    // console.log("response----"+JSON.stringify(res))

    if (response.status === 200 && response.config.responseType === 'blob') { // 文件类型特殊处理
      return response
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '网络请求失败，请稍候再试',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
