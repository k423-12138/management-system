import server from '../utils/request.js'
export function getLei(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/category/list',//地址
        params:obj//post 这里改为 data{}
    })
}
export function getLei_add(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/category/add',//地址
        data:obj//post 这里改为 data{}
    })
}
export function getLei_up(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/category/update',//地址
        data:obj//post 这里改为 data{}
    })
}