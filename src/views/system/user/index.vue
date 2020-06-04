<template>
  <div>
    <!--        搜索框-->
    <div class="wos-searchBar wos-flex">
      <div>
        <a-button
          type="primary"
          @click="openAddModalVisible()"
          v-show="getPermissions('system','user','insert')"
        >
          <a-icon type="plus" />
          {{ $lang.add( $lang.form[0], $lang.dic[2] ) }}
        </a-button>
      </div>
      <div v-show="getPermissions('system','resource','search')">
        <a-input
          allowClear
          :placeholder="$lang.add( $lang.dic[7])"
          v-model="pageLimit.userName"
          class="searchInput"
          @keyup.enter="getList()"
        />
      </div>
      <div v-show="getPermissions('system','resource','search')">
        <a-input
          allowClear
          type="number"
          :placeholder="$lang.add( $lang.dic[8])"
          v-model="pageLimit.phone"
          class="searchInput"
          @keyup.enter="getList()"
        />
      </div>
      <div>
        <a-button
          @click="getList()"
          v-show="getPermissions('system','resource','search')"
        >{{ $lang.form[3] }}</a-button>
      </div>
    </div>
    <!--表格-->
    <div class="wos-table">
      <a-table :columns="columns" :dataSource="dataList">
        <div slot="action" slot-scope="rowData">
          <a-button
            type="primary"
            class="wos-button"
            @click="openUpdateModalVisible(rowData.id)"
            v-show="getPermissions('system','user','update')"
          >
            {{
            $lang.form[1] }}
          </a-button>
          <a-popconfirm
            :title="$lang.dic[3]"
            @confirm="deleteData(rowData.id)"
            :okText="$lang.form[5]"
            :cancelText="$lang.form[4]"
            v-show="getPermissions('system','user','delete')"
          >
            <a-icon slot="icon" type="question-circle-o" style="color: red" />
            <a-button class="wos-button" type="danger">{{ $lang.form[2] }}</a-button>
          </a-popconfirm>
        </div>
      </a-table>
    </div>

    <!-- 新增弹出框 -->
    <a-modal
      v-model="addModalVisible"
      centered
      :title="$lang.add($lang.form[0],$lang.sysUser[0])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetAddFormRules"
    >
      <!-- 内容区 -->
      <div>
        <div>
          <!-- 表单校验样式布局 -->
          <a-form-model layout="inline" ref="ruleAddForm" :model="form" :rules="rules">
            <a-row class="wos-row-padding-default">
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[1]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="userName"
                  ref="userName"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-input
                    @blur="() => {$refs.userName.onFieldBlur()}"
                    :placeholder="$lang.sysUser[1]"
                    v-model="form.userName"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[2]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item :wrapper-col="{ span: 24}" class="wos-width-100">
                  <pictureUpload ref="pictureUploadAdd" :imgUrl="form.headPath"></pictureUpload>
                </a-form-model-item>
              </a-col>
            </a-row>

            <a-row class="wos-row-padding-default">
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[3]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="realName"
                  ref="realName"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-input
                    :placeholder="$lang.sysUser[3]"
                    @blur="() => {$refs.realName.onFieldBlur()}"
                    v-model="form.realName"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[4]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="sex"
                  ref="sex"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-select
                    v-model="form.sex"
                    class="wos-width-100"
                    @blur="() => {$refs.sex.onFieldBlur()}"
                  >
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="2">女</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>

            <a-row class="wos-row-padding-default">
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[5]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="address"
                  ref="address"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-input
                    :placeholder="$lang.sysUser[5]"
                    @blur="() => {$refs.realName.onFieldBlur()}"
                    v-model="form.address"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[6]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="phone"
                  ref="phone"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-input-number
                    class="wos-width-100"
                    :placeholder="$lang.sysUser[6]"
                    @blur="() => {$refs.phone.onFieldBlur()}"
                    v-model="form.phone"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row class="wos-row-padding-default">
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[7]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="email"
                  ref="email"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-input
                    class="wos-width-100"
                    :placeholder="$lang.sysUser[7]"
                    @blur="() => {$refs.email.onFieldBlur()}"
                    v-model="form.email"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[9]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item
                  prop="groupId"
                  ref="groupId"
                  :wrapper-col="{ span: 24}"
                  class="wos-width-100"
                >
                  <a-select
                    v-model="form.groupId"
                    class="wos-width-100"
                    @blur="() => {$refs.groupId.onFieldBlur()}"
                    :placeholder="$lang.sysUser[9]"
                  >
                    <a-select-option
                      v-for="(item,index) in groupList"
                      :key="index"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row class="wos-row-padding-default">
              <a-col :span="4">
                <label class="wos-lable-default">{{$lang.sysUser[8]}}</label>
              </a-col>
              <a-col :span="7">
                <a-form-model-item prop="password" ref="password">
                  <a-input-password
                    :placeholder="$lang.sysUser[8]"
                    @blur="() => {$refs.password.onFieldBlur()}"
                    v-model="form.password"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="2"></a-col>
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
        </div>
      </div>
      <!--      页脚-->
      <template slot="footer">
        <div>
          <a-button key="back" @click="addModalVisible = false">{{ $lang.form[4] }}</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loadingModel"
            @click="addForm()"
          >{{ $lang.form[5] }}</a-button>
        </div>
      </template>
    </a-modal>
    <!-- 修改弹出框 -->
    <a-modal
      v-model="updateModalVisible"
      centered
      :title="$lang.add($lang.form[1],$lang.sysUser[0])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetUpdateFormRules"
    >
      <!-- 内容区 -->
      <div>
        <!-- 表单校验样式布局 -->
        <a-form-model layout="inline" ref="ruleUpdateForm" :model="form" :rules="rules">
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[1]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="userName"
                ref="userName"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  @blur="() => {$refs.userName.onFieldBlur()}"
                  :placeholder="$lang.sysUser[1]"
                  v-model="form.userName"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[2]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item :wrapper-col="{ span: 24}" class="wos-width-100">
                <pictureUpload ref="pictureUploadUpdate" :imgUrl="form.headPath"></pictureUpload>
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[3]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="realName"
                ref="realName"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  :placeholder="$lang.sysUser[3]"
                  @blur="() => {$refs.realName.onFieldBlur()}"
                  v-model="form.realName"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[4]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="sex"
                ref="sex"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-select
                  v-model="form.sex"
                  class="wos-width-100"
                  @blur="() => {$refs.sex.onFieldBlur()}"
                >
                  <a-select-option :value="1">男</a-select-option>
                  <a-select-option :value="2">女</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[5]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="address"
                ref="address"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  :placeholder="$lang.sysUser[5]"
                  @blur="() => {$refs.realName.onFieldBlur()}"
                  v-model="form.address"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[6]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="phone"
                ref="phone"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input-number
                  class="wos-width-100"
                  :placeholder="$lang.sysUser[6]"
                  @blur="() => {$refs.phone.onFieldBlur()}"
                  v-model="form.phone"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[7]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="email"
                ref="email"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  class="wos-width-100"
                  :placeholder="$lang.sysUser[7]"
                  @blur="() => {$refs.email.onFieldBlur()}"
                  v-model="form.email"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[9]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="groupId"
                ref="groupId"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-select
                  v-model="form.groupId"
                  class="wos-width-100"
                  @blur="() => {$refs.sex.onFieldBlur()}"
                  :placeholder="$lang.sysUser[9]"
                >
                  <a-select-option
                    v-for="(item,index) in groupList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
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
      </div>
      <!--      页脚-->
      <template slot="footer">
        <div>
          <a-button key="back" @click="updateModalVisible = false">{{ $lang.form[4] }}</a-button>
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
  // 系统管理-人员管理
  name: "system-user",
  data() {
    return {
      uploadFileList: {}, // 文件上传数据信息
      dataList: [], // 表格行数据
      columns: [
        {
          title: "用户名",
          dataIndex: "userName",
          key: "userName"
        },
        {
          title: "真实姓名",
          dataIndex: "realName",
          key: "realName"
        },
        {
          title: "性别",
          dataIndex: "sex",
          key: "sex"
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          key: "phone"
        },
        {
          title: "用户权限",
          dataIndex: "groupName",
          key: "groupName"
        }
      ], // 表格列数据
      addModalVisible: false, // 添加弹出框展示状态
      updateModalVisible: false, // 修改弹出框展示状态
      loadingModel: false, // 弹出层确定按钮加载状态
      maskClosable: true, // 蒙层点击关闭功能开关
      closableModal: true, // 弹出框右上角按钮显示开关
      // form表单字段
      form: {
        userName: "",
        password: "",
        realName: "",
        address: "",
        phone: "",
        sex: 1,
        sort: 1,
        remark: "",
        email: "",
        headPath: "",
        groupId: undefined
      },
      // 表单校验规则
      rules: {
        userName: [
          {
            required: true,
            message: this.$lang.formRules.sysUser[1],
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            message: this.$lang.formRules.sysUser[2],
            trigger: "blur"
          }
        ]
      },
      // 表格参数
      pageLimit: {
        userName: "", // 资源名称
        phone: "", // 联系电话
        limitStart: 0,
        limitEnd: 10
      },
      // 下拉列表数据字段
      groupList: [] // 用户组列表
    };
  },
  methods: {
    // 新增用户
    async addForm() {
      this.$refs.ruleAddForm.validate(valid => {
        if (valid) {
          if (!this.form.password) {
            this.$message.error(this.$lang.formRules.sysUser[0]);
            return false;
          }
          this.loadingModel = true;
          this.maskClosable = false;
          this.closableModal = false;
          // 用户头像赋值
          this.form.headPath = this.$refs.pictureUploadAdd.headimgBase64;
          this.$service.api
            .insert("sysUser", this.form)
            .then(res => {
              this.getList();
              this.initFormModal();
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    // 修改用户
    async updateForm() {
      this.$refs.ruleUpdateForm.validate(valid => {
        if (valid) {
          this.loadingModel = true;
          this.maskClosable = false;
          this.closableModal = false;
          // 用户头像赋值
          this.form.headPath = this.$refs.pictureUploadUpdate.headimgBase64;
          this.$service.api
            .update("sysUser", this.form)
            .then(res => {
              this.updateModalVisible = false;
              this.getList();
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    // 获取列表
    getList() {
      this.dataList = [];
      this.$service.api
        .list("sysUser", this.pageLimit)
        .then(res => {
          this.dataList = res;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 删除资源
    deleteData(id) {
      this.$service.api
        .remove("sysUser", { id: id })
        .then(res => {
          this.getList();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    /**
     * 修改弹出框打开
     * @param id 数据ID
     */
    async openUpdateModalVisible(id) {
      this.initFormModal();
      await this.$service.api
        .search("sysUser", { id: id })
        .then(res => {
          this.form = res; //    回显赋值
          this.updateModalVisible = true; // 弹出框打开
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 新增弹出框打开
    openAddModalVisible() {
      this.initFormModal();
      this.addModalVisible = true;
    },
    // 获取用户组列表
    getUserGroupList() {
      this.$service.api
        .list("sysGroup", this.pageLimit)
        .then(res => {
          this.groupList = res;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 新增表单校验重置
    resetAddFormRules() {
      this.$nextTick(() => {
        this.$refs.ruleAddForm.resetFields();
        this.$refs.pictureUploadAdd.clearCatchImg(); // 清理图片
      });
    },
    // 修改表单校验重置
    resetUpdateFormRules() {
      this.$nextTick(() => {
        this.$refs.pictureUploadUpdate.clearCatchImg(); // 清理图片
        this.$refs.ruleUpdateForm.resetFields();
      });
    },
    // 初始化弹出框数据/状态
    initFormModal() {
      this.addModalVisible = false;
      this.loadingModel = false;
      this.maskClosable = true;
      this.closableModal = true;
      this.form = {
        userName: "",
        password: "",
        realName: "",
        address: "",
        phone: "",
        sex: 1,
        sort: 1,
        remark: "",
        email: "",
        headPath: "",
        groupId: undefined
      };
    }
  },
  async mounted() {
    this.getList();
    this.getUserGroupList();
    console.log("查看传入的列表头", this.columns);
    // 校验表格操作列权限
    this.columns = this.getTableAction(this.columns, "system", "resource", [
      "update",
      "delete"
    ]);
  }
};
</script>

<style scoped lang="less">
</style>
