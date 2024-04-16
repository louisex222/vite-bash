<template>
    <div>
        <el-table :data="dataList" style="width: 1200px;height: 700px" scrollbar-always-on stripe border>
            <el-table-column prop="id" label="id" width="100" />
            <el-table-column prop="code" label="code" width="250" />
            <el-table-column prop="version" label="version" />
            <el-table-column prop="active" label="active" />
            <el-table-column prop="autopilot" label="autopilot" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { dataVersionApi } from '@/service/game/detail'
const dataList :Ref<any> = ref([])
const fcGetDataVersionList = async () => {
    const res = await dataVersionApi()
    console.log(res)
    if (res) {
        dataList.value = res   
    }
}
fcGetDataVersionList()
</script>

<style scoped>

</style>