import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'
import { BASE_URL } from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_URL, // api base_url
  timeout: 9000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    let that=this;
    let data = error.response.data
    switch (error.response.status) {
      case 403:
        break
      case 500:
        break
      case 404:
        break
      case 504:
        break
      case 401:
        break
      default:
        break
    }
  }
  return Promise.reject(error)
};

// request 拦截器
service.interceptors.request.use(config => {
  config.headers[ 'X-Access-Token' ] = "testtoken"

  return config
},(error) => {
  return Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use((response) => {
    return response.data
  }, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
