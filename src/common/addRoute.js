import router from '@/router'
export default ( modules ) => {
    let serverRoute = [{
        path: '/home/index',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
      path: '/globalSetting/index',
      name: '全局设置',
      component: () => import('../views/globalSetting/index.vue')
    }]
    for (let i in modules){
        // 判断root菜单类型并且存在父级
        if(
            modules[i].type === 'root' &&
            modules[i].parentId !== 0
        ){
            serverRoute.push({
                path: modules[i].path,
                name: modules[i].name,
                component: () => import('../views' + modules[i].path + '/index.vue')
            })
        }
        // 增加单层菜单时增加下方判断，防止bug
        // else if (modules[i].parentId == 0 && modules[i].type === 'root') {
        //     serverRoute.push({
        //         path: modules[i].path,
        //         name: modules[i].name,
        //         component: () => import('../views' + modules[i].path + '/index.vue')
        //     })
        // }
    }
    let routerArray = {
        path: '/home',
        component: () => import('../views/Home.vue'),
        children:serverRoute
    }
    router.addRoutes( [routerArray] )
}