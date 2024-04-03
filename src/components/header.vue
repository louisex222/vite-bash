<template>
    <div class="header">
        <div class="sec_header">
            <div class="reg_head">
                <router-link class="lnk_logo" to="/"></router-link>
                <login />
                <lang />
            </div>
            <div class="hr_gold large" />
            <div v-for="(item, index) in gameTypeList" :key="index">
                <a>{{ item.localizationCode }}</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface typelist {
    localizationCode: string
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/header.scss";
</style>