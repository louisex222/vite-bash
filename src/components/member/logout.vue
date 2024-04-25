<template>
    <div>
        <el-button type="primary" @click="fcSubmitLogout()">登出</el-button>
    </div>
</template>

<script setup lang="ts">
import { logoutApi } from '@/service/member'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const fcSubmitLogout =  async(): Promise<void> => {
    const res = await logoutApi()
    if (res.status === 1) {
        ElNotification({
            title: '登出成功',
            message: '歡迎再度光臨',
            type: 'success'
        })
        localStorage.removeItem('userToken')
        localStorage.removeItem('userInfo')
        router.push({path: '/'})
    }
}
</script>

<style scoped>

</style>
