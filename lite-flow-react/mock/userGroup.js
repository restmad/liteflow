var Mock = require('mockjs');
var qs = require('qs');

let ugroupsData = Mock.mock({
    'data|100': [
        {
            'id|+1': 1,
            mobile: /^1[34578]\d{9}$/,
            name: '@cname',
            description: '描述',
            users: [
                {
                    id: 1,
                    name: "user1"
                }, {
                    id: 2,
                    name: "user2"
                }
            ],
            user: {
                id:1,
                name: "lite1"
            }
        }
    ]
});

module.exports = {
    'GET /console/system/ugroup/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = ugroupsData.data;
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
    'POST /console/system/ugroup/addOrUpdate': {
        status: 0,
        data: 101
    },
    'POST /console/system/ugroup/delete': {
        status: 0
    },
    'POST /console/system/ugroup/edit': {
        status: 0
    },
    'POST /console/system/ugroup/onOrOff': {
        status: 0
    },

    'GET /console/system/ugroup/listAllUserGroups': {
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
