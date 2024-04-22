<script setup lang="ts">
import {getClubListApi} from '@/service/game/detail';
import {IClubList } from '@/vite/game'
import { Ref} from 'vue';
const clubList:Ref<IClubList> = ref({});

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

</script>

<template>
  <el-button
      type="primary"
      plain v-for="(index) in clubList"
      v-bind:key="index"
      class="club-btn"
  >
  </el-button>
</template>

<style scoped>

</style>