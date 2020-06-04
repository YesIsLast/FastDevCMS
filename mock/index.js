//全局应用
global.config = require('./config')
global.modules = require('./modules')

//模块引入
const Koa = require('koa'),
      router = require('koa-router')(),
      cors = require('koa2-cors'),
      serve = require('koa-static'),
      formidable = require('koa2-formidable')


router.post('/update',(ctx) => {
        console.log(ctx.request.body);
        // let {body, files} = ctx.request
        ctx.body = JSON.stringify(ctx.request.body);
    }
);

//route

// 获取后端版本号
router.get('/api/work/serverStatus',  require('./api/work/serverStatus'))
router.get('/api/work/yzmCode',  require('./api/work/yzmCode'))
router.post('/api/work/login',  require('./api/work/login'))
// 人员管理
router.get('/api/SysUser/list',  require('./api/SysUser/list'))
router.post('/api/SysUser/add',  require('./api/SysUser/insert'))
router.put('/api/SysUser/update',  require('./api/SysUser/update'))
router.delete('/api/SysUser/delete',  require('./api/SysUser/remove'))
router.get('/api/SysUser/show',  require('./api/SysUser/search'))
router.put('/api/SysUser/update/pwd',  require('./api/SysUser/updatePassword'))
// 用户组管理
router.get('/api/SysGroup/list',  require('./api/SysGroup/list'))
router.post('/api/SysGroup/add',  require('./api/SysGroup/insert'))
router.put('/api/SysGroup/update',  require('./api/SysGroup/update'))
router.delete('/api/SysGroup/delete',  require('./api/SysGroup/remove'))
router.get('/api/SysGroup/show',  require('./api/SysGroup/search'))
// 资源菜单管理
router.get('/api/SysRes/list',  require('./api/SysRes/list'))
router.post('/api/SysRes/add',  require('./api/SysRes/insert'))
router.put('/api/SysRes/update',  require('./api/SysRes/update'))
router.delete('/api/SysRes/delete',  require('./api/SysRes/remove'))
router.get('/api/SysRes/show',  require('./api/SysRes/search'))



//# koa业务
const app = new Koa()

app.use(cors())
app.use(formidable ({ multiples: true, uploadDir: __dirname + '/update' }))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve(__dirname + "/static"))

app.listen(9002, () => {
    console.log('starting at port 9002')
})