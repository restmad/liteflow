var Mock = require('mockjs');
var qs = require('qs');

let tasksData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            'taskId|+100': 1,
            name: '@cname',
            versionNo: 20181228,
            status: 1,
            finalStatus: 1,
            retryNum: 3,
            logicRunTime: 1540126236000,
            runStartTime: 1540126236000,
            runEndTime: 1540126236000,
            createTime: 1540126236000,
            updateTime: 1540126236000,
            description: '@cname',
        }
    ]
});
module.exports = {
    'GET /console/version/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = tasksData.data;
        let result = data.length > pageSize? data.slice((pageNum - 1) * pageSize, pageNum * pageSize):data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'GET /console/version/fix': {
        status: 0,
        data: 101
    },
    'POST /console/version/rangFix': {
        status: 0,
    },
    'GET /console/version/ignore': {
        status: 0
    },

    'GET /console/version/kill': {
        status: 0
    }
};
