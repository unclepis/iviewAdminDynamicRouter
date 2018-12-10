import axios from "axios";
import { Notice } from 'iview';
import qs from "qs";
import { debug } from "util";

const http = axios.create({
    baseURL: process.env.BASE_URL,  // api的base_url
    timeout: 5000,  // 请求超时时间
    responseType: "json",
    withCredentials: true, //让ajax携带cookie
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});
var Authorization = ""; // 用于存储从login接口获取的jwt

/****** request拦截器==>对请求参数做处理 ******/
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

http.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    config.headers.Authorization = Authorization; // 请求头带上login后的jwt
    return config;
}, error => {  //请求错误处理
    Notice.error({
        title: error.response.status,
        desc: error.response.data
    });
    Promise.reject(error)
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    const res = response.data
    if (res.success) {
        Authorization = response.headers.authorization;
    }
    return res
}, function (error) {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                window.location.href = '/login'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                window.location.href = '/401'
                break;
            case 403:
                error.message = '拒绝访问'
                window.location.href = '/403'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                window.location.href = '/404'
                break;
            case 405:
                error.message = '请求方法未允许'
                window.location.href = '/403'
                break;
            case 408:
                error.message = '请求超时'
                window.location.href = '/403'
                break;
            case 500:
                error.message = '服务器端出错'
                window.location.href = '/403'
                break;
            case 501:
                error.message = '网络未实现'
                window.location.href = '/403'
                break;
            case 502:
                error.message = '网络错误'
                window.location.href = '/403'
                break;
            case 503:
                error.message = '服务不可用'
                window.location.href = '/403'
                break;
            case 504:
                error.message = '网络超时'
                window.location.href = '/403'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                window.location.href = '/403'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = "连接到服务器失败"
    }
    Notice.error({
        title: error.message,
        desc: error.message
    })
    return Promise.resolve(error.response)
})

export default {
    //get请求
    get(url, param = '') {
        return new Promise((resolve, reject) => {
            http({
                method: 'get',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    //delete
    delete(url, param = '') {
        return new Promise((resolve, reject) => {
            http({
                method: 'delete',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).catch(error=>{
                debugger
            })
        })
    },
    PUT(url, param = {}) {
        return new Promise((resolve, reject) => {
            http({
                method: 'put',
                url,
                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    //post请求
    post(url, param = {}) {
        return new Promise((resolve, reject) => {
            http({
                method: 'post',
                url,
                data: param,
                headers: {
                    'Content-Type': 'application/json',
                },
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            })
        })
    },
    // formData
    formData(url, params) {
        return axios({
            method: 'post',
            url: url,
            data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}