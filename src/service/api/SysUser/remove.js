import request from '@/service/request'
import cType from '@/common/translateServerType'
import utils from '@/utils'
import store from "../../../store";

/**
 * 系统人员管理
 * 删除
 * @param data
 * @returns {Promise<unknown>}
 */
export default (data = utils.throwIfMissing()) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/SysUser/delete',
            method: 'delete',
            data
        }).then(res => {
            if (res.type) {
                if (res.type == 10010) {
                    store.commit('SET_MESSAGE',{
                        "message" : cType(res.type),
                        "level" : "success"
                    })
                    resolve(true)
                } else {
                    reject(cType(res.type))
                }
            } else {
                reject(cType(99999))
            }
        })
    })
}