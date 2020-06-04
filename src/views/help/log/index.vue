<template>
  <div>
    <!-- 搜索 -->
    <a-row class="wos-margin-B-10">
      <!-- 数据统计 -->
      <div class="wos-float-right wos-flex">
        <div class="wos-padding-LR-10">
          <a-date-picker show-time placeholder="选择时间" allowClear/>
        </div>
        <div class="wos-padding-LR-10">
          <a-input
            placeholder="操作人"
            class="searchInput"
            allowClear
          />
        </div>
        <div>
          <a-button type="primary" class="wos-button">搜索</a-button>
        </div>
      </div>
    </a-row>

    <div>
      <!-- 列表 -->
      <a-descriptions size="small" class="wos-padding-T-20" v-for="(item,index) in tableList" :key="index" title="李某某" bordered>
        <a-descriptions-item label="操作类型">新增</a-descriptions-item>
        <a-descriptions-item label="操作页面">系统管理-人员管理</a-descriptions-item>
        <a-descriptions-item label="操作IP">192.168.1.10</a-descriptions-item>
        <a-descriptions-item label="操作时间">2000-01-01 00:00:00</a-descriptions-item>
        <a-descriptions-item label="IP地址" :span="2">中国-吉林-长春-高新区</a-descriptions-item>
        <a-descriptions-item label="风险类型" :span="3">
          <a-badge status="processing" text="一般" />
        </a-descriptions-item>
        <a-descriptions-item label="操作人">admin</a-descriptions-item>
        <a-descriptions-item label="请求方式">GET</a-descriptions-item>
        <a-descriptions-item label="请求接口地址">http://192.168.1.88:9002/api/anchorRelated/list</a-descriptions-item>
        <a-descriptions-item label="请求参数" :span="3">{id:3,name:"小李同学"}</a-descriptions-item>
        <a-descriptions-item label="接口响应值" :span="3">
          {
          "code":"200",
          "data":{
          "list":[],
          "count":0,
          "type":10010
          }
          }
        </a-descriptions-item>
      </a-descriptions>
      <!-- 分页 -->
      <div class="log-pagination">
        <a-pagination
          show-quick-jumper
          :showSizeChanger="paginationSetting.showSizeChanger"
          :default-current="paginationSetting.defaultCurrent"
          :pageSizeOptions="paginationSetting.pageSizeOptions"
          :defaultPageSize="paginationSetting.defaultPageSize"
          :total="paginationSetting.total"
          @change="getPageCount"
          @showSizeChange="getPageCount">
            <template slot="buildOptionText" slot-scope="props">
              <span v-if="props.value !== '100'">{{ props.value }}条/页</span>
              <span v-if="props.value === '100'">全部</span>
            </template>
        </a-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 分页配置
      paginationSetting: {
        current: 1,
        defaultCurrent: 1,
        defaultPageSize: 5,
        total: 1,
        showSizeChanger: true,
        hideOnSinglePage: false,
        pageSizeOptions: ["5", "10","50","100"]
      },
      pageLimit: {
        limitStart: 0, // 第几条开始
        limitEnd: 0 // 返回条数
      },
      tableList:[1,2], // 日志列表
    };
  },
  methods: {
    // 分页计算处理
    async getPageCount(current, pageSize) {
      // 当前页码
      this.paginationSetting.current = current;
      // 表格数据获取从多少行开始与取多少条数据
      this.pageLimit.limitStart = (current - 1) * pageSize;
      this.pageLimit.limitEnd = pageSize;
      // 获取列表
      this.getList();
    },
    getList(){
      this.tableList = []
    }
  }
};
</script>
<style scoped>
.log-pagination {
  float: right;
  margin: 10px 0px;
}
</style>
