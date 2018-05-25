<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
       {{ text }} {{ id }}
    </div>
</template>

<script>
    export default {
        name: 'user-add',
        data () {
            return {
                id: '',
                text: ''
            }
        },
        methods: {
            init () {
                console.log(this.$route.query)
                if (!this.$route.query.user_id) {
                    this.text = '新增用户';
                    this.id = '';
                } else {
                    this.text = '修改用户';
                    this.id = this.$route.query.user_id;
                }
            }  
        },
        mounted () {
            this.init();
        },
        watch: {
            '$route' () {
                this.init();
            }
        }
    };
</script>