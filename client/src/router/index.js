import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import AdminSellerList from '@/components/AdminSellerList'
import AdminBuyerList from '@/components/AdminBuyerList'
import AdminProductList from '@/components/AdminProductList'
import SellerProductList from '@/components/SellerProductList'
import AddProduct from '@/components/AddProduct'
import SellerOrderList from '@/components/SellerOrderList'
import Report from '@/components/Report'
import BuyerProductList from '@/components/BuyerProductList'
import Cart from '@/components/Cart'
import BuyerOrderList from '@/components/BuyerOrderList'
import OrderDetail from '@/components/OrderDetail'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/adminSellerList',
      name: 'adminSellerList',
      component: AdminSellerList
    },
    {
      path: '/adminBuyerList',
      name: 'adminBuyerList',
      component: AdminBuyerList
    },
    {
      path: '/adminProductList',
      name: 'adminProductList',
      component: AdminProductList
    },
    {
      path: '/sellerProductList',
      name: 'sellerProductList',
      component: SellerProductList
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: AddProduct
    },
    {
      path: '/sellerOrderList',
      name: 'sellerOrderList',
      component: SellerOrderList
    },
    {
      path: '/report',
      name: 'report',
      component: Report
    },
    {
      path: '/buyerProductList',
      name: 'buyerProductList',
      component: BuyerProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/buyerOrderList',
      name: 'buyerOrderList',
      component: BuyerOrderList
    },
    {
      path: '/orderDetail/:orderListId',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
