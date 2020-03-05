module.exports ={
    devServer:{
        proxy:{
            '/api':{//解决跨域的代理 凡是api 开头的走代理
                target:'http://118.24.25.7:5000',//这里是后台的IP地址 
                changeOrigin:true
            }
        }
    }
}