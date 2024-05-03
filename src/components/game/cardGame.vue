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
      <el-card style="width: 300px"  shadow="always" v-for="(item, index) in gameList" :key="index" @click="fcOpenGame(item)">
        <div>
          {{ item.imagePath}} : {{ item.name }} {{item.id}}
        </div>
      </el-card>
    </div>
</template>

<script setup lang="ts">
import { getCardGameApi, getClubListApi, enterGameApi } from '@/service/game/detail'
import { ICardGame ,IClub} from '@/vite/data'
import { InterSlotImage } from '@/vite/homeInter'
import {Ref} from "vue/dist/vue";
import {ElNotification} from "element-plus";
const { locale } = useI18n()
const gameList: Ref<ICardGame[]> = ref([])
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
const fcGetCardGame = async (third: string): Promise<void> => {
    const res: any = await getCardGameApi(third)
    if (res) {
        gameList.value = res
    }
}
fcGetCardGame('MT')

const fcGetClubList = async (): Promise<void> => {
    const res: any = await getClubListApi()
    if (res) {
        clubList.value = res
            .filter((item?: any) => item.gameType === 5 && item.active === true )
            .sort((a: any, b: any) => a.sort - b.sort)

    }
}
fcGetClubList()
const fcSwitchClub = async (thirdPartyId: string): Promise<void> => {
  await fcGetCardGame(thirdPartyId)
  statusData.value = {
    status: 0,
    result: {
      urlInfo: '',
    },
    desc: '',
    errorDetail: null
  }
}

const fcGetImage = <T extends InterSlotImage>(imagePath: T, id: T) => {
    try {
        return new URL(`/src/assets/img/${imagePath}/${id}.jpg`, import.meta.url).href
    } catch (error) {
        console.log(error)
    }

}
const fcSwitchEnterParam = (game: string) => {
    const data = game;
    switch (data) {
        case 'RSG':
            return 'W1Royal'
        case 'JDB':
            return 'W1JDB'
        case 'Ameba':
            return 'AE'
    }
    return data
}
const fcOpenGame = async (game:any) => {
  try {
    const token = localStorage.getItem('userToken')
    if(!token) {
      ElNotification({
        title: '提示',
        message: '請先登入',
        type: 'error'
      },)
      return
    }
    const param = {
      device:  'DESKTOP',
      lang: locale.value,
      lobbyURL: `${window.location.origin}/close`,
      gameCode: game.id,
    };

    const result:any = await enterGameApi(fcSwitchEnterParam(game.imagePath), param);
    if (result.status === 1) {
      const  {urlInfo} = result.result
      window.open(urlInfo);
    }
    statusData.value = result
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
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

