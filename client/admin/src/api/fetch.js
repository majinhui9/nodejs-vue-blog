import Util from '../libs/util'
import qs from 'qs'
import Vue from 'vue'
import store from '../store'
import {Base64} from 'js-base64'
import * as types from '../store/mutation-types'

Util.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

Util.ajax.interceptors.request.use(config => {
  config.headers['Authorization'] = _encode();
  return config

}, error => {
  return Promise.reject(error)

})

Util.ajax.interceptors.response.use(response => {

  return response

}, error => {
  console.log(error)
  let {response = {}} = error

  if (response.status === 400) {
    Vue.prototype.$Message.error(response.data.msg.join(','))
    return Promise.reject(response)
  } else if (response.status === 401 || response.status === 403) {
    // 登录鉴权失败，清除TOKEN
    Vue.ls.remove("token");
    location.href = '/login'
  }
  
  Vue.prototype.$Message.error(response.data.msg || '服务器错误')
  store.commit(types.SET_MAIN_LOADING, false);

  return Promise.reject(response)

})

export default {
  post(url, data) {
    return Util.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  get(url, params) {
    return Util.ajax({
      method: 'get',
      url: url,
      params
    })
  },

  delete(url, params) {
    return Util.ajax({
      method: 'delete',
      url: url,
      params
    })
  },

  put(url, data) {
    return Util.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
}

// 转码token
function _encode() {
  const token = Vue.ls.get("token");
  const base64 = Base64.encode(token + ':');
  return 'Basic ' + base64
}
