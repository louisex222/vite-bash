<template>
        <el-button type="primary" plain v-for="(item, index) in clubList" :key="index"
            @click="fcSwitchClub(item.thirdPartyId)" class="club-btn">
            {{ item.thirdPartyId }}
        </el-button>
      <el-result
          v-if="statusData.status !== 0"
          :icon="statusData.status === 1? 'success' : 'error'"
          :title="$t(statusData.desc)"
          :sub-title="statusData.errorDetail !== null ? $t(statusData.errorDetail) : '網址: ' + statusData.result.urlInfo"
      >
        <template #extra>
          <el-button type="primary">{{statusData.status}}</el-button>
        </template>
      </el-result>
    <div class=" game-wrap">
      <el-card style="width: 300px"  shadow="always" v-for="(item, index) in tableList" :key="index" @click="fcEnterGame(item)">
        <div>
          {{ item.imagePath}} : {{ item.name }} {{item.id}}
        </div>
      </el-card>
    </div>
</template>

<script setup lang="ts">
import {Ref} from 'vue'
import { getGameTablesApi, getClubListApi, enterGameApi } from '@/service/game/detail'
import { ElNotification } from 'element-plus'
import { ITableListParam } from '@/vite/api';
import {IClub,ITableGame} from '@/vite/data';
const { locale } = useI18n()
const tableList: Ref<ITableGame[]> = ref([])
const clubList: Ref<IClub[]> = ref([])
type TstatusData = {
  status: number,
  result: {
    urlInfo:string
  },
  desc:string,
  errorDetail: null | string
}
const statusData :Ref<TstatusData> =ref({
  status: 0,
  result: {
    urlInfo: '',
  },
  desc: '',
  errorDetail: null
})
const fcGetTableGame = async (third: string): Promise<void> => {
    const param: ITableListParam = {
        gameType: 1,
    }
    const result:any = await getGameTablesApi(param)
    if (result) {
        tableList.value = result.filter(game => game.thirdPartyId ===third )

    } else {
        ElNotification({
            title: 'Error',
            message: 'Failed to get table game data',
            type: 'error'
        })
    }
}
fcGetTableGame('RCG')
const fcGetClubList = async (): Promise<void> => {
    const res: any = await getClubListApi()

    if (res) {
        clubList.value = res
            .filter((item?: any) => item.gameType === 1 && item.active )
            .sort((a: any, b: any) => a.sort - b.sort)

    }
}
fcGetClubList()
const fcSwitchClub = async (thirdPartyId: string): Promise<void> => {
   await fcGetTableGame(thirdPartyId)
  statusData.value = {
    status: 0,
    result: {
      urlInfo: '',
    },
    desc: '',
    errorDetail: null
  }
}

const fcGetImage = (thirdPartyId: string) => {
    try {
        return thirdPartyId  === 'RCG' ? 'https://shot.17live.store/default/gc001001.jpg?last_time=0' : 'https://ts.bacctest.com/img/WM1011.db8c48cf.jpg'
    } catch (error) {
        console.log(error)
    }

}
const fcEnterGame = async (game: any) => {
    const param = {
        device: 'MOBILE',
        lang: locale.value,
        lobbyURL: `${window.location.origin}/`,
        Desk: game.thirdPartyId ==='IDN' ? '' : game.desk,
    };
    let apiKey =''
    switch(game.thirdPartyId){
      case 'RCG':
        apiKey = 'W1RCGv3';
        break;
      case 'WM':
        apiKey ='WMLiveV2'
        break;
      default:
        apiKey = game.thirdPartyId
        break;
    }

    try {
        const result :any = await enterGameApi(apiKey, param);
        if (result.status === 1) {
          const  {urlInfo} = result.result
          window.open(urlInfo);
        }
        statusData.value = result
    }
    catch (error) {
        console.log(error)
    }
}
</script>

<style scoped lang="scss">
.game-wrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 450px;
}

.club-btn{
  margin-bottom: 20px;
}
.el-card{
  cursor: pointer;
  margin: 10px;
  &:hover{
    background-color: #409eff;
  }
}

:deep(.el-result){
  width: 300px;
  .el-result__subtitle{
    width: 80%;
  }
}
</style>
