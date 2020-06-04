import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局加载ant，优化点：按需加载减少体积
// import Antd from 'ant-design-vue'
import Antd from './assets/plugin/ant-desgin-vue 1.5.0rc3'
import './assets/plugin/ant-desgin-vue 1.5.0rc3/dist/antd.css'
Vue.use(Antd)

//全局引入基础样式库
import './assets/css/format.less'
import './assets/css/wos.less'

//全局页面进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局请求服务
import service from './service'
Vue.prototype.$service = service

// 全局组件注册
import pictureUpload from './components/pictureUpload/index'
import treeResource from './components/treeResource/index'

Vue.component('pictureUpload', pictureUpload)
Vue.component('treeResource', treeResource)

//多语言管理
import lang from './common/zh-cn.js'
Vue.prototype["$lang"] = lang

//翻译服务端返回的Type值
import cType from './common/translateServerType.js'
Vue.prototype["$cType"] = cType

//全局混入
import { globalMixins } from './mixins/global.js'
Vue.mixin( globalMixins )

//全局的原生方法
import utils from './utils'
Vue.prototype.$utils = utils


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
