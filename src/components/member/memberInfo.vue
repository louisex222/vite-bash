<script setup lang="ts">
import {getMemberInfoApi} from "@/service/member";
import { ElNotification } from 'element-plus'
import {Ref} from 'vue'
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
   <el-table
       :data="memberInfo"
       style="width: 1200px;"
       scrollbar-always-on
       stripe
       border
       :default-sort="{ prop: 'Club_Ename', order: 'descending' }"
   >
     <el-table-column prop="Club_Ename" :label="$t('Club_Ename')" width="150" sortable  />
     <el-table-column prop="Club_id" :label="$t('Club_id')" width="250" />
     <el-table-column prop="PanZu" :label="$t('PanZu')" width="250" />
     <el-table-column prop="OnlineTime" :label="$t('OnlineTime')" width="250" />
     <el-table-column prop="Active" :label="$t('Active')" width="250" >
        <template #default="scope">
          <el-tag :type="scope.row.Active === 1? 'success' : 'danger'">{{ scope.row.Active ===1 ? '啟用':'停用'  }}</el-tag>
        </template>
     </el-table-column>
     <el-table-column prop="Lock" :label="$t('Lock')" width="250" >
       <template #default="scope">
         <el-tag :type="scope.row.Lock === 0? 'success' : 'danger'">{{ scope.row.Lock ===1 ? '鎖定':'未鎖定'  }}</el-tag>
       </template>
     </el-table-column>
     <el-table-column prop="DongJie_Flag" :label="$t('DongJie_Flag')" width="250" >
       <template #default="scope">
         <el-tag :type="scope.row.DongJie_Flag === 0? 'success' : 'danger'">{{ scope.row.DongJie_Flag ===1 ? '凍結':'未凍結'  }}</el-tag>
       </template>
     </el-table-column>
   </el-table>
 </div>
</template>

<style scoped>

</style>
