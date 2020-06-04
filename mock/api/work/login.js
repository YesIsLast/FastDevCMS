function main(ctx, next) {
    console.log(ctx.request.query)
    // ctx.status = 500
    ctx.body = {
        "code": "200",
        "data": {
            "type": 10006,
            "user": {
                "createTime": 0,
                "deleted": false,
                "deptId": 1,
                "groupId": 2,
                "id": 1,
                "ip": "0",
                "lastTime": 1585131701995,
                "password": "e10adc3949ba59abbe56e057f20f883e",
                "sysLevel": true,
                "userName": "admin"
            },
            "sysGroup": {
                "createTime": 0,
                "id": 2,
                "jsonContent": "{\"/system/resource/searchBtn\":{\"createTime\":1585128777584,\"iconCls\":\"\",\"id\":43,\"name\":\"搜索按钮\",\"parentId\":15,\"parentPath\":\"/system/resource\",\"path\":\"/system/resource/searchBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/resource/deleteBtn\":{\"createTime\":1585128742140,\"iconCls\":\"\",\"id\":42,\"name\":\"删除按钮\",\"parentId\":15,\"parentPath\":\"/system/resource\",\"path\":\"/system/resource/deleteBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/resource/updateBtn\":{\"createTime\":1585128704787,\"iconCls\":\"\",\"id\":41,\"name\":\"修改按钮\",\"parentId\":15,\"parentPath\":\"/system/resource\",\"path\":\"/system/resource/updateBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/resource/insertBtn\":{\"createTime\":1585128670772,\"iconCls\":\"\",\"id\":40,\"name\":\"新增按钮\",\"parentId\":15,\"parentPath\":\"/system/resource\",\"path\":\"/system/resource/insertBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/help/log/searchBtn\":{\"createTime\":1585120052041,\"iconCls\":\"\",\"id\":34,\"name\":\"搜索\",\"parentId\":19,\"parentPath\":\"/help/log\",\"path\":\"/help/log/searchBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/user/searchBtn\":{\"createTime\":1585119202132,\"iconCls\":\"\",\"id\":32,\"name\":\"搜索\",\"parentId\":16,\"parentPath\":\"/system/user\",\"path\":\"/system/user/searchBtn\",\"remark\":\"\",\"sort\":1,\"status\":true,\"type\":\"ctrl\"},\"/system/user/deleteBtn\":{\"createTime\":1585119176810,\"iconCls\":\"\",\"id\":31,\"name\":\"删除\",\"parentId\":16,\"parentPath\":\"/system/user\",\"path\":\"/system/user/deleteBtn\",\"remark\":\"\",\"sort\":1,\"status\":true,\"type\":\"ctrl\"},\"/system/user/updateBtn\":{\"createTime\":1585119163080,\"iconCls\":\"\",\"id\":30,\"name\":\"修改\",\"parentId\":16,\"parentPath\":\"/system/user\",\"path\":\"/system/user/updateBtn\",\"remark\":\"\",\"sort\":1,\"status\":true,\"type\":\"ctrl\"},\"/system/user/insertBtn\":{\"createTime\":1585119138410,\"iconCls\":\"\",\"id\":29,\"name\":\"新增\",\"parentId\":16,\"parentPath\":\"/system/user\",\"path\":\"/system/user/insertBtn\",\"remark\":\"\",\"sort\":1,\"status\":true,\"type\":\"ctrl\"},\"/system/group/updateBtn\":{\"createTime\":1585111126869,\"iconCls\":\"update\",\"id\":24,\"name\":\"修改按钮\",\"parentId\":17,\"parentPath\":\"/system/group\",\"path\":\"/system/group/updateBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/group/deleteBtn\":{\"createTime\":1585110829539,\"iconCls\":\"delete\",\"id\":23,\"name\":\"删除按钮\",\"parentId\":17,\"parentPath\":\"/system/group\",\"path\":\"/system/group/deleteBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/group/settingBtn\":{\"createTime\":1585110796550,\"iconCls\":\"setting\",\"id\":22,\"name\":\"配置按钮\",\"parentId\":17,\"parentPath\":\"/system/group\",\"path\":\"/system/group/settingBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/help/log\":{\"createTime\":1585102743664,\"iconCls\":\"hdd\",\"id\":19,\"name\":\"操作日志\",\"parentId\":18,\"parentPath\":\"/help\",\"path\":\"/help/log\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"root\"},\"/system/group\":{\"createTime\":1585102658703,\"iconCls\":\"hdd\",\"id\":17,\"name\":\"用户组管理\",\"parentId\":14,\"parentPath\":\"/system\",\"path\":\"/system/group\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"root\"},\"/system/user\":{\"createTime\":1585102623125,\"iconCls\":\"hdd\",\"id\":16,\"name\":\"人员管理\",\"parentId\":14,\"parentPath\":\"/system\",\"path\":\"/system/user\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"root\"},\"/system/resource\":{\"createTime\":1585102578219,\"iconCls\":\"hdd\",\"id\":15,\"name\":\"资源菜单\",\"parentId\":14,\"parentPath\":\"/system\",\"path\":\"/system/resource\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"root\"},\"/system\":{\"createTime\":1585102526218,\"iconCls\":\"gold\",\"id\":14,\"name\":\"系统管理\",\"parentId\":0,\"parentPath\":\"\",\"path\":\"/system\",\"remark\":\"\",\"sort\":998,\"status\":false,\"type\":\"root\"},\"/home\":{\"createTime\":1585102442838,\"iconCls\":\"home\",\"id\":13,\"name\":\"控制台\",\"parentId\":0,\"parentPath\":\"\",\"path\":\"/home\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"root\"},\"/help\":{\"createTime\":0,\"iconCls\":\"snippets\",\"id\":18,\"name\":\"帮助文档\",\"parentId\":0,\"parentPath\":\"\",\"path\":\"/help\",\"remark\":\"\",\"sort\":999,\"status\":false,\"type\":\"root\"},\"/system/group/insertBtn\":{\"createTime\":0,\"iconCls\":\"add\",\"id\":20,\"name\":\"新增按钮\",\"parentId\":17,\"parentPath\":\"/system/group\",\"path\":\"/system/group/insertBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"},\"/system/group/searchBtn\":{\"createTime\":0,\"iconCls\":\"\",\"id\":39,\"name\":\"搜索按钮\",\"parentId\":17,\"parentPath\":\"/system/group\",\"path\":\"/system/group/searchBtn\",\"remark\":\"\",\"sort\":1,\"status\":false,\"type\":\"ctrl\"}}",
                "name": "超级管理员",
                "updateTime": 0
            },
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjoxLFwicGFzc3dvcmRcIjpcImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlXCIsXCJ1c2VyTmFtZVwiOlwiYWRtaW5cIn19IiwianNvblN0ciI6IntcInVzZXJcIjp7XCJpZFwiOjEsXCJwYXNzd29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInVzZXJOYW1lXCI6XCJhZG1pblwifX0iLCJleHAiOjE1ODUxNjc3MDIsImlhdCI6MTU4NTEzMTcwMiwia2V5IjoiU1VOUElORzEyM0AhIiwianRpIjoiNmYyZDEyY2EtOWE3Ny00NjViLWIzNWUtN2ZiNTYzMGJhYzUwIn0.RM9sdxyJRewZnsIKqcV8hbuvBQIge4v_JSrfC6fDDJ8"
        }

    }
}
module.exports = main
