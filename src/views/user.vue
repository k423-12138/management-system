<template>
  <el-container>
    <el-main class="user_main">
        

        <userList :user='users'></userList>
     


    </el-main>
  </el-container>
</template>
<script>
import { getUser,getUser_del } from "../api/user";
import userList from '../views/user_list'

export default {
  props:['user','xxx'],
  data() {
    return {
      user_list: [],
     total:0,
     users:true
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
    
    // let _this = this;
    // getUser({ pageNum: 1, pageSize: 4 }).then(res => {
    //   if (!res.data.status) {
    //     let list = res.data.data.list;
    //     console.log(res.data.data);
    //     _this.total = res.data.data.total
    //     let roles = res.data.data.roles;
    //     for(let i=0;i<list.length;i++){//找到相对应的权限
    //         list[i].role_id = roles.filter((item)=>{
    //                 if(item._id==list[i].role_id){
    //                     return item.name
    //                 }
    //         })
    
    //      }   
           
    //          for(let i=0;i<list.length;i++){//将时间戳转化为时间
    //  var da = Number(list[i].create_time);
    //   da = new Date(da);
    //   var year = da.getFullYear() + "年";
    //   var month = da.getMonth() + 1 + "月";
    //   var date = da.getDate() + "日";
    //   var h = da.getHours() + "小时";
    //   var f = da.getMinutes() + "分";
      
      
    // list[i].create_time =[year, month, date, h, f].join("/")
            
            
    //     }
    //     _this.user_list = list
        
        

    //   }
    // });
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

 