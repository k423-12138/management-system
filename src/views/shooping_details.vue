<template>
  <el-container>
    <el-main class="datails_main">
      <div class="hd">
        <p @click="show(0)">
          <i class="el-icon-back"></i>
          <span>添加商品</span>
        </p>
      </div>
      <el-card shadow="never">
        <div class="details">
          <el-tag>商品名称</el-tag>
          <div style="margin-left: 20px">{{list.name}}</div>
        </div>
        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>

        <div class="details">
          <el-tag>商品描述</el-tag>
          <div style="margin-left: 20px;">{{list.desc}}</div>
        </div>
        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>

        <div class="details">
          <el-tag>商品价格</el-tag>
          <div style="margin-left: 20px;">{{list.price}}</div>
        </div>
        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>

        <div class="details">
          <el-tag>所属分类</el-tag>
          <div style="margin-left: 20px;">大地在</div>
        </div>
        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>

        <div class="details">
          <el-tag>商品图片</el-tag>
          <div style="margin-left: 20px;">
            <el-image
              v-for="item in list.imgs"
              :key="item"
              style="width: 100px; height: 60px;margin-left: 10px"
              :src="item"
             
            ></el-image>
          </div>
        </div>
        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>

        <div class="details">
          <el-tag>商品详情</el-tag>
          <div style="margin-left: 20px;"> {{list.detail}}</div>
        </div>
        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      shoop_list: [],
      curr: 0
    };
  },
  computed: {
    ...mapState({
      list: state => {
        console.log(state.shoop.shoop_list);

        return state.shoop.shoop_list;
      }
    }),
    ...mapState({
      cnt: state => {
        //console.log(this);

        // this.curr=state.shoop.cnt
        return state.shoop.cnt;
      }
    })
  },
  methods: {
    show(num) {
      let msg =false
      this.$emit("show_e", {num,msg});
    }
  }
};
</script>
<style >
.hd {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
background-color: white;
  border-bottom: 1px solid #dcdfe6;
}
.details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.datails_main{
    background-color: white;
}
</style>