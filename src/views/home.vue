<template>
  <div></div>
</template>

<script lang="ts" setup>
import {getHealthCheck} from '@/service/type/healthCheck';
const fcGetHealthCheck = async (): Promise<void> => {
  const res: any = await getHealthCheck()

}

fcGetHealthCheck()
</script>

<style scoped lang="scss">
</style>