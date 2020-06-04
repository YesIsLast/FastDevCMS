import sysGroup from '../SysGroup/insert'
import sysRes from '../SysRes/insert'
import sysUser from '../SysUser/insert'

export default (moduleName,data) => {
    if(moduleName == "sysGroup"){
        return sysGroup(data)
    }else if(moduleName == "sysRes"){
        return sysRes(data)
    }else if(moduleName == "sysUser"){
        return sysUser(data)
    }else{
        console.log("未找到所属模块，请确认后重新请求！")
    }
}
