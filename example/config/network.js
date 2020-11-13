import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
axios.defaults.timeout = 50000

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const headParams = JSON.parse(Cookies.get('userInfo') || null)
  let ContentTypeArr = ['multipart/form-data']
  if (!ContentTypeArr.includes(config.headers['Content-Type'])) {
    if (config.method === 'post') {
      config.data = Object.assign({}, headParams, config.data)
    } else {
      config.params = Object.assign({}, headParams, config.params)
    }
  }
  return config
}, err => {
  Message.error('请求超时~')
  return Promise.resolve(err)
})

// response 拦截器
axios.interceptors.response.use(response => {
  if (response.data.code === '-208999') {
    Message.error({
      message: response.data.message, type: 'error'
    })
    return true
  } else {
    return response.data
  }
},
error => {
  console.log('err' + error)
  Message({
    message: error.message, type: 'error', duration: 5 * 1000
  })
  return Promise.reject(error)
})

// post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// get请求
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: url,
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
