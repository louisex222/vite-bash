<template><el-container>
    <el-aside width="300px">
      <Aside :isOpen="isOpen"></Aside>
    </el-aside>
    <el-container :class="{ 'isOpen': isOpen === true }">
      <el-header>
        <Header ></Header>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import {Ref} from 'vue'
import Header from '@/components/header.vue'
import Aside from '@/components/asideCom.vue'
import { useI18n } from 'vue-i18n'
import {useStore} from 'vuex'
const { locale } = useI18n()
const store = useStore()
import {getHealthCheck} from '@/service/type/healthCheck';
localStorage.setItem('locale', locale.value)
const isOpen: Ref<boolean | undefined> = ref(false)
const healthFlag: Ref<boolean> = ref(false)
provide('isOpen', isOpen)
const fcGetHealthCheck = async (): Promise<void> => {
  try{
   const res :any = await getHealthCheck()
    if(res){
      healthFlag.value =  res['isDbHealthy'][0]['state_desc'] === 'ONLINE' && res['isRedisHealthy'] === 'PONG';
       store.commit('setHealthFlag', healthFlag.value)
    }
  }catch(err){
    console.log(err)
  }
}
fcGetHealthCheck();
const timer = setInterval(() => {
  fcGetHealthCheck()
}, 1000 * 60)
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<style scoped lang="scss">
.el-container {
  position: fixed;
  width: 100%;
  left: 300px;
  transition: 0.5s ease;

  &.isOpen {
    left: 0;
    transition: 0.5s ease;
  }
}

.el-header {
  padding: 0;
}
</style>

