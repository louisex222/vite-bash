<template>
 <div class="csv-wrap">
   <div v-for="item in userData" :key="item.id">
      <div @click="updateUserData(item.id)" class="user-data">{{item}}</div>
   </div>
   <button @click="createUserData">Create User Data</button>
 </div>
</template>

<script setup lang="ts">
import {Ref} from 'vue';
import { getUserDataApi ,createUserDataApi,updateUserDataApi } from '@/service/type/healthCheck';

const userData:Ref<any> = ref()
const data = {
  name: 'John',
  description: 'This is a sample description',
}
const getUserData = async () => {
  try {
    userData.value =await getUserDataApi();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
getUserData()
const createUserData = async () => {
  try {
    await createUserDataApi(data);
    getUserData()
  } catch (error) {
    console.error('Error creating user data:', error);
  }
}
const updateUserData = async (id:number) => {
  try {
    await updateUserDataApi(id);
    getUserData()
  } catch (error) {
    console.error('Error updating user data:', error);
  }
}
</script>

<style scoped>
.user-data{
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
