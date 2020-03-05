import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import lei from './modules/lei'
import shoop from './modules/datails_shoop'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    login,
    lei,
    shoop
  }
})
