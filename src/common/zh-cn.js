import global from '../global'
export default  {
    'title': global.title,
    'domain':'ttxxpp.com',
    "login":[
        "请输入用户名",
        "请输入密码",
        "记住用户名",
        "纯净登录",
        "登录系统",
        "忘记密码",

        "请输入右侧验证码",
        "欢迎登陆",
        "修改密码",
        "密码",
        "请输入",
        
        "原",
        "新",
        "确认",
        "请确认",
        "两次密码输入不一致！"
        
    ],
    // 表单/按钮字典 $lang.add($lang.form[0],$lang.form[0],)
    "form":[
        "新增",
        "修改",
        "删除",
        "搜索",
        "取消",
        "确定",

        "全部",
        "图标",
        "权限",
        "备注",
        "用户",

        "ID",
        "配置",
        "名称",
        "类型"
    ],
    // 页面常用字典 $lang.add($lang.dic[0],$lang.dic[0])
    "dic":[
        "资源",
        "用户组",
        "用户",
        "是否确定删除？",
        "父",
        "子",

        "根",
        "用户名",
        "联系电话",
        "排序",
        "备注",

        "请输入",
        "全局设置",
        "修改登录密码",
        "退出系统",
        "个人信息",

        "",
    ],
    "page404":[
      "404:未找到对应的资源",
        "请登录后，重新寻找相应的资源",
        "登录系统",
        "刷新页面",
        "您访问的资源地址并未在服务器中定义或版本无法支持此业务",
        "您可以联系管理员",
        "建议登录后再次访问资源地址，确认是否资源加密",
        "重新登录",
    ],
    // 表单校验提示语 $lang.add($lang.formRules[0],$lang.formRules[0],)
    "formRules":{
        // 资源菜单表单校验
        "resource":[
            "备注长度不能超过50个字符",
            "资源名称不能为空",
            "资源路径不能为空"
        ],
        // 用户组表单校验
        "group":[
            "请输入用户组名称",
            "用户组名称长度不能大于十位"
        ],
        // 人员管理表单校验
        "sysUser":[
            "请输入用户密码",
            "用户名不能为空",
            "真实姓名不能为空"
        ]
    },
    // 资源菜单模块 $lang.add($lang.resource[0],$lang.resource[0])
    "resource":[
        "资源",
        "类型",
        "全部",
        "名称",
        "路径",
        "图标",

        "样式",
        "状态",
    ],
    // 用户组模块 $lang.add($lang.group[0],$lang.group[0])
    "group":[
        "用户",
        "组",
        "名",
        "名称",
        "配置",
        "权限",

        ""
    ],
    // 人员管理模块 $lang.add($lang.sysUser[0],$lang.sysUser[0])
    "sysUser":[
        "用户",
        "用户名",
        "头像",
        "真实姓名",
        "性别",
        "居住地址",

        "联系电话",
        "邮箱",
        "密码",
        "用户权限"
    ],

    "add": (...args) => {
        let  result = ''
        for (let i in args){
            result += args[i]
        }
        return result
    }
}
