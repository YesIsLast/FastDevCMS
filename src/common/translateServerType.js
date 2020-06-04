//翻译服务端返回的Type值

const translate = {
    "99999":"服务器错误，请联系管理员!",
    "100":"/login",
    "10000":'请填写验证码后重新登录',
    "10002":"您输入的验证码不正确，请重新输入",
    "10003":"参数不全",
    "10004":"您输入的用户名或密码不正确，请重新输入",
    "10005":"无权限登陆",
    "10006":"登录成功",
    "10008":"名称重复",
    "10010":"操作成功",
    "10012":"操作失败",
    "10013":"存在子菜单，禁止删除",
    "10014":"原密码不对"
}

export default  (type) => {
    return translate[type]
}