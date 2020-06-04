import router from '@/router'
export default ( modules ) => {
    let serverRoute = [{
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
      path: '/globalSetting',
      name: 'globalSetting',
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
    // 根路由名称更改为layout防止home同名歧义
    let routerArray = {
        path: '/layout',
        component: () => import('../views/Home.vue'),
        children:serverRoute
    }
    router.addRoutes( [routerArray] )
}