var Mock = require('mockjs');
var qs = require('qs');

let rolesData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            name: '@cname',
            description: '@cname',
            auths: [
                {
                    id:1,
                    name: "a1"
                },{
                    id:2,
                    name: "a2"
                }
            ]
        }
    ]
});

module.exports = {
    'GET /console/system/role/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = rolesData.data;
        let result = data.length > pageSize? data.slice((pageNum - 1) * pageSize, pageNum * pageSize):data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'POST /console/system/role/addOrUpdate': {
        status: 0,
        data: 101
    },
    'POST /console/system/role/delete': {
        status: 0
    },

    'POST /console/system/role/update': {
        status: 0
    },
    'GET /console/system/role/listAllAuths': {
        status: 0,
        data:  [
            {
                id:1,
                name: "a1"
            },{
                id:2,
                name: "a2"
            },{
                id:3,
                name: "a4"
            }
        ]
    }
};



