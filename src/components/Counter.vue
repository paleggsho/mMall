<template>
    <div>
        <button @click = 'increment'>+</button>
        <button v-on:click = 'decrement'>-</button>
        <p><span>{{ num }}</span></p>
    </div>
</template>
<style>
</style>
<script>
    export default {
        props: ["num"],
        data() {
            return {
                num: 0
            }
        },
        methods: {
            increment(){
                //this.num++
                this.$emit("incre")//触发父组件事件
                import('./../util')
            },
            decrement(){
                //this.num--
                this.$emit('decre')
            },
        }
    }
</script>


