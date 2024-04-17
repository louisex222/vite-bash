<script setup lang="ts">
import {getMemberInfoApi} from "@/service/member";
import { ElNotification } from 'element-plus'
const memberInfo :Ref<any> = ref([])
const fcGetMemberInfo = async () => {
  const params = {
    "account": "Datw0"
  }
  const res = await getMemberInfoApi(params)
  if (res) {
    memberInfo.value = res
    ElNotification({
      title: '成功',
      message: '獲取會員資料成功',
      type:'success'
    })
  }
  console.log(res)
}
fcGetMemberInfo()
</script>

<template>
 <div>
   <el-table :data="memberInfo" style="width: 1200px;" scrollbar-always-on stripe border>
     <el-table-column prop="Club_Ename" label="Club_Ename" width="150" />
     <el-table-column prop="Club_id" label="Club_id" width="250" />
     <el-table-column prop="PanZu" label="PanZu" width="250" />
     <el-table-column prop="OnlineTime" label="OnlineTime" width="250" />
     <el-table-column prop="Active" label="Active" width="250" />
     <el-table-column prop="Lock" label="Lock" width="250" />
      <el-table-column prop="DongJie_Flag" label="DongJie_Flag" width="250" />
   </el-table>
 </div>
</template>

<style scoped>

</style>