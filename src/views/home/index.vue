<template>
    <div>
        <a-button type="primary" @click="addModalVisible = true">弹出层1</a-button>
        <a-button type="primary" @click="addModalVisible2 = true">弹出层2</a-button>
        <a-form>
            <a-form-item
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    label="Prime between 8 & 12"
                    :validate-status="number.validateStatus"
                    :help="number.errorMsg"
            >
                <a-input-number :min="8" :max="12" :value="number.value" @change="handleNumberChange"/>
            </a-form-item>
        </a-form>

        <!-- 弹出框 -->
        <a-modal
                v-model="addModalVisible"
                centered
                :title="$lang.add( $lang.form[0] , $lang.dic[0])"
                :maskClosable="true"
                :width="720"
        >
            <template slot="footer">
                <div>
                    <a-button key="back" @click="addModalVisible = false">{{ $lang.form[4] }}</a-button>
                    <a-button
                            key="submit"
                            type="primary"
                            :loading="loadingModel"
                            @click="addSys()"
                    >{{ $lang.form[5] }}
                    </a-button>
                </div>
            </template>
            <!-- 内容区 -->
            <div>
                <div>
                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">资源名称</label>
                        </a-col>
                        <a-col :span="7">
                            <a-input placeholder="资源名称"/>
                        </a-col>
                        <a-col :span="2"></a-col>
                        <a-col :span="4">
                            <label class="wos-lable-default">资源路径</label>
                        </a-col>
                        <a-col :span="7">
                            <a-input placeholder="模块路径"/>
                        </a-col>
                    </a-row>

                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">图标名称</label>
                        </a-col>
                        <a-col :span="7">
                            <a-input placeholder="图标名称"/>
                        </a-col>
                        <a-col :span="2"></a-col>
                        <a-col :span="4">
                            <label class="wos-lable-default">资源类型</label>
                        </a-col>
                        <a-col :span="7">
                            <a-select defaultValue="root" class="wos-width-100">
                                <a-select-option value="root">root</a-select-option>
                                <a-select-option value="ctrl">ctrl</a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>

                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">资源权限</label>
                        </a-col>
                        <a-col :span="7">
                            <a-select defaultValue="管理员" class="wos-width-100">
                                <a-select-option value="管理员">管理员</a-select-option>
                                <a-select-option value="普通用户">普通用户</a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="2"></a-col>
                        <a-col :span="4">
                            <label class="wos-lable-default">父级资源</label>
                        </a-col>
                        <a-col :span="7">
                            <a-input placeholder="父级路径"/>
                        </a-col>
                    </a-row>

                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">资源备注</label>
                        </a-col>
                        <a-col :span="20">
                            <a-textarea placeholder="资源备注" :autosize="{ minRows: 4, maxRows: 8 }"/>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-modal>

        <!-- 弹出框 -->
        <a-modal
                v-model="addModalVisible2"
                centered
                :title="$lang.form[0]"
                :maskClosable="true"
        >
            <template slot="footer">
                <div>
                    <a-button key="back" @click="addModalVisible2 = false">{{ $lang.form[4] }}</a-button>
                    <a-button
                            key="submit"
                            type="primary"
                            :loading="loadingModel"
                            @click="addModalVisible2 = false"
                    >{{ $lang.form[5] }}
                    </a-button>
                </div>
            </template>
            <!-- 内容区 -->
            <div>
                <div>
                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">普通输入框</label>
                        </a-col>
                        <a-col :span="7">
                            <a-input placeholder="default size"/>
                        </a-col>
                        <a-col :span="2"></a-col>
                        <a-col :span="4">
                            <label class="wos-lable-default">数字输入</label>
                        </a-col>
                        <a-col :span="7">
                            <a-input-number class="wos-width-100" :min="1" :max="100000" :defaultValue="3"/>
                        </a-col>
                    </a-row>

                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">时间</label>
                        </a-col>
                        <a-col :span="7">
                            <a-date-picker/>
                        </a-col>
                        <a-col :span="2"></a-col>
                        <a-col :span="4">
                            <label class="wos-lable-default">下拉框</label>
                        </a-col>
                        <a-col :span="7">
                            <a-select defaultValue="Option1" class="wos-width-100">
                                <a-select-option value="Option1">Option1</a-select-option>
                                <a-select-option value="Option2">Option2</a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                    <a-row class="wos-row-padding-default">
                        <a-col :span="4">
                            <label class="wos-lable-default">文本域</label>
                        </a-col>
                        <a-col :span="20">
                            <a-textarea placeholder="Basic usage" :autosize="{ minRows: 4, maxRows: 8 }"/>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
    function validatePrimeNumber(number) {
        if (number === 11) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
        return {
            validateStatus: 'error',
            errorMsg: 'The prime between 8 and 12 is 11!',
        };
    }

    export default {
        name: "",
        data() {
            return {
                addModalVisible: false, // 添加弹出框展示状态
                addModalVisible2: false, // 添加弹出框展示状态
                loadingModel: false, // 弹出层确定按钮加载状态
                labelCol: {span: 7},
                wrapperCol: {span: 12},
                number: {
                    value: 11,
                }
            }
        },
        methods: {

            handleNumberChange(value) {
                this.number = {
                    ...validatePrimeNumber(value),
                    value,
                };
            },
        }
    }

</script>