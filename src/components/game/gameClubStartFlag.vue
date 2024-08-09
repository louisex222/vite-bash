<script setup lang="ts">
import {getClubStartFlagApi} from "@/service/type/healthCheck";
import {enterGameApi} from '@/service/game/detail'
import {Ref} from 'vue';
import {useI18n} from 'vue-i18n';
const {locale} = useI18n();
interface  IClubFlag{
  flag: string,
  value: boolean
}
const allClubFlagList: Ref<IClubFlag[]> = ref([]);
const ishasFlag :Ref<boolean> = ref(false);

const fcGetClubStartFlag = async() : Promise<void> =>{
  try{
    const result:any = await getClubStartFlagApi();
    if(result.status ===1){
      ishasFlag.value = true;
      allClubFlagList.value = Object.entries(result.result)
      .map(([key,value])=>{
        const flag = key.replace(/Game_StartFlag|Room_StartFlag|_StartFlag/g, '');
        return {
          flag,
          value
        }

      });
    }
  }catch(e){
    console.log(e);
  }

}

</script>

<template>
  <div  class="flex h-96 flex-wrap"  v-if="ishasFlag">
      <div class="mr-3 w-52" v-for="(item,index) in allClubFlagList" :key="index">
         <span>{{item.flag}}</span>
          <el-switch
              v-model="item.value"
              class="ml-2"
              disabled
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
      </div>
  </div>
    <el-button class=" hover:bg-amber-400 mr-3" size="large" type="primary" @click="fcGetClubStartFlag">檢查館別狀態</el-button>
</template>

<style scoped>

</style>
