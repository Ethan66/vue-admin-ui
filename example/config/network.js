import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
axios.defaults.timeout = 50000

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const headParams = JSON.parse(localStorage.getItem('userInfo') || null)
  let ContentTypeArr = ['multipart/form-data']
  if (!ContentTypeArr.includes(config.headers['Content-Type'])) {
    if (config.method === 'post') {
      config.data = Object.assign({}, headParams, config.data, handleGetMenuCode())
    } else {
      config.params = Object.assign({}, headParams, config.params, handleGetMenuCode())
    }
  }
  return config
}, err => {
  Message.error('请求超时~')
  return Promise.resolve(err)
})

// response 拦截器
axios.interceptors.response.use(response => {
  if (handleSpecialError(response)) {
    return Promise.reject(new Error('error'))
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

// 接口请求成功未返回正确code码处理
function handleSpecialError (response) {
  if (!response.data || !response.data.code) return false
  const res = response.data
  // 用户没登录
  if (res.code === '-208999' && res.message === 'sessionId参数不能为空') {
    router.push({ path: '/login' })
    return true
  }
  // 用户登录过期或登录失效
  if (res.code === '210000' || res.code === '200000') {
    let $dialog = document.querySelector('.el-message-box__wrapper')
    if ($dialog && $dialog.style.display !== 'none') return true
    MessageBox.confirm(
      '你已被登出，可以取消继续留在该页面，或者重新登录',
      '确定登出',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      router.push({ path: '/login' })
    })
    return true
  }
  if (res.code === '-208999') {
    Message.error({
      message: res.message, type: 'error'
    })
    return true
  }
  let path = router.currentRoute.path || ''
  if (path !== '/login' && res.code === '000005') {
    MessageBox.confirm(
      '该账号已被停用，请联系管理员',
      '已被停用',
      {
        confirmButtonText: '确认',
        type: 'warning'
      }
    ).then(() => {
      router.push({ path: '/login' })
    })
    return true
  }
  if (path !== '/login' && res.code === '000006') {
    MessageBox.confirm(
      '该账号已被禁止登录，请联系管理员',
      '已被禁止登录',
      {
        confirmButtonText: '确认',
        type: 'warning'
      }
    ).then(() => {
      router.push({ path: '/login' })
    })
    return true
  }
  return false
}

let handleGetMenuCode = () => {
  let mainActivedTab = JSON.parse((sessionStorage.getItem('mainActivedTab'))) || {}
  return { pmenuCode: mainActivedTab.code, serviceId: 210 }
}
