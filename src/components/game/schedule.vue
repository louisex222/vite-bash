<script setup lang="ts">
import {Ref} from "vue";
import {getClubListApi ,enterGameApi} from '@/service/game/detail';
import {getMemberInfoApi,loginApi} from "@/service/member";
import {IClub, ISlotGame,} from '@/vite/data'
import { GAME_TOKEN_MAPPER } from '@/settings.ts';
import {ElNotification} from "element-plus";
import dayjs from 'dayjs';
import {ILoginParam} from "@/vite/api";
import {md5} from "js-md5";

const { locale } = useI18n()
interface IGameList {
  clubId : number,
  gameId: string,
  gameType: 3
  thirdPartyId: string,
}
interface IErrorDetail {
  thirdPartyId: number,
  message: string,
  detail: string,
  errortime:string,
  account:object
}

const hotGameList : Ref<any> = ref([]);
const clubList: Ref<IClub[]> = ref([])
const allGamList :Ref<IGameList[]> = ref([
  {clubId: 1, gameId: 'rcg', gameType: 1, thirdPartyId: 'RCG'},
  {clubId: 29, gameId: 'wm', gameType: 1, thirdPartyId: 'WM'},
  {clubId: 48, gameId: 'we',gameType: 1, thirdPartyId: 'WE'},
  {clubId: 8, gameId: '17', gameType: 3, thirdPartyId: 'Royal'},
  {clubId: 9, gameId: '9007', gameType: 3, thirdPartyId: 'JDB'},
  {clubId: 15, gameId: '3038', gameType: 3, thirdPartyId: 'DS'},
  {clubId: 46,gameId:'dimsumhottie',gameType:3,thirdPartyId:'EG'},
  {clubId: 43, gameId:'StandAlonePlinko',gameType:3,thirdPartyId:'GEMINI'},
  {clubId: 45, gameId:'6001',gameType:3,thirdPartyId:'RGRICH'},
  {clubId: 32, gameId:'vswaysmadame',gameType:3,thirdPartyId:'PP'},
  {clubId:22,gameId:'212',gameType:3,thirdPartyId:'JILI'},
  {clubId: 13 ,gameId:'SMG_soccerStriker',gameType:3,thirdPartyId:'MG'},
  {clubId: 33, gameId:'22053',gameType:3,thirdPartyId:'FC'},
  {clubId: 31, gameId:'sJokerKing',gameType:3,thirdPartyId:'NEXTSPIN'},
  {clubId: 23, gameId:'ddpg1amgc71gk',gameType:3,thirdPartyId:'JOKER'},
  {clubId: 17, gameId:'at2_040',gameType:3,thirdPartyId:'TP'},
  {clubId:24,gameId:'10003',gameType:3,thirdPartyId:'GR'},
  {clubId: 25, gameId:'58',gameType:3,thirdPartyId:'AE'},
  {clubId: 34, gameId:'',gameType:4,thirdPartyId:'SABA'},
  {clubId: 41, gameId:'',gameType:4,thirdPartyId:'CMD368'},
  {clubId: 47, gameId:'',gameType:4,thirdPartyId:'CR'},
  {clubId: 37, gameId:'PTG0126',gameType:5,thirdPartyId:'MT'},
  {clubId: 39, gameId:'516',gameType:5,thirdPartyId:'MP'},
  {clubId:35,gameId:'',gameType:6,thirdPartyId:'EG'},
  {clubId:36,gameId:'',gameType:7,thirdPartyId:'WS168'},
  {clubId: 38, gameId:'',gameType:8,thirdPartyId:'PME'},
])


const errorDetail:Ref<IErrorDetail[]> = ref([])
let currentIndex :number = 0
let isSuccessFlag :boolean = false
let retryCount :number = 0
let retry :number = 3
const clubName:string = JSON.parse(localStorage.getItem('userInfo')).result?.clubename || ''
const memberInfo :Ref<any[]> = ref([])

