import server from '../utils/request.js'
export function getLogin(obj){
    return server({
        method:'post',//方式
        url:'/api/login',//地址
        data:obj//post 这里改为 data{}
    })
}
