<template><el-container>
    <el-aside width="300px">
      <Aside :isOpen="isOpen"></Aside>
    </el-aside>
    <el-container :class="{ 'isOpen': isOpen === true }">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Header from '@/components/header.vue'
import Aside from '@/components/aside.vue'
const isOpen: Ref<any> = ref(true)
provide('isOpen', isOpen)
</script>
<style scoped lang="scss">
.el-container {
  position: fixed;
  width: 100%;
  left: 300px;
  transition: 0.5s ease;

  &.isOpen {
    left: 0px;
    transition: 0.5s ease;
  }
}

.el-header {
  padding: 0;
}
</style>

