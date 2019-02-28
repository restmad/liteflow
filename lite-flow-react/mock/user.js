var Mock = require('mockjs');
var qs = require('qs');

let usersData = Mock.mock({
    'data|100': [
        {
            'id|+1': 1,
            mobile: /^1[34578]\d{9}$/,
            name: '@cname',
            status: 1,
            isSuper: 1,
            email: '@email',
            roles: [
                {
                    id: 1,
                    name: "role1"
                }, {
                    id: 2,
                    name: "role2"
                }
            ]
        }
    ]
});

module.exports = {
    'GET /console/system/user/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = usersData.data;
        if (page.name || page.email) {
            data = data.filter(bean => {
                let flag=true;
                if (page.name) {
                    flag = bean.name.indexOf(page.name) >= 0;
                }
                if(flag && page.email){
                    flag = bean.email.indexOf(page.email) >= 0
                }
                return flag;
            });
        }
        let result = data.length > pageSize? data.slice((pageNum - 1) * pageSize, pageNum * pageSize):data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'POST /console/system/user/addOrUpdate': {
        status: 0,
        data: 101
    },
    'POST /console/system/user/delete': {
        status: 0
    },
    'POST /console/system/user/edit': {
        status: 0
    },
    'POST /console/system/user/onOrOff': {
        status: 0
    },
    'GET /console/system/user/listAllUsers': {
        status: 0,
        data: usersData.data
    },

    'GET /console/system/user/listAllRoles': {
        status: 0,
        data:  [
            {
                id: 1,
                name: "r1"
            },{
                id: 2,
                name: "r2"
            },{
                id: 3,
                name: "r3"
            }
        ]
    }
};
