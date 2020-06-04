<template>
  <div>
    <a-tabs class="wos-height-100vh" defaultActiveKey="1" tabPosition="right">
      <a-tab-pane tab="表格类设置" key="1">
        <a-form-model layout="inline" :model="form" v-bind="formItemLayout">
          <a-form-model-item label="Field A">
            <a-input v-model="form.fieldA" placeholder="input placeholder" />
          </a-form-model-item>
          <a-form-model-item label="Field B">
            <a-input v-model="form.fieldB" placeholder="input placeholder" />
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane tab="菜单类设置" key="2">菜单类设置</a-tab-pane>
      <a-tab-pane tab="路由类设置" key="3">路由类设置</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
