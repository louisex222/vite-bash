<template>

    <div class="demo-collapse" :class="{ 'isOpen': isOpen }">
        <el-text class="title mx-1">功能選單</el-text>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="功能" name="1">
                <div class="list">
                    <el-link    v-for="(item,index) in routerList" :key="index" @click="fcMoveRouter(item.path)"
                        :underline="false">
                      <div :class="{ 'active': item.path === route.path }">{{ $t(item.name) }}</div>
                    </el-link>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<script setup lang="ts">
import { useRouter ,useRoute} from 'vue-router'
const activeNames = ref(['1'])
const router : any = useRouter()
const route = useRoute()
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
const routerList:any = computed(() => {
    return (router.options.routes[1].children ?? []).filter((item) => item.name !== 'home')
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
.el-link{
  div{
    &.active{
      color: #409EFF;
    }
  }

}
</style>
