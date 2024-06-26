<script setup lang="ts">
import {io} from "socket.io-client";
import {Ref} from "vue";

interface IMessage {
  name: string,
  msg: string
}
const inputValue: Ref<string> = ref('')
const message: Ref<IMessage[]> = ref([])
const ws = io('http://localhost:8081',{
  transports: ['websocket'],
  autoConnect:true,
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
})

ws.on("connect", function () {
  console.log('connect')
});

ws.on('message', function (data) {
  message.value.push({
    msg: data
  })
})
const fcSend = (msg: string) => {
  ws.emit('message', msg)
}
</script>

<template>
  <div>
    <el-input v-model="inputValue" placeholder="請輸入" style="width: 200px"></el-input>
    <el-button class=" hover:bg-amber-400 ml-3" size="large" type="primary" @click="fcSend(inputValue)">send</el-button>
    <div v-for="(item,index) in message" :key="index"> 角色 : {{item.msg}}</div>
  </div>
</template>

<style scoped>

</style>
