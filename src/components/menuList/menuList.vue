<template>
  <menu ref="menu">
    <div class="logo border-right wos-flex">
      <div class="logo-img">
        <img src="../../assets/images/logo.png" alt />
      </div>
      <div class="logo-text" v-show="!collapsed">{{ $lang.title }}</div>
    </div>
    <a-menu
            :defaultSelectedKeys="defaultSelectedKeys"
            :defaultOpenKeys="defaultOpenKeys"
            mode="inline"
            theme="dark"
            @openChange="onOpenChange"
            @select="selectMenu"
            :inlineCollapsed="collapsed"
            :style="menuWidthStyle"
    >
      <template v-for="m in MENUS">
        <a-menu-item :key="m.id" v-if="!m.children" @click="go(m.path)">
          <a-icon :type="m.iconCls" />
          <span>{{m.name}}</span>
        </a-menu-item>
        <a-sub-menu :key="m.id" v-else>
          <!--  @click="go(m.path)" -->
          <span slot="title">
            <a-icon :type="m.iconCls" />
            <span>{{m.name}}</span>
          </span>
          <template v-for="m2 in m.children">
            <a-menu-item v-if="!m2.children" :key="m2.id" @click="go(m2.path)">
              {{m2.name}}
            </a-menu-item>
            <a-sub-menu v-else :key="m2.id" :title="m2.name">
              <span slot="title" @click="go(m2.path)">
                <span>{{m2.name}}</span>
              </span>
              <a-menu-item v-for="m3 in m2.children" @click="go(m3.path)" :key="m3.id">
                {{m3.name}}
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>


    </a-menu>
  </menu>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "MenuList",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      MENUS:[],
      defaultSelectedKeys:[],
      defaultOpenKeys:[]
    };
  },
  created() {
    this.defaultSelectedKeys = this.defaultSelectedKey
    this.defaultOpenKeys = this.defaultOpenKey
  },
  async mounted() {
    this.MENUS = await this.MENU
  },
  computed: {
    ...mapGetters([
      'MENU',
      'defaultSelectedKey',
      'defaultOpenKey'
    ]),
    // 菜单折叠动态样式
    menuWidthStyle() {
      let result;
      this.collapsed
        ? (result = { width: "auto" })
        : (result = { width: "200px" });
      return result;
    }
  },
  methods: {
    selectMenu(m) {
      this.$store.commit("SET_STATE",{"key":"setDefaultSelectedKey",value: m.key})
      this.defaultSelectedKeys = [m.key]

    },
    // 折叠菜单change事件
    onOpenChange(openKeys) {
      if( openKeys !== null && openKeys !== undefined){
        this.defaultOpenKeys = openKeys
        this.$store.commit("SET_STATE",{"key":"setDefaultOpenKey",value:openKeys})
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/rule.less";

menu {
  min-height: 100vh;
  max-height: auto;
  background-color: @dark-blue;
  text-align: left;
  -moz-box-shadow: 3px 0px 7px @gray;
  -webkit-box-shadow: 3px 0px 7px @gray;
  box-shadow: 3px 0px 7px @gray;
  overflow: hidden;

  .logo {
    height: 80px;
    width: 100%;
    line-height: 80px;

    .logo-img {
      padding-left: 25px;

      img {
        width: 30px;
        height: 30px;
      }
    }

    .logo-text {
      color: #ffffff;
      padding-left: 10px;
    }
  }

  z-index: 100;
}
</style>
