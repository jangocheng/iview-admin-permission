<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userCode">
                            <Input v-model="form.userCode" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">用户名：adming  密码：111111</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
import axios from 'axios';
export default {
    data () {
        return {
            form: {
                userCode: '',
                password: ''
            },
            rules: {
                userCode: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {

                    // axios.post('http://192.168.1.105:8090/console/login',this.form)
                    // .then(function(response){
                    //     console.log(response);
                    // })
                    // .catch(function(error){
                    //     console.log(error);
                    // });


                    if(this.form.userCode !== 'admin' || this.form.password !== '111111' || (this.form.userCode !== 'admin' && this.form.password !== '111111')){
                        //this.$Message.error('用户名或密码错误');
                        this.$Modal.error({
                            title: '提示',
                            content: '用户名或密码错误'
                        });
                        return;
                    }
                    Cookies.set('user', this.form.userCode);
                    Cookies.set('password', this.form.password);
                    util.initRouter(this);
                    // this.$router.push({
                    //     name: 'home_index'
                    // });
                }
            });
        }
    }
};
</script>

<style>

</style>
