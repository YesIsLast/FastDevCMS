import request from '@/service/request'
import cType from '@/common/translateServerType'
import utils from '@/utils'
import store from "../../../store";

/**
 * 用户组管理
 * 获取单条数据
 * @param data
 * @returns {Promise<unknown>}
 */
export default (data = utils.throwIfMissing()) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/SysGroup/show',
            method: 'get',
            data
        }).then(res => {
            if (res.type) {
                if (res.type == 10010) {
                    resolve(res.sysGroup)
                } else {
                    reject(cType(res.type))
                }
            } else {
                reject(cType(99999))
            }
        })
    })
}