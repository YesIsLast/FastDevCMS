import request from '@/service/request'
import cType from '@/common/translateServerType'
import utils from '@/utils'
import store from "../../../store";

/**
 * 系统人员管理
 * 列表
 * @param data
 * @returns {Promise<unknown>}
 */
export default (data = utils.throwIfMissing()) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/SysUser/list',
            method: 'get',
            data
        }).then(res => {
            if (res.type) {
                if (res.type == 10010) {
                    res.list.forEach(item => {
                        item.key = item.id
                        item.sex == 1 ? item.sex = "男" : item.sex = "女"
                    })
                    resolve(res.list)
                } else {
                    reject(cType(res.type))
                }
            } else {
                reject(cType(99999))
            }
        })
    })
}