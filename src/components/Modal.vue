<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="closeModal">Close</button>                    
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<script>
//父子组件通信
    export default{
        //子组件接受父组件
        props:["mdShow"],
        data() {
            return {
                msg: ''
            }
        },
        methods: {
            closeModal(){
                //相当于es5的trigger("click")
                //通知父组件
                this.$emit("close")
            }
        }
    }
</script>