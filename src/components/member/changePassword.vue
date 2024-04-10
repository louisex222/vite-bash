<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="oldPassword" prop="oldPassword">
            <el-input v-model="ruleForm.oldPassword" type="password" />
        </el-form-item>
        <el-form-item label="password" prop="password">
            <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item label="password_Check" prop="password_Check">
            <el-input v-model="ruleForm.password_Check" type="password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { changePwdApi } from '@/service/member/index'
import { IChangePwdParam } from '@/vite/api';
import { md5 } from 'js-md5';
import { ElNotification } from 'element-plus'
const ruleFormRef = ref<FormInstance>()


const ruleForm: IChangePwdParam = reactive({
    oldPassword: '',
    password: '',
    password_Check: '',
})

const fcPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請輸入密碼'))
    }
    else {
        callback()
    }
}
const fcNewPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請輸入密碼'))
    }
    else {
        if (value === ruleForm.oldPassword) {
            callback(new Error('兩次輸入密碼一致'))
        }
        else {
            callback()
        }
    }
}
const fcCheckPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請輸入密碼'))
    }
    else if (value !== ruleForm.password) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<typeof ruleForm>>({
    oldPassword: [{ validator: fcPassword, trigger: 'blur' }],
    password: [{ validator: fcNewPassword, trigger: 'blur' }],
    password_Check: [{ validator: fcCheckPassword, trigger: 'blur' }],
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async(valid) => {
        if (valid) {
            const param: IChangePwdParam = {
                oldPassword: md5(ruleForm.oldPassword).toUpperCase(),
                password: md5(ruleForm.password).toUpperCase(),
                password_Check: md5(ruleForm.password_Check).toUpperCase()
            };
            const res = await changePwdApi(param)
            if (res.status === 1) {
                ElNotification({
                    title: '修改成功',
                    message: '歡迎回來',
                    type: 'success'
                })
                resetForm(formEl)
            } else {
                ElNotification({
                    title: '修改失敗',
                    message: 'api錯誤',
                    type: 'error'
                })
            }
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<style scoped>

</style>