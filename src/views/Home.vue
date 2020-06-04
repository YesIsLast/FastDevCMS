<template>
  <div class="home wos-flex">
    <!-- 菜单组件 -->
    <menuList :collapsed="collapsed"></menuList>

    <div ref="page" class="wos-flex-auto">
      <nav class="wos-flex wos-between wos-col-center">
        <div id="menuCtrl">
          <a-icon type="menu-fold" class="wos-hand" @click="toggleCollapsed" />
        </div>
        <div>
          <a-spin v-show="LOADING" />
        </div>
        <div id="menuIcon" class="wos-align-right">
          <a-dropdown :trigger="['click']" placement="bottomRight">
            <a-icon type="setting" class="wos-hand" theme="filled" />
            <a-menu slot="overlay">
              <a-menu-item key="0" @click="personInfo()">
                <a href="#" class="wos-align-right">{{$lang.dic[15]}}</a>
              </a-menu-item>
              <a-menu-item key="1">
                <!-- <router-link to="/globalSetting" class="wos-align-right">{{$lang.dic[12]}}</router-link> -->
                <a href="#" class="wos-align-right" @click="go('/globalSetting/index')" >{{$lang.dic[12]}}</a>
              </a-menu-item>
              <a-menu-item key="2" @click="beforeForm()">
                <a href="#" class="wos-align-right">{{$lang.dic[13]}}</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" class="wos-align-right" @click="quit()">{{$lang.dic[14]}}</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </nav>
      <main>
        <!--tabs-->
        <div class="navigation">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">
              <!-- 父级路由不设置路由跳转 -->
              <router-link :to="item.id==0?'':item.path">{{item.name}}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <!--main-->
        <div class="router-view">
          <router-view />
        </div>
      </main>
    </div>
    <!-- 密码修改框 -->
    <a-modal
      v-model="updateModalVisible"
      centered
      :title="$lang.login[8]"
      :maskClosable="maskClosable"
      :width="520"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetRuleForm"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          :label="$lang.add(this.$lang.login[11], $lang.login[9])"
          prop="oldPassword"
          ref="oldPassword"
        >
          <a-input-password
            v-model="form.oldPassword"
            @blur="() => {$refs.oldPassword.onFieldBlur()}"
            :placeholder="$lang.add(this.$lang.login[11], $lang.login[9])"
          />
        </a-form-model-item>
        <a-form-model-item
          :label="$lang.add(this.$lang.login[12], $lang.login[9])"
          prop="password"
          ref="password"
        >
          <a-input-password
            v-model="form.password"
            @blur="() => {$refs.password.onFieldBlur()}"
            :placeholder="$lang.add(this.$lang.login[12], $lang.login[9])"
          />
        </a-form-model-item>
        <a-form-model-item
          :label="$lang.add(this.$lang.login[13],this.$lang.login[12], $lang.login[9])"
          prop="confirmPassword"
          ref="confirmPassword"
        >
          <a-input-password
            v-model="form.confirmPassword"
            @blur="() => {$refs.confirmPassword.onFieldBlur()}"
            :placeholder="$lang.add(this.$lang.login[13],this.$lang.login[12], $lang.login[9])"
          />
        </a-form-model-item>
      </a-form-model>
      <!--页脚-->
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
    <!-- 修改弹出框 -->
    <a-modal
      v-model="updatePersonModalVisible"
      centered
      :title="$lang.add($lang.form[1],$lang.dic[15])"
      :maskClosable="maskClosable"
      :width="720"
      :keyboard="false"
      :closable="closableModal"
      :afterClose="resetUpdatePersonFormRules"
    >
      <!-- 内容区 -->
      <div>
        <!-- 表单校验样式布局 -->
        <a-form-model
          layout="inline"
          ref="ruleUpdatePersonForm"
          :model="formPerson"
          :rules="rulesPerson"
        >
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
                  v-model="formPerson.userName"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <label class="wos-lable-default">{{$lang.sysUser[2]}}</label>
            </a-col>
            <a-col :span="7">
              <a-form-model-item :wrapper-col="{ span: 24}" class="wos-width-100">
                <pictureUpload ref="pictureUploadUpdate" :imgUrl="formPerson.headPath"></pictureUpload>
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
                  v-model="formPerson.realName"
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
                  v-model="formPerson.sex"
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
                  v-model="formPerson.address"
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
                  v-model="formPerson.phone"
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
                  v-model="formPerson.email"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2"></a-col>
          </a-row>
        </a-form-model>
      </div>
      <!--      页脚-->
      <template slot="footer">
        <div>
          <a-button key="back" @click="updatePersonModalVisible = false">{{ $lang.form[4] }}</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loadingModel"
            @click="updatePerson()"
          >{{ $lang.form[5] }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import menuList from "../components/menuList/menuList";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    //   新密码是否一致校验
    let checkNewPassword = (rule, value, callback) => {
      if (value != this.form.password) {
        callback(new Error(this.$lang.login[15]));
      } else {
        callback();
      }
    };

    return {
      updatePersonModalVisible: false, // 个人信息修改弹出框
      collapsed: false, // 菜单展开状态
      updateModalVisible: false, // 密码修改框显示状态
      loadingModel: false, // 弹出层确定按钮加载状态
      maskClosable: true, // 蒙层点击关闭功能开关
      closableModal: true, // 弹出框右上角按钮显示开关
      labelCol: { span: 6 }, // 表单size
      wrapperCol: { span: 14 }, // 表单size
      form: {
        id: this.$store.getters.USER.id, // 当前用户ID
        password: "", // 新密码
        oldPassword: "", // 原密码
        confirmPassword: "" // 再次确认新密码
      },
      //   表单校验
      rules: {
        oldPassword: [
          {
            required: true,
            max: 6,
            message: this.$lang.add(
              this.$lang.login[10],
              this.$lang.login[11],
              this.$lang.login[9]
            ),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            max: 6,
            message: this.$lang.add(
              this.$lang.login[10],
              this.$lang.login[12],
              this.$lang.login[9]
            ),
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: this.$lang.add(
              this.$lang.login[10],
              this.$lang.login[13],
              this.$lang.login[12],
              this.$lang.login[9]
            ),
            trigger: "blur"
          },
          {
            validator: checkNewPassword,
            trigger: "blur"
          }
        ]
      },
      // 个人信息
      formPerson: {
        id: this.$store.getters.USER.id, // 当前用户ID
        userName: "",
        password: "",
        realName: "",
        address: "",
        phone: "",
        sex: 1,
        sort: 1,
        remark: "",
        email: "",
        headPath: ""
      },
      // 个人信息表单校验
      rulesPerson: {
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
      }
    };
  },
  computed: {
    ...mapState(["breadcrumb"])
  },
  components: {
    menuList
  },
  methods: {
    // 个人信息修改
    updatePerson() {
      this.$refs.ruleUpdatePersonForm.validate(valid => {
        if (valid) {
          this.loadingModel = true;
          this.maskClosable = false;
          this.closableModal = false;
          // 用户头像赋值
          this.formPerson.headPath = this.$refs.pictureUploadUpdate.headimgBase64;
          this.$service.api
            .update("sysUser", this.formPerson)
            .then(res => {
              this.updatePersonModalVisible = false;
              this.loadingModel = false;
              this.maskClosable = true;
              this.closableModal = true;
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    // 打开个人信息
    personInfo() {
      this.formPerson = {
        id: this.$store.getters.USER.id, // 当前用户ID
        userName: "",
        password: "",
        realName: "",
        address: "",
        phone: "",
        sex: 1,
        sort: 1,
        remark: "",
        email: "",
        headPath: ""
      };
      this.$service.api
        .search("sysUser", { id: this.formPerson.id })
        .then(res => {
          this.formPerson = res;
          this.updatePersonModalVisible = true;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },

    // 菜单关闭
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // update密码
    updateForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loadingModel = true;
          this.maskClosable = false;
          this.closableModal = false;
          this.$service.api
            .updatePassword(this.form)
            .then(res => {
              this.loadingModel = false;
              this.maskClosable = true;
              this.closableModal = true;
              this.updateModalVisible = false;
              // 退出登录
              this.quit();
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
    // 表单打开前回调
    beforeForm() {
      this.updateModalVisible = true;
      this.form = {
        id: this.$store.getters.USER.id, // 当前用户ID
        password: "", // 新密码
        oldPassword: "", // 原密码
        confirmPassword: "" // 再次确认新密码
      };
    },
    resetUpdatePersonFormRules() {
      this.$nextTick(() => {
        this.$refs.ruleUpdatePersonForm.resetFields();
      });
    },
    // 表单校验重置状态
    resetRuleForm() {
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../assets/css/rule.less";
.home {
}
main {
  .navigation {
    padding: 10px 20px;
  }
}

nav {
  padding: 10px 20px;
  border-bottom: 1px solid @gray;

  #menuCtrl {
    font-size: 1.5rem;
    color: @gray;
  }

  #menuCtrl:hover {
    color: @dark-blue;
  }

  #menuIcon {
    font-size: 1.5rem;
    color: @blue;
  }

  z-index: 99;
}
.router-view {
  padding: 10px 20px;
}
</style>
