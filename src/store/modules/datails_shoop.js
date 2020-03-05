var shoop ={
    state:{
        shoop_list:[],
        cnt:0
    },
    mutations:{
        sp:function(state,list){
            
            state.shoop_list =list
            console.log(list.imgs);
            
        }
    }
    
}
export default shoop