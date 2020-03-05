<template>
  <div>
<el-container v-if="show">
    <el-header type="flex" class="b_hed" style="background-color: white;" justify="space-between">
      <span>一级商品分类表</span>
      <el-button type="primary" @click="dialogVisible = true">添加分类</el-button>
    </el-header>

    <el-main style="width:100%;padding:0px">
      <el-table :data="lei_list" style="width: 100%">
        <el-table-column label="分类名" prop="name"></el-table-column>
        <el-table-column label="修改操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑分类</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">查看分类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="bl_f" style="background-color: white;">
      <el-pagination
        class="bl_f"
        background
        @current-change="currentChange"
        layout="prev, pager, next"
        :page-size="3"
        :total="total"
      ></el-pagination>
    </el-footer>
    <!-- 弹框提示 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="txt">
        <div>
          <span>分类列表</span>:
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>分类名称</span> :
          <el-input style="width:400px" v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_lei">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改类" :visible.sync="dialogFormVisible" width="30%">
  <el-form :model="form">
    <el-form-item label="类名" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="lei_up">确 定</el-button>
  </div>
</el-dialog>
  </el-container>
   <bin-son 
   :son_list='son_list'
    :son_total='son_total'
     :son_name='son_name' 
     :son_id='son_data.parentId'
      v-if="!show"
      @son_up="son_up"
       @show_e="show_lei"></bin-son>
  </div>
  

 

</template>
<script>
import { getLei, getLei_add ,getLei_up} from "../api/lei";
import binSon from '../views/binSon'
export default {
  
  data() {
    return {
      lei_list: [],
      total: 0,
      lei_data: {
        //分类请求

        pageNum: 1,
        pageSize: 3
      },
      input: "",
      dialogVisible: false, //弹框
      value: "这是一级分类",
      search: "",
      options: [{ value: "这是一级分类", label: "这是一级分类" }],
      parentId: [], //查询子类id
      show:true,//组件切换
      son_list:[],
      son_data:{
        parentId:'0',
        pageNum: 1,
        pageSize: 6
      },
      son_total:0,
      son_name:'',
      dialogFormVisible:false,
      idx:0,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
    };
  },

  methods: {
    son_up({list,up_name}){
        let son_list = this.son_list.find((item)=>{
          return item==list
        })
        son_list.name =up_name;

    },
    show_lei(){
       this.show =!this.show     
    },
    add_lei() {
      //增加分类
      this.dialogVisible = false;
      let _this = this;
      getLei_add({ categoryName: this.input }).then(res => {
        //发送ajax请求
        if (!res.data.status) {
          console.log(res);

          _this.$message({
            message: "添加成功",
            type: "success"
          });
          _this.input = "";
        } else {
          _this.$message.error("添加失败");
        }
      });
    },
    lei_up(){//二级修改
        this.dialogFormVisible = false;
        let _this=this;
         getLei_up({catgoryld:this.lei_list[this.idx]._id,categoryName:this.form.name}).then(res => {
        //发送ajax请求
        if (!res.data.status) {
          let lei_list = this.lei_list.find((item)=>{
          return item==_this.lei_list[_this.idx]
        })
        lei_list.name =_this.form.name;
          _this.form.name=''
          _this.$message({
            message: "修改成功",
            type: "success"
          });
          
        } else {
          _this.$message.error("修改失败");
        }
      });
      },
    handleClose(done) {
      //弹框
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    handleEdit(index, row) {
      console.log(index, row);
      this.idx = index;
      this.dialogFormVisible =  true;

    },
    handleDelete(index, row) {//查看二级分类

      console.log(index, row);
      this.son_data.parentId = this.lei_list[index]._id;
      this.son_name = this.lei_list[index].name;
      
      let _this=this;
      
      
       getLei(this.son_data).then(res => {
        if (!res.data.status) {

          _this.son_list = res.data.data.list;
          _this.son_total = res.data.data.total;
          
          console.log(res.data.data.list);
        }
      });
      this.show=!this.show
    },
    currentChange(cpage) {
      console.log(cpage);

      this.lei_data.pageNum = cpage;

      let _this = this;

      getLei(this.lei_data).then(res => {
        if (!res.data.status) {
          _this.parentId = [];

          _this.lei_list = res.data.data.list;
          _this.total = res.data.data.total;
          res.data.data.list.forEach(item => {
            _this.parentId.push(item._id);
          });
          console.log(res.data.data.list, _this.parentId);
        }
      });
    },
    pre(cpage) {
      console.log(cpage);

      this.lei_data.pageNum = cpage;

      let _this = this;
      console.log(this.lei_data);

      getLei(this.lei_data).then(res => {
        if (!res.data.status) {
          _this.lei_list = res.data.data.list;
          _this.total = res.data.data.total;
        }
      });
    },

    next(cpage) {
      this.lei_data.pageNum = cpage;

      let _this = this;

      getLei(this.lei_data).then(res => {
        if (!res.data.status) {
          _this.lei_list = res.data.data.list;
          _this.total = res.data.data.total;
        }
      });
    }
  },
  components:{
    binSon
  },
  mounted() {
    //从home传过来的数据 赋初值
    let _this = this;

    getLei(this.lei_data).then(res => {
      if (!res.data.status) {
        console.log(res);

        _this.lei_list = res.data.data.list;
        _this.total = res.data.data.total;

        console.log(_this.lei_list);
      }
    });
  }
};
</script>
<style >
.txt {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
}
.txt > div {
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.bl_f {
  background-color: white;
  display: flex;
  justify-content: center;
  line-height: 30px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.b_hed {
  border-bottom: 1px solid #dcdfe6;
}
.has-gutter > tr {
  line-height: 20px;
}
</style>