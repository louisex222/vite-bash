<template>
    <div class="header-wrap" >
        <div class="logo-wrap">
            <el-icon :size="50"  @click="fcOpClick"><Expand style="width:20px; height:20px ; cursor: pointer;" /></el-icon>
            <img :src="fcGetImage('meta')" alt="meta"  class="logo" @click="fcToHome('/')">
            <el-text class="text mx-1" size="large" bold>ZenDash</el-text>
        </div>

    </div>
</template>

<script setup lang="ts">
import { InterCreateImage } from '@/vite/homeInter' 
import { useRouter } from 'vue-router'
const router = useRouter()
const fcGetImage : InterCreateImage =(imagePath) => {
    return new URL(`../assets/img/${imagePath}.png`, import.meta.url).href
}
const isOpen = inject('isOpen')
const openFlag: Ref<any> = ref(isOpen)
const emit = defineEmits(['opClick'])
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
</style>