var Mock = require('mockjs');
var qs = require('qs');

let exeJobsData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            name: '@cname',
            applicationId: '@cname',
            'executorId|+1': 1,
            status: 1,
            callbackStatus: 1,
            createTime: 1540126236000,
            updateTime: 1540126236000,
            startTime: 1540126236000,
            endTime: 1540126236000,
        }
    ]
});
module.exports = {
    'GET /executor/exeJob/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = exeJobsData.data;
        let result = data.length > pageSize ? data.slice((pageNum - 1) * pageSize, pageNum * pageSize) : data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'POST /executor/exeJob/addOrUpdate': {
        status: 0,
        data: 101
    },
    'POST /executor/exeJob/on': {
        status: 0
    },
    'POST /executor/exeJob/off': {
        status: 0
    }
};
