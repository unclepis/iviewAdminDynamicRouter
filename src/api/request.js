import axios from "axios";
import { Notice } from 'iview';
import qs from "qs";
import { router } from '@/router/index.js' // 错误页面路由跳转

const ajaxUrl = process.env.BASE_URL;

const http = axios.create({
    baseURL: ajaxUrl,  // api的base_url
    timeout: 5000,  // 请求超时时间
    responseType: "json",
    // withCredentials: true, //让ajax携带cookie
    withCredentials: false, //让ajax携带cookie
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

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
    if (localStorage.getItem('auth')) {
        config.headers.Authorization = localStorage.getItem('auth'); // 请求头带上login后的jwt
    }
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
    if (response.headers.authorization) {
        localStorage.setItem('auth',response.headers.authorization); 
    }
    return res
}, function (error) {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                router.push('/400');
                break;
            case 401:
                error.message = '未授权，请重新登录'
                router.push('/401');
                break;
            case 403:
                error.message = '拒绝访问'
                router.push('/403');
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                router.push('/404');
                break;
            case 405:
                error.message = '请求方法未允许'
                router.push('/405');
                break;
            case 408:
                error.message = '请求超时'
                router.push('/408');
                break;
            case 500:
                error.message = '服务器端出错'
                router.push('/500');
                break;
            case 501:
                error.message = '网络未实现'
                router.push('/501');
                break;
            case 502:
                error.message = '网络错误'
                router.push('/502');
                break;
            case 503:
                error.message = '服务不可用'
                router.push('/503');
                break;
            case 504:
                error.message = '网络超时'
                router.push('/504');
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                router.push('/505');
                break;
            default:
                error.message = `连接错误${error.response.status}`
                router.push('/noNetwork');
        }
    } else {
        error.message = "连接到服务器失败"
        router.push('/noNetwork');
    }
    Notice.error({
        title: error.message,
        desc: error.message
    })
    return Promise.resolve(error)
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
            }).catch(error => {
                reject(error);
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
            }).catch(error => {
                reject(error);
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
            }).catch(error => {
                reject(error);
            });
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
            }).catch(error => {
                reject(error);
            });
        })
    },
    // formData
    formData(url, params) {
        return new Promise((resolve, reject) => {
            http({
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
                },
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error);
            });
        });
    },
    formDataMethod(url, params) {
        var formData = new FormData();
        for (var paramsKey in params) {
            formData.append(paramsKey, params[paramsKey])
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: formData,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error);
            });
        });

    }
}