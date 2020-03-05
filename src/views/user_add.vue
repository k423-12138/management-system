<template>
  <el-container>
    <el-main class="user_main">
        

        <userList :user='user'></userList>
     



    </el-main>
  </el-container>
</template>
<script>
import { getUser,getUser_del } from "../api/user";
import userList from '../views/user_list'
export default {
  
  data() {
    return {
      user_list: [],
     total:0,
     user:false
    };
  },
  components:{
      userList
  },
  methods: {
    time_fn(data) {//将时间戳转化为时间
      var da = Number(data);
      da = new Date(da);
      var year = da.getFullYear() + "年";
      var month = da.getMonth() + 1 + "月";
      var date = da.getDate() + "日";
      var h = da.getHours() + "小时";
      var f = da.getMinutes() + "分";
      var mi = da.getSeconds() + "秒";
      
      data =[year, month, date, h, f, mi].join("/")
      console.log(data);
      
    return  data;
     
    },
   
  },
  mounted() {
    this.bol=this.$route.params
    console.log(this.bol,this.user);
    
    
  }
};
/* //  this.$router.push(
            //     {
            //          name:'userAdd',
            //          params:{text:'123',text2:'99999'}
            //     } */
</script>
<style >

    .user_hd{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        margin-bottom: 20px;
    }
    .user_main{
    background-color:white;
    }
</style>

 