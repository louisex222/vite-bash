<template>
    <el-select v-model="value" class="m-2" placeholder="Select" size="default">
        <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script setup lang="ts">
const value = ref('zh-TW')
interface Option {
    value: string
    label: string
}
const options: Array<Option> = [
    {
        value: 'zh-TW',
        label: 'zh-TW',
    },
    {
        value: 'en-US',
        label: 'en-US',
    },
]

</script>

<style scoped></style>