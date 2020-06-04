<template>
  <div class="clearfix">
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      @change="handleChange"
      :showUploadList="false"
    >
      <a-avatar icon="user" :src="headimgBase64" />
    </a-upload>
  </div>
</template>
<script>
// 获取图片的base64
function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}
export default {
  name: "pictureUpload",
  props:{
      imgUrl:{
          type:String
      }
  },
  data() {
    return {
      headimgBase64:""  // 图片base64
    }
  },
  mounted(){
    this.headimgBase64 = this.imgUrl
  },
  methods: {
    handleChange(fileList) {
      // 传入文件，返回base64
      getBase64(fileList.file.originFileObj, imageBase64 => {
        this.headimgBase64 = imageBase64
      })
    },
    // 清理组件缓存图片
    clearCatchImg(){
        this.headimgBase64 = ""
    }
  }
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
