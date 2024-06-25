<script setup lang="ts">
  import {getAllGameCheckApi} from "@/service/type/healthCheck";
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
  interface IMessage {
    name: string,
    msg: string
  }
  const allGameList :Ref<IAllGameList[]> = ref([]);
  const clubList: Ref<IClub[]> = ref([])
  const clubValue :Ref<string> = ref('')
  const inputValue: Ref<string> = ref('')
  const message: Ref<IMessage[]> = ref([
  ])
  const fcCheckGame = async () => {
    const param:any = {
      thirdParty_id: clubValue.value
    }
    allGameList.value = await getAllGameCheckApi(param);
  }
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

  let ws = null;
  const fcUpdateView = (msg) => {
    message.value =  message.value.concat({
      msg: msg,
    })
  }
  const fcConnect =() =>{
    if (ws === null) {
      ws = new WebSocket('ws://localhost:8081');
      ws.onopen = () => {
        ws.onmessage = event => {
          fcUpdateView(event.data)
        }
      };
  }
  }
  // fcConnect()
  const fcDisconnect =() =>{
      ws.close();
      ws.onclose = () => console.log('[close connection]')

  }

  const fcSend = (msg) =>{
    ws.send(msg)
    ws.onmessage = event => {
        console.log(ws)
      fcUpdateView(event.data)
    }

  }

  //
  const socket = io('http://192.168.196.134:8000',{
    transports: ['websocket'],
    autoConnect:true,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  })
  socket.on("getGameToken", function (data) {
    console.log(data)
    allGameList.value = data
  });
  socket.emit(
      "getGameToken",
      `{
    "thirdParty_id": "AE"
  }`
  )

</script>

<template>
<div>
  <el-button  class=" hover:bg-amber-400 mr-3" size="large" type="primary"  @click="fcCheckGame">CheckGame</el-button>
  <el-select
      v-model="clubValue"
      placeholder="Select"
      size="large"
      style="width: 240px"
  >
    <el-option
        v-for="item in clubList"
        :key="item.id"
        :label="item.name"
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

  <el-button  class=" hover:bg-amber-400" size="large" type="primary" >connect</el-button>
  <el-button  class=" hover:bg-amber-400 mr-3" size="large" type="primary" @click="fcDisconnect ">disconnect</el-button>
  <el-input v-model="inputValue" placeholder="請輸入" style="width: 200px"></el-input>
  <el-button class=" hover:bg-amber-400 ml-3" size="large" type="primary" @click="fcSend(inputValue)">send</el-button>
  <div v-for="(item,index) in message" :key="index"> 角色 : {{item.msg}}</div>
</div>
</template>

<style scoped>

</style>
