<template>
    <div class=" game-wrap">
        <el-button type="primary" plain v-for="(item, index) in clubList" :key="index"
            @click="fcSwitchClub(item.thirdPartyId)" class="club-btn">
            {{ item.thirdPartyId }}
        </el-button>

        <el-card style="width: 300px" shadow="always" v-for="(item, index) in tableList" :key="index"><template
                #header>{{ item.imagePath }} : {{ item.name
                }}
            </template>
            <img :src="fcGetImage(item.thirdPartyId)" style="width: 100%" @click="fcEnterGame(item)" />
        </el-card>
        <div class="status">
            {{ statusData }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { getTableGameApi, getClubListApi, enterGameApi } from '@/service/game/detail'
import { ElNotification } from 'element-plus'
import { ITableList } from '@/vite/api';
const { locale } = useI18n()
const tableList: Ref<any> = ref([])
const clubList: Ref<any> = ref()
const statusData: Ref<any> = ref()
const fcGetTableGame = async (thirdPartyId:string): Promise<void> => {
    const param: ITableList = {
        gameType: 1,
    }
    const result = await getTableGameApi(param)
    if (result) {
        tableList.value = result
            .filter((game: any, index: number) => game.thirdPartyId === thirdPartyId)
            .slice(0,1)
            
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
    fcGetTableGame(thirdPartyId)
    statusData.value = ''
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
        Desk: game.desk,
    };
    const apiKey = game.thirdPartyId === 'RCG' ? 'W1RCGv3' : 'WMLiveV2'
    try {
        const result = await enterGameApi(apiKey, param);
        if (result.status === 1) {
            window.open(result.result.urlInfo);
        }
        statusData.value = result
    }
    catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
.club-btn{
    margin-bottom: 20px
}
</style>