/***
 * 获取服务器状态
 * @param data
 */

import service from '@/service/request'

export default async (data) => {
    return await service({
        url: '/work/yzmCode',
        method: 'get',
        data
    })
}
