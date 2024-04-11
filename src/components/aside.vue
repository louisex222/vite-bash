<template>

    <div class="demo-collapse" :class="{ 'isOpen': isOpen === true }">
        <el-text class="title mx-1">功能選單</el-text>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="會員功能" name="1">
                <div class="list">
                    <el-link v-for="(item,index) in routerList" :key="index" @click="fcMoveRounter(item.path)"
                        :underline="false">{{ $t(item.name) }}</el-link>
                </div>
            </el-collapse-item>
            <el-collapse-item title="其他列表" name="2">
                <div class="list">
                    <el-link v-for="(item,index) in routerOtherList" :key="index" @click="fcMoveRounter(item.path)"
                        :underline="false">{{ $t(item.name) }}</el-link>
                </div>
            </el-collapse-item>
            <el-collapse-item title="遊戲列表" name="3">
                <div class="list">
                    <el-link v-for="(item,index) in routerGameList" :key="index" @click="fcMoveRounter(item.path)"
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
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: true
    }
})
const fcMoveRounter = (value: string): void => {
    router.push({ path: value })
}
const routerList:any = computed(() => {
    return router.options.routes[1].children?.filter((item,index) => item.name !== 'home' && index<4)
})
const routerOtherList: any = computed(() => {
    return router.options.routes[1].children?.filter((item,index) => item.name !== 'home' && index>3 && index<6)
})
const routerGameList:any = computed(() => {
    return router.options.routes[1].children?.filter((item,index) => item.name !== 'home' && index>5)
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