/**Vue写的项目中,
 * 把路由通过不同的功能划分成不同的模块,在index.js中一个个导入,
 * 但是如果项目变大了之后,每次手动import会显得有些力不从心,
 * 这里可以使用require.context函数遍历modules文件夹的所有文件一次性导入到index.js中
。*/

import Vue from 'vue'
import Router from 'vue-router'
// import GoodList from './../views/GoodsList'
// //import GoodList from '@/components/GoodList'
// import HelloWorld from '@/components/HelloWorld'
// import Title from '@/views/Title'
// import Image from '@/views/Image'
// import Cart from '@/views/Cart'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart';
import Address from './../views/Address';
import OrderConfirm from './../views/OrderConfirm';
import OrderSuc from './../views/OrderSuc';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      //这里是一级路由，载体通过App.vue承担
      // path: '/goods',
      // nama: 'GoodList',
      // components: {
      //   default: GoodList,
      //   title: Title,  //在根路由中设置组件名称，与App.vue中router-view的name相同
      //   img: Image
      // }
      path: '/',
      name: 'GoodsList',
      component: GoodsList
      // children: [   //子路由,是个数组
      //   {
      //     path: 'title',
      //     name: 'title',
      //     component: Title
      //   },
      //   {
      //     path: 'img',
      //     name: 'img',
      //     component: Image
      //   },
      // ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart

    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuc',
      name: 'OrderSuc',
      component: OrderSuc
    }
    // {
    //   path: '/cart/:cardId',
    //   name: 'cart',
    //   component: Cart
    // }
  ]
})
