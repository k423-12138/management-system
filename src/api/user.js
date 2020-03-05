import server from '../utils/request.js'
export function getUser(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/user/list',//地址
        params:obj//post 这里改为 data{}
    })
}
export function getUser_del(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/user/delete',//地址
        data:obj//post 这里改为 data{}
    })
}
export function getUser_add(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/user/add',//地址
        data:obj//post 这里改为 data{}
    })
}
export function getUser_up(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/user/update',//地址
        data:obj//post 这里改为 data{}
    })
}

export function getUser_role(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/role/list',//地址
        params:obj//post 这里改为 data{}
    })
}
export function getRole_add(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/role/add',//地址
        params:obj//post 这里改为 data{}
    })
}
export function getRole_update(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/role/update',//地址
        data:obj//post 这里改为 data{}
    })
}
export function getOrder_list(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/order/list',//地址
        params:obj//post 这里改为 data{}
    })
}

export function getOrder_search(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/order/search',//地址
        params:obj//post 这里改为 data{}
    })
}