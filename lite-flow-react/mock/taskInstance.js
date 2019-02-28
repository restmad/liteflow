var Mock = require('mockjs');
var qs = require('qs');

let tasksData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            'taskId|+100': 1,
            'taskVersionId|+1000': 1,
            taskVersionNo: 20181228,
            status: 1,
            finalStatus: 1,
            'executorJodId|+10000': 1,
            logicRunTime: 1540126236000,
            runStartTime: 1540126236000,
            runEndTime: 1540126236000,
            createTime: 1540126236000,
            updateTime: 1540126236000
        }
    ]
});
let dependencyData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            'upstreamTaskId|+100': 1,
            'upstreamTaskName': "@cname",
            upstreamTaskVersion: {
                id: 1,
                versionNo: 20180101,
                status: 1,
                finalStatus: 1,
                msg: "success"
            },
            status: 1,
            createTime: 1540126236000,
            updateTime: 1540126236000
        }
    ]
});
module.exports = {
    'GET /console/instance/list': function (req, res) {
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
    'GET /console/instance/log': {
        status: 0,
        data: "instanceLog"
    },
    'GET /console/instance/versionLog': {
        status: 0,
        data: "versionLog"
    },

    'GET /console/instance/dependencies': {
        status: 0,
        data: dependencyData.data
    }
};
