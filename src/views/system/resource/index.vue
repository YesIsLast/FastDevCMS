<template>
  <div>
    <div class="wos-searchBar wos-flex">
      <div>
        <a-button
          type="primary"
          @click="openAddModalVisible(0)"
          v-show="getPermissions('system','resource','insert')"
        >
          <a-icon type="plus" />
          {{ $lang.add( $lang.form[0],$lang.dic[6], $lang.dic[0] ) }}
        </a-button>
      </div>
      <div v-show="getPermissions('system','resource','search')">
        <a-select
          v-model="pageLimit.type"
          class="searchInput"
          :placeholder="$lang.add($lang.resource[0],$lang.resource[1])"
        >
          <a-select-option value>{{$lang.resource[2]}}</a-select-option>
          <a-select-option value="root">root</a-select-option>
          <a-select-option value="ctrl">ctrl</a-select-option>
        </a-select>
      </div>
      <div v-show="getPermissions('system','resource','search')">
        <a-input
          allowClear
          :placeholder="$lang.add( $lang.resource[0] , $lang.resource[3])"
          v-model="pageLimit.name"
          class="searchInput"
          @keyup.enter="getList()"
        />
      </div>
      <div v-show="getPermissions('system','resource','search')">
        <a-input
          allowClear
          :placeholder="$lang.add( $lang.resource[0] , $lang.resource[4])"
          v-model="pageLimit.path"
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

    <div class="wos-table">
      <a-table :columns="columns" :dataSource="dataList">
        <div slot="action" slot-scope="rowData">
          <a-button
            class="wos-button"
            type="primary"
            @click="openAddModalVisible(1,rowData)"
            v-show="getPermissions('system','resource','insert')"
          >
            {{ $lang.form[0]
            }}
          </a-button>
          <a-button
            class="wos-button"
            @click="openUpdateModalVisible(rowData.id)"
            v-show="getPermissions('system','resource','update')"
          >{{ $lang.form[1] }}</a-button>
          <a-popconfirm
            :title="$lang.dic[3]"
            @confirm="deleteData(rowData.id)"
            :okText="$lang.form[5]"
            :cancelText="$lang.form[4]"
            v-show="getPermissions('system','resource','delete')"
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
      :title="$lang.add($lang.form[0],$lang.resource[0])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetAddFormRules"
    >
      <!-- 内容区 -->
      <div>
        <a-form-model layout="inline" ref="ruleAddForm" :model="form" :rules="rules">
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.resource[0],$lang.resource[3])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="name"
                ref="name"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  @blur="() => {$refs.name.onFieldBlur()}"
                  :placeholder="$lang.add($lang.resource[0],$lang.resource[3])"
                  v-model="form.name"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.resource[5],$lang.resource[6])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
                prop="iconCls"
                ref="iconCls"
              >
                <a-input
                  @blur="() => {$refs.iconCls.onFieldBlur()}"
                  :placeholder="$lang.add($lang.resource[5],$lang.resource[6])"
                  v-model="form.iconCls"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.resource[0],$lang.resource[4])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="path"
                ref="path"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  @blur="() => {$refs.path.onFieldBlur()}"
                  :placeholder="$lang.add($lang.resource[0],$lang.resource[4])"
                  v-model="form.path"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.dic[9]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
                prop="sort"
                ref="sort"
              >
                <a-input-number
                  class="wos-width-100"
                  :placeholder="$lang.dic[9]"
                  @blur="() => {$refs.sort.onFieldBlur()}"
                  v-model="form.sort"
                  :min="1"
                  :max="999"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.dic[0],$lang.form[14])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="type"
                ref="type"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-select
                  v-model="form.type"
                  class="wos-width-100"
                  @blur="() => {$refs.type.onFieldBlur()}"
                >
                  <a-select-option value="root">root</a-select-option>
                  <a-select-option value="ctrl">ctrl</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.resource[7]}}</label>
            </a-col>

            <a-col :span="7">
              <a-form-model-item
                prop="status"
                ref="status"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-select
                  v-model="form.status"
                  class="wos-width-100"
                  @blur="() => {$refs.status.onFieldBlur()}"
                >
                  <a-select-option :value="0">显示</a-select-option>
                  <a-select-option :value="1">隐藏</a-select-option>
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
          <a-button
            key="back"
            :loading="loadingModel"
            @click="addModalVisible = false"
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
    <!-- 修改弹出框 -->
    <a-modal
      v-model="updateModalVisible"
      centered
      :title="$lang.add($lang.form[1],$lang.resource[0])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetUpdateFormRules"
    >
      <!-- 内容区 -->
      <div>
        <a-form-model layout="inline" ref="ruleUpdateForm" :model="form" :rules="rules">
          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.resource[0],$lang.resource[3])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="name"
                ref="name"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  @blur="() => {$refs.name.onFieldBlur()}"
                  :placeholder="$lang.add($lang.resource[0],$lang.resource[3])"
                  v-model="form.name"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.resource[5],$lang.resource[6])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
                prop="iconCls"
                ref="iconCls"
              >
                <a-input
                  @blur="() => {$refs.iconCls.onFieldBlur()}"
                  :placeholder="$lang.add($lang.resource[5],$lang.resource[6])"
                  v-model="form.iconCls"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.resource[0],$lang.resource[4])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="path"
                ref="path"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-input
                  @blur="() => {$refs.path.onFieldBlur()}"
                  :placeholder="$lang.add($lang.resource[0],$lang.resource[4])"
                  v-model="form.path"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.dic[9]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
                prop="sort"
                ref="sort"
              >
                <a-input-number
                  class="wos-width-100"
                  :placeholder="$lang.dic[9]"
                  @blur="() => {$refs.sort.onFieldBlur()}"
                  v-model="form.sort"
                  :min="1"
                  :max="999"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row class="wos-row-padding-default">
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.add($lang.dic[0],$lang.form[14])}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item
                prop="type"
                ref="type"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-select
                  v-model="form.type"
                  class="wos-width-100"
                  @blur="() => {$refs.type.onFieldBlur()}"
                >
                  <a-select-option value="root">root</a-select-option>
                  <a-select-option value="ctrl">ctrl</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.resource[7]}}</label>
            </a-col>

            <a-col :span="7">
              <a-form-model-item
                prop="status"
                ref="status"
                :wrapper-col="{ span: 24}"
                class="wos-width-100"
              >
                <a-select
                  v-model="form.status"
                  class="wos-width-100"
                  @blur="() => {$refs.status.onFieldBlur()}"
                >
                  <a-select-option :value="0">显示</a-select-option>
                  <a-select-option :value="1">隐藏</a-select-option>
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
          <a-button key="back" :loading="loadingModel" @click="updateModalVisible = false">
            {{ $lang.form[4]
            }}
          </a-button>
          <a-button key="submit" type="primary" :loading="loadingModel" @click="updateForm()">
            {{ $lang.form[5]
            }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  // 系统管理-资源菜单
  name: "system-resource",
  data() {
    return {
      sName: "", // 搜索用资源名称
      sPath: "", // 搜索用路径
      dataList: [], // 表格行数据
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "图标",
          dataIndex: "iconCls",
          key: "iconCls"
        },
        {
          title: "路由",
          dataIndex: "path",
          key: "path"
        },
        {
          title: "类型",
          dataIndex: "type",
          key: "type"
        },
        {
          title: "排序",
          dataIndex: "sort",
          key: "sort"
        }
      ], // 表格列数据
      addModalVisible: false, // 添加弹出框展示状态
      updateModalVisible: false, // 修改弹出框展示状态
      loadingModel: false, // 弹出层确定按钮加载状态
      maskClosable: true, // 蒙层点击关闭功能开关
      closableModal: true, // 弹出框右上角按钮显示开关
      // form表单字段
      form: {
        addType: 0, // 新增类型 （0、新增父级资源 1、新增子级资源）
        name: "", // 名称
        iconCls: "", // 图标样式
        path: "", // 访问地址
        sort: 1, // 排序
        remark: "", // 备注
        type: "root", // 类型
        parentId: 0, // 父级资源ID
        parentPath: "", // 父级资源地址
        status: 1 // 显示
      },
      // 表单校验规则
      rules: {
        name: [
          {
            required: true,
            message: this.$lang.formRules.resource[1],
            trigger: "blur"
          }
        ],
        path: [
          {
            required: true,
            message: this.$lang.formRules.resource[2],
            trigger: "blur"
          }
        ],
        remark: [
          {
            max: 50,
            message: this.$lang.formRules.resource[0],
            trigger: "blur"
          }
        ]
      },
      // 表格参数
      pageLimit: {
        name: "", // 资源名称
        type: "", // 资源类型
        path: "", // 资源路径
        limitStart: "",
        limitEnd: ""
      }
    };
  },
  methods: {
    // 新增资源
    async addForm() {
      this.$refs.ruleAddForm.validate(valid => {
        if (valid) {
          this.loadingModel = true;
          this.maskClosable = false;
          this.closableModal = false;
          this.$service.api
            .insert("sysRes", this.form)
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
    // 获取列表
    getList() {
      this.dataList = [];
      this.$service.api
        .list("sysRes", this.pageLimit)
        .then(res => {
          this.dataList = this.$utils.getTreeList(res, 0);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 删除资源
    deleteData(id) {
      this.$service.api
        .remove("sysRes", { id: id })
        .then(res => {
          this.getList();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 修改资源
    async updateForm() {
      this.$refs.ruleUpdateForm.validate(valid => {
        if (valid) {
          this.loadingModel = true;
          this.maskClosable = false;
          this.closableModal = false;
          this.$service.api
            .update("sysRes", this.form)
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
    /**
     * 新增弹出框打开
     * @param addType 0、新增父级资源 1、新增子级资源
     * @param rowData 新增子资源时所传的父级数据
     */
    openAddModalVisible(addType, rowData) {
      this.initFormModal();
      this.form.addType = addType;
      this.addModalVisible = true;
      //  父级资源赋值
      if (addType === 1) {
        this.form.parentId = rowData.id;
        this.form.parentPath = rowData.path;
      }
    },
    /**
     * 修改弹出框打开
     * @param id 数据ID
     */
    openUpdateModalVisible(id) {
      this.initFormModal();
      this.$service.api
        .search("sysRes", { id: id })
        .then(res => {
          this.updateModalVisible = true; // 弹出框打开
          //    回显赋值
          this.form = res;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 新增表单校验重置
    resetAddFormRules() {
      this.$nextTick(() => {
        this.$refs.ruleAddForm.resetFields();
      });
    },
    // 修改表单校验重置
    resetUpdateFormRules() {
      this.$nextTick(() => {
        this.$refs.ruleUpdateForm.resetFields();
      });
    },
    // 初始化弹出框数据/状态
    initFormModal() {
      this.addModalVisible = false;
      this.updateModalVisible = false;
      this.loadingModel = false;
      this.maskClosable = true;
      this.closableModal = true;
      this.form = {
        addType: 0, // 新增类型 （0、新增父级资源 1、新增子级资源）
        name: "", // 名称
        iconCls: "", // 图标样式
        path: "", // 访问地址
        sort: 1, // 排序
        remark: "", // 备注
        type: "root", // 类型
        parentId: 0, // 父级资源ID
        parentPath: "", // 父级资源地址
        status: 1 // 显示
      };
    }
  },
  mounted() {
    this.getList();
    // 校验表格操作列权限
    this.columns = this.getTableAction(this.columns, "system", "resource", [
      "insert",
      "update",
      "delete"
    ]);
  }
};
</script>

<style scoped lang="less">
</style>
