export const columns = [
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
        width: 160,
        render: (h, params) => {
            return h('div', [
                h('Checkbox', {
                    props: {
                        value:params.row.ty,
                    },
                    on: {
                        change: () => {
                            this.show(params.index)
                        }
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
        title: '编辑',
        width: 80,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.show(params.index)
                        }
                    }
                }, '修改')
            ]);
        }
    }
];

export const list = [
    {
        userCode: 'we',
        name: '某某',
        userName: 'admin',
        sh: '220291912564513',
        dw: '一汽服贸',
        code: '122121',
        sex: '男',
        tel: '13232323232352',
        bz: '11',
        ty: true,
        tyTime: '2018-05-27',
        id: '12321313'
    },
    {
        userCode: 'we',
        name: '某某',
        userName: 'admin',
        sh: '220291912564513',
        dw: '一汽服贸',
        code: '122121',
        sex: '男',
        tel: '13232323232352',
        bz: '11',
        ty: false,
        tyTime: '2018-05-27',
        id: '12321313'
    },
    {
        userCode: 'we',
        name: '某某',
        userName: 'admin',
        sh: '220291912564513',
        dw: '一汽服贸',
        code: '122121',
        sex: '男',
        tel: '13232323232352',
        bz: '11',
        ty: false,
        tyTime: '2018-05-27',
        id: '12321313'
    },
    {
        userCode: 'we',
        name: '某某',
        userName: 'admin',
        sh: '220291912564513',
        dw: '一汽服贸',
        code: '122121',
        sex: '男',
        tel: '13232323232352',
        bz: '11',
        ty: false,
        tyTime: '2018-05-27',
        id: '12321313'
    },
    {
        userCode: 'we',
        name: '某某',
        userName: 'admin',
        sh: '220291912564513',
        dw: '一汽服贸',
        code: '122121',
        sex: '男',
        tel: '13232323232352',
        bz: '11',
        ty: false,
        tyTime: '2018-05-27',
        id: '12321313'
    }
];
