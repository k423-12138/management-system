import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import home from '../views/home'
import asid from '../views/asid'
import binLei from '../views/binLei'
import shooping from '../views/shooping'
import binSon from '../views/binSon'
import index from '../views/index'
import shoopingList from '../views/shooping_list'
import shoopingAdd from '../views/shooping_add'
import shoopingDetails from '../views/shooping_details'
import user from '../views/user'
import userAdd from '../views/user_add'
import userList from '../views/user_list'
import order from '../views/order'
import orderDetails from '../views/order_details'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/home',
    name:'home',
    component:home,
    children:[
      {
        path:'binLei',
        name:'binLei',
        component:binLei,
        children:[
          {
            path:'binSon',
            name:'binSon',
            component:binSon
          }
        ]
      },
      {
        path:'index',
        name:'index',
        component:index
      },
      {
        path:'shooping',
        name:'shooping',
        component:shooping
      },
      {
        path:'shooping_list',
        name:'shooping_list',
        component:shoopingList
      },
      {
        path:'shoopingAdd',
        name:'shoopingAdd',
        component:shoopingAdd
      },{
        path:'shoopingDetails',
        name:'shoopingDetails',
        component:shoopingDetails
      },{
        path:'user',
        name:'user',
        component:user
      },
      {
        path:'userAdd',
        name:'userAdd',
        component:userAdd
      },
      {
        path:'userList',
        name:'userList',
        component:userList
      },
      {
        path:'order',
        name:'order',
        component:order
      },
      {
        path:'orderDetails',
        name:'orderDetails',
        component: orderDetails
      }


    ]
  },
  {
    path:'/asid',
    name:'asid',
    component:asid
  },
  
  {
    path:'/',
    redirect:'/login'

  },


]

const router = new VueRouter({
  routes
})

export default router