const fcGetClubList = async (): Promise<void> => {
  const res: any = await getClubListApi()
  const excludedClub = ['Favorites', 'MobileHot','Golden']

  if (res) {
    clubList.value = res
    .filter((item?: any) =>  item.active === true && !excludedClub.includes(item.thirdPartyId))
    .sort((a:any,b:any)=>{
      if (a.gameType === b.gameType) {
        return a.sort - b.sort;
      }
      return a.gameType - b.gameType
    })
  }
}
fcGetClubList()
const fcLogin = async(random): Promise<void> => {
  console.log(random)
  const param: ILoginParam = {
    account: memberInfo.value[random]['Club_Ename'],
    password: md5('8888') ||md5('6666'),
    uidKey: 'web'
  }
  const res:any = await loginApi(param)
  localStorage.setItem('userInfo', JSON.stringify(res))
  if (res.status === 1) {
    const {result} = res;
    localStorage.setItem('userToken', result.token)
    ElNotification({
      title: '登入成功',
      message: '歡迎回來',
      type: 'success'
    })
  }
}
const fcGetMemberInfo = async ()=>{
  const params = {
    "account": 'Da'
  }
  const res:any = await getMemberInfoApi(params)
  if (res) {
    memberInfo.value = res.filter((item:any)=> item.Active)
  const randomIndex = Math.floor(Math.random() * memberInfo.value.length)
    console.log(memberInfo.value)
    ElNotification({
      title: '成功',
      message: '獲取會員資料成功',
      type:'success'
    })
    await fcLogin(randomIndex)
  }
}

fcGetMemberInfo()
const retryApiCall = async (apiCall: () => Promise<any>, retry:number,retryCount: number,): Promise<any> => {
  for (let i = retryCount; retryCount <= retry;) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === retry) {
        console.log('error',error)
      }
    }
  }
};
const mixOpenGame = async (currentIndex:number): Promise<void> =>{
  const game:IGameList = allGamList.value[currentIndex]
  const param :any = {
    device: 'MOBILE',
    lang: locale.value,
    lobbyURL: `${window.location.origin}/`,
    gameCode: game.gameId,
  };
  const api = GAME_TOKEN_MAPPER[game.thirdPartyId.toLowerCase()] ?? game.thirdPartyId
  try{
    const result: any = await retryApiCall(() => enterGameApi(api, param),retry,retryCount);
    if(result.status === 1){
      if(result.result?.urlInfo){
        ElNotification({
          title: '建線成功',
          message: game.thirdPartyId,
          type: 'success'
        })
        isSuccessFlag = true
      }
    }
    else{
      retryCount++
      console.log('retryCount',retryCount,game.thirdPartyId)
      isSuccessFlag = false
      if(retryCount === retry) {
        ElNotification({
          title: '建線失敗',
          message: game.thirdPartyId,
          type: 'error'
        })
        errorDetail.value.push({
          thirdPartyId: game.thirdPartyId,
          message: result.desc,
          detail: result.errorDetail,
          errortime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
          account: clubName

        })
      }
    }
  }catch(error){
   console.log(error)
  }
}

let intervalTimer :any = null
const fcAddIndex = () :void =>{
  intervalTimer = setInterval(() => {
    console.log('currentIndex',currentIndex)
    if(isSuccessFlag || retryCount === retry){
      if(currentIndex === allGamList.value.length -1){
        currentIndex = -1
        clearInterval(intervalTimer)
      }
      if(currentIndex < allGamList.value.length -1){
        currentIndex++
      }
      retryCount = 0
    }
    mixOpenGame(currentIndex)
  },3000)
}

let start :any =null
const fcLoopCall= (timer:any):void =>{
  try{
  if(!start) start = timer
  const elapsed = timer - start
  if(elapsed > 60000){
    fcGetMemberInfo().then(()=>{
      fcAddIndex()
    })
    start = null
  }
  requestAnimationFrame(fcLoopCall)
  }catch (error) {
    console.log(error)
  }
}

const now = dayjs();
const currentHour = now.hour();

// 檢查當前時間是否在10點到18點之間
if (currentHour >= 10 && currentHour < 18) {
  requestAnimationFrame(fcLoopCall)
}

</script>

<template>
  <div>
    <el-button
      type="primary" plain
      v-for="(item,index) in clubList" :key="index"
      class="club-btn"
    >
      {{item.thirdPartyId}}
    </el-button>

    <el-table
        :data="errorDetail" height="250"
        :default-sort="{ prop: 'thirdPartyId', order: 'descending' }"
        style="width: 100%"
    >
      <el-table-column prop="account" label="account" width="180" />
      <el-table-column prop="errortime" label="errortime" width="180" />
      <el-table-column prop="thirdPartyId" label="thirdPartyId" width="180" />
      <el-table-column prop="message" label="message" width="180" />
      <el-table-column prop="detail" label="detail" />
    </el-table>
  </div>
</template>

<style scoped>

</style>
