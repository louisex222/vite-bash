<template>
    <el-form ref="ruleFormRef" class="login-form" :model="form" :rules="rules" :inline="true" size="default">
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入客戶名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密碼"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登入</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
interface Input {
    username: string
    password: string
}
const ruleFormRef = ref<FormInstance>()
const form: Input = reactive({
    username: '',
    password: ''
})
const validateUser = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        callback()
    }
}
const validatePassword = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<typeof form>>({
    username: [{ required: true, validator: validateUser, message: "请输入用户名" }],
    password: [{ required: true, validator: validatePassword, message: "请输入密码" }]
})

const submitForm = (form: FormInstance | undefined) => {
    if (!form) return
    form.validate((valid: boolean) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
</script>

<style lang="scss" scoped >
:deep .el-form-item__error {
    padding-left: 7px;
    padding-top: 5px;
}
</style>