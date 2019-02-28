var Mock = require('mockjs');
var qs = require('qs');

let serversData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            name: '@cname',
            ip: '@cname',
            description: '@cname',
            status: 1,
            user: {
                id: 1,
                name: "lite"
            },
            createTime: 1540126236000,
            updateTime: 1540126236000
        }
    ]
});
module.exports = {
    'GET /executor/server/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = serversData.data;
        let result = data.length > pageSize ? data.slice((pageNum - 1) * pageSize, pageNum * pageSize) : data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'POST /executor/server/addOrUpdate': {
        status: 0,
        data: 101
    },
    'POST /executor/server/on': {
        status: 0
    },
    'POST /executor/server/off': {
        status: 0
    }
};
