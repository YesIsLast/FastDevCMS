import request from '@/service/request'
import cType from '@/common/translateServerType'
import utils from '@/utils'
import store from "../../../store";

/**
 * 资源菜单管理
 * 列表
 * @param data
 * @returns {Promise<unknown>}
 */
export default (data= utils.throwIfMissing()) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/SysRes/list',
            method: 'get',
            data
        }).then(res => {
            if (res.type) {
                if (res.type == 10010) {
                    resolve(res.list)
                }else{
                    reject(cType(res.type))
                }
            }else{
                reject(cType(99999))
            }
        })
    })
}