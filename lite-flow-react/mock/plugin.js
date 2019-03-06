var Mock = require('mockjs');
var qs = require('qs');

let pluginsData = Mock.mock({
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
            container: {
                id: 1,
                name: "container"
            },
            createTime: 1540126236000,
            updateTime: 1540126236000
        }
    ]
});
module.exports = {
    'GET /executor/plugin/list': function (req, res) {
        const page = qs.parse(req.query);

        let pageSize = page.pageSize;
        let pageNum = page.pageNum;
        if (!pageSize) {
            pageSize = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        let data = pluginsData.data;
        let result = data.length > pageSize ? data.slice((pageNum - 1) * pageSize, pageNum * pageSize) : data.slice();
        res.json({
            status: 0,
            data: result,
            total: data.length
        })
    },
    'POST /executor/plugin/addOrUpdate': {
        status: 0,
        data: 101
    },
    'POST /executor/plugin/on': {
        status: 0
    },
    'POST /executor/plugin/off': {
        status: 0
    },
    'GET /executor/common/getAllValidPlugin': {
        status: 0,
        data:  [
            {
                "container": {
                    "name": "Noop",
                    "id": 1
                },
                "name": "Noop",
                "description": "无操作容器",
                "id": 1,
                "fieldConfig": [

                ],
                "containerId": 1,
                "status": 1
            },
            {
                "container": {
                    "name": "Shell",
                    "id": 2
                },
                "name": "ShellScript",
                "description": "linux shell脚本",
                "id": 2,
                "fieldConfig": [
                    {
                        "editable": true,
                        "defaultValue": "",
                        "name": "command",
                        "label": "shell",
                        "type": "Input",
                        "required": true
                    }
                ],
                "containerId": 2,
                "status": 1
            },
            {
                "container": {
                    "name": "JAVA_PROCESS",
                    "id": 3
                },
                "name": "JavaProcess",
                "description": "java进程",
                "id": 3,
                "fieldConfig": [
                    {
                        "help": "jar路径",
                        "children": [
                            {
                                "name": "123",
                                "id": 1
                            }
                        ],
                        "editable": false,
                        "defaultValue": "123",
                        "name": "mainJarPath",
                        "label": "jar路径",
                        "type": "Input",
                        "required": true
                    },
                    {
                        "help": "main所在函数类名",
                        "children": [
                            {
                                "name": "123",
                                "id": 1
                            }
                        ],
                        "editable": false,
                        "defaultValue": "",
                        "name": "mainClass",
                        "label": "主类",
                        "type": "Input",
                        "required": true
                    },
                    {
                        "help": "jvm 参数",
                        "children": [
                            {
                                "name": "123",
                                "id": 1
                            }
                        ],
                        "editable": false,
                        "defaultValue": "",
                        "name": "jvmArgs",
                        "label": "jvm参数",
                        "type": "Input",
                        "required": true
                    }
                ],
                "containerId": 3,
                "status": 1
            }
        ]
    }
};
