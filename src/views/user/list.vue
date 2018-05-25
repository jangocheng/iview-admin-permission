<style lang="less">
    @import '../../styles/common.less';
    @import '../my-components/tables/table.less';
</style>

<template>
    <div>
        <Card>
            <Row>
                <Col span="12">
                    <Input v-model="search" placeholder="请输入姓名搜搜..." style="width: 200px" />
                    <Button type="primary" icon="search" @click="handleSearch" style="margin: 0 10px;">搜索</Button>
                    <Button @click="handleCancel" type="ghost">重置</Button>
                </col>
                <Col span="12">
                    <Button v-hasPermission="'userAdd'" type="primary" @click="addUser()" style="float: right"><Icon type="pin"></Icon> 新增</Button>
                </col>
            </Row>
            <Row class="margin-top-10">
                <Table :columns="columns" :data="userList"></Table>
            </Row>
            <Row class="margin-top-10">
                <Col span="5">
                    <Button v-hasPermission="'userPrint'" type="primary" size="large"><Icon type="printer"></Icon> 打印</Button>
                    <Button v-hasPermission="'userExcel'" type="primary" size="large"><Icon type="ios-download-outline"></Icon> 导出</Button>
                    <Button v-hasPermission="'userDz'" type="primary" size="large"><Icon type="pin"></Icon> 定制</Button>
                </Col>
                <Col>
                    <Page :total="100" style="float: right"></Page>
                </col>
            </Row>
        </Card>
    </div>
</template>

<script>
    import * as data from './data/data';
    export default {
        name: 'user-list',
        data () {
            return {
                search: '',
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '人员代码',
                        key: 'userCode'
                    },
                    {
                        title: '人员名称',
                        key: 'name'
                    },
                    {
                        title: '登陆代码',
                        key: 'userName'
                    },
                    {
                        title: '身份证号',
                        key: 'sh'
                    },
                    {
                        title: '单位名称',
                        key: 'dw'
                    },
                    {
                        title: '工号',
                        key: 'code'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '手机号',
                        key: 'tel'
                    },
                    {
                        title: '备注',
                        key: 'bz'
                    },
                    {
                        title: '停用标识',
                        key: 'ty',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: params.row.ty ? 'android-checkbox-outline' : 'android-checkbox-outline-blank',
                                        size: 20,
                                        color: '#666'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '停用时间',
                        key: 'tyTime'
                    },
                    {
                        title: '操作',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                        placement: 'top',
                                        content: '编辑'
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'ios-compose-outline'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                //this.update(params)
                                                let query = {user_id: params.row.id};
                                                this.$router.push({
                                                    name: 'userEdit',
                                                    query: query
                                                });
                                            }
                                        },
                                        directives: [{
                                            name: 'hasPermission',
                                            value: 'userEdit'
                                        }]
                                    })
                                ]),
                                h('Tooltip', {
                                    props: {
                                        placement: 'top',
                                        content: '删除'
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.delConfirm(params)
                                            }
                                        },
                                        directives: [{
                                            name: 'hasPermission',
                                            value: 'userDel'
                                        }]
                                    })
                                ])
                            ]);
                        }
                    }
                ],
                userList: []
            };
        },
        methods: {
            init () {
                this.userList = data.list;
            },
            handleSearch () {
                console.log('搜索中');
            },
            handleCancel () {
                console.log('重置');
            },
            update (i) {
                this.$router.push({ name: 'userEdit'})
            },
            checkChange (state) {
                if(state){
                    this.$Message.success('停用用户成功！');
                } else {
                    this.$Message.success('启用用户成功！');
                }
            },
            addUser () {
                this.$router.push({ name: 'userAdd'})
            },
            delConfirm (params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>您确定要删除吗？删除后将不可恢复！</p>',
                    onOk: () => {
                        console.log(params);
                        this.$Message.info(`成功删除id=${params.row.id}的数据！`);
                    },
                    onCancel: () => {}
                });
            },
        },
        mounted () {
            this.init();
        }
    };
</script>