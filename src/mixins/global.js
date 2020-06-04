import { mapState } from "vuex"
import storage from 'store'
import permissions from '../common/permissions'
import store from '../store/index'

const globalMixins = {
    data: function () {
        return {
            storeModules: store.getters.MODULES,
            // 项目表格分页配置
            tablePagination: {
                total: 0, // 表格总条数，分页使用
                pageSizeOptions: ['10', '20', '30'],
                defaultPageSize: 10, // 默认每页十条
                // tableRowCount: 0, // 自定义表格总条数
                showTotal: total => `共 ${this.tablePagination.total} 条数据`, // 显示数据总量
                // hideOnSinglePage: true, // 只有一页是是否隐藏分页器
                showSizeChanger: true,
                current: 1, // 默认页码
                onShowSizeChange: (current, pageSize) => { this.getPageCount(current, pageSize) },
                onChange: (current, pageSize) => { this.getPageCount(current, pageSize) }
            },
            // modal中小表格分页配置
            tablePagination_sm: {
                size:"small",
                total: 0, // 表格总条数，分页使用
                defaultPageSize: 5, // 默认每页十条
                showTotal: total => `共 ${this.tablePagination_sm.total} 条数据`, // 显示数据总量
                hideOnSinglePage: true, // 只有一页是是否隐藏分页器
                current: 1, // 默认页码
                onChange: (current, pageSize) => { this.tablePagination_sm.current = current }
            },
        }
    },
    computed: {
        ...mapState([
            'LOADING',
            'globalMessage',
            'version',
            'serverDatetime'
        ])
    },
    methods: {
        // 退出系统
        quit() {
            storage.clearAll()
            this.$router.push({ path: '/login' })
        },
        // 全局路由跳转方法
        go(uri) {
            console.log(uri)
            this.$router.push({ path: uri })
        },
        // 获取全局按钮级权限
        getPermissions(F1, F2, F3) {
            // return true
            return permissions(this.storeModules, F1, F2, F3)
        },
        // 全局表格展示条数
        async getPageCount(current, pageSize) {
            // 当前页码
            this.tablePagination.current = current
            // 表格数据获取从多少行开始与取多少条数据
            this.pageLimit.limitStart = (current - 1) * pageSize
            this.pageLimit.limitEnd = pageSize
            // 获取列表
            this.getList(true)
        },
        // 初始化表格分页值
        initTablePage(){
            this.tablePagination.current = 1
            this.pageLimit.limitStart = 0
            this.pageLimit.limitEnd = 10
        },
        /**
         * 全局表格操作栏权限是否展示,重组表格columns并返回
         * @param {Array} columns 表格列头
         * @param {String} F1 一级菜单
         * @param {String} F2 二级菜单
         * @param {String[]} CheckBtn 操作列按钮权限
         * @param {String[]} width 操作列宽度
         */
        getTableAction(columns, F1, F2, CheckBtn,width) {
            // 操作列是否显示
            let actionStatus = true;
            for (let i in columns) {
                // 操作列去重
                if (columns[i].title == "操作") {
                    actionStatus = false;
                    break;
                }
            }
            // 当前不存在操作列
            if (actionStatus) {
                for (let i in CheckBtn) {
                    if (this.getPermissions(F1, F2, CheckBtn[i])) {
                        columns.push({
                            title: "操作",
                            width: width || '20%',
                            scopedSlots: { customRender: "action" }
                        });
                        return columns
                    }
                    // return columns
                }
            }else{
                return columns
            }
        },
    },
    mounted() {
    }
}
export {
    globalMixins
}