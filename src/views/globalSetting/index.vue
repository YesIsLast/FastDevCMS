<template>
  <div>
    <!-- 头部展示 -->
    <div class="wos-padding-TB-20">
      <a-alert message="警告" description="请谨慎配置全局变量" type="error" show-icon />
    </div>

    <!-- 内容区 -->
    <a-row>
      <a-col :span="2" class="menuLeft">系统设置</a-col>
      <a-col :span="22" class="menuRight">
        <h3>系统公告：</h3>
        <a-textarea
          placeholder="请输入系统公告"
          v-model="form.notice"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-col>

      <a-col :span="2" class="menuLeft wos-padding-T-10">其他设置</a-col>
      <a-col :span="22" class="menuRight wos-padding-T-10">
        <h3>版本号配置</h3>
        <a-input placeholder="请输入版本号配置" v-model="form.version"></a-input>
      </a-col>
      
    </a-row>

    <!-- 底部按钮 -->
    <div class="footer">
      <a-popconfirm
        title="请再次确认是否保存当前配置"
        @confirm="addForm()"
        :okText="$lang.form[5]"
        :cancelText="$lang.form[4]"
      >
        <a-button type="danger" size="large" class="wos-button">保存</a-button>
      </a-popconfirm>
      <!-- <a-button type="primary" size="large" class="wos-button">还原</a-button> -->
    </div>
  </div>
</template>
<script>
import tagDynamic from './components/tagDynamic'

export default {
  components:{
    tagDynamic
  },
  data() {
    return {
      form: {
        version: "", // 版本号
        notice: "", // 公告
        chatFilter:[], // 聊天过滤词
      }
    };
  },
  methods: {
    // 添加全局配置
    addForm() {
      this.$service.api
        .insert("globalSetting", this.form)
        .then(res => {
          this.getList();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 获取全局配置
    getList() {
      this.$service.api
        .search("globalSetting", {})
        .then(res => {
          this.form = res;
          this.$nextTick(()=>{
            this.$refs.tagDynamicRef.setTagList(res.chatFilter)
          })
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style>
.footer {
  height: 100px;
  width: 80%;
  position: fixed;
  bottom: 0;
  text-align: center;
  line-height: 100px;
}
.menuLeft {
  padding-right: 10px;
  text-align: right;
  color: #1890ff;
  font-weight: bold;
}
.menuRight {
  border-left: 1px solid #eeeeee;
  padding-left: 10px;
}
h3 {
  padding-bottom: 10px;
}
</style>
