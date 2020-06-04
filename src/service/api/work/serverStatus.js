/***
 * 获取服务器状态
 * @param data
 */

import service from '@/service/request'
import store from '@/store'

export default (data) => {
    service({
        url: '/work/serverStatus',
        method: 'get',
        data
    })
        .then( res =>{
            store.state.serverDatetime = res.datetime //更新服务器时间
            store.state.version = res.version //更新服务器版本号
        })
}
