<template>
    <div>
         
        <el-container class="l-contain">
           <div class="form-box">
             <h1>登录</h1>
            <el-form status-icon :model="form" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input  placeholder="输入用户名" prefix-icon="el-icon-user" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" type="password"  prefix-icon="el-icon-lock" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                 <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
           </div>
       

        </el-container>

    </div>
</template>

<script>

import {getLogin} from '../api/login'

export default {
    data(){
        return {
            form:{
              username:"",
              password:""
           },
           rules:{//表单判断
               username:[{ required: true, message: '用户名不能为空', trigger: 'blur' },
                         { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }],
               password:[
                         { required: true, message: '密码不能为空', trigger: 'blur' },
                         { len: 5, message: '长度为5位 ', trigger: 'blur' }

               ]
           }
        }

    },
    methods: {
        onSubmit(loginForm){
           this.$refs[loginForm].validate((valid) => {
               if (valid) {//当通过表单的判断条件时
               
                   //发请请求
                     
                     getLogin(this.form).then((res)=>{
                       
                         if(!res.data.status){
                            
                            this.$store.commit("CHANGEUSERINFO",res.data.data)
                              sessionStorage.setItem('name',res.data.data.username)
                              this.$router.replace("/home")
                       
                            console.log(res.data.data);
                            

                         }

                     })


                } else {
                    this.$message('表单输入错误！');
                    return false;
                }
            });
        }
    },
}
</script>

<style>
    .l-contain{
        height: 100%;
    }
    .form-box{
        width: 400px;
        margin: 0 auto;
        padding: 20px 40px;
            box-sizing: border-box;
    }
      .form-box button{
          width: 100%
      }
</style>