<template>
    <div class="header-wrap" >
        <div class="logo-wrap">
            <el-icon :size="50"  @click="fcOpClick">
              <Expand style="width:20px; height:20px ; cursor: pointer;" />
            </el-icon>
            <img :src="fcGetImage('meta')" alt="meta"  class="logo" @click="fcToHome('/')">
            <el-text class="text mx-1" size="large" bold>ZenDash</el-text>
        </div>
        <el-switch
            v-model="ishealth" class="ml-2 health-switch"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="伺服器開"
            inactive-text="伺服器關"
            inline-prompt
            disabled
        />
    </div>
</template>

<script setup lang="ts">
import {Ref} from 'vue'
import { InterCreateImage } from '@/vite/homeInter'
import { useRouter } from 'vue-router'
import {useStore}from 'vuex'
import {Expand} from "@element-plus/icons-vue";
const router = useRouter()
const store = useStore()
const isOpen = inject('isOpen')
const openFlag: Ref<any> = ref(isOpen)
const ishealth = computed(()=> store.getters.healthFlag)

const fcGetImage : InterCreateImage =(imagePath) => {
    return new URL(`../assets/img/${imagePath}.png`, import.meta.url).href
}

const fcOpClick =(): void => {
    openFlag.value = !openFlag.value
}
const fcToHome = (path:string): void => {
    router.push({ path: path })
}
</script>

<style scoped lang="scss">
.header-wrap{
    background: #66b1ff;
  display:flex;
}
.logo-wrap{
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    .logo {
        width: 60px;
        height: auto;
        cursor: pointer;
    }
    .text{
        color: #fff;
        font-weight: bold;
    }
}
.health-switch{
  position: fixed;
  right:20px;
  top:15px;
  color: #000;
  opacity:1;
  :deep(span){
    color: #000;

  }

}
</style>
