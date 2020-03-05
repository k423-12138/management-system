<template>
  <el-container>
    <component v-bind:is="curr" :msg='msg' :row="row" @show_e='show'></component>
  </el-container>
</template>
<script>
import shoopingList from '../views/shooping_list.vue'
import shoopingAdd from '../views/shooping_add'
import shoopingDetails from '../views/shooping_details'
export default {
  data() {
    return {
      list:['shoopingList','shoopingAdd','shoopingDetails'],
      curr:'shoopingList',
      msg:Boolean,
      row:{}
    };
  },
  methods: {
      show(obj){
        this.curr = this.list[obj.num];
        this.msg = obj.msg;
        this.row = obj.row;
        console.log(obj.num);
        
       
      }
  },
  components:{
    shoopingList,
    shoopingAdd,
    shoopingDetails
  }
};
</script>
<style >
.cont {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-top: 6px;
}
.sp_head {
  display: flex;
  justify-content: space-between;

  padding: 10px;
  background: white;
}
.sp_fn {
  width: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-input {
  width: 150px;
}
</style>