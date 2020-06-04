// 页面按钮级权限控制字段,(可以在后期每新增一个菜单附带增加配套得按钮级资源)
const permissionsBtn = {
    // 系统管理模块
    "system":{
        // 用户组模块
        "group":{
            "search":"/system/group/searchBtn",
            "insert":"/system/group/insertBtn",
            "update":"/system/group/updateBtn",
            "delete":"/system/group/deleteBtn",
            "setting":"/system/group/settingBtn"
        },
        // 资源菜单模块
        "resource":{
            "search":"/system/resource/searchBtn",
            "insert":"/system/resource/insertBtn",
            "update":"/system/resource/updateBtn",
            "delete":"/system/resource/deleteBtn",
            "setting":"/system/resource/settingBtn"
        },
        // 人员管理模块
        "user":{
            "search":"/system/user/searchBtn",
            "insert":"/system/user/insertBtn",
            "update":"/system/user/updateBtn",
            "delete":"/system/user/deleteBtn",
            "setting":"/system/user/settingBtn"
        }
    },
    // 帮助文档模块
    "help":{
        // 操作日志模块
        "log":{
            "search":"/help/log/searchBtn",
            "insert":"/help/log/insertBtn",
            "update":"/help/log/updateBtn",
            "delete":"/help/log/deleteBtn",
            "setting":"/help/log/settingBtn"
        }
    }
}
/**
 * F1 一层菜单名称 （system）
 * F2 二层菜单名称 （group）
 * F3 按钮功能类型 search、insert、update、delete
 */
export default (MODULES,F1,F2,F3)=>{
    // 按钮级权限控制
    if(MODULES.hasOwnProperty(permissionsBtn[F1][F2][F3])){
        return true
    }
    return false
}