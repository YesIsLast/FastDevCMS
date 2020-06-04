<template>
  <div class="wos-page">
    <div class="wos-searchBar wos-flex">
      <div v-show="getPermissions('system','group','insert')">
        <a-button type="primary" @click="addModalVisible = true">
          <a-icon type="plus" />
          {{ $lang.add( $lang.form[0], $lang.group[0], $lang.group[1] ) }}
        </a-button>
      </div>
      <div v-show="getPermissions('system','group','search')">
        <a-input
          allowClear
          :placeholder="$lang.add( $lang.group[0], $lang.group[1] , $lang.group[3])"
          class="searchInput"
          v-model="pageLimit.name"
          @keyup.enter="getList()"
        />
      </div>
      <div>
        <a-button
          @click="getList()"
          v-show="getPermissions('system','group','search')"
        >{{ $lang.form[3] }}</a-button>
      </div>
    </div>

    <div class="wos-table">
      <a-table :columns="columns" :dataSource="dataList">
        <div slot="action" slot-scope="rowData">
          <div>
            <a-button
              class="wos-button"
              type="primary"
              @click="openSettingGroup(rowData.id)"
              v-show="getPermissions('system','group','setting')"
            >{{ $lang.form[12] }}</a-button>
            <a-popconfirm
              :title="$lang.dic[3]"
              @confirm="deleteData(rowData.id)"
              :okText="$lang.form[5]"
              :cancelText="$lang.form[4]"
              v-show="getPermissions('system','group','delete')"
            >
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a-button class="wos-button" type="danger">{{ $lang.form[2] }}</a-button>
            </a-popconfirm>
          </div>
        </div>
      </a-table>
    </div>

    <!-- 弹出框 -->
    <a-modal
      v-model="addModalVisible"
      centered
      :title="$lang.add($lang.form[0],$lang.group[0], $lang.group[1])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetAddForm"
    >
      <!-- 内容区 -->
      <template>
        <a-form-model layout="inline" ref="ruleAddForm" :model="form" :rules="rules">
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label
                class="wos-lable-default wos-lable-required"
              >{{$lang.add($lang.group[0],$lang.group[1],$lang.group[3])}}</label>
            </a-col>
            <a-col :span="15">
              <a-form-model-item
                prop="name"
                ref="name"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  class="wos-width-100"
                  :placeholder="$lang.add($lang.group[0],$lang.group[1],$lang.group[3])"
                  v-model="form.name"
                  @blur="() => {$refs.name.onFieldBlur()}"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.dic[10]}}</label>
            </a-col>
            <a-col :span="20">
              <a-form-model-item
                prop="remark"
                ref="remark"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  type="textarea"
                  :placeholder="$lang.add($lang.dic[11],$lang.dic[10])"
                  @blur="() => {$refs.remark.onFieldBlur()}"
                  v-model="form.remark"
                  :rows="4"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </template>
      <!--            页脚-->
      <template slot="footer">
        <div>
          <a-button
            key="back"
            @click="addModalVisible = false"
            :loading="loadingModel"
          >{{ $lang.form[4] }}</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loadingModel"
            @click="addForm()"
          >{{ $lang.form[5] }}</a-button>
        </div>
      </template>
    </a-modal>
    <!--        配置弹出框-->
    <a-modal
      v-model="settingModalVisible"
      centered
      :title="$lang.add($lang.group[4] ,$lang.group[0],$lang.group[1])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetSettingForm"
    >
      <!-- 内容区 -->
      <template>
        <a-form-model ref="ruleSettingForm" :model="form" :rules="rules" layout="inline">
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label
                class="wos-lable-default wos-lable-required"
              >{{$lang.add($lang.group[0],$lang.group[1],$lang.group[3])}}</label>
            </a-col>
            <a-col :span="15">
              <a-form-model-item
                prop="name"
                ref="name"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  class="wos-width-100"
                  :placeholder="$lang.add($lang.group[0],$lang.group[1],$lang.group[3])"
                  v-model="form.name"
                  @blur="() => {$refs.name.onFieldBlur()}"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>

        <a-row class="wos-row-padding-default">
          <a-col :span="4">
            <label class="wos-lable-default">{{$lang.add($lang.group[5],$lang.group[4])}}</label>
          </a-col>
          <a-col :span="15">
            <treeResource
              ref="treeRes"
              :treeData="treeData"
              :treeDataSource="treeDataSource"
              :treeCheckedData="treeCheckedData"
            ></treeResource>
          </a-col>
        </a-row>
      </template>
      <!--            页脚-->
      <template slot="footer">
        <div>
          <a-button
            key="back"
            @click="settingModalVisible = false"
            :loading="loadingModel"
          >{{ $lang.form[4] }}</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loadingModel"
            @click="updateForm()"
          >{{ $lang.form[5] }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  // 用户组管理
  name: "group",
  data: function() {
    return {
      dataList: [],
      columns: [
        {
          title: "用户组ID",
          dataIndex: "id"
        },
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "备注",
          dataIndex: "remark"
        }
      ],
      addModalVisible: false, // 添加弹出框展示状态
      settingModalVisible: false, // 设置权限弹出框
      loadingModel: false, // 弹出层确定按钮加载状态
      maskClosable: true, // 蒙层点击关闭功能开关
      closableModal: true, // 弹出框右上角按钮显示开关
      searchVal: "", // 搜索值
      pageLimit: {
        name: "", // 用户组名称
        limitStart: 0,
        limitEnd: 10
      },
      // 表单字段
      form: {
        name: "",
        jsonContent: ""
      },
      // 表单校验规则
      rules: {
        name: [
          {
            required: true,
            message: this.$lang.formRules.group[0],
            trigger: "blur"
          },
          {
            max: 10,
            message: this.$lang.formRules.group[1],
            trigger: "blur"
          }
        ]
      },
      treeData: [], // 树结构数据
      treeDataSource: [], // 资源菜单数据源
      treeCheckedData: {} // 默认选中
    };
  },
  methods: {
    // 获取用户组列表
    getList() {
      this.$service.api
        .list("sysGroup", this.pageLimit)
        .then(res => {
          this.dataList = res;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 搜索单条用户组
    async getDataDetail(id) {
      await this.$service.api
        .search("sysGroup", { id: id })
        .then(res => {
          this.form = res;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 配置用户组权限
    updateForm() {
      this.$refs.ruleSettingForm.validate(valid => {
        if (valid) {
          this.loadingModel = true; // 打开按钮加载
          this.maskClosable = false; // 关闭蒙层点击
          this.closableModal = false; // 取消右上角关闭按钮
          // 配置此用户组树结构
          this.form.jsonContent = this.$refs.treeRes.treeCheckedKeys;

          this.$service.api
            .update("sysGroup", this.form)
            .then(res => {
              this.initFormModal();
              this.settingModalVisible = false;
              this.getList();
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除用户组
    deleteData(id) {
      this.dataList = [];
      this.$service.api
        .remove("sysGroup", { id: id })
        .then(res => {
          this.getList();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 添加用户组
    addForm() {
      this.$refs.ruleAddForm.validate(valid => {
        if (valid) {
          this.loadingModel = true; // 打开按钮加载
          this.maskClosable = false; // 关闭蒙层点击
          this.closableModal = false; // 取消右上角关闭按钮
          this.$service.api
            .insert("sysGroup", this.form)
            .then(res => {
              this.initFormModal();
              this.addModalVisible = false;
              this.getList();
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    // 配置用户组打开
    async openSettingGroup(id) {
      await this.getDataDetail(id);
      // 获取资源菜单列表
      this.$service.api
        .list("sysRes", { limitStart: 0, limitEnd: 999 })
        .then(res => {
          // 深度复制 传参数据源
          this.treeDataSource = JSON.parse(JSON.stringify(res));
          // 默认选中
          this.treeCheckedData = JSON.parse(this.form.jsonContent || "{}");
          //   树结构数据层级展示的数据
          this.treeData = this.$utils.getTreeList(res, 0);
          this.settingModalVisible = true; // 打开配置权限弹出框
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 初始化弹出框数据
    initFormModal() {
      // 按钮加载状态管理
      this.loadingModel = false;
      this.maskClosable = true;
      this.closableModal = true;
      // 表单数据重置
      this.form = {
        name: "",
        jsonContent: ""
      };
    },
    // 表单校验状态重置
    resetAddForm() {
      this.initFormModal();
      this.$refs.ruleAddForm.resetFields();
    },
    resetSettingForm() {
      this.initFormModal();
      this.$refs.ruleSettingForm.resetFields();
    }
  },
  mounted() {
    this.getList();
    // 校验表格操作列权限
    this.columns = this.getTableAction(this.columns, "system", "group", [
      "setting",
      "delete"
    ]);
  }
};
</script>

<style scoped>
</style>
