<template>
    <div>
        这是商品列表页面
        <!-- $route.params是组件与组件之间，路由切换时的传递 -->
        <span>{{ $route.params.goodsId }}</span><br>
        <span>{{ $route.params.userId }}</span>
        <!-- 定义to属性，指定跳转到哪儿 -->
        <router-link to="/goods/title">显示商品标题</router-link> 
        <router-link to="/goods/img">显示商品图片</router-link> 
        <div>
            <router-view></router-view>
        </div>
        <!-- params是路由参数，不是命名参数 -->
        <router-link v-bind:to="{name: 'cart', params:{cardId:123}}">跳转购物车</router-link>
        <!-- <router-link to="/cart">跳转购物车</router-link> 
        <button @click="jump">button-跳转购物车</button>-->
    </div>
</template>

<style>
</style>
<script>
export default {
    data(){
        return{
            msg: 'hello vue'
        }
    },
    methods: {
        jump(){
            this.$router.push({path: '/cart?goodsId=123'})
           // this.$router.go(-2)
        }
    }
}
</script>


