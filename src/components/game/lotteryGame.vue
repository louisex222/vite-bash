<template>
        <el-button type="primary" plain v-for="(item, index) in clubList" :key="index"
            @click="fcSwitchClub()" class="club-btn">
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
import { getGameTablesApi, getClubListApi, enterGameApi } from '@/service/game/detail'
import { ElNotification } from 'element-plus'
import { ITableListParam } from '@/vite/api';
import {IClub ,ILotteryGame} from '@/vite/data';
import {Ref} from 'vue'
const { locale } = useI18n()
const tableList: Ref<ILotteryGame[]> = ref([])
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

const fcGetLotteryGame = async (): Promise<void> => {
    const param: ITableListParam = {
        gameType: 6,
    }
    const result:any = await getGameTablesApi(param)
    if (result) {
        tableList.value = result

    } else {
        ElNotification({
            title: 'Error',
            message: 'Failed to get table game data',
            type: 'error'
        })
    }
}
fcGetLotteryGame()
const fcGetClubList = async (): Promise<void> => {
    const res: any = await getClubListApi()

    if (res) {
        clubList.value = res
            .filter((item?: any) => item.gameType === 6 && item.active)
            .sort((a: any, b: any) => a.sort - b.sort)

    }
}
fcGetClubList()
const fcSwitchClub = async (): Promise<void> => {
    await fcGetLotteryGame()
  statusData.value = {
    status: 0,
    result: {
      urlInfo: '',
    },
    desc: '',
    errorDetail: null
  }
}

const fcGetImage = () => {
        return 'https://shot.17live.store/default/TAI01.jpg?last_time=0'
}
const fcEnterGame = async (game: any) => {``
    const param = {
        device: 'MOBILE',
        lang: locale.value,
        lobbyURL: `${window.location.origin}/`,
        enterGame: game.desk,
    };
    const apiKey = 'EG'
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
