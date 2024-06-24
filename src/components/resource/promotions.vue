<template>
    <div class="locale-title">{{locale.toLocaleUpperCase()}}</div>
    <button @click="fcResetDataSort()" style="margin-right:10px">初始化排序</button>
    <button @click="fcPreStep" style="margin-right:10px">上一步</button>
    <button @click="fcNextStep" style="margin-right:10px">下一步</button>
    <button>異教徒模式</button>
    <VueDraggable
      v-model="promotionDataList"
      class="list-group" @end="onEnd"
    >
        <li
          v-for="(item , index) in promotionDataList"
          :key="index"
          class="cursor-move"
        >
          <p>{{index}} : {{ item.eventNewsID}}</p>
          <img :src="item.eventNewsImgUrl" alt="">
        </li>
    </VueDraggable>
    <div class="wall">{{ promotionComputed }}</div>
</template>

<script setup lang="ts">
import { getPromotionListApi } from '@/service/game/detail'
import { ElNotification } from 'element-plus';
import { VueDraggable } from 'vue-draggable-plus'
import { useStore } from 'vuex';
import {Ref} from 'vue'
import {IPromotionData} from "@/vite/data";
const { locale } = useI18n()
const  store  = useStore()
const promotionDataList: Ref<IPromotionData[]> = ref([])
const promotionComputed = computed<object[]>(() => {
    return promotionDataList.value.map((item: any, index:number) => {
        return {
            sort: index,
        }
    })
})
const currentStep: Ref<number> = ref(1)
const currentPromotion = computed<object[]>(() => store.getters.currentPromotion)
const fcGetPromotion = async (): Promise<void> => {
    const param= {
        Language: locale.value.toLowerCase()
    }
    const res = await getPromotionListApi(param)
    if (res.status === 1) {
        ElNotification({
            title: '資料獲取成功',
            message: '開始動作',
            type: 'success'
        })
      const {result} = res
      promotionDataList.value = result.map((res:any)=>{
        const {eventNewsImgUrl} = res;
        res.eventNewsImgUrl = `https://picture.nlnlouo.site/${ eventNewsImgUrl}`
        return res
      })
        if (currentPromotion.value.length === 0) {
            store.commit('setCurrentPromotion', promotionDataList.value)
        }
    }
}
fcGetPromotion()
const fcResetDataSort = () => {
    fcGetPromotion()
    currentStep.value = 1
    store.commit('clearCurrentPromotion')
}
const onEnd = () => {
    store.commit('setCurrentPromotion', promotionDataList.value)
    currentStep.value += 1
}
const fcPreStep = () => {
    if (currentStep.value > 1) {
        currentStep.value -= 1
        if (currentStep.value === 1) {
            currentStep.value = 1
            ElNotification({
                title: '回到最初資料',
                message: '開始動作',
                type: 'success'
            })
        }
        promotionDataList.value = <IPromotionData[]>currentPromotion.value[currentStep.value - 1]
    }
}
const fcNextStep = () => {
    if (currentStep.value < currentPromotion.value.length) {
        currentStep.value += 1
        if (currentStep.value === currentPromotion.value.length) {
            currentStep.value = currentPromotion.value.length
            ElNotification({
                title: '到最後一步了',
                message: '開始動作',
                type: 'success'
            })
        }
      promotionDataList.value = <IPromotionData[]>currentPromotion.value[currentStep.value - 1]

    }
}




</script>

<style scoped lang="scss">
.list-group{
    width: 1360px;
    display: flex;
    flex-wrap: wrap;
    height: 700px;
    justify-content: space-between;
    li{
        width: 300px;
        margin: 10px;
        img{
            width: 100%;
        }
    }
}
.wall{
    position:fixed;
    right: 150px;
    top: 130px;
    width: 380px;
    height: 700px;
}

</style>
