<script setup lang="ts">
import {getClubListApi ,getServerIdApi} from '@/service/game/detail';
import {IClub } from '@/vite/data'
import {IServerIdParam} from '@/vite/api'
import { Ref} from 'vue';
const clubList:Ref<IClub[]> = ref([]);
const serverId:Ref<string> = ref('')
const fcGetClubList = async (): Promise<void> => {
  const res: any = await getClubListApi()
  const excludedClub = ['Favorites', 'MobileHot','Golden']

  if (res) {
    clubList.value = res
        .filter((item?: any) =>  item.active === true && !excludedClub.includes(item.thirdPartyId))
        .sort((a:any,b:any)=> a.sort - b.sort)

  }
}
fcGetClubList()

const fcGetServerId = async (clubId : IClub) => {
  const param : IServerIdParam = {
    thirdParty_id: clubId.thirdPartyId
  }
  const res: any = await getServerIdApi(param)
  try{
    if(res){
      serverId.value = res[0]['Server_id']
    }
  } catch(error) {
    console.log(error)
  }

}
const fcSwitchServer = (serverId : IClub) =>{
  fcGetServerId(serverId)
}

</script>

<template>
  <div class="server-wrap">
    <el-button
        type="primary"
        plain v-for="(item,index) in clubList"
        v-bind:key="index"
        class="club-btn"
        @click="fcSwitchServer(item)"
    >
      {{item.thirdPartyId}}
    </el-button>
    <el-text class="mx-1 " size="large" >{{serverId}}</el-text>

  </div>
</template>

<style scoped lang="scss">
.server-wrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-text{
  width: 100%;
  margin-top: 10px;
}
</style>
