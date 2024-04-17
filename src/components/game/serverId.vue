<script setup lang="ts">
import { getServerIdApi,getClubListApi} from '@/service/game/detail';
import { IServerId} from '@/vite/api';
import { Ref, ref } from 'vue';
const serverId:Ref<any> = ref('');
const clubList:Ref<any> = ref([]);
const thirdPartyId:Ref<string> = ref(''); // 在這裡定義 thirdPartyId

const fcGetServerId = async (thirdPartyIdValue:string):Promise<void> => {
  const param : IServerId ={
    thirdParty_id: thirdPartyIdValue,
  }

  const res = await getServerIdApi(param);
  serverId.value = res.data;
}

const fcGetClubList = async (): Promise<void> => {
  const res: any = await getClubListApi()
  const excludedClub = ['Favorites', 'MobileHot','Golden']

  if (res) {
    clubList.value = res
        .filter((item?: any) => item.gameType === 3 && item.active === true && !excludedClub.includes(item.thirdPartyId))
        .sort((a:any,b:any)=> a.sort - b.sort)

  }
  console.log('clubList', clubList.value)
}
fcGetClubList()
const fcSwitchClub = async (thirdPartyIdValue: string): Promise<void> => {
  thirdPartyId.value = thirdPartyIdValue; // 在這裡更新 thirdPartyId
  await fcGetServerId(thirdPartyIdValue)
}
</script>

<template>
  <el-button type="primary" plain v-for="(item,index) in clubList" :key="index"
             @click="fcSwitchClub(item.thirdPartyId)" class="club-btn">
    {{ item.thirdPartyId  }}
  </el-button>
</template>

<style scoped>

</style>