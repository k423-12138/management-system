
import {CHANGEUSERINFO } from '../mutation-types'

var login ={
    
    state:{
        form:{
            username:'',
            password:''
        }

    },
    mutations:{
        [CHANGEUSERINFO](state,userObj){
              
            state.userInfo.username = userObj.username

      },
    },
    actions:{
        
    }

}
export default login