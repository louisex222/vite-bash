<template>
    <div>
        <el-table :data="dataversion.dataList.value" style="width: 1200px;height: 700px" scrollbar-always-on stripe border>
            <el-table-column prop="id" :label="$t('id')" width="100" />
            <el-table-column prop="code" :label="$t('code')" width="250" />
            <el-table-column prop="version" :label="$t('version')" />
          <el-table-column prop="active" :label="$t('active')" width="250" >
            <template #default="scope">
              <el-tag :type="scope.row.active === true? 'success' : 'danger'">{{ scope.row.active ===true ? '啟用':'停用'  }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="autopilot" :label="$t('autopilot')" width="250" >
            <template #default="scope">
              <el-tag :type="scope.row.autopilot === 1? 'success' : 'danger'">{{ scope.row.autopilot ===1 ? '啟用':'停用'  }}</el-tag>
            </template>
          </el-table-column>
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
