var Mock = require('mockjs');
var qs = require('qs');

let authsData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            'sourceId|+5': 1,
            'targetId|+6': 1,
            sourceName: '@cname',
            type: 1,
            hasEditAuth: 1,
            hasExecuteAuth: 0,
            createTime: 1540126236000,
            updateTime: 1540126236000,
            user: {
                id: 1,
                name: "lite"
            }
        }
    ]
});
module.exports = {
    'GET /console/auth/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = authsData.data;
        let result = data.length > pageSize? data.slice((pageNum - 1) * pageSize, pageNum * pageSize):data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'POST /console/auth/add': {
        status: 0,
        data: 101
    },
    'POST /console/auth/delete': {
        status: 0
    },

    'POST /console/auth/update': {
        status: 0
    }
};
