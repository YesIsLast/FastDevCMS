<template>
  <div>
    <template v-for="(tag, index) in tagList">
      <!-- 字符过长显示效果 -->
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <!-- 正常展示 -->
      <a-tag v-else :key="tag" closable :color="getTagColor()" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <!-- 新标签输入 -->
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      class="inputTag"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <!-- 添加新标签按钮 -->
    <a-tag v-else class="btnTag" @click="showInput">
      <a-icon type="plus" />
       {{btnText}}
    </a-tag>
  </div>
</template>
<script>
export default {
  props:{
    btnText:{
      type:String,
      default:"New Tag"
    },
    propList:{}
  },
  data() {
    return {
      tagList: [], // 标签列表
      inputVisible: false, // 输入框是否显示
      inputValue: '', // 新增标签输入值
    };
  },
  methods: {
    // 参数返回值
    returnFun(val){
      this.$emit("returnFun",val)
    },
    // 参数回显赋值
    setTagList(val){
      this.tagList = val
      this.returnFun(this.tagList)
    },
    // 随机获取标签颜色
    getTagColor() {
      let arr = [
        "pink",
        "red",
        "orange",
        "green",
        "",
        "cyan",
        "blue",
        "purple"
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    },
    // 删除标签
    handleClose(removedTag) {
      const tagList = this.tagList.filter(tag => tag !== removedTag);
      this.tagList = tagList;
      this.returnFun(tagList)
    },
    // 显示输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    // 输入框更改事件
    handleInputChange(e) {
      // 记录新增标签值
      this.inputValue = e.target.value;
    },
    // 提交标签
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tagList = this.tagList;
      // 去重
      if (inputValue && tagList.indexOf(inputValue) === -1) {
        tagList = [...tagList, inputValue];
      }
      this.returnFun(tagList)
      Object.assign(this, {
        tagList,
        inputVisible: false,
        inputValue: '',
      });
    },
  },
};
</script>
<style scoped>
  .btnTag{
    background: #fff;
    border-style: dashed ;
  }
  .inputTag{
    max-width: 102.4px;
  }
  .inputTag a-icon{
    color: rgba(255, 255, 255, 1);
  }
</style>