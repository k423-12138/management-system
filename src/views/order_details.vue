<template>
    <el-container>
        <el-main style="background: white;">
            
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            details_list:[]
        }
    },
    mounted() {
      this.details_list =  this.$route.params.details_list
      console.log(this.details_list);
      
    },
}
</script>