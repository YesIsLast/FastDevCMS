import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Page404 from '@/views/error/404.vue'
import NProgress from 'nprogress'
import store from '@/store'
import storage from 'store'
import global from '../global'
Vue.use(VueRouter);

//通过storage资源 修改vuex数据
store.state.SETMODULES = store.getters.MODULES

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: '登录页',
    component: Login
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: "/error/404",
    name: "页面无法访问",
    component: Page404
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});





// 路由全局前置守卫触发
/**
 * to 前往的路由配置
 * from 当前的路由
 * next 回调函数必须执行
 */
router.beforeEach((to, from, next) => {
  NProgress.start()

  //判断资源是否存在，不存在跳转到404
  if (
    to.path !== '/error/404.vue' &&
    to.path !== '/login' &&
    to.path !== '/' &&
    to.path !== '/home/index' &&
    to.path !== '/globalSetting' &&
    store.state.SETMODULES[to.path] === undefined
  ) {
    next('/error/404.vue');
  }
  // 解决菜单路由联动
  // resolveMenuRoute(to.path)

  next() // 必须执行
})






router.afterEach((to, from) => {
  NProgress.done()

  //修改页面TITLE
  document.getElementsByTagName("title")[0].innerText = to.name + " - " + global.title
  //处理面包屑导航
  if (
    to.path !== '/error/404.vue' &&
    to.path !== '/' &&
    to.path !== '/home/index' &&
    to.path !== '/globalSetting/index' &&
    to.path !== '/login' &&
    store.state.SETMODULES[to.path] !== undefined
    ) {
    store.commit("SET_STATE", { key: "breadcrumb", value: getBreadcrumb(to.path).reverse() })
  }
})

// 处理面包屑数据展示
function getBreadcrumb(key) {
  let path
  store.state.SETMODULES[key].path === ""
    ? path = ""
    : path = store.state.SETMODULES[key].path

  let result = [{
    "name": store.state.SETMODULES[key].name,
    "path": path,
    "id": store.state.SETMODULES[key].parentId // 区分面包屑是否为一级菜单
  }],
    children = []
  if (store.state.SETMODULES[key].parentPath !== "") {
    children = getBreadcrumb(store.state.SETMODULES[key].parentPath)
  }

  return result.concat(children)
}

// 处理菜单与路由联动
function resolveMenuRoute(path){
  if(!['/',undefined,"/login","/globalSetting/index","/error/404.vue"].includes(path) && store.state.SETMODULES[path] != undefined){
    console.log("存储store")
    // 联动菜单点击效果
    let routerMenu = store.state.SETMODULES[path] // 当前路由配置
    // 联动菜单组件执行打开与选中菜单功能
    let routerMenuParent = routerMenu.parentPath != ""?store.state.SETMODULES[routerMenu.parentPath]:"" // 当前路由父级配置
    // 存储菜单组件KEY
    store.commit("SET_STATE",{"key":"setDefaultSelectedKey",value: routerMenu.id})
    routerMenu.parentPath?store.commit("SET_STATE",{"key":"setDefaultOpenKey",value: [routerMenuParent.id]}):""
  }
}

export default router
