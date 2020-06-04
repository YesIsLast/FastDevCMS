function version(ctx, next) {
    ctx.body = {
        "code":"200",
        "data":{
            "type":10010,
            "sysRes":{
                "createTime":1585102526218,
                "iconCls":"gold",
                "id":14,
                "name":"系统管理",
                "parentId":0,
                "parentPath":"",
                "path":"/system",
                "remark":"",
                "sort":1,
                "status":false,
                "type":"root"
            }
        }
    }
}
module.exports = version