<template>
    <div class=" game-wrap">
        <el-button type="primary" plain v-for="(item,index) in clubList" :key="index"
            @click="fcSwitchClub(item.thirdPartyId)" class="club-btn">
            {{item.thirdPartyId}}
        </el-button>

        <el-card style="width: 300px" shadow="always" v-for="(item, index) in gameList" :key="index"><template
                #header>{{ item.imagePath}} : {{ item.name
                }}
            </template>
            <img :src="fcGetImage(item.imagePath,item.id)" style="width: 100%" @click="fcOpenGame(item)" />
        </el-card>
        <div class="status">
            {{ statusData }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSlotGameApi, getClubListApi, enterSlotGameApi } from '@/service/game/detail'
import { Game } from '@/vite/game'
import { InterSlotImage } from '@/vite/homeInter'
const { locale } = useI18n()
const gameList: Ref<Game[]> = ref([])
const clubList: Ref<any> = ref()
const statusData : Ref<any> = ref()
const fcGetSlotGame = async (thirdPartyId: string): Promise<void> => {
    const res:any = await getSlotGameApi(thirdPartyId)
    if(res){
        gameList.value = res.filter((item: Game, index: number) => index === 0)
        console.log(gameList.value)
    }
}
fcGetSlotGame('Royal')

const fcGetClubList = async (): Promise<void> => {
    const res: any = await getClubListApi()
    const excludedeClub = ['Favorites', 'MobileHot','Golden']
    
    if (res) {
        clubList.value = res
            .filter((item?: any) => item.gameType === 3 && item.active === true && !excludedeClub.includes(item.thirdPartyId)) 
            .sort((a:any,b:any)=> a.sort - b.sort)
       
    }
}
fcGetClubList()
const fcSwitchClub = async (thirdPartyId: string): Promise<void> => {
    fcGetSlotGame(thirdPartyId)
    statusData.value = ''
}

const fcGetImage = <T extends InterSlotImage>(imagePath: T, id: T) => {
    try {
        return new URL(`/src/assets/img/${imagePath}/${id}.jpg`, import.meta.url).href
    } catch (error) {
       console.log(error)   
    }

}
const fcSwitchEnterParam = (game:string) => {
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
    const param = {
        device:  'DESKTOP',
        lang: locale.value,
        lobbyURL: `${window.location.origin}/close`,
        gameCode: game.id,
    };

    const result = await enterSlotGameApi(fcSwitchEnterParam(game.imagePath), param);
    if (result.status === 1) {
        window.open(result.result.urlInfo);
        
    }
    statusData.value = result
};
</script>

<style scoped lang="scss">
.club-btn{
    margin-bottom: 20px;
}
.el-card{
    cursor: pointer;
}
.status{
    width:300px;
    margin-top:15px;
    word-wrap: break-word
}
</style>