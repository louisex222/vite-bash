<script setup lang="ts">
  import {getClubListApi} from '@/service/game/detail'
  import  {IClub} from '@/vite/data'
  import {Ref } from "vue";
  import { io } from 'socket.io-client'
  // const
  interface IAllGameList {
    clubename: string,
    id: string,
    desc: string,
    result:any
  }

  const allGameList :Ref<IAllGameList[]> = ref([]);
  const clubList: Ref<IClub[]> = ref([])
  const clubValue :Ref<string> = ref('')
  const fcGetClubList = async (): Promise<void> => {
    const res: any = await getClubListApi()
    const excludedClub = ['Favorites', 'MobileHot','Golden']

    if (res) {
      clubList.value = res
      .filter((item?: any) => item.gameType === 3 && item.active === true && !excludedClub.includes(item.thirdPartyId))
      .sort((a:any,b:any)=> a.sort - b.sort)

    }
  }
  fcGetClubList()

  const socket = io('http://192.168.196.134:8000',{
    transports: ['websocket'],
    autoConnect:true,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  })
  const fcCheckSocket = () => {
    socket.on("getGameToken", function (data) {
      console.log(data)
      allGameList.value = data
    });
    socket.emit(
        "getGameToken", JSON.stringify({
    "thirdParty_id": clubValue.value
    }))
  }



</script>

<template>
<div>
  <el-button  class=" hover:bg-amber-400 mr-3" size="large" type="primary"  @click="fcCheckSocket">選擇廠商遊戲全進線</el-button>
  <el-select
      v-model="clubValue"
      placeholder="Select"
      size="large"
      style="width: 240px"
  >
    <el-option
        v-for="item in clubList"
        :key="item.id"
        :label="item.thirdPartyId"
        :value="item.thirdPartyId"
    />
  </el-select>
  <el-table :data="allGameList" style="width: 100%" height="500">
    <el-table-column  width="200" prop="clubename" label="帳號"></el-table-column>
    <el-table-column width="200" prop="id" label="遊戲名稱"></el-table-column>
    <el-table-column  width="200"  prop="desc" label="狀態"></el-table-column>
    <el-table-column width="500" prop="result.urlInfo" label="網址">
      <template v-slot="scope">
        <a :href="scope.row.result.urlInfo" target="_blank">{{scope.row.result}}</a>
      </template>
    </el-table-column>

  </el-table>


</div>
</template>

<style scoped>

</style>
