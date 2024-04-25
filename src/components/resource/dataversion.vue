<template>
    <div>
        <el-table :data="dataversion.dataList.value" style="width: 1200px;height: 700px" scrollbar-always-on stripe border>
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
import {IDataversion} from '@/vite/data'
import {Ref} from 'vue'
class Dataversion {
  dataList: Ref<IDataversion[]> = ref([])
  fcGetDataVersionList = async (): Promise<void> => {
    const res: any = await dataVersionApi()
    if (res) {
      this.dataList.value = res
    }
  }
}
const dataversion = new Dataversion()
dataversion.fcGetDataVersionList()

</script>

<style scoped>

</style>