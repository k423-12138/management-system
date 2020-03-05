<template>
  <div>
    <el-container>
      <asid ></asid>

      <el-container>
        <el-header class="home_hd">
            <div class="user_name" >
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3574424336,4124829066&fm=15&gp=0.jpg" alt="">
              <span>
                 {{user}}
                </span>
             
            </div >
          <div style=" border-left: 1px solid  #409EFF;" @click="tui">
<el-link type="primary">退出登录</el-link>
          </div>
              
     

        </el-header>
        <el-main>
         
         <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {getLei}from '../api/lei'
import asid from "../views/asid.vue";
import binLei from "../views/binLei.vue";
import shooping from "../views/shooping.vue";
export default {
  data() {
    return {
      user: "",
      list: ["binLei", "shooping"],
      curr: "",
      lei_data:{//分类请求
             
             pageNum:1,
             pageSize:3
           },
      lei_lsit:[],
      total:0        
      
    };
  },
  mounted() {
    let name = sessionStorage.getItem("name");
    this.user = name;
    console.log(this.user);
  },
  components: {
     asid,
    
  },
  methods: {
   tui(){
      sessionStorage.setItem('name','')
      this.$router.replace("/login")
   }
  },
};
</script>
<style >
*{
  margin: 0px;
  padding: 0px;
}
img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.font {
 
  font-size: 12px;
}
.tit {
  width: 100%;
  text-align: center;
  line-height: 100px;
}
.home_hd{
  background-color: #b3c0d1;
  color: #333;
  display: flex;

  justify-content: flex-end;
  

  
}
.user_name{
  width: 100px;
  height: 50px;
  display: flex;
align-items: center;
  text-align: center;
  line-height: 50px;
  justify-content: space-around;
}
.home_hd>div{
  margin-right: 15px;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color:whitesmoke;
  color: #333;
  text-align: center;
  padding: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>