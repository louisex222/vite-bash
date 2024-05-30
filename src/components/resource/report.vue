<script setup lang="ts">
import {Ref} from "vue"
import {getGameRecordApi,getTimeRangeApi,getReportStatusCheckApi} from "@/service/game/detail";
import {useI18n} from "vue-i18n";
interface FormList {
  date: string,
  dateStart: string,
  dateEnd : string,
  class: number,
  club: string,
  game:string,
  total:number,
  reportType:string,
  wType:string
}
interface TimeRange {
  mon_Begin:string,
  mon_End:string,
  preMon_Begin:string,
  preMon_End:string,
  preWeek_Begin:string,
  preWeek_End:string,
  week_Begin:string,
  week_End:string,
  today_Begin:string,
  today_End:string,
  venus_Transaction_Begin:string,
  venus_Transaction_End:string,
}
const{locale} = useI18n()
const formList:FormList = reactive({
  date: 'today',
  dateStart: '',
  dateEnd: '',
  class: "0",
  club: 'ALL',
  game: 'ALL',
  total: 0,
  reportType: 'n',
  wType: 'ALL'
});

const timeRange:TimeRange = reactive({
  mon_Begin:'',
  mon_End:'',
  preMon_Begin:'',
  preMon_End:'',
  preWeek_Begin:'',
  preWeek_End:'',
  week_Begin:'',
  week_End:'',
  today_Begin:'',
  today_End:'',
  venus_Transaction_Begin:'',
  venus_Transaction_End:'',
});
const reportResult :Ref<any> = ref()
const allReport :Ref<any> =ref()
const fcGetTimeRange = async()=>{
  const res:any = await getTimeRangeApi()
  try{
    if(res.status ===1) {
      Object.assign(timeRange, res.result[0])
    }
  }catch(e){
    console.log(e)
  }
}

  fcGetTimeRange()
const fcGetReport = async ()=>{
  const res:any = await  getGameRecordApi({
    language: locale.value,
    dateStart: formList.dateStart,
    dateEnd: formList.dateEnd,
    game_Class: formList.class,
    thirdParty_Id: formList.club,
    gType: formList.game,
    row_Set: formList.total,
    reportType: formList.reportType,
    wType: formList.wType
  })
  try{
    if(res.status ===1) {
      reportResult.value = res.result.dataInfo
    }
  }
  catch (e){
    console.log(e)
  }

}

const fcInputChange = (value:string)=> {
    switch(value) {
      case 'today':
        formList.dateStart = timeRange.today_Begin
        formList.dateEnd = timeRange.today_End
          formList.reportType = 'n'
        break
      case 'thisWeek':
        formList.dateStart = timeRange.week_Begin
        formList.dateEnd = timeRange.week_End
        formList.reportType = 'h'
        break
      case 'lastWeek':
        formList.dateStart = timeRange.preWeek_Begin
        formList.dateEnd = timeRange.today_End
        break
      case 'thisMonth':
        formList.dateStart = timeRange.mon_Begin;
        formList.dateEnd = timeRange.mon_End;
        formList.reportType = 'h'
        break;
      case 'lastMonth':
        formList.dateStart = timeRange.preMon_Begin;
        formList.dateEnd = timeRange.preMon_End;
        formList.reportType = 'h'
        break;
      default:

        break
    }
}
const fcGetReportStatusCheck = async ()=>{
  const res:any = await getReportStatusCheckApi()
  allReport.value = res
}
fcGetReportStatusCheck()
console.log(timeRange)
</script>

<template>
  <div>
    <h1>Report View</h1>
    <el-row :gutter="16">
      <el-col :span="2">
        <el-select v-model="formList.date" @change="fcInputChange(formList.date)">
          <el-option label="today" value="today"></el-option>
          <el-option label="thisWeek" value="thisWeek"></el-option>
          <el-option label="lastWeek" value="lastWeek"></el-option>
          <el-option label="thisMonth" value="thisMonth"></el-option>
          <el-option label="lastMonth" value="lastMonth"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2"><input type="text" v-model="formList.dateStart"></el-col>
      <el-col :span="2"><input type="text" v-model="formList.dateEnd"></el-col>
      <el-col :span="2"><input type="text" v-model="formList.class"></el-col>
      <el-col :span="2"><input type="text" v-model="formList.club"></el-col>
      <el-col :span="2">  <input type="text" v-model="formList.game"></el-col>
      <el-col :span="2"><input type="text" v-model="formList.total"></el-col>
      <el-col :span="2"><input type="text" v-model="formList.reportType"></el-col>
      <el-col :span="2"><input type="text" v-model="formList.wType"></el-col>
    </el-row>
    <el-button @click="fcGetReport">Get Report</el-button>

    <el-table
        class="table-wrap"
        :data="reportResult"
        style="width: 1300px;"
        scrollbar-always-on
        stripe
        border
        :default-sort="{ prop: 'stake_Score', order: 'descending' }"
    >
      <el-table-column prop="club_Ename" :label="$t('club_Ename')" width="150" sortable  />
      <el-table-column prop="id" :label="$t('id')" width="150" sortable  />
      <el-table-column prop="datetime" :label="$t('datetime')" width="150" sortable  />
      <el-table-column prop="game_id" :label="$t('game_id')" width="150" sortable  />
      <el-table-column prop="stake_Score" :label="$t('stake_Score')" width="150" sortable  />
      <el-table-column prop="yaMa" :label="$t('yaMa')" width="350" />
      <el-table-column prop="account_Score" :label="$t('account_Score')" width="350" />
      <el-table-column prop="tuiSui" :label="$t('tuiSui')" width="350" />
      <el-table-column prop="club_AScore" :label="$t('club_AScore')" width="350" />
      <el-table-column prop="jackpot_Score" :label="$t('jackpot_Score')" width="350" />
    </el-table>

  </div>
</template>

<style scoped>
.table-wrap{
  max-height:500px;
  overflow-y: auto;
}

</style>
