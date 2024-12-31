<script setup lang="ts">
import { testPaymentApi } from '@/service/wallet'
import  { Ref } from 'vue';

interface InterpaymentList {
  status: number,
  desc: string,
  result:{
    code:string,
    paymentTypes:
        [
          {
            name: string
            amountList: string,
            minAmount: number
            maxAmount: number
          }
        ]
    errorMessage: null | string,
  }
  errorDetail:null | string,
}
const paymentList: Ref<any[]> = ref([])
const fetchPaymentList = async () : Promise<void> =>{
      try {
        const response : InterpaymentList = await testPaymentApi();
        console.log(response);
        if (response.status === 1) {
          paymentList.value  = response.result.paymentTypes[0].amountList.split(',')
          console.log(paymentList.value)
        }
      } catch (error) {
        console.error('Error fetching payment list:', error);
    }
}

</script>

<template>
  <div>
    <button @click="fetchPaymentList">Get Payment</button>
    <div class="mx-2" v-for="item in paymentList" :key="item">{{item}}</div>
  </div>
</template>

<style scoped>

</style>
