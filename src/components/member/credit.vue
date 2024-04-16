<template>
  <div class="credit-wrap">
    {{balanceComputed}}
    <button class="credit-wrap-btn" @click="fcGetBalance">獲取餘額</button>
    <button class="credit-wrap-btn" @click="fcCountDown(10)">倒數{{time}}</button>
  </div>
</template>
<script setup lang="ts">
import { getBalanceApi ,getMemberInfoApi } from '@/service/member'
import { ElNotification } from 'element-plus'
const  balance : Ref<number> = ref(10)
const balanceComputed = computed(() => {
  return balance.value.toFixed(2)
})
const fcGetBalance = async () => {
  const res = await getBalanceApi()
  if(res.status ===1){
    if(res.result.totalMoney){
      balance.value = res.result.totalMoney
      ElNotification({
        title: '提示',
        message: '獲取餘額成功',
        type: 'success'
      },)
    }
    else{
      ElNotification({
        title: '提示',
        message: '獲取餘額失敗',
        type: 'error'
      },)
      countDown(10)
    }
  }
}

let time:Ref<number> = ref(10)
let start: number | null = null;

const fcCountDown = (t: number) => {
  time.value = t;
  start = performance.now();
  requestAnimationFrame(fcStep);

}

const fcStep = (timestamp: number) => {
  if (!start) start = timestamp;
  const progress = timestamp - start;
  if (progress > 100) {
    time.value--;
    start = timestamp;
    if (time.value === 0) {
      fcGetBalance();
    } else {
      requestAnimationFrame(fcStep);
    }
  } else {
    requestAnimationFrame(fcStep);
  }
}


</script>
<style scoped lang="scss">
.credit-wrap{
  display: flex;
  flex-direction: column;
  .credit-wrap-btn {
    margin-top: 10px;
    width: 100px;
    height: 40px;
    background-color: #409eff;
    border-radius: 5px;
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;

  }
}
</style>