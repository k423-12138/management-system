import server from '../utils/request.js'
export function getShoop(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/product/list',//地址
        params:obj//post 这里改为 data{}
    })
}
export function getShoop_serah(obj){
    return server({
        method:'get',//方式
        url:'/api/manage/product/search',//地址
        params:obj//post 这里改为 data{}
    })
}

export function getShoop_add(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/product/add',//地址
        data:obj//post 这里改为 data{}
    })
}

export function getShoop_shelf(obj){
    return server({
        method:'post',//方式
        url:'/api/manage/product/updateStatus',//地址
        data:obj//post 这里改为 data{}
    })
}

export function getShoop_update(obj){//更新商品
    return server({
        method:'post',//方式
        url:'/api/manage/product/update',//地址
        data:obj//post 这里改为 data{}
    })
}