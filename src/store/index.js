import global from '../global.json'
import Vue from 'vue'
import Vuex from 'vuex'
// import storage from 'localforage'
import storage from 'store'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        LOADING: false, //全局loading
        globalMessage:'',//全局提示
        // MENU:'', // 菜单配置
        SETMENU:'',
        SETUSER:'', // 用户信息
        SETTOKEN:'',
        SETMODULES:"",
        setDefaultSelectedKey:[],
        setDefaultOpenKey:[],
        serverDatetime:'',
        version:'',
        breadcrumb:"", // 路由配置中处理面包屑数据展示
        SETOPENKEYS:[],//左侧菜单栏，打开的程度,
        // 用户配置
        SETUSERCONFIG:{
            pageCount:10, // 表格页数
        }
    },
    getters: {
        MENU: state => {
            return state.SETMENU || storage.get('SETMENU')
        },
        USER: state => {
            return state.SETUSER || storage.get('SETUSER')
        },
        TOKEN: state => {
            return state.SETTOKEN || storage.get('SETTOKEN')
        },
        MODULES: state => {
            return state.SETMODULES || storage.get('SETMODULES')
        },
        defaultSelectedKey:state => {
            if( storage.get('setDefaultSelectedKey') === undefined){
                return state.setDefaultSelectedKey
            }else{
                return [storage.get('setDefaultSelectedKey')]
            }
        },
        defaultOpenKey:state => {
            if( storage.get('setDefaultOpenKey') === undefined){
                return state.setDefaultOpenKey
            }else{
                return storage.get('setDefaultOpenKey')
            }

        },
        USERCONFIG: state => {
            return state.SETUSERCONFIG || storage.get('SETUSERCONFIG')
        },
    },
    mutations: {
        /***
         * 全局提示方法
         * @param state
         * @param r = { "message":"消息内容" , "level":"success|error|info|warning|warn|loading"}
         * @constructor
         * 使用方法
             store.commit('SET_MESSAGE',{
                "message" : error.message,
                "level" : "warn"
             })
         */
        SET_MESSAGE(state, r){
            state.globalMessage = {
                "message": r.message,
                "level": r.level
            }
        },
        //修改vuex 中 state
        SET_STATE (state, ins){
            state[ins.key] = ins.value
            storage.set(ins.key, ins.value)
        },
    },
    actions: {},
    modules: {}
})
