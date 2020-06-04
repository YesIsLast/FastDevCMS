import sysGroup from '../SysGroup/update'
import sysRes from '../SysRes/update'
import sysUser from '../SysUser/update'

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
