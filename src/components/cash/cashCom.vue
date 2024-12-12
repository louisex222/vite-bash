<script setup lang="ts">
import { testPaymentApi } from '@/service/wallet'
import  { Ref } from 'vue';


const paymentList: Ref<string[]> = ref([])
const fetchPaymentList = async () : Promise<void> =>{
      try {
        const response = await testPaymentApi();
        console.log(response);
        if (response.status === 1) {
          paymentList.value = response.result.paymentTypes[0].amountList
        }
      } catch (error) {
        console.error('Error fetching payment list:', error);
    }
}

</script>

<template>
  <div>
    <button @click="fetchPaymentList">Get Payment</button>
    <button class="mx-2" v-for="item in paymentList" :key="item">{{item}}</button>
  </div>
</template>

<style scoped>

</style>
