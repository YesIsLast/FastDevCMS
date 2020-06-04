import request from '@/service/request'
import cType from '@/common/translateServerType'
import utils from '@/utils'
import store from "../../../store";

/**
 * 系统人员管理
 * 搜索
 * @param data
 * @returns {Promise<unknown>}
 */
export default (data = utils.throwIfMissing()) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/SysUser/show',
            method: 'get',
            data
        }).then(res => {
            if (res.type) {
                if (res.type == 10010) {
                    resolve(res.sysUser)
                } else {
                    reject(cType(res.type))
                }
            } else {
                reject(cType(99999))
            }
        })
    })
}