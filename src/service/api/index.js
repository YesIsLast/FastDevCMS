import login from './work/login'
import serverStatus from './work/serverStatus'
import yzmCode from './work/yzmCode'
import insert from "./common/insert";
import update from "./common/update";
import search from "./common/search";
import list from "./common/list";
import remove from "./common/remove";
import upload from "./common/upload";

import updatePassword from './SysUser/updatePassword'

export default {
    // 公共接口部分
    insert, // 公共接口添加
    update, // 公共接口修改
    search, // 公共接口搜索
    list, // 公共接口列表
    remove, // 公共接口删除
    upload, // 公共接口上传
    // 私有接口部分
    serverStatus, //服务器状态
    yzmCode, // 验证码
    login, // 登录接口
    updatePassword, // 修改当前用户密码
}