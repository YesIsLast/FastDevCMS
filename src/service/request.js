import axios from 'axios'
import global from '../global.json'
// import qs from "qs"
import store from '../store'

let request = axios.create({
    baseURL: global.baseURL,    // api的base_url
    timeout: global.timeout     // 请求超时时间
})
axios.defaults.headers.post['Content-Type'] = 'application/json';

const debug =  false // 关闭后，不显示路由相关信息，用于调试

const loadingOtherUrl = [
    "/work/yzmCode"
]
/****** 请求拦截器 ******/
request.interceptors.request.use(
    config => {
        if( loadingOtherUrl.indexOf(config.url) === -1) store.state.LOADING = true

        let token = store.getters.TOKEN
        let requestFormatData = config.data
        config.method === 'get'
            ? config.params = {...config.data}
            : config.data = {"data":requestFormatData}

        config.headers['token'] = token
        config.headers['Content-Type'] = 'application/json';
        if (debug === true)
            console.log( '====> ', config )
    return config
}, error => {  //请求错误处理
        if (debug === true)
            console.log('Request\'s error')
    return Promise.reject(error)
})

/****** 返回拦截器  ******/
request.interceptors.response.use(
    response => {  //成功请求到数据
        if (debug === true)
            console.log('<==== ',response)
        sended()
        if ( parseInt( response.data.code ) === 200){
            return Promise.resolve(response.data.data)
        }else{
            store.commit('SET_MESSAGE',{
                "message" : response.data.msg,
                "level" : "info"
            })
        }
    },
    error => {  //响应错误处理
        if (debug === true)
            console.error('Response\'s error')
        sended()
        // store.state.globalMessage =
        store.commit('SET_MESSAGE',{
            "message" : error.message,
            "level" : "warn"
        })
        Promise.reject(false)
    }
)

function sended(){
    store.state.LOADING = false
}

export default request
