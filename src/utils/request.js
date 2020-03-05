import axios from 'axios';

//配置
var server = axios.create({
    baseURL:'/'//请求路径 列如 www.baidu.com 
    ,timeout:6000,
    headers:{// 所有的请求都会携带这个请求头
        'classes':6666
    }

})


export default server