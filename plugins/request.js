/**
 * 基于axios 封装的请求模块
 */

import axios from 'axios';

// 创建请求对象
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
});

// 通过插件机制获取到上下文对象
// 插件导出函数必须作为默认成员
export default ({ store }) => {
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        // 任何请求都要经过请求拦截器
        // 我们可以在请求拦截器中做一些公共的业务处理，例如统一设置token
        const { user } = store.state;
        if (user && user.token) { 
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function (error) {
        // 如果请求失败（此时请求还没有被发出去就进入这里）
        return Promise.reject(error);
    });
    // 响应拦截器
};