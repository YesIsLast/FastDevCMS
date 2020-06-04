<template>
  <div class="page wos-flex wos-flex-center">
    <div id="login">
      <div class="logo wos-align-center">
        <img src="../assets/images/logo.png" alt="LOGO" />
        <a-divider>{{ $lang.title }}</a-divider>
      </div>

      <a-input
        :placeholder="$lang.login[0]"
        v-model="form.userName"
        allowClear
        ref="userName"
        size="large"
      >
        <a-icon slot="prefix" type="user" />
      </a-input>

      <a-input
        class="page-si"
        :placeholder="$lang.login[1]"
        allowClear
        type="password"
        v-model="form.password"
        ref="password"
        size="large"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>

      <div id="yzm" class="wos-flex page-si">
        <div class="wos-flex-auto">
          <a-input
            :placeholder="$lang.login[6]"
            allowClear
            v-model="form.code"
            ref="yzm"
            size="large"
            @keyup.enter="login"
          >
            <a-icon slot="prefix" type="code" />
          </a-input>
        </div>
        <div @click="refreshImg()">
          <img :src="yzmImg" />
        </div>
      </div>

      <div class="wos-align-right page-si">
        <a-switch
          :checkedChildren="$lang.login[2]"
          :unCheckedChildren="$lang.login[3]"
          default-checked
        />
      </div>

      <a-button
        class="page-si"
        type="primary"
        block
        @click="login()"
        :loading="LOADING"
      >{{ $lang.login[4] }}</a-button>

      <div class="wos-align-center page-si">
        <a href="#">{{ $lang.login[5] }}</a>
      </div>

      <div class="copyright">COPYRIGHT &copy; {{ $lang.domain }}.COM Version:{{version}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "admin",
        password: "123456",
        code: "",
        codeToken: ""
      },
      yzmImg: "/assets/img/yzm.png"
    };
  },
  mounted() {
    this.$service.api.serverStatus()
    this.refreshImg()
  },
  methods: {
    login() {
      this.$service.api
        .login(this.form)
        .then(res => {
          res === true
            ? this.$router.push({ path: "/home/index" })
            : this.$message.warning(res.type)
        })
        .catch(err => {
          if(err){
            this.refreshImg();
            this.$message.warning(err)
          }
        });
    },
    //    验证码获取
    async refreshImg() {
      this.yzmImg = "/assets/img/yzm.png"
      const yzmCode = await this.$service.api.yzmCode()
      this.yzmImg = yzmCode.base64
      this.form.codeToken = yzmCode.token
    }
  }
};
</script>

<style scoped lang="less">
@import "../assets/css/rule.less";

.page {
  height: 100vh;
  width: 100vw;
  background-color: #161d2d;
  background-image: url("../assets/images/loginbg.jpeg");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}

#login {
  min-width: 300px;
  max-width: 400px;
  border: 1px solid @gray;
  border-radius: 10px;
  padding: 40px 20px;
  background-color: #ffffff;
  -moz-box-shadow: 2px 2px 5px 2px @gray;
  -webkit-box-shadow: 2px 2px 5px 2px @gray;
  box-shadow: 2px 2px 5px 2px @gray;

  .logo {
    img {
      width: 5vw;
      height: 5vw;
    }

    p {
      padding-top: @padding-md;
      font-size: @font-size-sm;
    }
  }
}

.page-si {
  width: 100%;
  margin-top: @si*2;
}

.copyright {
  position: absolute;
  margin-top: 50px;
  color: #ffffff;
  text-align: center;
}

#yzm {
  img {
    height: 39px;
    border: 1px solid #d8d8d8;
  }
}
</style>
