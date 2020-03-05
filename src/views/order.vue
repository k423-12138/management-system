<template>
    <el-container>
       <el-main class="order_main">
           <div class="order_hd">
                <div class="hd_ser">
         <el-select  v-model="value" placeholder="请选择" style="width:150px;">
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
<el-input  style="width:150px;" v-model="input" placeholder="请输入搜索"></el-input>
 <el-button type="primary" @click="search">确认搜索</el-button>
                </div>
           </div>

 <el-table  :data="order_list" stripe  style="width: 100%">
      <el-table-column label="订单号" prop="orderId"></el-table-column>
      <el-table-column label="收件人" prop="recipient"></el-table-column>
      <el-table-column label="订单状态" >未下单</el-table-column>
      <el-table-column label="订单总价"  prop="details[0].price"></el-table-column>
      <el-table-column label="下单时间"  prop="create_time"></el-table-column>
      <el-table-column label="操作选项" align="right">
        <template slot-scope="scope">
          <div>
            
            <el-link @click="order_selet(scope.$index, scope.row)" type="primary">主要链接</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
      class="bl_f"
      background
      @current-change="currentChange"
      layout="prev, pager, next"
      :page-size="4"
      :total="6"
    ></el-pagination>     
       </el-main>
    </el-container>
</template>
<script>
import {getOrder_list,getOrder_search} from '../api/user'
export default {
    data() {
        return {
            list:[
                {
                    value:'orderId',
                    label:'按照订单号搜索'
                },
                {
                     value:'recipient',
                    label:'按照订单号搜索'
                }
            ],
            value:'orderId',
            input:'',
            order_list:[],
            total:0

        }
    },
    methods: {
        search(){
            let _this = this;
            getOrder_search({
                type:this.value,
                value:this.input,
                pageNum:1,
                pageSize:3
            }).then((res)=>{
                    if(!res.data.status){
                        console.log(res.data.data.list);
                         _this.order_list = res.data.data.list;
                    _this.order_list.forEach(element => {
                         element.create_time =  _this.time_fn(element.create_time) 
                          element.details[0].price = element.details[0].price+'元'
                    });
                    }
            })
        }
        ,
        order_selet(index,row){
                this.$router.push({
                    name:'orderDetails',
                    params:{
                        details_list:this.order_list[index].details[0]
                    }
                })
        },
        currentChange(){},
         time_fn(data) {
      //将时间戳转化为时间
      var da = Number(data);
      da = new Date(da);
      var year = da.getFullYear() + "年";
      var month = da.getMonth() + 1 + "月";
      var date = da.getDate() + "日";
      var h = da.getHours() + "小时";
      var f = da.getMinutes() + "分";
     

      data = [year, month, date, h, f].join("/");
     
      return data;
    },
    },
    mounted() {
        let _this =this
        getOrder_list({
            pageNum:1,
            pageSize:4
        }).then((res)=>{
                if(!res.data.status){
                    console.log(res.data.data.list);
                    
                    _this.order_list = res.data.data.list;
                    _this.order_list.forEach(element => {
                         element.create_time =  _this.time_fn(element.create_time) 
                          element.details[0].price = element.details[0].price+'元'
                    });
                   // _this.total = 
                }
        })

    },
}
</script>
<style >
    .order_main{
        background: white;

    }
    .order_hb{
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }
.hd_ser{
    width: 430px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>