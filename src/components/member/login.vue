<template>
    <el-form ref="ruleFormRef" class="login-form" :model="form" :rules="rules" :inline="true" size="default">
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="請輸入客戶名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密碼"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登入</el-button>
        </el-form-item>
    </el-form>

  <el-result
      v-if="statusData.status !== 0"
      :icon="statusData.status === 1? 'success' : 'error'"
      :title="statusData.desc"
      :sub-title="statusData.errorDetail !== null ? statusData.errorDetail : statusData.result.clubename"
  >
    <template #extra>
      <el-button type="primary">{{statusData.status}}</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import {Ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElNotification} from 'element-plus'
import {loginApi} from '@/service/member'
import {ILoginParam} from '@/vite/api';
import {IFrom} from '@/vite/data';
import {md5} from 'js-md5';
const ruleFormRef = ref<FormInstance>()
const form :IFrom = reactive({
    username: 'Datw05',
    password: '8888'
})
type TstatusData = {
    status: number,
    result: {
        token: string
      clubename:string,
    },
    desc:string,
    errorDetail: null | string
}
const statusData :Ref<TstatusData> =ref({
    status: 0,
    result: {
        token: '',
        clubename: ''
    },
    desc: '',
    errorDetail: null
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

const rules: FormRules= reactive({
    username: [{ required: true, validator: validateUser, message: "请输入用户名" }],
    password: [{ required: true, validator: validatePassword, message: "请输入密码" }]
})
const fcLogin = async(): Promise<void> => {
    const param: ILoginParam = {
        account: form.username,
        password: md5(form.password),
        uidKey: 'web'
    }
    const res:any = await loginApi(param)
    statusData.value = res
   localStorage.setItem('userInfo', JSON.stringify(res))

    if (res.status === 1) {
        const {result} = res;
      localStorage.setItem('userToken', result.token)
       ElNotification({
          title: '登入成功',
          message: '歡迎回來',
          type: 'success'
       })
    }
    else if ( res.status === -2) {
        ElNotification({
            title: '登入失敗',
            message: 'api錯誤',
            type: 'error'
        })
    }
}
const submitForm = (form: FormInstance | undefined) => {
    if (!form) return
    form.validate((valid: boolean) => {
        if (valid) {
            console.log('submit!')
            fcLogin()
        } else {
            console.log('error submit!!')
            return false
        }
    })

}
const localUserInfo = JSON.parse(localStorage.getItem('userInfo') )
statusData.value = localUserInfo ? localUserInfo : statusData.value

</script>

<style lang="scss" scoped >
:deep(.el-form-item__error) {
    padding-left: 7px;
    padding-top: 5px;
}
.el-result{
  width:300px;
}

</style>
