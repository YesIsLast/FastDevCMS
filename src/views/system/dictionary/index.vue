<template>
  <div class="main">
    <div>
      <a-input-search
        class="dicSearch"
        placeholder="输入搜索"
        size="large"
        allowClear
        :disabled="loadingSearch"
        @search="getList"
      >
        <a-button :loading="loadingSearch" type="primary" slot="enterButton">搜索</a-button>
      </a-input-search>
    </div>
    <!-- 列表 -->
    <div>
      <a-row class="dicTitle">搜索结果列表</a-row>
      <div class="dicList">
        <a-card class="listWidth" v-for="(item,index) in dicList" :key="index">
          <p>汉语: {{item.cn}}</p>
          <p>English: {{item.en}}</p>
        </a-card>
      </div>
    </div>
    <!-- 添加 -->
    <div v-if="dicList.length == 0 && searchVal !=''">
      <span>
        当前字典库未匹配到 "
        <span class="wos-color-blue">{{searchVal}}</span>
        " 是否进行
        <a-popover title trigger="click" placement="rightTop" v-model="addFormVisible">
          <!-- @visibleChange="" -->
          <div slot="content" class="wos-align-center">
            <a-form-model ref="ruleForm" :model="form" :rules="rules">
              <a-form-model-item ref="CN" label prop="CN">
                <a-input
                  v-model="form.CN"
                  placeholder="请输入汉字"
                  size="small"
                  @blur="
                    () => {
                      $refs.CN.onFieldBlur();
                    }
                  "
                />
              </a-form-model-item>
              <a-form-model-item ref="EN" label prop="EN">
                <a-input
                  v-model="form.EN"
                  placeholder="请输入英文"
                  size="small"
                  @blur="
                    () => {
                      $refs.EN.onFieldBlur();
                    }
                  "
                />
              </a-form-model-item>
            </a-form-model>
            <a-button
              type="primary"
              size="small"
              :loading="loadingSearch"
              :disabled="loadingSearch"
              @click="addDic(searchVal)"
            >提交</a-button>
          </div>
          <span class="wos-color-red wos-hand" @click="openAddPopo()">点击添加</span>
        </a-popover>
      </span>
    </div>

    <div v-if="dicList.length == 0 && searchVal ==''">
      <a-empty />
    </div>

    <a-divider />
    <div class="dicResult">
      <span class="textTitle">
        关键词选择结果:
        <span class="textResult" v-show="resultVal.length != 0">
          <span id="copy">{{resultVal}}</span>
          <a-icon
            type="close-circle"
            class="wos-color-black wos-padding-L-10 wos-hand"
            @click="resultVal = ''"
          />
        </span>
        <span class="textResult" style="color:#979797" v-show="resultVal.length == 0">请选择关键词标签</span>
      </span>
      <a-button type="primary" shape="circle" @click="$utils.toClipboard">copy</a-button>
    </div>
    <div class="dicHistoryList">
      <a-row class="dicTitle">历史搜索列表</a-row>
      <div class="dicList">
        <a-card
          class="listWidth"
          v-for="(item,index) in cacheList"
          :key="index"
          @click="selectKey(item)"
        >
          <p>汉语: {{item.cn}}</p>
          <p>English: {{item.en}}</p>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dictionary", // 字典管理
  data() {
    return {
      loadingSearch: false,
      searchVal: "", // 搜索关键词
      resultVal: "", // 组合标签结果
      dicList: [], // 字典关键字搜索结果列表
      cacheList: [], // 历史缓存列表
      addFormVisible: false, // 添加表单
      form: {
        CN: "",
        EN: ""
      },
      rules: {
        CN: [
          { required: true, message: "请输入汉语", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                callback(new Error("请正确输入汉字"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        EN: [
          { required: true, message: "请输入英文", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/[_a-zA-Z]/.test(value)) {
                callback(new Error("请正确输入英文"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      } // 表单校验
    };
  },
  mounted() {
    this.dicList = [
      {
        id: 0,
        cn: "我自己",
        en: "MySelf"
      },
      {
        id: 1,
        cn: "阿里巴巴",
        en: "Alibaba"
      },
      {
        id: 2,
        cn: "百度",
        en: "Baidu"
      }
    ];
    this.cacheList = [
      {
        id: 0,
        cn: "我",
        en: "My"
      },
      {
        id: 1,
        cn: "自己",
        en: "Self"
      },
      {
        id: 2,
        cn: "阿里巴巴",
        en: "Alibaba"
      },
      {
        id: 3,
        cn: "百度",
        en: "Baidu"
      }
    ];
  },
  methods: {
    // 打开新增字典表单
    openAddPopo() {
      this.addFormVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
      });
    },

    // 新增
    addDic(val) {
      if (this.loadingSearch) {
        return false;
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loadingSearch = true;
          setTimeout(() => {
            this.loadingSearch = false;
            this.addFormVisible = false;
            this.$message.success("关键字" + val + "添加成功");
          }, 2000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //   字典值搜索
    getList(searchVal) {
      this.searchVal = searchVal;
      this.loadingSearch = true;
      setTimeout(() => {
        this.dicList = [];
        this.loadingSearch = false;
        console.log("准备搜索===>>" + searchVal);
      }, 2000);
    },

    // 选择拼接历史标签
    selectKey(item) {
      // 首字母小写，其余小驼峰
      let word = this.resultVal + item.en;
      this.resultVal =
        this.resultVal != ""
          ? word
          : this.$utils.getWordFormat(word, "lowercase");
      console.log("拼接结果", this.resultVal);
    }
  }
};
</script>
<style lang="less" scoped>
.listWidth {
  width: 180px;
  margin: 10px;
}
.dicTitle {
  font-size: 1.2rem;
  font-weight: 500;
  text-align: left;
  margin: 10px;
}

.main {
  text-align: center;
  .dicSearch {
    width: 50%;
  }
  .dicList {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px;
  }
  .dicResult {
    margin: 10px;
    .textTitle {
      font-size: 1.2rem;
      font-weight: 500;
      color: #1890ff;
      .textResult {
        color: black;
        font-size: 1.5rem;
        padding: 5px 10px;
        border-bottom: solid 1px rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>