<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a @click="sortGoods" href="javascript:void(0)" class="price">Price 
                        <svg class="icon icon-arrow-short" v-bind:class="{'sort-up': !sortFlag}">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur': priceChecked=='all'}">All</a></dd>
                            <dd v-for="(price, index) in priceStatus">
                                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur': priceChecked==index}">{{ price.startPrice }} - {{ price.endPrice }}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item, index) in goodsList">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{ item.productName }}</div>
                                        <div class="price">{{ item.salePrice }}</div>
                                        <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>                            
                            </ul>
                            <!-- infinite-scroll-distance="10"表示鼠标距离底端多远，开始加载 -->
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
                                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
            <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        </div>

        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                请先登录，否则无法加入购物车
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
            </div>
        </modal>

        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>加入购物车成功</span>
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
                <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
            </div>
        </modal>
        <nav-footer></nav-footer>
        
      
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from './../components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import Modal from '@/components/Modal';
import axios from 'axios'
export default {
    data(){
        return{
            goodsList: [],
            sortFlag: true,
            page: 1,
            pageSize: 8,
            busy: false,
            loading: false,
            mdShow: false,
            mdShowCart: false,
            priceStatus: [
                {
                    startPrice: '0.00',
                    endPrice: '100.00'
                },
                {
                    startPrice: '100.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '5000.00'
                }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLayFlag: false
        }
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread,
        Modal
    },
    mounted: function () {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(flag){
            var param = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sortFlag ? 1 : -1,
                priceLevel: this.priceChecked
            }
            this.loading = true
            axios.get("/goods/list", {params: param}).then((result) => {
                var res = result.data
                this.loading = true
                //console.log(res)
                if(res.status == '0'){
                    if(flag){
                        this.goodsList = this.goodsList.concat(res.result.list)
                        //若后面没有数据，则不再滚动加载了，busy=true，禁用滚动加载
                        if(res.result.count == 0){
                            this.busy = true
                        }else{
                            this.busy = false
                        }
                    }else{
                        this.goodsList = res.result.list
                        this.busy = false
                    }
                    
                }else{
                    this.goodsList = []
                }
                
            })
        },
        sortGoods(){
            this.sortFlag = !this.sortFlag
            this.page = 1
            this.pageSize = 8
            this.getGoodsList()
        },
        loadMore(){
            this.busy = true
            
            //为防止服务器压力太大，通过setTimeout,设置第一个请求结束，才开始第二个请求
            setTimeout(() => {
                this.page ++
                this.getGoodsList(true)
            }, 500);
        },
        showFilterPop(){
            this.filterBy = true
            this.overLayFlag = true
        },
        setPriceFilter(index){
            this.priceChecked = index
            this.page = 1,
            this.getGoodsList()//最开始忘了加这个函数，没有对应价格的商品返回
            this.closePop()
        },
        closePop(){
            this.filterBy = false,
            this.overLayFlag = false
        },
        addCart(productId){
            axios.post("/goods/addCart", {productId: productId}).then((res) => {
                //console.log(res)
                var res = res.data
                //这里的坑，最开始直接判断res.status，axios得到的响应res包括header,status（这里是请求的状态）,data（需要比较的事data里面定义的status）
                if(res.status == '0'){
                    this.mdShowCart = true
                }else{
                    this.mdShow = true
                }
            })
        },
        closeModal(){
            this.mdShow = false
        }
    }
}
</script>


