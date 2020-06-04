<template>
  <a-tree
    checkable
    :selectable="false"
    :defaultExpandAll="true"
    :autoExpandParent="true"
    :checkStrictly="true"
    
    :treeData="treeData"
    v-model="checkedKeys"
  />
</template>
<script>
export default {
  name: "treeResource",
  props: {
    // 树结构展示数据
    treeData: {
      type: Array
    },
    // 树结构数据源
    treeDataSource: {
      type: Array
    },
    // 树结构选中节点
    treeCheckedData: {
      type: Object
    }
  },
  data() {
    return {
      checkedKeys: [],
      treeCheckedKeys: "" // 返回数据JSON
    };
  },
  watch: {
    checkedKeys(newVal, oldVal) {
      let checkArr = [];
      this.treeDataSource.forEach(itemSource => {
        if (newVal.checked && newVal.checked.indexOf(itemSource.id) != -1) {
          checkArr.push(itemSource);
        }
      });
      this.treeCheckedKeys = JSON.stringify(this.getResource(checkArr));
    },
    // 选中数据实时更新
    "treeCheckedData":function () {
      this.treeCheckedKeys = this.treeCheckedData;
      this.checkedKeys = this.setResource();
    }
  },
  methods: {
    // 解析资源菜单为Obj，关联登录返还菜单、路由、面包屑使用
    getResource(list) {
      let result = {};
      for (let i in list) {
        result[list[i].path] = list[i];
      }
      return result;
    },
    // 解析obj，默认选中
    setResource() {
      let result = [];
      for (let i in this.treeCheckedData) {
        result.push(this.treeCheckedData[i].id);
      }
      return result;
    }
  },
  mounted() {
      this.treeCheckedKeys = this.treeCheckedData;
    this.checkedKeys = this.setResource();
  }
};
</script>
