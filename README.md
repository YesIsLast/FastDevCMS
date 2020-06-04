# FastDevCMS 快速开发后台管理系统(脚手架)

开发团队（我们俩）

是一套基于[vue](https://github.com/vuejs/vue)和[antd](https://www.antdv.com/docs/vue/introduce-cn/)的一套中前端平台

仍在开发阶段

./service 是基于koa2的mock系统

所有后端通信业务都是基于 ./src/service 完成。

## 安装与运行

```shell
npm install
npm install supervisor -g
```

### 开发环境
```shell
npm run serve
```

### 打包环境
```shell
npm run build
```

### 服务端
```shell
npm install supervisor -g
npm run dev
或
cd mock
npm run dev
```
