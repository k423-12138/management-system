<template>
  <el-container>
    <el-main style="background: white" class='add_main'>
      <div class="hd">
        <p @click="show(0)">
          <i class="el-icon-back"></i>
          <span>{{sp_text}}</span>
        </p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm add_form" >
        <el-form-item label="商品名称"  prop="name">
          <el-input v-model="ruleForm.name"     placeholder="请输入商品名称" style=" width:1100px "></el-input>
        </el-form-item>


        <el-form-item label="商品描述" prop="desc" style="">
          <el-input type="textarea" v-model="ruleForm.desc" style=" width:1100px "></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="num">
          <el-input-number style=" width:1100px " placeholder="请输入价格，为数字" v-model="ruleForm.price" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>


    <el-form-item label="商品分类" prop="region">
    <el-select v-model="ruleForm.categoryId" placeholder="请选择商品类型">
      <el-option v-for="item in lei_id" :key="item._id" :label="item.name" value="5dd2dd4a2a3e180f6059900c"></el-option>
     
    </el-select>
            </el-form-item>

      

<!-- img上传 -->

      <el-form-item label="图片上传">

<el-upload
  action="http://118.24.25.7:5000/manage/img/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

      </el-form-item>
<el-form-item label="商品详情">
              <quill-editor
                      v-model="ruleForm.detail"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"
              >
              </quill-editor>
    


</el-form-item>
            

        <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">{{btn_text}}</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> 



      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import { getShoop_add,getShoop_update } from "../api/sopping";
import { getLei } from "../api/lei";
export default {
  props:['msg','row'],
   name: "InfoExperience",
  data() {
    return {
      btn_text:'立即创建',
      sp_text:'添加商品',
      rateValue: null,
      rateStyle: {
        fontSize: "35px"
      },
      editorOption: {// 编辑器配置项
        modules: {
          toolbar:  [
            ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],                      //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],               // 几级标题
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 有序列表，无序列表
            [{ 'script': 'sub'}, { 'script': 'super' }],      // 下角标，上角标
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
            [{ 'direction': 'rtl' }],                         // 文字输入方向
            [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// 标题
            [{ 'color': [] }, { 'background': [] }],          // 颜色选择
            [{ 'font': [] }],// 字体
            [{ 'align': [] }], // 居中
            ['clean']                                         // 清除样式
          ]
        }
      },
      


        dialogImageUrl: '',
        dialogVisible: false ,
        disabled: false,
        imgs:[],
      lei_id:[],
     ruleForm: {
        name: "",
        desc: '',
        price:Number,
       
        detail: null, // 初始编辑器内容
        pCategoryId:'5dd2dd4a2a3e180f6059900c',
        categoryId:'',
      },

       rules: {
          name: [
            { required: true, message: '请输入商品名', trigger: 'blur' },
            
          ],
         
          num: [
            
           { min: 3, max: 5, message: '价格不正确', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
         desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    };
  },
  methods: {
    
    show(num){//返回上级
    let msg = false
      this.$emit('show_e',{num,msg})
    }
    
    ,
       handleChange(value) {
        console.log(value);
      },
      submitForm(formName) {//创建

        this.$refs[formName].validate((valid) => {
          if (valid) {
           // alert('submit!');
            let _this = this;
            let form_data = this.ruleForm;
            
            if(!this.msg){
              getShoop_add(this.ruleForm).then((res)=>{//添加类的请求
                    if (!res.data.status) {
                      console.log(res);
                  _this.ruleForm =form_data;
                  this.$message({
            message: "添加成功",
            type: "success"
          });       
                  let msg = false;
                  let num = 0;
                  this.$emit('show_e',{num,msg})

          }
            })
            }else{//修改商品的请求
                getShoop_update(this.ruleForm).then((res)=>{
                  if (!res.data.status) {
                      console.log(res);
                  _this.ruleForm =form_data;
                  this.$message({
            message: "修改成功",
            type: "success"
          });       
                  let msg = false;
                  let num = 0;
                  this.$emit('show_e',{num,msg})
                  }
                })
            }
            


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {//重置
        this.$refs[formName].resetFields();
        
      },
       /* 图片上传 */
     handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.imgs.push(file.name)
        console.log(this.imgs);
        
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      onChange(file){
        console.log(file);
      },
      /* 富文本编辑 */


       onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },




    },
  mounted() {
    let _this =this;
     getLei({ 
        pageNum: 1,
        pageSize: 5}).then(res => {//获取id值
        if (!res.data.status) {

          console.log(res.data.data.list);
          _this.lei_id =res.data.data.list;
          
        }
      });

      if(this.msg){//判断是修改还是增加
        this.ruleForm =this.row;
        this.btn_text='立即修改';
        this.sp_text = '修改商品'
      }
      //console.log(this.msg,this.row);
  },
};
</script>
<style >
.add_main{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-top: 6px;
}
.hd {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
}
.add_form{

  display: flex;
  flex-flow: column;
  
  align-items: flex-start;
  margin-top: 10px;
}
</style>