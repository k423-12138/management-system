<template>
  <div>
    <div class="user_hd">
      <el-button type="primary" v-if="user" @click="show">创建分类</el-button>
      <el-button type="primary" v-else @click="handleShow(true)">创建角色</el-button>
    </div>

    <el-table v-if="user" :data="user_list" stripe border style="width: 100%">
      <el-table-column :label="page_text.username" :prop="pop_text.username"></el-table-column>
      <el-table-column :label="page_text.email" :prop="pop_text.email"></el-table-column>
      <el-table-column :label="page_text.phone" v-if="user" prop="phone"></el-table-column>
      <el-table-column :label="page_text.phone" v-else prop="phone"></el-table-column>
      <el-table-column :label="page_text.create_time" :prop="pop_text.create_time"></el-table-column>
      <el-table-column label="权限角色" v-if="user" prop="role_id[0].name"></el-table-column>
      <el-table-column label="操作选项" align="right">
        <template slot-scope="scope">
          <div v-if="user">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)  ">修改</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
          <div v-else>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)  ">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-else :data="user_list" stripe border style="width: 100%">
      <el-table-column :label="page_text.username" prop="name"></el-table-column>
      <el-table-column :label="page_text.email" prop="create_time"></el-table-column>
      <el-table-column :label="page_text.phone" prop="auth_time"></el-table-column>
      <el-table-column label="权限角色" v-if="user" prop="auth_name"></el-table-column>
      <el-table-column label="操作选项" align="right">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" @click="handleQxian(scope.$index, scope.row)">修改</el-button>
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
      :total="total"
    ></el-pagination>

    <!-- 弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="role_id">
          <el-select v-model="ruleForm.role_id" placeholder="请选择活动区域">
            <el-option v-for="item in u_id" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 权限 -->
    <el-dialog title="权限添加" :visible.sync="dialogVisible" width="30%" >
      <div v-if=" handle_obj">
        <el-input v-model="roleName"></el-input>
      </div>
      <!-- 树形结构 -->
      <div v-else>
        <el-tree
          :data="data"
          show-checkbox
          node-key="val"
          ref="tree"
          highlight-current
          :default-checked-keys="ex_val"
          
          :props="defaultProps"
        ></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUser,
  getUser_del,
  getUser_add,
  getUser_up,
  getUser_role,
  getRole_add,
  getRole_update
} from "../api/user";
export default {
  props: ["user"],
  data() {
    return {
      ex_val:[],//默认被选中的
      data: [
        {
          idx_qu: 0,

          id: 0,
          label: "首页",
          val: "/home"
        },
        {
          //树形结构
          id: 1,
          label: "商品",
          val: "/goods",
          children: [
            {
              id: 11,
              label: "品类管理",
              val: "/goods/category",
              children: [
                {
                  id: 12,
                  label: "商品管理",
                  val: "/goods/product"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "用户",
          val: "/users",
          children: [
            {
              id: 21,
              label: "用户管理",
              val: "/users/user"
            },
            {
              id: 22,
              label: "权限管理",
              val: "/users/role"
            }
          ]
        },
        {
          id: 3,
          label: "订单",
          val: "/orders",
          children: [
            {
              id: 31,
              label: "订单管理",
              val: "/orders/order"
            }
          ]
        }
      ],

      // 以上的权限的数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      handle_obj: true,
      roleName: "", //权限绑定的model
      dialogVisible: false, //权限
      u_id: [],
      page_text: {
        username: "用户名",
        email: "邮箱",
        phone: "电话",
        create_time: "创建时间"
      },
      pop_text: {
        username: "username",
        email: "email",
        phone: " phone",
        create_time: "create_time"
      },
      dialogFormVisible: false,
      ruleForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        role_id: ""
      },
      up_id: "",
      form_obj: true, //判断弹出的是修改还是添加
      rules: {
        username: [
          { required: true, message: "请输入名称", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话吗", trigger: "blur" },
          { min: 11, message: "电话号码不对呀", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },

      user_list: [],
      total: 0
    };
  },
  methods: {
    page_num(){

    },
    handleShow(num) {
      this.handle_obj = num;
    },
    handleQxian(index, row) {
      this.dialogVisible = true;
      this.handle_obj = false;
      this.idx_qu = index;
      this.ex_val = this.user_list[this.idx_qu].menus
      
    },
    handleClose() {
      //提交权限修改 及请求的发送
      this.dialogVisible = false;
      let _this = this;

      if (this.handle_obj) {
        //添加权限
        getRole_add({ roleName: this.roleName }).then(res => {
          if (!res.data.status) {
            console.log(res);

            _this.$message({
              message: "权限添加成功",
              type: "success"
            });
          }
        });
      } else {
        //修改权限
      
let xx = new Date();
      let bb = xx.getTime();
       
        getRole_update({
          _id:this.user_list[this.idx_qu]._id,
          auth_name:this.user_list[this.idx_qu].auth_name,
          menus:this.$refs.tree.getCheckedKeys(),
          auth_time:bb
        }).then((res)=>{
            if(!res.data.status){
              console.log(res);
               _this.$message({
              message: "权限修改成功",
              type: "success"
            });
            }
        })
        
      }
    },

    submitForm(formName) {
      //表单回调函数

      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发起请求
          console.log(this.ruleForm);

          if (this.form_obj) {
            getUser_add(this.ruleForm).then(res => {
              if (!res.data.status) {
                console.log(res);
                _this.$message({
                  message: "用户添加成功成功",
                  type: "success"
                });
                _this.dialogFormVisible = false;
              }
            });
          } else {
            //执行修改用户

            getUser_up(this.ruleForm).then(res => {
              if (!res.data.status) {
                console.log(res.data);

                _this.$message({
                  message: "用户添加成功成功",
                  type: "success"
                });
                _this.dialogFormVisible = false;
              } else {
                console.log(res.data);
                this.$message.error("用户名重复");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    show() {
      //显示弹框
      this.form_obj = true;
      this.dialogFormVisible = true;
    },
    time_fn(data) {
      //将时间戳转化为时间
      var da = Number(data);
      da = new Date(da);
      var year = da.getFullYear() + "年";
      var month = da.getMonth() + 1 + "月";
      var date = da.getDate() + "日";
      var h = da.getHours() + "小时";
      var f = da.getMinutes() + "分";
      var mi = da.getSeconds() + "秒";

      data = [year, month, date, h, f, mi].join("/");
      console.log(data);

      return data;
    },
    handleEdit(index, row) {
      //修改信息
      this.dialogFormVisible = true; //调用弹框的判断数据
      this.form_obj = false;
      this.ruleForm.username = this.user_list[index].username;
      this.ruleForm.email = this.user_list[index].email;
      this.ruleForm.phone = this.user_list[index].phone;
      this.ruleForm._id = this.user_list[index]._id;
      this.ruleForm.password = this.user_list[index].password;
    },
    handleDelete(index, row) {
      let _this = this;
      getUser_del({
        userId: row._id
      }).then(res => {
        if (!res.data.status) {
          console.log(res.data);
          _this.user_list = _this.user_list.filter(item => {
            return item != row;
          });
        }
      });
    },
    currentChange(cpage) {}
  },
  mounted() {
    console.log(this.user);
    let _this = this;
    if (this.user) {
      //为用户管理时执行下面

      getUser({ pageNum: 1, pageSize: 4 }).then(res => {
        if (!res.data.status) {
          let list = res.data.data.list;
          console.log(res.data.data);
          _this.total = res.data.data.total;

          let roles = res.data.data.roles;
          _this.u_id = res.data.data.roles;
          console.log(_this.u_id);

          for (let i = 0; i < list.length; i++) {
            //找到相对应的权限
            list[i].role_id = roles.filter(item => {
              if (item._id == list[i].role_id) {
                return item.name;
              }
            });
          }

          for (let i = 0; i < list.length; i++) {
            //将时间戳转化为时间
           

            list[i].create_time = _this.time_fn(list[i].create_time);
          }
          _this.user_list = list;
          console.log(list);
        }
      });
    } else {
      //为权限管理调用的界面
      let text = {
        username: "角色名称",
        email: "创建时间",
        phone: "授权时间",
        create_time: "授权人"
      };
      this.page_text = text;

      getUser_role({ pageNum: 1, pageSize: 4 }).then(res => {
        if (!res.data.status) {
          console.log(res.data.data.list);
          let list = res.data.data.list;
          _this.total = res.data.data.total;
          for (let i = 0; i < list.length; i++) {
            //将时间戳转化为时间
            
            list[i].create_time = _this.time_fn(list[i].create_time);
          }

          for (let i = 0; i < list.length; i++) {
            //将时间戳转化为时间
           

            list[i].auth_time = _this.time_fn(list[i].auth_time)
          }

          _this.user_list = list;
        
        }
      });
    }
  }
};
</script>
<style >
.form_list {
  margin: 0px auto;
  width: 80%;
}
</style>