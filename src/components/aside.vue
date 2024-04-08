<template>

    <div class="demo-collapse" :class="{ 'isOpen': isOpen === true }">
        <el-text class="title mx-1">功能選單</el-text>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="會員功能" name="1">
                <div class="list">
                    <el-link  @click="fcMoveRounter('loginView')" :underline="false">登入</el-link>
                    <el-link  @click="fcMoveRounter('logoutView')" :underline="false">登出</el-link>
                </div>
            </el-collapse-item>

        </el-collapse>
    </div>

</template>

<script setup lang="ts">
import { useRouter} from 'vue-router'
const activeNames = ref(['1'])
const  router= useRouter()
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
console.log(props.isOpen)
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