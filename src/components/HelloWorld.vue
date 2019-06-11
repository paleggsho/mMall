<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--
      v-bind:num="num" ：绑定数据传给子组件，当父组件的num值变动的时候，子组件的值跟着变动
      v-on:aa="increment" ：自定义一个事件aa，让子组件去调用改事件，从而改变父组件的值
      -->
    <Counter v-bind:num="num" v-on:incre="increment" v-on:decre="decrement"></Counter>
    <p>parent: {{ num }}</p>
    
  </div>
</template>

<script>
//引入子组件
import Counter from './Counter'
export default {
  name: 'HelloWorld',
  data () {
    return {
      num: 10,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Counter
  },
  methods: {
    increment(){
      this.num++
    },
    decrement(){
      this.num--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
