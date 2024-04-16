<template>

    <div class="demo-collapse" :class="{ 'isOpen': isOpen }">
        <el-text class="title mx-1">功能選單</el-text>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="功能" name="1">
                <div class="list">
                    <el-link v-for="(item,index) in routerList" :key="index" @click="fcMoveRouter(item.path)"
                        :underline="false">{{ $t(item.name) }}</el-link>
                </div>
            </el-collapse-item>

        </el-collapse>
    </div>

</template>

<script setup lang="ts">
import { useRouter} from 'vue-router'
const activeNames = ref(['1'])
const router = useRouter()
console.log(router.options.routes[1].children)
const handleChange = (val: string[]) => {
  console.log(val)
}
defineProps({
    isOpen: {
        type: Boolean,
        default: true
    }
})

const fcMoveRouter =  (value: string): void => {
    router.push({ path: value })
}
console.log(router.options)
const routerList:any = computed(() => {
    return (router.options.routes[1].children ?? []).filter((item, index) => item.name !== 'home')
})

</script>

<style scoped lang="scss">

.demo-collapse{
    position: fixed;
    width: 300px;
    height: 100%;
    left: 0;
    transition: 0.5s ease;
    padding-left: 10px;
    .title{
        display: block;
        line-height: 60px;
        font-size: 18px;
        color: #fff;
    }
    .list{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .el-link{
            padding-left: 15px;
            padding-bottom: 10px;
            &:last-child{
                padding-bottom: 0;
            }
        }
    }
}
.isOpen{
    left: -300px;
    transition: 0.5s ease;
}
</style>