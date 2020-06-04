import request from '@/service/request'
import store from '@/store'
import utils from '@/utils'
import cType from '@/common/translateServerType'
import addRoute from '@/common/addRoute'
import storage from 'store'
/***
 * 通用登录接口
 * developer:wos / 2019-12-28
 */
function login( data = utils.throwIfMissing() ) {
    return new Promise((resolve,reject) =>{
        //规范化判断
        if( data.userName === "" || data.password === "" ){
            reject(cType('10006'))
        }

        if( data.code === ""){
            reject(cType('10008'))
        }
        // 登录前清除浏览器缓存
        storage.clearAll()
        request({
            url: '/work/login',
            method: 'post',
            data
        }).then( res => {

            if(res.type === 10006){
                storage.clearAll()
                res.modules = JSON.parse(res.sysGroup.jsonContent)

                store.commit("SET_STATE", {key:"SETTOKEN", value:res.token})
                store.commit("SET_STATE", {key:"SETUSER", value:res.user})
                store.commit("SET_STATE", {key:"SETMODULES", value:res.modules})

                //添加动态路由
                addRoute( res.modules )
                //添加动态菜单
                store.commit("SET_STATE", {key:"SETMENU", value:getMenu(res.modules,0)})
                
                //清除默认打开的MENU菜单
                store.state.setDefaultSelectedKey =  res.modules['/home'].id
                store.state.setDefaultOpenKey = []
                storage.set("setDefaultSelectedKey", res.modules['/home'].id )
                storage.set("setDefaultOpenKey",[])
                resolve(true)
            }else{
                reject(cType(res.type))
            }
        })
    })
}
// 菜单数据组织并排序显示
function getMenu(modules, parentId){
    let result = []
    for(let i in modules){
        if( modules[i].type === 'root' && modules[i].parentId === parentId){
            let children = getMenu(modules, modules[i].id)
            if (children.length > 0 ){
                modules[i].children = getMenu(modules, modules[i].id)
            }
            result.push( modules[i] )
        }
    }
    return result.sort(utils.sortByASC).reverse()
}
export default login
