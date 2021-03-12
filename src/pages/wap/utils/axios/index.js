// 引入http
import http from './axios'

// 暴露get请求接口
export function getTestData(params){
    return http.get('/api/XXX',{params})
}

// 暴露post请求接口
export function getTestData(data){
    return http.post('/api/XXX',data)
}