// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//用import进行导入
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import {currency} from './util/currency';
//import {sum, minus} from './util'
// import * as util from './util'

// console.log(`sum: ${util.sum(1, 6)}`)
// console.log(`minus: ${util.minus(10,3)}`)

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: 'static/loading-svg/loading-bars.svg'
})
Vue.use(infiniteScroll)
//全局过滤器定义
Vue.filter('currency', currency)//这里不能写currency()加括号表示函数的调用，这里只是个function

/* eslint-disable no-new */
//该vue实例是整个页面的入口
new Vue({
  el: '#app',//设置接听对象的区域
  router,//需要用到的路由
  components: { App },//组件
  template: '<App/>'//模板
  //render: h => h(App)  //上面两种的渲染
})