var Mock = require('mockjs');
var qs = require('qs');

let flowsData = Mock.mock({
    'data|20': [
        {
            'id|+1': 1,
            name: '@cname',
            description: '@cname',
            status: 1,
            user: {
                id: 1,
                userName: "lite"
            },
            createTime: 1540126236000,
            updateTime: 1540126236000
        }
    ]
});
module.exports = {
    'GET /console/flow/fix/getLatestVersionNos': {
        status: 0,
        data: [
            20190301,
            20190302,
            20190303
        ]
    },
    'GET /console/flow/fix/getHeadTaskVersionNos': {
        status: 0,
        data: [
            20190301,
            20190302,
            20190303
        ]
    },
    'GET /console/flow/fix/viewDag': {
        status: 0,
        data: {
            "links": [
                {
                    "versionId": 2,
                    "upstreamVersionId": 1
                },
                {
                    "versionId": 3,
                    "upstreamVersionId": 1
                },
                {
                    "versionId": 4,
                    "upstreamVersionId": 2
                },
                {
                    "versionId": 4,
                    "upstreamVersionId": 3
                },
                {
                    "versionId": 4,
                    "upstreamVersionId": 5
                }
            ],
            "nodes": [
                {
                    "id": 1,
                    "versionNo": 20190302,
                    "taskId": 1,
                    "taskName": "t1",
                    "taskPeriod": 2,
                    "taskDescription": "description",
                    "taskCronExpression": "0 6 * * ?",
                    "status": 1,
                    "finalStatus": -1,


                },
                {
                    "id": 2,
                    "versionNo": 20190302,
                    "taskId": 2,
                    "taskName": "t2",
                    "period": 2,
                    "cronExpression": "45 4 * * ?",
                    "status": 1,
                    "finalStatus": 0
                },
                {
                    "id": 3,
                    "versionNo": 20190302,
                    "taskId": 3,
                    "taskName": "t3",
                    "taskPeriod": 2,
                    "taskDescription": "description",
                    "taskCronExpression": "0 6 * * ?",
                    "status": 0,
                    "finalStatus": 1

                },
                {
                    "id": 4,
                    "versionNo": 20190302,
                    "taskId": 4,
                    "taskName": "t4",
                    "taskPeriod": 2,
                    "taskDescription": "description",
                    "taskCronExpression": "0 6 * * ?",
                    "status": -1,
                    "finalStatus": 1
                },
                {
                    "id": 5,
                    "versionNo": 20190302,
                    "taskId": 5,
                    "taskName": "t5",
                    "taskPeriod": 2,
                    "taskDescription": "description",
                    "taskCronExpression": "0 6 * * ?",
                    "status": 0,
                    "finalStatus": 0,
                }
            ]
        }
    },
    'GET /console/flow/fix/fixFlow': {
        status: 0
    },
    'GET /console/flow/fix/fixFromNode': {
        status: 0
    }
};
