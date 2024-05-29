<script setup lang="ts">
import {getMemberInfoApi} from "@/service/member";
import { ElNotification } from 'element-plus'
import {
  Search,
} from '@element-plus/icons-vue'
import {Ref} from 'vue'
const memberInfo :Ref<any> = ref([])
const input = ref('')

const fcGetMemberInfo = async () => {
  const params = {
    "account": input.value
  }
  const res:any = await getMemberInfoApi(params)
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


const fcSearchMember = async () => {
   if(input.value){
     await fcGetMemberInfo()
   }
}
</script>

<template>
 <div class="member-wrap">
   <el-input v-model="input" style="width: 240px" placeholder="Please input"  />
   <el-button :icon="Search" circle @click="fcSearchMember" />
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
     <el-table-column prop="Active" :label="$t('active')" width="250" >
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

<style scoped lang="scss">
  .member-wrap {
  height: 500px;
}
  .el-table {
    margin-top: 20px;
  }


</style>
