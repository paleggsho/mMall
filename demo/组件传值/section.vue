<template>
    <div class="section">
        <com-article v-bind="articleList"></com-article>
    </div>
</template>

<script>
import comArticle from './article.vue';
export default {
    name: 'HelloWorld',
    components: {comArticle},
    data() {
        return{
            articleList: ['aa', 'bb', 'cc']
        }
    }
}
</script>

