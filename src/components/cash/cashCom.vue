<script setup lang="ts">
import {getPaymentApi,FilePaymentApi } from '@/service/wallet/index'
import {Ref} from 'vue';


interface PaymentType {
  name: string,
  amountList: string[],
  minAmount: number,
  maxAmount: number
}
const paymentList: Ref<PaymentType[]> = ref([])
const fetchPaymentList = async () : Promise<void> =>{
      try {
        const response = await getPaymentApi();
        console.log(response);
        if (response.status === 1) {
          paymentList.value = response.result.paymentTypes[0].amountList.split(',');
        }
      } catch (error) {
        console.error('Error fetching payment list:', error);
    }
}

// class Payment {
//   constructor(){
//     this.paymentList = Ref<PaymentType[]>([]);
//   }
//   public fetchPaymentList = async () :Promise<void> =>{
//     try {
//     const response = await getPaymentApi();
//
//       if (response.status === 1) {
//       paymentList.value = response.result.paymentTypes[0].amountList.split(',');
//     }
//     } catch (error) {
//       console.error('Error fetching payment list:', error);
//     }
//   }
// }


const tt  = new FilePaymentApi();
tt.download('https://pwaapi.bacctest.com/api/H1Payment/paymenttypes')
</script>

<template>
  <div>
    <button @click="fetchPaymentList">Get Payment</button>
    <button class="mx-2" v-for="item in paymentList" :key="item">{{item}}</button>
  </div>
</template>

<style scoped>

</style>
