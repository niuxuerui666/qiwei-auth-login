// 引入axios
import axios from 'axios'

// 创建axios对象
const http = axios.create({
    baseURL:'/api'
})

// 导出http对象
export default http;