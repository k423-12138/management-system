<template>
  <div>
    <el-aside width="200px">
      <div class="tit">后台管理系统</div>
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">
            <router-link to="/home/index">首页</router-link>
          </span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-present"></i>
            商品
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <div class="font">
                <i class="el-icon-box"></i>
                <span @click="sw_mod(0)">
              
                  <router-link to="/home/binLei">品类管理</router-link>
                </span>
              </div>
            </el-menu-item>
            <el-menu-item index="2-2">
              <div class="font">
                <i class="el-icon-box"></i>
                <router-link to="/home/shooping">商品管理</router-link>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>用户
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <div class="font" >
              
                <router-link to="/home/user" >  用户管理</router-link>
                </div>
            </el-menu-item>
            <el-menu-item index="3-2">
              <div class="font">
                 <router-link to="/home/userAdd"  > 权限管理</router-link>
                
                </div>
              </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-goods"></i>订单
          </template>
          <el-menu-item-group>
           
            <el-menu-item index="4-1">
 <div class="font">
<router-link to="/home/order"  > 订单管理</router-link>

              

              
               </div>
              </el-menu-item>
           
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user1:false,
      user0:true
    };
  },

  methods: {
    sw_mod(num) {
      this.$emit("sw_e", num);
    },
    
  }
};
</script>
<style >
a {
  text-decoration: none;
  list-style: none;
 color: grey;
}

.router-link-exact-active ,.router-link-active{
color:#409eff;
}
</style>