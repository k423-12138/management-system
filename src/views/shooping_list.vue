<template>
  <el-container>
    <el-main class="cont" border style="padding:0px">
      <div class="sp_head">
        <div class="sp_fn">
          <el-select v-model="value" placeholder="请选择" style="width:150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="input" placeholder="请输入内容" style="width:150px"></el-input>
          <el-button type="primary" @click="search">点击搜索</el-button>
        </div>
        <el-button style="margin-right: 40px;" type="primary" @click="show(1)">添加分类</el-button>
      </div>

      <el-table :data="shoop_list" stripe border style="width: 100%">
        <el-table-column label="商品名" prop="name"></el-table-column>
        <el-table-column label="商品描述" prop="desc"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品状态" prop="status">
          <!-- 状态 -->
          <template slot-scope="scope">
            <div v-if="scope.row.status">
              <el-button size="mini" @click="shelf(scope.$index, scope.row)   ">上架</el-button>
              <span class="list_sp">已下架</span>
            </div>
            <div v-else>
              <el-button size="mini" @click="shelf(scope.$index, scope.row)   ">下架</el-button>
              <span class="list_sp">销售中</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作选项" align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)  ">修改</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">详细</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="bl_f"
        background
        @current-change="currentChange"
        layout="prev, pager, next"
        :page-size="4"
        :total="shoop_total"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
import { getShoop, getShoop_serah, getShoop_shelf } from "../api/sopping";

export default {
  props: ["msg","row"],
  data() {
    return {
      shoop_total: 0,
      shoop_list: [],
      options: [
        {
          value: 0,
          label: "按照名称搜索"
        },
        {
          value: 1,
          label: "按照描述搜索"
        }
      ],
      value: "按照描述查询",
      input: ""
    };
  },
  methods: {
    shelf(index, row) {
      //上架下架处理
      
      Number((row.status = !row.status));
      let _this = this;
      getShoop_shelf({ productId: row._id, status: row.status }).then(res => {
        if (!res.data.status) {//上架请求
          console.log(res);
          
          getShoop({ pageNum: 1, pageSize: 4 }).then(res => {//刷新页面
            if (!res.data.status) {
              
              _this.shoop_list = res.data.data.list;
              _this.shoop_total = res.data.data.total;
               _this.$message({
          message: '商品状态更新成功',
          type: 'success'
        });
            }
          });
        }
      });
    },
    show(num) {
      //页面跳转
      let msg =false
      this.$emit("show_e", {num,msg});
    },
    handleEdit(index, row) {//跳转修改界面
     let num = 1;
     let msg = true;
      

      
      this.$emit("show_e", {num,msg,row});



    },
    handleDelete(index, row) {
      let num = 2;
      let htp = "http://118.24.25.7:5000/upload/";
      for (let i = 0; i < this.shoop_list[index].imgs.length; i++) {
        this.shoop_list[index].imgs[i] = htp + this.shoop_list[index].imgs[i];
      }

      console.log(this.shoop_list[index].imgs);
      let msg = false;
      this.$store.commit("sp", this.shoop_list[index]);
      this.$emit("show_e", {num,msg});
    },
    currentChange(cpage) {},
    search() {
      console.log(this.value);

      let _this = this;
      if (this.value == 0) {
        getShoop_serah({
          pageNum: 1,
          pageSize: 4,
          productName: this.input
        }).then(res => {
          if (!res.data.status) {
            console.log(res.data.data.list);
            _this.shoop_list = res.data.data.list;
            _this.shoop_total = res.data.data.total;
          }
        });
      } else {
        getShoop_serah({
          pageNum: 1,
          pageSize: 4,
          productDesc: this.input
        }).then(res => {
          if (!res.data.status) {
            console.log(res.data.data.list);
            _this.shoop_list = res.data.data.list;
            _this.shoop_total = res.data.data.total;
          }
        });
      }
    }
  },
  mounted() {
    let _this = this;

    getShoop({ pageNum: 1, pageSize: 4 }).then(res => {
      if (!res.data.status) {
        console.log(res.data.data.list);
        _this.shoop_list = res.data.data.list;
        _this.shoop_total = res.data.data.total;
      }
    });

    
    
  }
};
</script>
<style >
.list_sp {
  font-size: 13px;
  color: #409eff;
  margin-left: 10px;
  cursor: pointer;
}
</style>   