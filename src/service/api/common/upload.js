import request from '@/service/request'
import cType from '@/common/translateServerType'
import utils from '@/utils'

export default (data= utils.throwIfMissing()) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/uploadFileBase',
            method: 'post',
            data
        }).then(res => {
            if (res.type == 10010) {
                reject("请求成功但是想提示一下！")
                resolve(true)
            } else {
                reject("请求失败")
            }
        })
    })
}