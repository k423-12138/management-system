<template>
   <el-container >
    <el-header type="flex" class="b_hed" style="background-color: white;" justify="space-between">
      <span @click="show">一级商品分类表=>{{son_name}}</span>
      <el-button type="primary" @click="add_lei">添加分类</el-button>
    </el-header>

    <el-main style="width:100%;padding:0px">
      <el-table :data="son_list" style="width: 100%">
        <el-table-column label="分类名" prop="name"></el-table-column>
        <el-table-column label="修改操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">修改分类</el-button>
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
        :page-size="6"
        :total="son_total"
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
          <span>修改名称</span> :
          <el-input style="width:400px" v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_son">确 定</el-button>
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
    <el-button type="primary" @click="son_up">确 定</el-button>
  </div>
</el-dialog>


  </el-container>
</template>

<script>
import{getLei_add,getLei_up}  from "../api/lei"
export default {
    props:['son_list','son_total','son_name','son_id'],
    data() {
    return {
      lei_data: {
        //分类请求

        pageNum: 1,
        pageSize: 3
      },
      input: "",
      dialogVisible: false, //弹框
      search: "",
       value: "这是二级分类",
       options: [{ value: "这是一级分类", label: "这是一级分类" }],
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
      son_up(){//二级修改
        this.dialogFormVisible = false;
        let _this=this;
         getLei_up({catgoryld:this.son_list[this.idx]._id,categoryName:this.form.name}).then(res => {
        //发送ajax请求
        if (!res.data.status) {
          
          
          
          this.$emit('son_up',{list:_this.son_list[_this.idx],up_name:_this.form.name})
          _this.form.name=''
          _this.$message({
            message: "修改成功",
            type: "success"
          });
          _this.input = "";
        } else {
          _this.$message.error("修改失败");
        }
      });
      },
        show(){
            let num =1
            this.$emit('show_e',num)
           
        },
         handleDelete(index, row) {//修改分类名
          this.dialogFormVisible = true
          console.log(index, row);
          this.idx=index;
      
    },
    currentChange(cpage) {
      console.log(cpage);
    },
     handleClose(done) {
      //弹框
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    add_lei(){
     this.dialogVisible = true
     this.value =this.son_name;
    },
    add_son(){//发送添加请求
    this.dialogVisible = false;
    let  _this=this;
        getLei_add({ categoryName: this.input,parentId:this.son_id }).then(res => {
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
    }
    },
}
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