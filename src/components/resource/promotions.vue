<template>
    <div class="locale-title">{{locale.toLocaleUpperCase()}}</div>
    <div class="promotion-wrap">
        <!-- {{ promosionDataList }} -->
        <el-card style="max-width: 350px" v-for="(item,index) in promosionDataList" :key="index">
            <template #header>NO.{{index}} : {{ item.eventNewsTitle
                }}</template>
            <img :src="item.eventNewsImgUrl" style="width: 100%" />
        </el-card>


    </div>
</template>

<script setup lang="ts">
import { getPromotionListApi, IPromotionList } from '@/service/game/detail'
import Drager from 'es-drager'
import { useI18n } from 'vue-i18n';
const { locale } = useI18n()    
console.log(locale.value)
const promosionDataList: Ref<any> = ref([])
const fcGetPromotion = async (): Promise<void> => {
    const param: IPromotionList = {
        Language: locale.value.toLowerCase()
    }
    const res = await getPromotionListApi(param)
    if (res.status === 1) {
        promosionDataList.value = res.result
    }
}
fcGetPromotion()
console.log(promosionDataList)
</script>

<style scoped lang="scss">
.locale-title{
    padding-left: 30px;
}
.promotion-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    padding: 20px;
    max-height:  calc(100vh - 120px);
    .el-card{
        margin-bottom: 20px;
    }
}
</style>