<script setup lang="ts">
import {getMemberInfoApi} from "@/service/member";
import {getUpdateMemberStatusApi} from "@/service/member";
import { ElNotification } from 'element-plus'
import {
  Search,
} from '@element-plus/icons-vue'
import {Ref} from 'vue'
const memberInfo :Ref<any> = ref([])
const input = ref('')
const updateList :Ref<any> = ref({
  fieldName: '',
  status:"",
  clubId: ''
})
const fcGetMemberInfo = async () => {
  const params = {
    "account": input.value
  }
  const res:any = await getMemberInfoApi(params)
  console.log(res)
  if (res) {
    memberInfo.value = res
    ElNotification({
      title: '成功',
      message: '獲取會員資料成功',
      type:'success'
    })
  }

}


const fcSearchMember = async () => {

     await fcGetMemberInfo()

}
const fcUpdateMemberStatus = async()=>{
  const param :any ={
    field_name: updateList.value.fieldName,
    status: updateList.value.status,
    club_id: updateList.value.clubId,

  }
  const res:any = await getUpdateMemberStatusApi(param)
  if (res) {
    ElNotification({
      title: '成功',
      message: '獲取會員資料成功',
      type:'success'
    })
  }

}

</script>

<template>
 <div class="member-wrap">
   <el-input v-model="input" style="width: 240px" placeholder="Please input"  />
   <el-button :icon="Search" circle @click="fcSearchMember" />
   <el-table
       :data="memberInfo"
       style="width: 1200px; margin-bottom: 20px"
       scrollbar-always-on
       stripe
       border
       :default-sort="{ prop: 'Club_Ename', order: 'descending' }"
   >
     <el-table-column prop="Club_Ename" :label="$t('Club_Ename')" width="150" sortable  />
     <el-table-column prop="Club_id" :label="$t('Club_id')" width="250" />
     <el-table-column prop="PanZu" :label="$t('PanZu')" width="250" />
      <el-table-column prop="Now_XinYong" :label="$t('Now_XinYong')" width="250" />
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
   <el-select v-model="updateList.fieldName"  style="width: 240px">
      <el-option label="Active" value="Active"></el-option>
      <el-option label="Lock" value="Lock"></el-option>
      <el-option label="DongJie_Flag" value="DongJie_Flag"></el-option>
      <el-option label="Now_XinYong" value="Now_XinYong"></el-option>
   </el-select>
   <el-select v-model="updateList.clubId" style="width: 240px">
     <el-option label="Datw01" value="2005161771"></el-option>
     <el-option label="Datw05" value="2005161782"></el-option>
     <el-option label="a13579" value="C240000000162"></el-option>
   </el-select>
   <el-select v-model="updateList.status" v-if="updateList.fieldName === 'Active' || updateList.fieldName === 'Lock' || updateList.fieldName === 'DongJie_Flag'" style="width: 240px">
     <el-option  label="啟用" value="1"></el-option>
     <el-option label="停用" value="0"></el-option>
   </el-select>
   <el-input v-else  v-model="updateList.status" style="width: 240px"  placeholder="Please input"  />
   <el-button @click="fcUpdateMemberStatus">更改帳號內容</el-button>
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
